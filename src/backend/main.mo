import Map "mo:core/Map";
import Set "mo:core/Set";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Order "mo:core/Order";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  module Product {
    public func compare(p1 : Product, p2 : Product) : Order.Order {
      Text.compare(p1.name, p2.name);
    };
  };

  type ContactForm = {
    name : Text;
    email : Text;
    message : Text;
    timestamp : Time.Time;
  };

  type Cart = Set.Set<Text>;

  public type Product = {
    name : Text;
    description : Text;
    price : Nat;
    imageUrl : Text;
  };

  public type User = {
    email : Text;
    passwordHash : Text;
    cart : Cart;
  };

  public type UserProfile = {
    email : Text;
  };

  public type CartUpdate = {
    #add : Text;
    #remove : Text;
    #clear;
  };

  let contactForms = Map.empty<Text, ContactForm>();

  let products = Map.empty<Text, Product>();

  let users = Map.empty<Principal, User>();

  // User registration - accessible to guests
  public shared ({ caller }) func createUser(email : Text, password : Text) : async () {
    if (not email.contains(#char '@')) { Runtime.trap("Email must contain an @ symbol") };

    if (email.size() < 5) { Runtime.trap("Email must have at least 5 characters") };
    if (password.size() < 8) { Runtime.trap("Password must have at least 8 characters") };
    if (users.containsKey(caller)) { Runtime.trap("This user is already registered. ") };

    users.add(caller, { email; passwordHash = password; cart = Set.empty<Text>() });
  };

  // User authentication - accessible to guests
  public shared ({ caller }) func authenticateUser(password : Text) : async Bool {
    switch (users.get(caller)) {
      case (null) { Runtime.trap("User does not exist ") };
      case (?user) { password == user.passwordHash };
    };
  };

  // Change email - requires user authentication
  public shared ({ caller }) func changeEmail(newEmail : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can change email");
    };

    switch (users.get(caller)) {
      case (null) { Runtime.trap("User does not exist. ") };
      case (?user) {
        users.add(caller, { user with email = newEmail });
      };
    };
  };

  // Change password - requires user authentication
  public shared ({ caller }) func changePassword(oldPassword : Text, newPassword : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can change password");
    };

    switch (users.get(caller)) {
      case (null) { Runtime.trap("User does not exist") };
      case (?user) {
        if (oldPassword != user.passwordHash) {
          Runtime.trap("Incorrect password");
        };
        users.add(caller, { user with passwordHash = newPassword });
      };
    };
  };

  // Get products - public, accessible to guests
  public query ({ caller }) func getProducts() : async [Product] {
    products.values().toArray().sort();
  };

  // Manage cart - requires user authentication
  public shared ({ caller }) func manageCart(cartUpdate : CartUpdate) : async [Text] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can manage cart");
    };

    switch (users.get(caller)) {
      case (null) { Runtime.trap("Not registered") };
      case (?user) {
        switch (cartUpdate) {
          case (#add item) {
            user.cart.add(item);
          };
          case (#remove item) {
            user.cart.remove(item);
          };
          case (#clear) {
            user.cart.clear();
          };
        };
        users.add(caller, user);
        user.cart.values().toArray();
      };
    };
  };

  // Submit contact form - public, accessible to guests
  public shared ({ caller }) func submitContactForm(form : ContactForm) : async () {
    contactForms.add(form.email, form);
  };

  // Get contact form - requires user authentication and ownership check
  public query ({ caller }) func getContactForm(email : Text) : async ContactForm {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access contact forms");
    };

    switch (users.get(caller)) {
      case (null) { Runtime.trap("Not registered") };
      case (?user) {
        if (Text.equal(user.email, email)) {
          switch (contactForms.get(email)) {
            case (null) { Runtime.trap("Email does not exist ") };
            case (?form) { form };
          };
        } else { Runtime.trap("You can only access your own contact form. ") };
      };
    };
  };

  // Add product - admin only
  public shared ({ caller }) func addProduct(product : Product) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add products");
    };

    products.add(product.name, product);
  };

  // Get caller's user profile - requires user authentication
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get profiles");
    };

    switch (users.get(caller)) {
      case (null) { null };
      case (?user) { ?{ email = user.email } };
    };
  };

  // Get another user's profile - requires admin or self
  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };

    switch (users.get(user)) {
      case (null) { null };
      case (?u) { ?{ email = u.email } };
    };
  };

  // Save caller's user profile - requires user authentication
  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };

    switch (users.get(caller)) {
      case (null) { Runtime.trap("User does not exist") };
      case (?user) {
        users.add(caller, { user with email = profile.email });
      };
    };
  };

  // Initialize default products (this runs at canister initialization)
  let product1 = {
    name = "Desi Ghee";
    description = "Pure Desi Ghee from indigenous cows";
    price = 500;
    imageUrl = "https://www.diwalifestival.org/images/home-decoration/agarbatti.jpg";
  };

  let product2 = {
    name = "Agarbatti";
    description = "Incense sticks for puja and meditation";
    price = 50;
    imageUrl = "https://www.diwalifestival.org/images/home-decoration/agarbatti.jpg";
  };

  products.add(product1.name, product1);
  products.add(product2.name, product2);
};

import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface ContactForm {
    name: string;
    email: string;
    message: string;
    timestamp: Time;
}
export type CartUpdate = {
    __kind__: "add";
    add: string;
} | {
    __kind__: "remove";
    remove: string;
} | {
    __kind__: "clear";
    clear: null;
};
export interface UserProfile {
    email: string;
}
export interface Product {
    name: string;
    description: string;
    imageUrl: string;
    price: bigint;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addProduct(product: Product): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    authenticateUser(password: string): Promise<boolean>;
    changeEmail(newEmail: string): Promise<void>;
    changePassword(oldPassword: string, newPassword: string): Promise<void>;
    createUser(email: string, password: string): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getContactForm(email: string): Promise<ContactForm>;
    getProducts(): Promise<Array<Product>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    manageCart(cartUpdate: CartUpdate): Promise<Array<string>>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitContactForm(form: ContactForm): Promise<void>;
}

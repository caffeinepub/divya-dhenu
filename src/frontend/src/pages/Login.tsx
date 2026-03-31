import { useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Loader2, Lock, Mail, Phone, User } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

export default function Login() {
  const navigate = useNavigate();
  const { login, clear, identity, isLoggingIn, isLoginSuccess, loginStatus } =
    useInternetIdentity();
  const { actor } = useActor();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [inputTab, setInputTab] = useState<"mobile" | "email">("mobile");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loginForm, setLoginForm] = useState({
    mobile: "",
    email: "",
    password: "",
  });
  const [regForm, setRegForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });
  const [regErrors, setRegErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });
  const [registering, setRegistering] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  const [loggedInProfile, setLoggedInProfile] = useState<{
    email: string;
  } | null>(null);

  useEffect(() => {
    document.title = "Login — Divya Dhenu";
  }, []);

  useEffect(() => {
    if (
      isLoginSuccess &&
      actor &&
      identity &&
      !identity.getPrincipal().isAnonymous()
    ) {
      actor
        .getCallerUserProfile()
        .then((profile) => setLoggedInProfile(profile))
        .catch(() => {});
    }
  }, [isLoginSuccess, actor, identity]);

  const isLoggedIn =
    isLoginSuccess ||
    (loginStatus === "idle" &&
      identity &&
      !identity.getPrincipal().isAnonymous());

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoggingIn(true);
    try {
      await login();
    } catch {
      toast.error("Login failed. Please try again.");
    } finally {
      setLoggingIn(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirm: "",
    };
    let valid = true;
    if (!regForm.fullName.trim()) {
      errs.fullName = "Full name is required.";
      valid = false;
    }
    if (
      !regForm.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regForm.email)
    ) {
      errs.email = "Enter a valid email.";
      valid = false;
    }
    if (!regForm.phone.trim() || !/^[6-9]\d{9}$/.test(regForm.phone)) {
      errs.phone = "Enter a valid 10-digit mobile number.";
      valid = false;
    }
    if (regForm.password.length < 6) {
      errs.password = "Password must be at least 6 characters.";
      valid = false;
    }
    if (regForm.password !== regForm.confirm) {
      errs.confirm = "Passwords do not match.";
      valid = false;
    }
    setRegErrors(errs);
    if (!valid) return;
    setRegistering(true);
    try {
      await actor?.createUser(regForm.email, regForm.password);
      toast.success("Account created! Please sign in.");
      setMode("login");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Registration failed.");
    } finally {
      setRegistering(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.72rem 1rem 0.72rem 2.6rem",
    border: "1.5px solid #e8dfc9",
    borderRadius: 999,
    background: "#faf7f0",
    fontSize: "0.9rem",
    color: "#3d2c0e",
    outline: "none",
    fontFamily: "'Lato', sans-serif",
    boxSizing: "border-box" as const,
    transition: "border-color 0.2s, box-shadow 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "0.7rem",
    fontWeight: 700,
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    color: "#8b6914",
    marginBottom: 6,
  };

  const iconStyle: React.CSSProperties = {
    position: "absolute",
    left: 14,
    top: "50%",
    transform: "translateY(-50%)",
    color: "#c7a24b",
    pointerEvents: "none",
  };

  const goldBtn: React.CSSProperties = {
    width: "100%",
    padding: "0.8rem 1rem",
    background: "linear-gradient(135deg, #c7a24b, #e8c96e, #b8892a)",
    border: "none",
    borderRadius: 999,
    color: "#fff",
    fontFamily: "'Lato', sans-serif",
    fontWeight: 800,
    fontSize: "0.9rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    boxShadow: "0 4px 16px rgba(199,162,75,0.3)",
    transition: "opacity 0.2s, transform 0.15s",
  };

  const fieldFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = "#c7a24b";
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(199,162,75,0.15)";
  };
  const fieldBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = "#e8dfc9";
    e.currentTarget.style.boxShadow = "none";
  };

  const pillTabs = (active: boolean): React.CSSProperties => ({
    flex: 1,
    padding: "0.55rem 0.5rem",
    border: "none",
    borderRadius: 999,
    background: active
      ? "linear-gradient(135deg,#c7a24b,#e8c96e,#b8892a)"
      : "transparent",
    color: active ? "#fff" : "#8b6914",
    fontFamily: "'Lato', sans-serif",
    fontWeight: 700,
    fontSize: "0.82rem",
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: active ? "0 2px 8px rgba(199,162,75,0.3)" : "none",
  });

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(ellipse at 20% 30%, rgba(199,162,75,0.1) 0%, transparent 55%), radial-gradient(ellipse at 80% 70%, rgba(199,162,75,0.07) 0%, transparent 55%), #faf7f0",
        padding: "2rem 1.5rem",
      }}
      data-ocid="login.panel"
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 8px 48px rgba(60,40,20,0.13)",
          border: "1px solid #e8dfc9",
          padding: "2.5rem 2rem",
          width: "100%",
          maxWidth: 460,
          position: "relative",
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <img
            src="/assets/whatsapp_image_2026-03-31_at_2.33.22_pm-019d4380-296b-750f-b207-3de04050b4dd.jpeg"
            alt="Divya Dhenu"
            style={{
              width: 56,
              height: 56,
              objectFit: "contain",
              borderRadius: "50%",
              border: "2px solid #c7a24b",
              marginBottom: 10,
            }}
          />
        </div>

        {isLoggedIn ? (
          <div style={{ textAlign: "center" }} data-ocid="login.success_state">
            <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>🙏</div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "#3d2c0e",
                marginBottom: 8,
              }}
            >
              Welcome back!
            </h2>
            {loggedInProfile?.email && (
              <p
                style={{
                  color: "#8b6914",
                  marginBottom: 24,
                  fontSize: "0.9rem",
                }}
              >
                Logged in as <strong>{loggedInProfile.email}</strong>
              </p>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <button
                type="button"
                onClick={() => navigate({ to: "/products" })}
                style={goldBtn}
                data-ocid="login.primary_button"
              >
                Continue Shopping
              </button>
              <button
                type="button"
                onClick={() => clear()}
                style={{
                  ...goldBtn,
                  background: "none",
                  color: "#8b6914",
                  border: "1.5px solid #e8dfc9",
                  boxShadow: "none",
                }}
                data-ocid="login.secondary_button"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Mode toggle pills */}
            <div
              style={{
                display: "flex",
                background: "#faf7f0",
                borderRadius: 999,
                padding: 4,
                marginBottom: 28,
                gap: 4,
              }}
            >
              {(["login", "register"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  style={pillTabs(mode === m)}
                  data-ocid="login.tab"
                >
                  {m === "login" ? "Sign In" : "Create Account"}
                </button>
              ))}
            </div>

            {mode === "login" ? (
              /* ── SIGN IN ── */
              <form onSubmit={handleLogin} noValidate>
                <h1
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.75rem",
                    fontWeight: 700,
                    color: "#3d2c0e",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    textAlign: "center",
                    marginBottom: 4,
                  }}
                >
                  Welcome Back
                </h1>
                <p
                  style={{
                    textAlign: "center",
                    fontStyle: "italic",
                    color: "#8b6914",
                    fontSize: "0.88rem",
                    marginBottom: 24,
                  }}
                >
                  Sign in to your account
                </p>

                {/* Mobile / Email pills */}
                <div
                  style={{
                    display: "flex",
                    background: "#faf7f0",
                    borderRadius: 999,
                    padding: 4,
                    marginBottom: 20,
                    gap: 4,
                  }}
                >
                  {(["mobile", "email"] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setInputTab(t)}
                      style={{
                        flex: 1,
                        padding: "0.5rem",
                        border: "none",
                        borderRadius: 999,
                        background:
                          inputTab === t
                            ? "linear-gradient(135deg,#c7a24b,#e8c96e,#b8892a)"
                            : "#fff",
                        color: inputTab === t ? "#fff" : "#8b6914",
                        fontFamily: "'Lato', sans-serif",
                        fontWeight: 700,
                        fontSize: "0.78rem",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase" as const,
                        cursor: "pointer",
                        transition: "all 0.2s",
                        boxShadow:
                          inputTab === t
                            ? "0 2px 8px rgba(199,162,75,0.25)"
                            : "none",
                      }}
                      data-ocid="login.toggle"
                    >
                      {t === "mobile" ? "📱 Mobile" : "✉ Email"}
                    </button>
                  ))}
                </div>

                <div
                  style={{ display: "flex", flexDirection: "column", gap: 16 }}
                >
                  {inputTab === "mobile" ? (
                    <div>
                      <label htmlFor="login-mobile" style={labelStyle}>
                        Mobile Number
                      </label>
                      <div style={{ position: "relative" }}>
                        <Phone size={15} style={iconStyle} />
                        <input
                          id="login-mobile"
                          type="tel"
                          placeholder="10-digit mobile number"
                          value={loginForm.mobile}
                          onChange={(e) =>
                            setLoginForm((f) => ({
                              ...f,
                              mobile: e.target.value,
                            }))
                          }
                          style={inputStyle}
                          onFocus={fieldFocus}
                          onBlur={fieldBlur}
                          data-ocid="login.input"
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label htmlFor="login-email" style={labelStyle}>
                        Email
                      </label>
                      <div style={{ position: "relative" }}>
                        <Mail size={15} style={iconStyle} />
                        <input
                          id="login-email"
                          type="email"
                          placeholder="you@example.com"
                          value={loginForm.email}
                          onChange={(e) =>
                            setLoginForm((f) => ({
                              ...f,
                              email: e.target.value,
                            }))
                          }
                          style={inputStyle}
                          onFocus={fieldFocus}
                          onBlur={fieldBlur}
                          data-ocid="login.input"
                        />
                      </div>
                    </div>
                  )}

                  {/* Password */}
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 6,
                      }}
                    >
                      <label
                        htmlFor="login-password"
                        style={{ ...labelStyle, marginBottom: 0 }}
                      >
                        Password
                      </label>
                      <button
                        type="button"
                        style={{
                          background: "none",
                          border: "none",
                          color: "#c7a24b",
                          fontSize: "0.78rem",
                          fontWeight: 600,
                          cursor: "pointer",
                          padding: 0,
                        }}
                        data-ocid="login.secondary_button"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div style={{ position: "relative" }}>
                      <Lock size={15} style={iconStyle} />
                      <input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Your password"
                        value={loginForm.password}
                        onChange={(e) =>
                          setLoginForm((f) => ({
                            ...f,
                            password: e.target.value,
                          }))
                        }
                        style={{ ...inputStyle, paddingRight: "4rem" }}
                        onFocus={fieldFocus}
                        onBlur={fieldBlur}
                        data-ocid="login.input"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        style={{
                          position: "absolute",
                          right: 14,
                          top: "50%",
                          transform: "translateY(-50%)",
                          background: "none",
                          border: "none",
                          color: "#8b6914",
                          cursor: "pointer",
                          padding: 0,
                          display: "flex",
                          alignItems: "center",
                        }}
                        data-ocid="login.toggle"
                      >
                        {showPassword ? (
                          <EyeOff size={14} />
                        ) : (
                          <Eye size={14} />
                        )}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    style={{
                      ...goldBtn,
                      opacity: loggingIn || isLoggingIn ? 0.75 : 1,
                    }}
                    disabled={loggingIn || isLoggingIn}
                    data-ocid="login.submit_button"
                  >
                    {loggingIn || isLoggingIn ? (
                      <>
                        <Loader2 size={16} className="animate-spin" /> Signing
                        in…
                      </>
                    ) : (
                      "Log In"
                    )}
                  </button>

                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <div
                      style={{ flex: 1, height: 1, background: "#e8dfc9" }}
                    />
                    <span
                      style={{
                        fontSize: "0.72rem",
                        color: "#b8a070",
                        fontWeight: 600,
                      }}
                    >
                      OR
                    </span>
                    <div
                      style={{ flex: 1, height: 1, background: "#e8dfc9" }}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={login}
                    disabled={isLoggingIn}
                    style={{
                      width: "100%",
                      padding: "0.72rem 1rem",
                      border: "1.5px solid #e8dfc9",
                      borderRadius: 999,
                      background: "#faf7f0",
                      color: "#3d2c0e",
                      fontFamily: "'Lato', sans-serif",
                      fontWeight: 700,
                      fontSize: "0.82rem",
                      letterSpacing: "0.05em",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      transition: "border-color 0.2s",
                    }}
                    data-ocid="login.secondary_button"
                  >
                    🔐 Connect with Internet Identity
                  </button>

                  <p
                    style={{
                      textAlign: "center",
                      fontSize: "0.82rem",
                      color: "#8b6914",
                      margin: 0,
                    }}
                  >
                    New here?{" "}
                    <button
                      type="button"
                      onClick={() => setMode("register")}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#c7a24b",
                        fontWeight: 700,
                        cursor: "pointer",
                        fontSize: "0.82rem",
                      }}
                      data-ocid="login.tab"
                    >
                      Create an account
                    </button>
                  </p>
                  <p style={{ textAlign: "center", margin: 0 }}>
                    <button
                      type="button"
                      style={{
                        background: "none",
                        border: "none",
                        color: "#b8a070",
                        fontSize: "0.78rem",
                        cursor: "pointer",
                      }}
                    >
                      Staff portal
                    </button>
                  </p>
                </div>
              </form>
            ) : (
              /* ── CREATE ACCOUNT ── */
              <form
                onSubmit={handleRegister}
                noValidate
                data-ocid="login.panel"
              >
                <h1
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.75rem",
                    fontWeight: 700,
                    color: "#3d2c0e",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    textAlign: "center",
                    marginBottom: 4,
                  }}
                >
                  Create Account
                </h1>
                <p
                  style={{
                    textAlign: "center",
                    fontStyle: "italic",
                    color: "#8b6914",
                    fontSize: "0.88rem",
                    marginBottom: 24,
                  }}
                >
                  Join us for faster checkout and order history
                </p>

                <div
                  style={{ display: "flex", flexDirection: "column", gap: 16 }}
                >
                  <div>
                    <label htmlFor="reg-fullname" style={labelStyle}>
                      Full Name
                    </label>
                    <div style={{ position: "relative" }}>
                      <User size={15} style={iconStyle} />
                      <input
                        id="reg-fullname"
                        type="text"
                        placeholder="Your full name"
                        value={regForm.fullName}
                        onChange={(e) =>
                          setRegForm((f) => ({
                            ...f,
                            fullName: e.target.value,
                          }))
                        }
                        style={inputStyle}
                        onFocus={fieldFocus}
                        onBlur={fieldBlur}
                        data-ocid="login.input"
                      />
                    </div>
                    {regErrors.fullName && (
                      <p
                        style={{
                          color: "#c0392b",
                          fontSize: "0.75rem",
                          marginTop: 4,
                        }}
                        data-ocid="login.error_state"
                      >
                        {regErrors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="reg-email" style={labelStyle}>
                      Email
                    </label>
                    <div style={{ position: "relative" }}>
                      <Mail size={15} style={iconStyle} />
                      <input
                        id="reg-email"
                        type="email"
                        placeholder="you@example.com"
                        value={regForm.email}
                        onChange={(e) =>
                          setRegForm((f) => ({ ...f, email: e.target.value }))
                        }
                        style={inputStyle}
                        onFocus={fieldFocus}
                        onBlur={fieldBlur}
                        data-ocid="login.input"
                      />
                    </div>
                    {regErrors.email && (
                      <p
                        style={{
                          color: "#c0392b",
                          fontSize: "0.75rem",
                          marginTop: 4,
                        }}
                        data-ocid="login.error_state"
                      >
                        {regErrors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="reg-phone" style={labelStyle}>
                      Phone
                    </label>
                    <div style={{ position: "relative" }}>
                      <Phone size={15} style={iconStyle} />
                      <input
                        id="reg-phone"
                        type="tel"
                        placeholder="10-digit mobile number"
                        value={regForm.phone}
                        onChange={(e) =>
                          setRegForm((f) => ({ ...f, phone: e.target.value }))
                        }
                        style={inputStyle}
                        onFocus={fieldFocus}
                        onBlur={fieldBlur}
                        data-ocid="login.input"
                      />
                    </div>
                    {regErrors.phone && (
                      <p
                        style={{
                          color: "#c0392b",
                          fontSize: "0.75rem",
                          marginTop: 4,
                        }}
                        data-ocid="login.error_state"
                      >
                        {regErrors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="reg-password" style={labelStyle}>
                      Password
                    </label>
                    <div style={{ position: "relative" }}>
                      <Lock size={15} style={iconStyle} />
                      <input
                        id="reg-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Min. 6 characters"
                        value={regForm.password}
                        onChange={(e) =>
                          setRegForm((f) => ({
                            ...f,
                            password: e.target.value,
                          }))
                        }
                        style={{ ...inputStyle, paddingRight: "3rem" }}
                        onFocus={fieldFocus}
                        onBlur={fieldBlur}
                        data-ocid="login.input"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        style={{
                          position: "absolute",
                          right: 14,
                          top: "50%",
                          transform: "translateY(-50%)",
                          background: "none",
                          border: "none",
                          color: "#8b6914",
                          cursor: "pointer",
                          padding: 0,
                        }}
                        data-ocid="login.toggle"
                      >
                        {showPassword ? (
                          <EyeOff size={14} />
                        ) : (
                          <Eye size={14} />
                        )}
                      </button>
                    </div>
                    {regErrors.password && (
                      <p
                        style={{
                          color: "#c0392b",
                          fontSize: "0.75rem",
                          marginTop: 4,
                        }}
                        data-ocid="login.error_state"
                      >
                        {regErrors.password}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="reg-confirm" style={labelStyle}>
                      Confirm Password
                    </label>
                    <div style={{ position: "relative" }}>
                      <Lock size={15} style={iconStyle} />
                      <input
                        id="reg-confirm"
                        type={showConfirm ? "text" : "password"}
                        placeholder="Repeat your password"
                        value={regForm.confirm}
                        onChange={(e) =>
                          setRegForm((f) => ({ ...f, confirm: e.target.value }))
                        }
                        style={{ ...inputStyle, paddingRight: "3rem" }}
                        onFocus={fieldFocus}
                        onBlur={fieldBlur}
                        data-ocid="login.input"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm((v) => !v)}
                        style={{
                          position: "absolute",
                          right: 14,
                          top: "50%",
                          transform: "translateY(-50%)",
                          background: "none",
                          border: "none",
                          color: "#8b6914",
                          cursor: "pointer",
                          padding: 0,
                        }}
                        data-ocid="login.toggle"
                      >
                        {showConfirm ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    </div>
                    {regErrors.confirm && (
                      <p
                        style={{
                          color: "#c0392b",
                          fontSize: "0.75rem",
                          marginTop: 4,
                        }}
                        data-ocid="login.error_state"
                      >
                        {regErrors.confirm}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    style={{ ...goldBtn, opacity: registering ? 0.75 : 1 }}
                    disabled={registering}
                    data-ocid="login.submit_button"
                  >
                    {registering ? (
                      <>
                        <Loader2 size={16} className="animate-spin" /> Creating…
                      </>
                    ) : (
                      "Sign Up"
                    )}
                  </button>

                  <p
                    style={{
                      textAlign: "center",
                      fontSize: "0.82rem",
                      color: "#8b6914",
                      margin: 0,
                    }}
                  >
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setMode("login")}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#c7a24b",
                        fontWeight: 700,
                        cursor: "pointer",
                        fontSize: "0.82rem",
                      }}
                      data-ocid="login.tab"
                    >
                      Sign in
                    </button>
                  </p>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}

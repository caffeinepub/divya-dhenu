import { Link, useNavigate } from "@tanstack/react-router";
import { Loader2, LogIn, UserPlus } from "lucide-react";
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
  const [regForm, setRegForm] = useState({ email: "", password: "" });
  const [regErrors, setRegErrors] = useState({ email: "", password: "" });
  const [registering, setRegistering] = useState(false);
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
        .then((profile) => {
          setLoggedInProfile(profile);
        })
        .catch(() => {});
    }
  }, [isLoginSuccess, actor, identity]);

  const isLoggedIn =
    isLoginSuccess ||
    (loginStatus === "idle" &&
      identity &&
      !identity.getPrincipal().isAnonymous());

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = { email: "", password: "" };
    let valid = true;
    if (!regForm.email.trim()) {
      errs.email = "Email is required.";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regForm.email)) {
      errs.email = "Enter a valid email.";
      valid = false;
    }
    if (!regForm.password.trim() || regForm.password.length < 6) {
      errs.password = "Password must be at least 6 characters.";
      valid = false;
    }
    setRegErrors(errs);
    if (!valid) return;

    setRegistering(true);
    try {
      await actor?.createUser(regForm.email, regForm.password);
      toast.success(
        "Account created! You can now connect with Internet Identity.",
      );
      setMode("login");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Registration failed.";
      toast.error(msg);
    } finally {
      setRegistering(false);
    }
  };

  const handleContinueShopping = async () => {
    await navigate({ to: "/products" });
  };

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--ivory)",
        padding: "2rem 1.5rem",
      }}
      data-ocid="login.panel"
    >
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(199,162,75,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(199,162,75,0.06) 0%, transparent 50%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 8px 40px rgba(60,40,20,0.14)",
          border: "1px solid var(--sand)",
          padding: "2.5rem 2rem",
          width: "100%",
          maxWidth: 440,
          position: "relative",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <img
            src="/assets/whatsapp_image_2026-03-31_at_2.33.22_pm-019d4368-ccbb-73cb-9a80-5c3f105026ac.jpeg"
            alt="Divya Dhenu"
            style={{
              width: 64,
              height: 64,
              objectFit: "contain",
              borderRadius: "50%",
              border: "2px solid var(--gold)",
              marginBottom: 12,
            }}
          />
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.7rem",
              fontWeight: 700,
              color: "var(--brown-dark)",
              marginBottom: 4,
            }}
          >
            Divya Dhenu
          </h1>
          <p style={{ color: "var(--brown-light)", fontSize: "0.88rem" }}>
            Sacred products for the sacred home
          </p>
        </div>

        {isLoggedIn ? (
          <div style={{ textAlign: "center" }} data-ocid="login.success_state">
            <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>🙏</div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.4rem",
                fontWeight: 700,
                color: "var(--brown-dark)",
                marginBottom: 8,
              }}
            >
              Welcome back!
            </h2>
            {loggedInProfile?.email && (
              <p
                style={{
                  color: "var(--brown-light)",
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
                onClick={handleContinueShopping}
                className="btn-gold"
                style={{ width: "100%" }}
                data-ocid="login.primary_button"
              >
                Continue Shopping
              </button>
              <button
                type="button"
                onClick={() => clear()}
                className="btn-gold-outline"
                style={{ width: "100%" }}
                data-ocid="login.secondary_button"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                borderBottom: "2px solid var(--sand)",
                marginBottom: 28,
              }}
            >
              {(["login", "register"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  style={{
                    flex: 1,
                    padding: "0.6rem",
                    background: "none",
                    border: "none",
                    borderBottom:
                      mode === m ? "2.5px solid var(--gold)" : "none",
                    marginBottom: -2,
                    fontFamily: "'Lato', sans-serif",
                    fontWeight: mode === m ? 700 : 500,
                    color: mode === m ? "var(--gold)" : "var(--brown-light)",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    transition: "color 0.2s ease",
                  }}
                  data-ocid="login.tab"
                >
                  {m === "login" ? "Sign In" : "Register"}
                </button>
              ))}
            </div>

            {mode === "login" ? (
              <div style={{ textAlign: "center" }}>
                <p
                  style={{
                    color: "var(--brown-mid)",
                    marginBottom: 24,
                    lineHeight: 1.65,
                    fontSize: "0.92rem",
                  }}
                >
                  Connect securely with <strong>Internet Identity</strong> — no
                  passwords needed, no data stored.
                </p>
                <button
                  type="button"
                  onClick={login}
                  disabled={isLoggingIn}
                  className="btn-gold"
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                  }}
                  data-ocid="login.primary_button"
                >
                  {isLoggingIn ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> Connecting…
                    </>
                  ) : (
                    <>
                      <LogIn size={18} /> Connect with Internet Identity
                    </>
                  )}
                </button>
                <p
                  style={{
                    marginTop: 20,
                    color: "var(--brown-light)",
                    fontSize: "0.82rem",
                  }}
                >
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("register")}
                    style={{
                      background: "none",
                      border: "none",
                      color: "var(--gold)",
                      cursor: "pointer",
                      fontWeight: 700,
                      fontSize: "0.82rem",
                    }}
                    data-ocid="login.secondary_button"
                  >
                    Create one here
                  </button>
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleRegister}
                noValidate
                data-ocid="login.panel"
              >
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 18 }}
                >
                  <div>
                    <label
                      htmlFor="reg-email"
                      style={{
                        display: "block",
                        fontWeight: 600,
                        color: "var(--brown-dark)",
                        fontSize: "0.85rem",
                        marginBottom: 6,
                      }}
                    >
                      Email Address *
                    </label>
                    <input
                      id="reg-email"
                      className="form-input"
                      type="email"
                      placeholder="you@example.com"
                      value={regForm.email}
                      onChange={(e) =>
                        setRegForm((f) => ({ ...f, email: e.target.value }))
                      }
                      data-ocid="login.input"
                    />
                    {regErrors.email && (
                      <p
                        style={{
                          color: "#c0392b",
                          fontSize: "0.78rem",
                          marginTop: 4,
                        }}
                        data-ocid="login.error_state"
                      >
                        {regErrors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="reg-password"
                      style={{
                        display: "block",
                        fontWeight: 600,
                        color: "var(--brown-dark)",
                        fontSize: "0.85rem",
                        marginBottom: 6,
                      }}
                    >
                      Password *
                    </label>
                    <input
                      id="reg-password"
                      className="form-input"
                      type="password"
                      placeholder="Min. 6 characters"
                      value={regForm.password}
                      onChange={(e) =>
                        setRegForm((f) => ({ ...f, password: e.target.value }))
                      }
                      data-ocid="login.input"
                    />
                    {regErrors.password && (
                      <p
                        style={{
                          color: "#c0392b",
                          fontSize: "0.78rem",
                          marginTop: 4,
                        }}
                        data-ocid="login.error_state"
                      >
                        {regErrors.password}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={registering}
                    className="btn-gold"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      opacity: registering ? 0.7 : 1,
                    }}
                    data-ocid="login.submit_button"
                  >
                    {registering ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <UserPlus size={16} />
                    )}
                    {registering ? "Creating…" : "Create Account"}
                  </button>

                  <p
                    style={{
                      textAlign: "center",
                      color: "var(--brown-light)",
                      fontSize: "0.82rem",
                    }}
                  >
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setMode("login")}
                      style={{
                        background: "none",
                        border: "none",
                        color: "var(--gold)",
                        cursor: "pointer",
                        fontWeight: 700,
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

// Suppress unused import warning
export { Link };

import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";
import { useScrollReveal } from "../hooks/useScrollReveal";

const contactItems = [
  {
    icon: <MapPin size={20} />,
    label: "Address",
    value: "Gau-Bhakti Ashram, Vrindavan, Mathura, UP – 281121",
  },
  { icon: <Phone size={20} />, label: "Phone", value: "+91 98765 43210" },
  { icon: <Mail size={20} />, label: "Email", value: "hello@divyadhenu.in" },
];

export default function Contact() {
  useScrollReveal();
  const { actor } = useActor();

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = "Contact — Divya Dhenu";
  }, []);

  const validate = () => {
    const e = { name: "", email: "", message: "" };
    let valid = true;
    if (!form.name.trim()) {
      e.name = "Name is required.";
      valid = false;
    }
    if (!form.email.trim()) {
      e.email = "Email is required.";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Enter a valid email.";
      valid = false;
    }
    if (!form.message.trim()) {
      e.message = "Message is required.";
      valid = false;
    }
    setErrors(e);
    return valid;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await actor?.submitContactForm({
        name: form.name,
        email: form.email,
        message: form.message,
        timestamp: BigInt(Date.now()) * BigInt(1_000_000),
      });
      setSubmitted(true);
      toast.success("Message sent! We'll be in touch soon.");
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ backgroundColor: "var(--ivory)", minHeight: "100vh" }}>
      {/* Banner */}
      <div
        style={{
          background:
            "linear-gradient(135deg, var(--brown-dark) 0%, #5C3D1E 100%)",
          padding: "5rem 1.5rem 4rem",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
        data-ocid="contact.section"
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(ellipse at center, rgba(199,162,75,0.18) 0%, transparent 70%)",
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <p
            style={{
              color: "var(--gold-light)",
              fontSize: "0.8rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontWeight: 700,
              marginBottom: 12,
            }}
          >
            Get In Touch
          </p>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              fontWeight: 800,
              color: "#fff",
              marginBottom: 16,
            }}
          >
            We'd Love to Hear from You
          </h1>
          <div
            style={{
              width: 60,
              height: 3,
              background:
                "linear-gradient(90deg, var(--gold-light), var(--gold), var(--gold-light))",
              margin: "0 auto",
              borderRadius: 2,
            }}
          />
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "4rem 1.5rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "3rem",
          }}
        >
          {/* Contact Info */}
          <div className="reveal" data-ocid="contact.panel">
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.7rem",
                fontWeight: 700,
                color: "var(--brown-dark)",
                marginBottom: 8,
              }}
            >
              Reach Us
            </h2>
            <div
              style={{
                width: 40,
                height: 3,
                background: "var(--gold)",
                borderRadius: 2,
                marginBottom: 24,
              }}
            />
            <p
              style={{
                color: "var(--brown-light)",
                lineHeight: 1.75,
                marginBottom: 32,
                fontSize: "0.95rem",
              }}
            >
              Have a question about our products? Want to know more about our
              Gau-shalas? Or just want to say namaste? We're always happy to
              connect.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {contactItems.map((c) => (
                <div
                  key={c.label}
                  style={{ display: "flex", gap: 16, alignItems: "flex-start" }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      background: "rgba(199,162,75,0.12)",
                      border: "1.5px solid rgba(199,162,75,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--gold)",
                      flexShrink: 0,
                    }}
                  >
                    {c.icon}
                  </div>
                  <div>
                    <p
                      style={{
                        fontWeight: 700,
                        color: "var(--brown-dark)",
                        fontSize: "0.88rem",
                        marginBottom: 4,
                      }}
                    >
                      {c.label}
                    </p>
                    <p
                      style={{
                        color: "var(--brown-light)",
                        fontSize: "0.9rem",
                      }}
                    >
                      {c.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="reveal reveal-delay-2" data-ocid="contact.panel">
            {submitted ? (
              <div
                style={{
                  background: "rgba(199,162,75,0.08)",
                  border: "1.5px solid var(--gold)",
                  borderRadius: 12,
                  padding: "2.5rem",
                  textAlign: "center",
                }}
                data-ocid="contact.success_state"
              >
                <div style={{ fontSize: "2.5rem", marginBottom: 16 }}>🙏</div>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.4rem",
                    fontWeight: 700,
                    color: "var(--brown-dark)",
                    marginBottom: 12,
                  }}
                >
                  Namaste! Message Received.
                </h3>
                <p style={{ color: "var(--brown-light)", lineHeight: 1.7 }}>
                  Thank you for reaching out. Our team will get back to you
                  within 24 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                data-ocid="contact.panel"
              >
                <h2
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.7rem",
                    fontWeight: 700,
                    color: "var(--brown-dark)",
                    marginBottom: 8,
                  }}
                >
                  Send a Message
                </h2>
                <div
                  style={{
                    width: 40,
                    height: 3,
                    background: "var(--gold)",
                    borderRadius: 2,
                    marginBottom: 28,
                  }}
                />

                <div
                  style={{ display: "flex", flexDirection: "column", gap: 20 }}
                >
                  <div>
                    <label
                      htmlFor="contact-name"
                      style={{
                        display: "block",
                        fontWeight: 600,
                        color: "var(--brown-dark)",
                        fontSize: "0.88rem",
                        marginBottom: 6,
                      }}
                    >
                      Full Name *
                    </label>
                    <input
                      id="contact-name"
                      className="form-input"
                      type="text"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, name: e.target.value }))
                      }
                      data-ocid="contact.input"
                    />
                    {errors.name && (
                      <p
                        style={{
                          color: "#c0392b",
                          fontSize: "0.8rem",
                          marginTop: 4,
                        }}
                        data-ocid="contact.error_state"
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      style={{
                        display: "block",
                        fontWeight: 600,
                        color: "var(--brown-dark)",
                        fontSize: "0.88rem",
                        marginBottom: 6,
                      }}
                    >
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      className="form-input"
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, email: e.target.value }))
                      }
                      data-ocid="contact.input"
                    />
                    {errors.email && (
                      <p
                        style={{
                          color: "#c0392b",
                          fontSize: "0.8rem",
                          marginTop: 4,
                        }}
                        data-ocid="contact.error_state"
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      style={{
                        display: "block",
                        fontWeight: 600,
                        color: "var(--brown-dark)",
                        fontSize: "0.88rem",
                        marginBottom: 6,
                      }}
                    >
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      className="form-input"
                      rows={5}
                      placeholder="How can we help you?"
                      value={form.message}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, message: e.target.value }))
                      }
                      style={{ resize: "vertical" }}
                      data-ocid="contact.textarea"
                    />
                    {errors.message && (
                      <p
                        style={{
                          color: "#c0392b",
                          fontSize: "0.8rem",
                          marginTop: 4,
                        }}
                        data-ocid="contact.error_state"
                      >
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn-gold"
                    disabled={submitting}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      justifyContent: "center",
                      opacity: submitting ? 0.7 : 1,
                    }}
                    data-ocid="contact.submit_button"
                  >
                    <Send size={15} />
                    {submitting ? "Sending…" : "Send Message"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

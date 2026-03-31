import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer className="footer" data-ocid="footer.panel">
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "4rem 1.5rem 2rem",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2.5rem",
            marginBottom: "3rem",
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 16,
              }}
            >
              <img
                src="/assets/whatsapp_image_2026-03-31_at_2.33.22_pm-019d4368-ccbb-73cb-9a80-5c3f105026ac.jpeg"
                alt="Divya Dhenu"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  objectFit: "contain",
                  border: "2px solid var(--gold-light)",
                }}
              />
              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  color: "#fff",
                }}
              >
                Divya Dhenu
              </span>
            </div>
            <p
              style={{
                fontSize: "0.88rem",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.65)",
              }}
            >
              Bringing purity, tradition, and the blessings of the sacred cow
              directly to your home.
            </p>
            <div style={{ display: "flex", gap: 14, marginTop: 20 }}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                data-ocid="footer.link"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                data-ocid="footer.link"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                data-ocid="footer.link"
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                data-ocid="footer.link"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: "0.8rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--gold-light)",
                marginBottom: 16,
                fontWeight: 700,
              }}
            >
              Quick Links
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { to: "/" as const, label: "Home" },
                { to: "/products" as const, label: "Products" },
                { to: "/about" as const, label: "About Us" },
                { to: "/contact" as const, label: "Contact" },
              ].map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  style={{ fontSize: "0.9rem" }}
                  data-ocid="footer.link"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: "0.8rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--gold-light)",
                marginBottom: 16,
                fontWeight: 700,
              }}
            >
              Our Products
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                "Desi Ghee",
                "Natural Agarbatti",
                "A2 Milk Products",
                "Herbal Incense",
              ].map((p) => (
                <Link
                  to="/products"
                  key={p}
                  style={{ fontSize: "0.9rem" }}
                  data-ocid="footer.link"
                >
                  {p}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: "0.8rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--gold-light)",
                marginBottom: 16,
                fontWeight: 700,
              }}
            >
              Contact
            </h4>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                fontSize: "0.9rem",
              }}
            >
              <p style={{ color: "rgba(255,255,255,0.65)" }}>
                📍 Vrindavan, Mathura, UP
              </p>
              <p style={{ color: "rgba(255,255,255,0.65)" }}>
                📞 +91 98765 43210
              </p>
              <p style={{ color: "rgba(255,255,255,0.65)" }}>
                ✉️ hello@divyadhenu.in
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: "1.5rem",
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "0.82rem",
          }}
        >
          <p style={{ color: "rgba(255,255,255,0.5)" }}>
            © {year} Divya Dhenu. All rights reserved.
          </p>
          <p style={{ color: "rgba(255,255,255,0.4)" }}>
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--gold-light)" }}
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

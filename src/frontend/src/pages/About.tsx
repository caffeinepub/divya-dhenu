import { Link } from "@tanstack/react-router";
import { Award, Heart, Shield, Users } from "lucide-react";
import { useEffect } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const values = [
  {
    icon: <Heart size={28} />,
    title: "Devotion",
    desc: "Every product is made with love and reverence for our sacred traditions.",
  },
  {
    icon: <Shield size={28} />,
    title: "Purity",
    desc: "Zero compromise on quality — from source to your doorstep.",
  },
  {
    icon: <Award size={28} />,
    title: "Authenticity",
    desc: "Genuine traditional methods, not industrialized shortcuts.",
  },
  {
    icon: <Users size={28} />,
    title: "Community",
    desc: "Supporting Gau-shalas and small farmers across India.",
  },
];

export default function About() {
  useScrollReveal();

  useEffect(() => {
    document.title = "About Us — Divya Dhenu";
  }, []);

  return (
    <div style={{ backgroundColor: "var(--ivory)", minHeight: "100vh" }}>
      {/* Hero Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, #3B2A1A 0%, #5C3D1E 100%)",
          padding: "5.5rem 1.5rem 4.5rem",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
        data-ocid="about.section"
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(ellipse at center, rgba(199,162,75,0.2) 0%, transparent 70%)",
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
            Our Story
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
            Rooted in Sacred Tradition
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

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Heritage Section */}
        <section className="section-pad" data-ocid="about.section">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "3rem",
              alignItems: "center",
            }}
          >
            <div className="reveal">
              <p
                style={{
                  color: "var(--gold)",
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                Our Heritage
              </p>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
                  fontWeight: 700,
                  color: "var(--brown-dark)",
                  marginBottom: 16,
                  lineHeight: 1.3,
                }}
              >
                5000 Years of Indian Wisdom
              </h2>
              <div
                style={{
                  width: 50,
                  height: 3,
                  background: "var(--gold)",
                  borderRadius: 2,
                  marginBottom: 20,
                }}
              />
              <p
                style={{
                  color: "var(--brown-mid)",
                  lineHeight: 1.85,
                  fontSize: "0.97rem",
                  marginBottom: 16,
                }}
              >
                The name <em>Divya Dhenu</em> — meaning "Sacred Cow" — is an ode
                to the most revered animal in Indian culture. For millennia, the
                Gir cow has been a symbol of abundance, nourishment, and divine
                grace.
              </p>
              <p
                style={{
                  color: "var(--brown-mid)",
                  lineHeight: 1.85,
                  fontSize: "0.97rem",
                  marginBottom: 16,
                }}
              >
                Our founder, inspired by visits to Gau-shalas in Vrindavan and
                Gujarat, saw that the ancient bilona method of making ghee —
                where butter is hand-churned from fermented curd — was
                disappearing. Divya Dhenu was born to preserve it.
              </p>
              <p
                style={{
                  color: "var(--brown-mid)",
                  lineHeight: 1.85,
                  fontSize: "0.97rem",
                }}
              >
                We work directly with small family-run Gau-shalas, ensuring the
                cows live happy, stress-free lives. Happy cows give purer milk.
                Purer milk gives more nourishing ghee.
              </p>
            </div>
            <div className="reveal reveal-delay-2">
              <div
                style={{
                  borderRadius: 16,
                  overflow: "hidden",
                  boxShadow: "0 16px 40px rgba(60,40,20,0.18)",
                  border: "3px solid var(--sand)",
                }}
              >
                <img
                  src="/assets/generated/desi-ghee.dim_600x600.jpg"
                  alt="Traditional Desi Ghee"
                  style={{ width: "100%", display: "block" }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Promise Section */}
        <section
          className="section-pad"
          style={{ borderTop: "1px solid var(--sand)" }}
          data-ocid="about.section"
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "3rem",
              alignItems: "center",
            }}
          >
            <div className="reveal reveal-delay-1">
              <div
                style={{
                  borderRadius: 16,
                  overflow: "hidden",
                  boxShadow: "0 16px 40px rgba(60,40,20,0.18)",
                  border: "3px solid var(--sand)",
                }}
              >
                <img
                  src="/assets/generated/agarbatti.dim_600x600.jpg"
                  alt="Natural Agarbatti"
                  style={{ width: "100%", display: "block" }}
                />
              </div>
            </div>
            <div className="reveal reveal-delay-2">
              <p
                style={{
                  color: "var(--gold)",
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                Our Promise
              </p>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
                  fontWeight: 700,
                  color: "var(--brown-dark)",
                  marginBottom: 16,
                  lineHeight: 1.3,
                }}
              >
                Purity, Verified at Every Step
              </h2>
              <div
                style={{
                  width: 50,
                  height: 3,
                  background: "var(--gold)",
                  borderRadius: 2,
                  marginBottom: 20,
                }}
              />
              <p
                style={{
                  color: "var(--brown-mid)",
                  lineHeight: 1.85,
                  fontSize: "0.97rem",
                  marginBottom: 16,
                }}
              >
                We believe you deserve to know exactly what goes into the
                products you bring into your home and offer at your altar. Every
                batch of Divya Dhenu Ghee is lab-tested for purity.
              </p>
              <p
                style={{
                  color: "var(--brown-mid)",
                  lineHeight: 1.85,
                  fontSize: "0.97rem",
                }}
              >
                Our Agarbatti is crafted using only natural herbs, flower
                resins, and sacred woods — no bamboo charcoal, no synthetic
                binders, no artificial fragrances.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section
          className="section-pad"
          style={{ borderTop: "1px solid var(--sand)" }}
          data-ocid="about.section"
        >
          <div
            className="reveal"
            style={{ textAlign: "center", marginBottom: "3rem" }}
          >
            <p
              style={{
                color: "var(--gold)",
                fontWeight: 700,
                fontSize: "0.8rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              What We Stand For
            </p>
            <h2 className="section-title">Our Core Values</h2>
            <div className="gold-divider" />
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {values.map((v, i) => (
              <div
                key={v.title}
                className={`feature-tile reveal reveal-delay-${i + 1}`}
                data-ocid={`about.item.${i + 1}`}
              >
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, rgba(199,162,75,0.18), rgba(199,162,75,0.08))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--gold)",
                    marginBottom: 16,
                    border: "1.5px solid rgba(199,162,75,0.3)",
                  }}
                >
                  {v.icon}
                </div>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "var(--brown-dark)",
                    marginBottom: 8,
                  }}
                >
                  {v.title}
                </h3>
                <p
                  style={{
                    color: "var(--brown-light)",
                    fontSize: "0.88rem",
                    lineHeight: 1.65,
                  }}
                >
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section
          className="section-pad"
          style={{ textAlign: "center", borderTop: "1px solid var(--sand)" }}
          data-ocid="about.section"
        >
          <div className="reveal">
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
                fontWeight: 700,
                color: "var(--brown-dark)",
                marginBottom: 16,
              }}
            >
              Experience the Divya Dhenu Difference
            </h2>
            <p
              style={{
                color: "var(--brown-light)",
                marginBottom: 28,
                fontSize: "1rem",
              }}
            >
              Explore our sacred collection and bring home the gift of purity.
            </p>
            <Link
              to="/products"
              className="btn-gold"
              data-ocid="about.primary_button"
            >
              Shop Our Products
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

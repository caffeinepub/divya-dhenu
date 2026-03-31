import { Link } from "@tanstack/react-router";
import { FlaskConical, Gem, Leaf, Truck } from "lucide-react";
import { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useScrollReveal } from "../hooks/useScrollReveal";

const products = [
  {
    id: "desi-ghee",
    name: "Pure Desi Ghee",
    description: "100% Pure A2 Cow Ghee made using traditional bilona method",
    price: "₹499",
    image: "/assets/generated/desi-ghee.dim_600x600.jpg",
  },
  {
    id: "agarbatti",
    name: "Natural Agarbatti",
    description: "Natural incense sticks for spiritual and daily rituals",
    price: "₹199",
    image: "/assets/generated/agarbatti.dim_600x600.jpg",
  },
];

const features = [
  {
    icon: <Leaf size={32} />,
    title: "100% Pure",
    desc: "Sourced directly from happy Desi cows",
  },
  {
    icon: <Gem size={32} />,
    title: "Traditional Methods",
    desc: "Bilona & ancient Vedic processes",
  },
  {
    icon: <FlaskConical size={32} />,
    title: "Chemical-Free",
    desc: "No additives, no preservatives, ever",
  },
  {
    icon: <Truck size={32} />,
    title: "Fast Delivery",
    desc: "Pan-India delivery within 3–5 days",
  },
];

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Delhi",
    quote:
      "The ghee is absolutely divine! You can taste the difference — it's aromatic, golden, and pure. My family won't use anything else.",
    rating: 5,
  },
  {
    name: "Rajan Mehta",
    location: "Mumbai",
    quote:
      "The Agarbatti fragrance fills my prayer room beautifully. No harsh chemicals, just natural fragrance. Truly spiritual experience.",
    rating: 5,
  },
  {
    name: "Sunita Agarwal",
    location: "Jaipur",
    quote:
      "Ordered the Desi Ghee for my mother's health. She noticed improvement in digestion within weeks. Quality you can trust!",
    rating: 5,
  },
];

export default function Home() {
  useScrollReveal();

  useEffect(() => {
    document.title = "Divya Dhenu — Purity You Can Trust";
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="hero-section" data-ocid="home.section">
        <div className="hero-overlay" />
        <img
          src="/assets/generated/hero-bg.dim_1600x900.jpg"
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
          aria-hidden="true"
        />
        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 1.5rem",
            width: "100%",
          }}
        >
          <div style={{ maxWidth: 560 }}>
            <div
              style={{
                display: "inline-block",
                background: "rgba(199,162,75,0.12)",
                border: "1px solid var(--gold)",
                borderRadius: 4,
                padding: "0.35rem 1rem",
                fontSize: "0.78rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--gold-dark)",
                fontWeight: 700,
                marginBottom: 24,
              }}
            >
              🌸 Sacred & Pure
            </div>
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2.4rem, 6vw, 4rem)",
                fontWeight: 800,
                color: "var(--brown-dark)",
                lineHeight: 1.18,
                marginBottom: 20,
              }}
            >
              Purity You Can Trust
            </h1>
            <p
              style={{
                fontSize: "1.1rem",
                color: "var(--brown-light)",
                lineHeight: 1.7,
                marginBottom: 32,
                maxWidth: 460,
              }}
            >
              Bringing Tradition to Your Home — authentic Desi Ghee and natural
              Agarbatti crafted with love and Vedic wisdom.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <Link
                to="/products"
                className="btn-gold"
                data-ocid="home.primary_button"
              >
                Shop Now
              </Link>
              <Link
                to="/about"
                className="btn-gold-outline"
                data-ocid="home.secondary_button"
              >
                Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-pad pattern-bg" data-ocid="home.section">
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>
          <div className="reveal">
            <p
              style={{
                textAlign: "center",
                color: "var(--gold)",
                fontWeight: 700,
                fontSize: "0.82rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Our Products
            </p>
            <h2 className="section-title">Featured Collection</h2>
            <div className="gold-divider" />
            <p className="section-subtitle">
              Handpicked with care — pure, traditional, and divine
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "2rem",
              maxWidth: 760,
              margin: "0 auto",
            }}
          >
            {products.map((p, i) => (
              <div key={p.id} className={`reveal reveal-delay-${i + 1}`}>
                <ProductCard {...p} index={i + 1} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section
        className="section-pad"
        style={{ backgroundColor: "var(--ivory)" }}
        data-ocid="home.section"
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>
          <div className="reveal">
            <p
              style={{
                textAlign: "center",
                color: "var(--gold)",
                fontWeight: 700,
                fontSize: "0.82rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Why Divya Dhenu
            </p>
            <h2 className="section-title">The Divya Difference</h2>
            <div className="gold-divider" />
            <p className="section-subtitle">
              Every product we make carries centuries of wisdom
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {features.map((f, i) => (
              <div
                key={f.title}
                className={`feature-tile reveal reveal-delay-${i + 1}`}
              >
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, rgba(199,162,75,0.15), rgba(199,162,75,0.08))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--gold)",
                    marginBottom: 16,
                    border: "1.5px solid rgba(199,162,75,0.3)",
                  }}
                >
                  {f.icon}
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
                  {f.title}
                </h3>
                <p
                  style={{
                    color: "var(--brown-light)",
                    fontSize: "0.88rem",
                    lineHeight: 1.6,
                  }}
                >
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section
        className="section-pad"
        style={{ backgroundColor: "var(--cream)", textAlign: "center" }}
        data-ocid="home.section"
      >
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 1.5rem" }}>
          <div className="reveal">
            <p
              style={{
                color: "var(--gold)",
                fontWeight: 700,
                fontSize: "0.82rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Our Story
            </p>
            <h2 className="section-title">Rooted in Tradition</h2>
            <div className="gold-divider" />
            <p
              style={{
                color: "var(--brown-mid)",
                fontSize: "1.05rem",
                lineHeight: 1.85,
                marginBottom: 28,
              }}
            >
              Divya Dhenu was born from a simple belief — that the sacred cow is
              a source of life, health, and divinity. We partner with small
              Gau-shalas across India to bring you products made with devotion:
              golden A2 Ghee churned using the ancient bilona method, and
              Agarbatti crafted from pure herbs that have scented Indian temples
              for thousands of years.
            </p>
            <Link
              to="/about"
              className="btn-gold-outline"
              data-ocid="home.secondary_button"
            >
              Read Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        className="section-pad"
        style={{ backgroundColor: "var(--ivory)" }}
        data-ocid="home.section"
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>
          <div className="reveal">
            <p
              style={{
                textAlign: "center",
                color: "var(--gold)",
                fontWeight: 700,
                fontSize: "0.82rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Testimonials
            </p>
            <h2 className="section-title">Loved by Families</h2>
            <div className="gold-divider" />
            <p className="section-subtitle">
              Real stories from real people who chose purity
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className={`testimonial-card reveal reveal-delay-${i + 1}`}
                data-ocid={`home.item.${i + 1}`}
              >
                <div
                  style={{
                    marginBottom: 12,
                    color: "var(--gold)",
                    fontSize: "1.2rem",
                    letterSpacing: 2,
                  }}
                >
                  {"★".repeat(t.rating)}
                </div>
                <p
                  style={{
                    color: "var(--brown-mid)",
                    fontStyle: "italic",
                    lineHeight: 1.75,
                    marginBottom: 20,
                    fontSize: "0.95rem",
                  }}
                >
                  "{t.quote}"
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background:
                        "linear-gradient(135deg, var(--gold-light), var(--gold))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: "1rem",
                      fontFamily: "'Playfair Display', serif",
                    }}
                  >
                    {t.name[0]}
                  </div>
                  <div>
                    <p
                      style={{
                        fontWeight: 700,
                        color: "var(--brown-dark)",
                        fontSize: "0.9rem",
                      }}
                    >
                      {t.name}
                    </p>
                    <p
                      style={{
                        color: "var(--brown-light)",
                        fontSize: "0.8rem",
                      }}
                    >
                      {t.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="cta-section section-pad"
        style={{ textAlign: "center" }}
        data-ocid="home.section"
      >
        <div
          style={{ maxWidth: 600, margin: "0 auto", padding: "0 1.5rem" }}
          className="reveal"
        >
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 800,
              color: "#fff",
              marginBottom: 16,
            }}
          >
            Bring Home Purity Today
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.85)",
              fontSize: "1.05rem",
              marginBottom: 32,
            }}
          >
            Join thousands of Indian families who trust Divya Dhenu
          </p>
          <Link
            to="/products"
            className="btn-gold"
            style={{
              background: "#fff",
              color: "var(--gold-dark)",
              border: "2px solid #fff",
            }}
            data-ocid="home.primary_button"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
}

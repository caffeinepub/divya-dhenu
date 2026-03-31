import { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useScrollReveal } from "../hooks/useScrollReveal";

const products = [
  {
    id: "desi-ghee",
    name: "Pure Desi Ghee",
    shortDesc: "100% Pure A2 Cow Ghee made using traditional bilona method",
    description:
      "100% Pure A2 Cow Ghee made using traditional bilona method. Rich in nutrients, enhances digestion, and brings the authentic taste of India to your kitchen. Our ghee is hand-churned from cultured butter of Desi Gir cow milk, preserving all natural vitamins and healing properties.",
    price: "₹499",
    image: "/assets/generated/desi-ghee.dim_600x600.jpg",
    badge: "Best Seller",
    highlights: [
      "A2 Milk Only",
      "Hand-Churned (Bilona)",
      "No Additives",
      "Lab Tested",
    ],
  },
  {
    id: "agarbatti",
    name: "Natural Agarbatti",
    shortDesc: "Natural incense sticks crafted from pure herbs and resins",
    description:
      "Natural incense sticks crafted from pure herbs and resins for spiritual and daily rituals. No synthetic fragrances, just pure fragrance from nature. Each stick is hand-rolled by skilled artisans using age-old recipes passed down through generations of temple priests.",
    price: "₹199",
    image: "/assets/generated/agarbatti.dim_600x600.jpg",
    badge: "Popular",
    highlights: ["100% Natural", "Hand-Rolled", "No Charcoal", "Long Lasting"],
  },
];

export default function Products() {
  useScrollReveal();

  useEffect(() => {
    document.title = "Products — Divya Dhenu";
  }, []);

  return (
    <div style={{ backgroundColor: "var(--ivory)", minHeight: "100vh" }}>
      {/* Page Banner */}
      <div
        style={{
          background:
            "linear-gradient(135deg, var(--brown-dark) 0%, #5C3D1E 100%)",
          padding: "5rem 1.5rem 4rem",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
        data-ocid="products.section"
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 30% 50%, rgba(199,162,75,0.18) 0%, transparent 60%), radial-gradient(circle at 70% 50%, rgba(199,162,75,0.12) 0%, transparent 60%)",
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
            Our Collection
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
            Pure & Sacred Products
          </h1>
          <div
            style={{
              width: 60,
              height: 3,
              background:
                "linear-gradient(90deg, var(--gold-light), var(--gold), var(--gold-light))",
              margin: "0 auto 16px",
              borderRadius: 2,
            }}
          />
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1rem" }}>
            Crafted with devotion, delivered with love
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "4rem 1.5rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "2.5rem",
          }}
        >
          {products.map((p, i) => (
            <div
              key={p.id}
              className={`reveal reveal-delay-${i + 1}`}
              data-ocid={`products.item.${i + 1}`}
            >
              {/* Badge */}
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    top: 16,
                    left: 16,
                    zIndex: 2,
                    background: "var(--gold)",
                    color: "#fff",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    padding: "0.3rem 0.8rem",
                    borderRadius: 4,
                  }}
                >
                  {p.badge}
                </div>
                <ProductCard
                  id={p.id}
                  name={p.name}
                  description={p.description}
                  price={p.price}
                  image={p.image}
                  index={i + 1}
                />
              </div>
              {/* Highlights */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                  marginTop: 12,
                  paddingLeft: 4,
                }}
              >
                {p.highlights.map((h) => (
                  <span
                    key={h}
                    style={{
                      background: "rgba(199,162,75,0.12)",
                      border: "1px solid rgba(199,162,75,0.3)",
                      color: "var(--gold-dark)",
                      fontSize: "0.75rem",
                      padding: "0.25rem 0.75rem",
                      borderRadius: 20,
                      fontWeight: 600,
                    }}
                  >
                    ✓ {h}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { useNavigate } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "../context/CartContext";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  index?: number;
}

export default function ProductCard({
  id,
  name,
  description,
  price,
  image,
  index = 1,
}: ProductCardProps) {
  const navigate = useNavigate();
  const { incrementCart } = useCart();
  const { actor } = useActor();
  const { identity } = useInternetIdentity();

  const handleAddToCart = async () => {
    if (!identity || identity.getPrincipal().isAnonymous()) {
      await navigate({ to: "/login" });
      return;
    }
    try {
      await actor?.manageCart({ __kind__: "add", add: id });
      incrementCart();
      toast.success(`${name} added to cart!`);
    } catch {
      toast.error("Failed to add to cart. Please try again.");
    }
  };

  const handleImgMouseEnter = (e: React.MouseEvent<HTMLImageElement>) => {
    e.currentTarget.style.transform = "scale(1.06)";
  };

  const handleImgMouseLeave = (e: React.MouseEvent<HTMLImageElement>) => {
    e.currentTarget.style.transform = "scale(1)";
  };

  return (
    <div className="product-card" data-ocid={`products.item.${index}`}>
      <div style={{ overflow: "hidden", height: 240 }}>
        <img
          src={image}
          alt={name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.4s ease",
          }}
          onMouseEnter={handleImgMouseEnter}
          onMouseLeave={handleImgMouseLeave}
        />
      </div>
      <div style={{ padding: "1.5rem" }}>
        <h3
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.25rem",
            fontWeight: 700,
            color: "var(--brown-dark)",
            marginBottom: 8,
          }}
        >
          {name}
        </h3>
        <p
          style={{
            color: "var(--brown-light)",
            fontSize: "0.9rem",
            lineHeight: 1.6,
            marginBottom: 16,
          }}
        >
          {description}
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span className="price-tag">{price}</span>
          <button
            type="button"
            className="btn-gold"
            onClick={handleAddToCart}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "0.6rem 1.4rem",
            }}
            data-ocid={`products.item.${index}`}
          >
            <ShoppingCart size={15} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

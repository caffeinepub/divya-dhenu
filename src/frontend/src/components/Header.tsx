import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";

const navLinks = [
  { to: "/" as const, label: "Home" },
  { to: "/products" as const, label: "Products" },
  { to: "/about" as const, label: "About" },
  { to: "/contact" as const, label: "Contact" },
  { to: "/login" as const, label: "Login" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <header className="sticky-header" data-ocid="header.panel">
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 72,
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            textDecoration: "none",
          }}
          data-ocid="header.link"
        >
          <img
            src="/assets/whatsapp_image_2026-03-31_at_2.33.22_pm-019d4380-296b-750f-b207-3de04050b4dd.jpeg"
            alt="Divya Dhenu Logo"
            style={{
              width: 46,
              height: 46,
              objectFit: "contain",
              borderRadius: "50%",
              border: "2px solid var(--gold)",
            }}
          />
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.3rem",
              fontWeight: 700,
              color: "var(--brown-dark)",
              letterSpacing: "0.02em",
            }}
          >
            Divya Dhenu
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex"
          style={{ gap: "2rem", alignItems: "center" }}
        >
          {navLinks.map((link) => {
            const isActive =
              link.to === "/"
                ? currentPath === "/"
                : currentPath.startsWith(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link${isActive ? " active" : ""}`}
                data-ocid="header.link"
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Cart + Hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Link
            to="/login"
            style={{
              position: "relative",
              color: "var(--brown-mid)",
              display: "flex",
              alignItems: "center",
            }}
            data-ocid="header.link"
          >
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="cart-badge" data-ocid="header.panel">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            type="button"
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none",
              border: "none",
              color: "var(--brown-mid)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
            aria-label="Toggle menu"
            data-ocid="header.toggle"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`mobile-menu md:hidden ${menuOpen ? "open" : ""}`}
        data-ocid="header.panel"
      >
        <div
          style={{
            padding: "1rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {navLinks.map((link) => {
            const isActive =
              link.to === "/"
                ? currentPath === "/"
                : currentPath.startsWith(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link${isActive ? " active" : ""}`}
                onClick={() => setMenuOpen(false)}
                data-ocid="header.link"
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}

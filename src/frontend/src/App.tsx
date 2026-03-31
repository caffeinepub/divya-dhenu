import { Toaster } from "@/components/ui/sonner";
import {
  Link,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  useRouterState,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";
import AnnouncementBar from "./components/AnnouncementBar";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { CartProvider } from "./context/CartContext";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Products from "./pages/Products";

function PageLoader() {
  return (
    <div className="page-loader">
      <img
        src="/assets/whatsapp_image_2026-03-31_at_2.33.22_pm-019d4368-ccbb-73cb-9a80-5c3f105026ac.jpeg"
        alt="Divya Dhenu"
        style={{
          width: 80,
          height: 80,
          objectFit: "contain",
          borderRadius: "50%",
          marginBottom: 20,
          border: "3px solid var(--gold)",
        }}
      />
      <div className="loader-ring" />
      <p
        style={{
          marginTop: 16,
          fontFamily: "'Playfair Display', serif",
          color: "var(--brown-dark)",
          fontSize: "1.1rem",
        }}
      >
        Divya Dhenu
      </p>
    </div>
  );
}

function LayoutWrapper() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "var(--ivory)",
      }}
    >
      <AnnouncementBar />
      <Header />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

const rootRoute = createRootRoute({ component: LayoutWrapper });
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});
const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/products",
  component: Products,
});
const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});
const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: Contact,
});
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Login,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  productsRoute,
  aboutRoute,
  contactRoute,
  loginRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Re-export Link and useRouterState for use in other components
export { Link, useRouterState };

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1300);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <PageLoader />;

  return (
    <CartProvider>
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </CartProvider>
  );
}

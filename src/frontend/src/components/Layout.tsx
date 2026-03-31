import { Outlet } from "@tanstack/react-router";
import AnnouncementBar from "./AnnouncementBar";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout() {
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

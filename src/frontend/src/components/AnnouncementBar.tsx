export default function AnnouncementBar() {
  const text =
    "✨ Pure Desi Ghee  •  🌿 Natural Agarbatti  •  🚚 Free Delivery Across India  •  🐄 100% A2 Cow Products  •  🌸 Chemical-Free & Authentic  •  ";

  return (
    <div className="announcement-bar" data-ocid="announcement.panel">
      <div className="marquee-track">
        <span>{text.repeat(4)}</span>
      </div>
    </div>
  );
}

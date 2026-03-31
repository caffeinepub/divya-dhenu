import {
  ChevronDown,
  ChevronUp,
  Loader2,
  MapPin,
  Navigation,
  Search,
  Store,
  Truck,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

// ============================================================
// WAREHOUSE CONFIGURATION — change these to your warehouse coords
// ============================================================
const WAREHOUSE = {
  lat: 28.6139, // New Delhi latitude
  lng: 77.209, // New Delhi longitude
  name: "New Delhi Warehouse",
};
// ============================================================

// Preset store branch locations
const STORE_BRANCHES: {
  label: string;
  area: string;
  pincode: string;
  lat: number;
  lng: number;
}[] = [
  {
    label: "Divya Dhenu Main Branch",
    area: "Connaught Place, New Delhi",
    pincode: "110001",
    lat: 28.6315,
    lng: 77.2167,
  },
  {
    label: "Divya Dhenu Noida Store",
    area: "Sector 18, Noida",
    pincode: "201301",
    lat: 28.57,
    lng: 77.3219,
  },
  {
    label: "Divya Dhenu Gurgaon Store",
    area: "DLF Phase 1, Gurgaon",
    pincode: "122002",
    lat: 28.4744,
    lng: 77.0946,
  },
];

interface LocationResult {
  name: string;
  lat: number;
  lng: number;
}

interface DeliveryInfo {
  location: LocationResult;
  distanceKm: number;
  status: "free" | "standard" | "unavailable";
  estimatedDays: string;
  charge: string;
}

/** Haversine formula — returns distance in km */
function haversineKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function getDeliveryInfo(location: LocationResult): DeliveryInfo {
  const distanceKm = haversineKm(
    location.lat,
    location.lng,
    WAREHOUSE.lat,
    WAREHOUSE.lng,
  );
  let status: DeliveryInfo["status"];
  let estimatedDays: string;
  let charge: string;

  if (distanceKm < 10) {
    status = "free";
    estimatedDays = "Same day – 1 day";
    charge = "Free";
  } else if (distanceKm <= 50) {
    status = "standard";
    estimatedDays = "2 – 3 days";
    charge = "₹49";
  } else {
    status = "unavailable";
    estimatedDays = "3 – 7 days (may vary)";
    charge = "₹99+";
  }
  return { location, distanceKm, status, estimatedDays, charge };
}

async function reverseGeocode(lat: number, lng: number): Promise<string> {
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`;
  const res = await fetch(url, { headers: { "Accept-Language": "en" } });
  const data = await res.json();
  const addr = data.address;
  return (
    addr.suburb ||
    addr.city_district ||
    addr.neighbourhood ||
    addr.town ||
    addr.city ||
    addr.county ||
    "Your Location"
  );
}

async function searchLocations(query: string): Promise<LocationResult[]> {
  if (!query.trim()) return [];
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5&countrycodes=in`;
  const res = await fetch(url, { headers: { "Accept-Language": "en" } });
  const data = await res.json();
  return data.map(
    (item: { display_name: string; lat: string; lon: string }) => ({
      name: item.display_name.split(",").slice(0, 3).join(", "),
      lat: Number.parseFloat(item.lat),
      lng: Number.parseFloat(item.lon),
    }),
  );
}

const LS_KEY = "divyadhenu_delivery_location";

export default function DeliveryBar() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [delivery, setDelivery] = useState<DeliveryInfo | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<LocationResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [locTab, setLocTab] = useState<"stores" | "cities">("stores");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(LS_KEY);
    if (saved) {
      try {
        const loc: LocationResult = JSON.parse(saved);
        setDelivery(getDeliveryInfo(loc));
      } catch {
        /* ignore */
      }
    }
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setSuggestions([]);
        setSearchQuery("");
      }
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const handleAutoDetect = useCallback(async () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }
    setLoading(true);
    setError("");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const name = await reverseGeocode(latitude, longitude);
          const loc: LocationResult = { name, lat: latitude, lng: longitude };
          localStorage.setItem(LS_KEY, JSON.stringify(loc));
          setDelivery(getDeliveryInfo(loc));
          setOpen(false);
        } catch {
          setError("Could not fetch location name. Please try again.");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError(
          "Location access denied. Please allow location or enter manually.",
        );
        setLoading(false);
      },
    );
  }, []);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    if (!value.trim()) {
      setSuggestions([]);
      return;
    }
    setSearching(true);
    searchTimeout.current = setTimeout(async () => {
      const results = await searchLocations(value);
      setSuggestions(results);
      setSearching(false);
    }, 400);
  };

  const selectLocation = (loc: LocationResult) => {
    localStorage.setItem(LS_KEY, JSON.stringify(loc));
    setDelivery(getDeliveryInfo(loc));
    setOpen(false);
    setSuggestions([]);
    setSearchQuery("");
  };

  const statusConfig = {
    free: {
      color: "#15803d",
      bg: "#f0fdf4",
      border: "#bbf7d0",
      label: "Free Delivery Available",
      icon: "🎉",
    },
    standard: {
      color: "#b45309",
      bg: "#fffbeb",
      border: "#fde68a",
      label: "Standard Delivery Charges Apply",
      icon: "🚚",
    },
    unavailable: {
      color: "#b91c1c",
      bg: "#fef2f2",
      border: "#fecaca",
      label: "Delivery may take longer",
      icon: "⚠️",
    },
  };

  const tabBtn = (active: boolean): React.CSSProperties => ({
    flex: 1,
    padding: "0.48rem 0.5rem",
    border: "none",
    borderRadius: 999,
    background: active
      ? "linear-gradient(135deg,#c7a24b,#e8c96e,#b8892a)"
      : "#fff",
    color: active ? "#fff" : "#8b6914",
    fontFamily: "'Lato', sans-serif",
    fontWeight: 700,
    fontSize: "0.76rem",
    letterSpacing: "0.05em",
    cursor: "pointer",
    transition: "all 0.2s",
    boxShadow: active ? "0 2px 8px rgba(199,162,75,0.25)" : "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  });

  // Short label for the button when a location is selected
  const locationLabel = delivery
    ? delivery.location.name.split(",")[0]
    : "Select Your Location";

  return (
    <div
      ref={wrapperRef}
      style={{
        position: "sticky",
        top: 72,
        zIndex: 99,
        backgroundColor: "#fff8e7",
        borderBottom: "2.5px solid #c7a24b",
        boxShadow: "0 3px 14px rgba(199,162,75,0.22)",
      }}
    >
      {/* Bar */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 1.5rem",
          height: 52,
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        {/* Gold gradient CTA button */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            background: "linear-gradient(135deg, #c7a24b, #e8c96e, #b8892a)",
            border: "none",
            borderRadius: 24,
            padding: "0.45rem 1.2rem 0.45rem 0.9rem",
            color: "#fff",
            fontWeight: 700,
            fontSize: "0.84rem",
            fontFamily: "'Lato', sans-serif",
            letterSpacing: "0.03em",
            cursor: "pointer",
            boxShadow: "0 2px 10px rgba(199,162,75,0.4)",
            transition: "transform 0.15s, box-shadow 0.15s",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow =
              "0 4px 16px rgba(199,162,75,0.55)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 2px 10px rgba(199,162,75,0.4)";
          }}
          aria-label="Select delivery location"
          data-ocid="delivery.button"
        >
          <MapPin size={15} style={{ color: "#fff", flexShrink: 0 }} />
          <span
            style={{
              maxWidth: 160,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {locationLabel}
          </span>
          {open ? (
            <ChevronUp size={14} style={{ color: "#fff" }} />
          ) : (
            <ChevronDown size={14} style={{ color: "#fff" }} />
          )}
        </button>

        {/* Helper text or status badge */}
        {!delivery ? (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: "0.8rem",
              color: "#8b6914",
              fontFamily: "'Lato', sans-serif",
            }}
          >
            <Truck size={14} style={{ color: "#c7a24b", flexShrink: 0 }} />
            Choose your location to check delivery
          </span>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                color: statusConfig[delivery.status].color,
                background: statusConfig[delivery.status].bg,
                border: `1px solid ${statusConfig[delivery.status].border}`,
                borderRadius: 20,
                padding: "2px 10px",
                whiteSpace: "nowrap",
              }}
            >
              {statusConfig[delivery.status].icon}{" "}
              {statusConfig[delivery.status].label}
            </span>
            <button
              type="button"
              onClick={() => setOpen(true)}
              style={{
                fontSize: "0.72rem",
                color: "#b8892a",
                fontWeight: 700,
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                textDecoration: "underline",
                whiteSpace: "nowrap",
              }}
              data-ocid="delivery.secondary_button"
            >
              Change
            </button>
          </div>
        )}
      </div>

      {/* Dropdown */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            zIndex: 200,
            background: "#fff",
            borderRadius: 14,
            boxShadow: "0 8px 32px rgba(60,40,20,0.18)",
            border: "1px solid #e8dfc9",
            width: "min(420px, 96vw)",
            margin: "0 1.5rem",
            padding: "1.25rem",
            animation: "dd-fade 0.18s ease",
          }}
          data-ocid="delivery.panel"
        >
          <style>
            {
              "@keyframes dd-fade{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}"
            }
          </style>

          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "1rem",
            }}
          >
            <p
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: "1rem",
                color: "#3d2c0e",
                margin: 0,
              }}
            >
              Check Delivery Availability
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#8b6914",
              }}
              aria-label="Close"
              data-ocid="delivery.close_button"
            >
              <X size={16} />
            </button>
          </div>

          {/* Auto-detect */}
          <button
            type="button"
            onClick={handleAutoDetect}
            disabled={loading}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "0.65rem 1rem",
              border: "1.5px solid #e8dfc9",
              borderRadius: 10,
              background: "#fff",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "0.88rem",
              fontWeight: 600,
              color: "#3d2c0e",
              marginBottom: "0.85rem",
              transition: "border-color 0.2s, background 0.2s",
              opacity: loading ? 0.7 : 1,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#c7a24b";
              e.currentTarget.style.background = "rgba(199,162,75,0.04)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#e8dfc9";
              e.currentTarget.style.background = "#fff";
            }}
            data-ocid="delivery.primary_button"
          >
            {loading ? (
              <Loader2
                size={16}
                style={{
                  color: "#c7a24b",
                  animation: "spin 0.9s linear infinite",
                }}
              />
            ) : (
              <Navigation size={16} style={{ color: "#c7a24b" }} />
            )}
            {loading ? "Detecting your location..." : "Use my current location"}
          </button>

          {/* Store Areas / Indian Cities tab pills */}
          <div
            style={{
              display: "flex",
              background: "#faf7f0",
              borderRadius: 999,
              padding: 4,
              gap: 4,
              marginBottom: "0.85rem",
            }}
          >
            <button
              type="button"
              style={tabBtn(locTab === "stores")}
              onClick={() => setLocTab("stores")}
              data-ocid="delivery.tab"
            >
              <Store size={13} /> Store Areas
            </button>
            <button
              type="button"
              style={tabBtn(locTab === "cities")}
              onClick={() => setLocTab("cities")}
              data-ocid="delivery.tab"
            >
              <MapPin size={13} /> Indian Cities
            </button>
          </div>

          {/* Store branches */}
          {locTab === "stores" && (
            <div
              style={{
                border: "1px solid #e8dfc9",
                borderRadius: 10,
                overflow: "hidden",
                marginBottom: "0.5rem",
              }}
            >
              {STORE_BRANCHES.map((branch, i) => (
                <button
                  key={branch.label}
                  type="button"
                  onClick={() =>
                    selectLocation({
                      name: `${branch.label}, ${branch.area}`,
                      lat: branch.lat,
                      lng: branch.lng,
                    })
                  }
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "0.7rem 1rem",
                    background: "#fff",
                    border: "none",
                    borderBottom:
                      i < STORE_BRANCHES.length - 1
                        ? "1px solid #e8dfc9"
                        : "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10,
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(199,162,75,0.07)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#fff";
                  }}
                  data-ocid={`delivery.item.${i + 1}`}
                >
                  <Store
                    size={15}
                    style={{ color: "#c7a24b", flexShrink: 0, marginTop: 2 }}
                  />
                  <div>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "0.86rem",
                        fontWeight: 700,
                        color: "#3d2c0e",
                      }}
                    >
                      {branch.label}
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "0.76rem",
                        color: "#8b6914",
                      }}
                    >
                      {branch.area} · {branch.pincode}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* City search */}
          {locTab === "cities" && (
            <>
              <div
                style={{
                  position: "relative",
                  marginBottom: suggestions.length ? 0 : "0.5rem",
                }}
              >
                <Search
                  size={15}
                  style={{
                    position: "absolute",
                    left: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#8b6914",
                    pointerEvents: "none",
                  }}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Search city or area..."
                  style={{
                    width: "100%",
                    padding: "0.65rem 1rem 0.65rem 2.25rem",
                    border: "1.5px solid #e8dfc9",
                    borderRadius: 10,
                    background: "#fff",
                    fontSize: "0.88rem",
                    color: "#3d2c0e",
                    outline: "none",
                    fontFamily: "'Lato', sans-serif",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "#c7a24b";
                    e.currentTarget.style.boxShadow =
                      "0 0 0 3px rgba(199,162,75,0.15)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "#e8dfc9";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                  data-ocid="delivery.search_input"
                />
                {searching && (
                  <Loader2
                    size={14}
                    style={{
                      position: "absolute",
                      right: 12,
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#c7a24b",
                      animation: "spin 0.9s linear infinite",
                    }}
                  />
                )}
              </div>

              {suggestions.length > 0 && (
                <div
                  style={{
                    marginTop: 4,
                    border: "1px solid #e8dfc9",
                    borderRadius: 10,
                    overflow: "hidden",
                  }}
                >
                  {suggestions.map((s, i) => (
                    <button
                      key={s.name + s.lat}
                      type="button"
                      onClick={() => selectLocation(s)}
                      style={{
                        width: "100%",
                        textAlign: "left",
                        padding: "0.6rem 1rem",
                        background: "#fff",
                        border: "none",
                        borderBottom:
                          i < suggestions.length - 1
                            ? "1px solid #e8dfc9"
                            : "none",
                        cursor: "pointer",
                        fontSize: "0.84rem",
                        color: "#5a3e18",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "rgba(199,162,75,0.07)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "#fff";
                      }}
                    >
                      <MapPin
                        size={13}
                        style={{ color: "#c7a24b", flexShrink: 0 }}
                      />
                      <span
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {s.name}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Error */}
          {error && (
            <p
              style={{
                marginTop: "0.75rem",
                fontSize: "0.8rem",
                color: "#b91c1c",
                background: "#fef2f2",
                border: "1px solid #fecaca",
                borderRadius: 8,
                padding: "0.5rem 0.75rem",
              }}
              data-ocid="delivery.error_state"
            >
              ⚠️ {error}
            </p>
          )}

          {/* Result card */}
          {delivery && (
            <div
              style={{
                marginTop: "1rem",
                background:
                  "linear-gradient(135deg, rgba(199,162,75,0.08), rgba(199,162,75,0.03))",
                border: "1px solid rgba(199,162,75,0.3)",
                borderRadius: 12,
                padding: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  marginBottom: "0.6rem",
                }}
              >
                <Truck
                  size={18}
                  style={{ color: "#c7a24b", flexShrink: 0, marginTop: 2 }}
                />
                <div>
                  <p
                    style={{
                      fontSize: "0.8rem",
                      color: "#8b6914",
                      margin: 0,
                      marginBottom: 2,
                    }}
                  >
                    Delivering to
                  </p>
                  <p
                    style={{
                      fontSize: "0.92rem",
                      fontWeight: 700,
                      color: "#3d2c0e",
                      margin: 0,
                    }}
                  >
                    {delivery.location.name}
                  </p>
                </div>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: 8,
                }}
              >
                {[
                  {
                    label: "Distance",
                    value: `${delivery.distanceKm.toFixed(1)} km`,
                  },
                  { label: "Est. Delivery", value: delivery.estimatedDays },
                  { label: "Charges", value: delivery.charge },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      background: "#fff",
                      borderRadius: 8,
                      padding: "0.5rem 0.6rem",
                      border: "1px solid #e8dfc9",
                      textAlign: "center",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "0.68rem",
                        color: "#8b6914",
                        margin: 0,
                        marginBottom: 2,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        fontWeight: 600,
                      }}
                    >
                      {item.label}
                    </p>
                    <p
                      style={{
                        fontSize: "0.82rem",
                        fontWeight: 700,
                        color: "#3d2c0e",
                        margin: 0,
                      }}
                    >
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
              <div
                style={{
                  marginTop: "0.75rem",
                  padding: "0.5rem 0.75rem",
                  background: statusConfig[delivery.status].bg,
                  border: `1px solid ${statusConfig[delivery.status].border}`,
                  borderRadius: 8,
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  color: statusConfig[delivery.status].color,
                  textAlign: "center",
                }}
              >
                {statusConfig[delivery.status].icon}{" "}
                {statusConfig[delivery.status].label}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

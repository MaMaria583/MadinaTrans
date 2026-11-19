import { ImageResponse } from "next/og";

export const alt = "Madina Trans — Nous connectons les routes, les marchés et les opportunités";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Image de partage Open Graph générée au build (aucune ressource externe). */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #0a1322 0%, #101d32 60%, #233b59 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <svg width="96" height="96" viewBox="0 0 48 48">
            <path d="M3 42C10 24 23 10 45 6v7C28 16 17 28 12 42H3Z" fill="#C6A66A" />
            <path d="M16 42c5-11 14-19 29-22v7c-11 2-18 8-21 15h-8Z" fill="#FFFFFF" />
            <path d="M28 42c3-5 9-9 17-10v6c-4 1-7 2-9 4h-8Z" fill="#C6A66A" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 56, fontWeight: 800, letterSpacing: -1 }}>
              MADINA<span style={{ color: "#C6A66A", marginLeft: 16 }}>TRANS</span>
            </div>
            <div style={{ fontSize: 24, color: "#bac4d3", letterSpacing: 4 }}>TRANSPORT · TRANSIT · LOGISTIQUE</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.1, maxWidth: 950 }}>
            Nous connectons les routes, les marchés et les opportunités.
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#d8c08f" }}>
            Bamako, Mali · Ensemble, transportons vos ambitions
          </div>
        </div>
      </div>
    ),
    size,
  );
}

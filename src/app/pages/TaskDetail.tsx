import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Plus } from "lucide-react";
import { C, LONDRINA, DM_SANS, PageWrapper } from "../components/kitchen/Shared";

/* ─── Constants ──────────────────────────────────────────── */
const ORANGE      = "#E4886B";
const ORANGE_DARK = "#C96B4E";
const BG          = "#FEF9EF";

/* ─── Carousel Data ──────────────────────────────────────── */
const CARDS = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1771627278633-c08d9693489d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmlnaHQlMjBjbGVhbiUyMGtpdGNoZW4lMjBjb3VudGVydG9wJTIwd2FybSUyMGxpZ2h0fGVufDF8fHx8MTc3NzM4NDIxOXww&ixlib=rb-4.1.0&q=80&w=1080",
    step: "Step 1",
    title: "Clear & Wipe Surfaces",
    accent: "#E4886B",
    overlay: "rgba(228,136,107,0.55)",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1646209624081-a1e99efeaea1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwY2xlYW5pbmclMjB3aXBlJTIwc3BvbmdlJTIwc3VyZmFjZXxlbnwxfHx8fDE3NzczODQyMTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    step: "Step 2",
    title: "Scrub Stains & Grease",
    accent: "#5D89E0",
    overlay: "rgba(93,137,224,0.52)",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1768875845344-5663fa9acf15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbml6ZWQlMjBraXRjaGVuJTIwc2hlbHZlcyUyMHBhbnRyeSUyMGNvenl8ZW58MXx8fHwxNzc3Mzg0MjE5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    step: "Step 3",
    title: "Restore & Organize",
    accent: "#559A6E",
    overlay: "rgba(85,154,110,0.52)",
  },
];

/* ─── Bullet instructions ────────────────────────────────── */
const INSTRUCTIONS = [
  "Wipe all visible surfaces.",
  "Remove stains, crumbs, and oil marks.",
  "Put back items where they belong.",
  "Make sure the sink area is dry.",
];

/* ─── Tips data ──────────────────────────────────────────── */
const TIPS = [
  {
    id: 1,
    text: "Place the scrub sponge by the sink after use",
    time: "1 month ago",
    bg: "#FFFFFF",
    rotate: "-2deg",
    accent: ORANGE,
  },
  {
    id: 2,
    text: "Clean the corner grease once a week",
    time: "3 days ago",
    bg: "#FFF9E0",
    rotate: "1.5deg",
    accent: "#F5C24C",
  },
  {
    id: 3,
    text: "Check expiry dates on shared condiments",
    time: "5 days ago",
    bg: "#FFF0E8",
    rotate: "-1deg",
    accent: ORANGE,
  },
];

/* ─── Image Carousel ─────────────────────────────────────── */
function ImageCarousel() {
  const [current, setCurrent] = useState(0);
  const [startX, setStartX] = useState(0);
  const [dragging, setDragging] = useState(false);

  const goTo = (idx: number) => setCurrent(Math.max(0, Math.min(CARDS.length - 1, idx)));

  return (
    <div style={{ marginBottom: 28 }}>
      {/* Track */}
      <div style={{ overflow: "hidden", borderRadius: 22, margin: "0 24px" }}>
        <div
          style={{
            display: "flex",
            transform: `translateX(-${current * 100}%)`,
            transition: dragging ? "none" : "transform 0.38s cubic-bezier(0.32,0.72,0,1)",
            willChange: "transform",
          }}
          onTouchStart={e => { setStartX(e.touches[0].clientX); setDragging(true); }}
          onTouchMove={e => {
            // prevent accidental taps causing a jump; dragging flag is enough
          }}
          onTouchEnd={e => {
            const diff = startX - e.changedTouches[0].clientX;
            if (diff > 42) goTo(current + 1);
            else if (diff < -42) goTo(current - 1);
            setDragging(false);
          }}
        >
          {CARDS.map((card, i) => (
            <div key={card.id} style={{ flexShrink: 0, width: "100%", position: "relative", height: 200 }}>
              {/* Photo */}
              <img
                src={card.img}
                alt={card.title}
                style={{
                  width: "100%", height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              {/* Warm colour overlay */}
              <div style={{
                position: "absolute", inset: 0,
                background: `linear-gradient(160deg, ${card.overlay} 0%, rgba(0,0,0,0.18) 100%)`,
              }} />
              {/* Tangram geometric decoration */}
              <svg
                width="90" height="90" viewBox="0 0 90 90"
                style={{ position: "absolute", top: -8, right: -8, opacity: 0.18, pointerEvents: "none" }}
                aria-hidden
              >
                <polygon points="90,0 90,60 30,0" fill="white" />
                <rect x="48" y="10" width="24" height="24" fill="white" rx="3"
                  transform="rotate(18,60,22)" />
                <polygon points="35,55 60,55 47,36" fill="white" />
              </svg>
              {/* Step badge + title */}
              <div style={{ position: "absolute", bottom: 18, left: 18, right: 18 }}>
                <span style={{
                  display: "inline-block",
                  backgroundColor: "rgba(255,255,255,0.28)",
                  borderRadius: 22, padding: "3px 10px",
                  fontSize: 13, fontFamily: DM_SANS, fontWeight: 700,
                  color: "white", letterSpacing: "0.05em",
                  backdropFilter: "blur(4px)",
                  marginBottom: 6,
                }}>
                  {card.step}
                </span>
                <h3 style={{
                  margin: 0,
                  fontFamily: LONDRINA, fontSize: 22, color: "white",
                  lineHeight: 1.2,
                  textShadow: "0 1px 6px rgba(0,0,0,0.3)",
                }}>
                  {card.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 14 }}>
        {CARDS.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: i === current ? 22 : 8,
              height: 8, borderRadius: 99, border: "none",
              backgroundColor: i === current ? ORANGE : "#E0D9CE",
              cursor: "pointer", padding: 0,
              transition: "all 0.28s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Tip Card ───────────────────────────────────────────── */
function TipCard({ tip }: { tip: typeof TIPS[0] }) {
  return (
    <div style={{
      flexShrink: 0,
      width: 176,
      backgroundColor: tip.bg,
      borderRadius: 16,
      padding: "16px 14px 12px",
      transform: `rotate(${tip.rotate})`,
      boxShadow: "3px 3px 0px rgba(0,0,0,0.10)",
      border: "1px solid #EDE8DE",
      display: "flex", flexDirection: "column", gap: 10,
    }}>
      {/* Accent top line */}
      <div style={{ width: 30, height: 3, borderRadius: 99, backgroundColor: tip.accent }} />
      <p style={{
        margin: 0, flex: 1,
        fontFamily: DM_SANS, fontSize: 15, color: "#3A3A3A",
        lineHeight: 1.55, fontWeight: 400,
      }}>
        {tip.text}
      </p>
      <span style={{
        fontFamily: DM_SANS, fontSize: 12, color: "#A8A8A8", fontWeight: 500,
        letterSpacing: "0.03em",
      }}>
        {tip.time}
      </span>
    </div>
  );
}

/* ─── Add Tips Tactile Button ────────────────────────────── */
function AddTipsButton({ onClick }: { onClick: () => void }) {
  const [pressed, setPressed] = useState(false);
  return (
    <button
      style={{
        width: "100%", borderRadius: 16, border: "none",
        backgroundColor: ORANGE,
        padding: "15px 24px",
        fontFamily: DM_SANS, fontSize: 16, fontWeight: 700, color: "white",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        transform: pressed ? "translateY(4px)" : "translateY(0)",
        boxShadow: pressed ? "none" : `0 5px 0 0 ${ORANGE_DARK}, 0 8px 24px ${ORANGE}38`,
        transition: "transform 0.08s ease, box-shadow 0.08s ease",
        cursor: "pointer",
        userSelect: "none",
        WebkitTapHighlightColor: "transparent",
      }}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => { setPressed(false); onClick(); }}
      onPointerLeave={() => setPressed(false)}
      onPointerCancel={() => setPressed(false)}
    >
      <Plus size={18} color="white" strokeWidth={2.5} />
      Add Tips
    </button>
  );
}

/* ─── Task Detail Page ───────────────────────────────────── */
export default function TaskDetail() {
  const navigate = useNavigate();

  return (
    <PageWrapper bg="#FDF5F2">
      <div style={{ overflowY: "auto", flex: 1, paddingBottom: 48, scrollbarWidth: "none", position: "relative" } as React.CSSProperties}>

          {/* ── Header ── */}
          <div style={{
            position: "sticky", top: 0, zIndex: 50, backgroundColor: "#FDF5F2",
            display: "flex", alignItems: "center",
            padding: "52px 24px 24px", gap: 14,
          }}>
            <button
              onClick={() => navigate(-1)}
              style={{
                width: 42, height: 42, borderRadius: 10, flexShrink: 0,
                backgroundColor: "white", border: "none",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "3px 3px 0px rgba(0,0,0,0.10)",
                cursor: "pointer",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              {/* Solid back arrow — consistent with BackHeader */}
              <svg width="20" height="20" viewBox="0 0 20 20">
                <path d="M13 3.5L5.5 10L13 16.5L11 10Z" fill="#6C6C6C"/>
              </svg>
            </button>
            <div>
              <h1 style={{
                margin: 0, fontFamily: LONDRINA, fontSize: 24,
                color: "#3A3A3A", lineHeight: 1.15,
              }}>
                Task Details
              </h1>
              <p style={{
                margin: "3px 0 0", fontSize: 15,
                color: "#A8A8A8", fontFamily: DM_SANS, fontWeight: 500,
              }}>
                Clean the Countertop
              </p>
            </div>
          </div>

          {/* ── Image Carousel ── */}
          <ImageCarousel />

          {/* ── Instructions ── */}
          <div style={{ padding: "0 24px 28px" }}>
            <div style={{
              backgroundColor: "white",
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: 22,
              padding: "20px 20px 18px",
              boxShadow: "3px 3px 0px rgba(0,0,0,0.10)",
            }}>
              {/* Small decorative tangram */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
                  <polygon points="10,0 20,20 0,20" fill={ORANGE} opacity="0.9" />
                  <rect x="11" y="1" width="8" height="8" fill={C.blue} opacity="0.8" rx="1"
                    transform="rotate(15,15,5)" />
                </svg>
                <span style={{
                  fontFamily: DM_SANS, fontSize: 13, fontWeight: 700,
                  color: "#A8A8A8", letterSpacing: "0.08em", textTransform: "uppercase",
                }}>
                  How to Clean
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {INSTRUCTIONS.map((text, i) => (
                  <div key={i} style={{
                    display: "flex", gap: 14, alignItems: "flex-start",
                    padding: "11px 0",
                    borderBottom: i < INSTRUCTIONS.length - 1 ? "1px solid #F2ECE2" : "none",
                  }}>
                    {/* Bullet */}
                    <div style={{
                      width: 22, height: 22, borderRadius: "50%",
                      backgroundColor: `${ORANGE}18`,
                      border: "1px solid rgba(0,0,0,0.06)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0, marginTop: 1,
                    }}>
                      <span style={{ fontFamily: LONDRINA, fontSize: 14, color: ORANGE }}>{i + 1}</span>
                    </div>
                    <p style={{
                      margin: 0, flex: 1,
                      fontFamily: DM_SANS, fontSize: 16, color: "#3A3A3A",
                      lineHeight: 1.5, fontWeight: 400,
                    }}>
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Tips Section ── */}
          <div style={{ marginBottom: 28 }}>
            {/* Section label */}
            <div style={{ padding: "0 24px", marginBottom: 14 }}>
              <span style={{
                fontFamily: DM_SANS, fontSize: 13, fontWeight: 700,
                color: "#A8A8A8", letterSpacing: "0.08em", textTransform: "uppercase",
              }}>
                Tips
              </span>
            </div>

            {/* Horizontal scrollable sticky notes */}
            <div style={{
              display: "flex", gap: 14,
              overflowX: "auto", scrollbarWidth: "none",
              paddingLeft: 24, paddingRight: 24, paddingBottom: 10,
              alignItems: "flex-start",
            } as React.CSSProperties}>
              {TIPS.map(tip => (
                <TipCard key={tip.id} tip={tip} />
              ))}
              {/* "Add your tip" ghost card */}
              <div style={{
                flexShrink: 0, width: 120, height: 120,
                borderRadius: 16,
                border: "1px solid rgba(0,0,0,0.06)",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: 6,
                cursor: "pointer", opacity: 0.65,
                alignSelf: "center",
              }}>
                <Plus size={20} color={ORANGE} />
                <span style={{ fontFamily: DM_SANS, fontSize: 13, color: ORANGE, fontWeight: 600 }}>Add yours</span>
              </div>
            </div>
          </div>

          {/* ── Add Tips Button ── */}
          <div style={{ padding: "0 24px 8px" }}>
            <AddTipsButton onClick={() => {}} />
          </div>

      </div>
    </PageWrapper>
  );
}
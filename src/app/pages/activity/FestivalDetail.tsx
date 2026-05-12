import React from "react";
import { useParams, useNavigate } from "react-router";
import {
  C, LONDRINA, DM_SANS, PageWrapper, BackHeader, BottomNav, TactileButton, TangramDecoration,
} from "../../components/kitchen/Shared";
import { FESTIVALS, ACTIVITIES } from "./ActivityShared";

/* ─── Flat solid section icons ───────────────────────────── */
function BookIcon({ color, size = 18 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill={color}>
      {/* Left page */}
      <path d="M1.5 3C1.5 2.4 2 2 2.5 2H8.5V15H2.5C2 15 1.5 14.6 1.5 14V3Z" />
      {/* Right page */}
      <path d="M9.5 2H15.5C16 2 16.5 2.4 16.5 3V14C16.5 14.6 16 15 15.5 15H9.5V2Z" opacity="0.65" />
      {/* Spine */}
      <rect x="8.5" y="2" width="1" height="13" fill="white" opacity="0.45" />
      {/* Lines on left page */}
      <rect x="3" y="5" width="4.5" height="1" rx="0.5" fill="white" opacity="0.45" />
      <rect x="3" y="7.5" width="4.5" height="1" rx="0.5" fill="white" opacity="0.35" />
      <rect x="3" y="10" width="3" height="1" rx="0.5" fill="white" opacity="0.3" />
    </svg>
  );
}

function PeopleIcon({ color, size = 18 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill={color}>
      <circle cx="5.5" cy="5" r="3" />
      <path d="M0 15C0 11.5 2.5 9 5.5 9C8.5 9 11 11.5 11 15H0Z" />
      <circle cx="13" cy="6" r="2.3" opacity="0.7" />
      <path d="M9 15C9 12.5 10.5 10.5 13 10.5C15.5 10.5 18 12.5 18 15H9Z" opacity="0.7" />
    </svg>
  );
}

function HangerIcon({ color, size = 18 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill={color}>
      {/* Hook */}
      <path d="M9 2C8 2 7 2.8 7 4C7 4.8 7.5 5.4 8.2 5.7L2 11C1.3 11.6 1 12.5 1.5 13.3C2 14.1 2.8 14.5 3.5 14.5H14.5C15.2 14.5 16 14.1 16.5 13.3C17 12.5 16.7 11.6 16 11L9.8 5.7C10.5 5.4 11 4.8 11 4C11 2.8 10 2 9 2Z" />
      <circle cx="9" cy="4" r="1.5" fill="white" opacity="0.4" />
    </svg>
  );
}

function WarningIcon({ color, size = 18 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill={color}>
      <path d="M9 1L17.5 16H0.5L9 1Z" />
      <rect x="8.1" y="7" width="1.8" height="4.5" rx="0.9" fill="white" />
      <circle cx="9" cy="13.2" r="1.1" fill="white" />
    </svg>
  );
}

/* ─── Festival photo data ─────────────────────────────────── */
const FESTIVAL_PHOTOS: Record<number, { url: string; alt: string }> = {
  1: { url: "https://images.unsplash.com/photo-1663591800773-24ae939d2721?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900", alt: "Lucia Day candlelight procession" },
  2: { url: "https://images.unsplash.com/photo-1701193682618-a2e8113d09ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900", alt: "Winter Solstice candles" },
  3: { url: "https://images.unsplash.com/photo-1669223308086-bf5152ff0231?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900", alt: "Swedish Christmas Eve table" },
  4: { url: "https://images.unsplash.com/photo-1563303313-93627cc2a1aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900", alt: "New Year Eve fireworks" },
  5: { url: "https://images.unsplash.com/photo-1774280778863-93f822568391?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900", alt: "Chinese New Year lanterns" },
  6: { url: "https://images.unsplash.com/photo-1694735043383-a7c966667e9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900", alt: "Valentine roses bouquet" },
};

/* ─── Section definitions (with icon type instead of emoji) ─ */
type SectionKey = "background" | "participation" | "dresscode" | "taboos";
const SECTION_DEFS: { key: SectionKey; label: string }[] = [
  { key: "background",    label: "Background"        },
  { key: "participation", label: "Participation"     },
  { key: "dresscode",     label: "Dress Code"        },
  { key: "taboos",        label: "Taboos & Etiquette" },
];

function SectionIcon({ sectionKey, color, size }: { sectionKey: SectionKey; color: string; size: number }) {
  if (sectionKey === "background")    return <BookIcon    color={color} size={size} />;
  if (sectionKey === "participation") return <PeopleIcon  color={color} size={size} />;
  if (sectionKey === "dresscode")     return <HangerIcon  color={color} size={size} />;
  return <WarningIcon color={color} size={size} />;
}

/* ─── Festival Detail Page ───────────────────────────────── */
export default function FestivalDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const festival = FESTIVALS.find(f => f.id === Number(id)) ?? FESTIVALS[0];
  const photo    = FESTIVAL_PHOTOS[festival.id];
  const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const dateStr = `${MONTHS[festival.month - 1]} ${festival.day}`;

  const linkedActivity = ACTIVITIES.find(a =>
    festival.name.toLowerCase().includes("lucia") ? a.title.includes("Music") :
    festival.name.toLowerCase().includes("yoga")  ? a.title.includes("Yoga") : false
  );

  const sectionContent: Record<SectionKey, string> = {
    background:    festival.background,
    participation: festival.participation,
    dresscode:     festival.dresscode,
    taboos:        festival.taboos,
  };

  return (
    <PageWrapper bg="#EFF3FC">
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 24, scrollbarWidth: "none" } as React.CSSProperties}>
        <BackHeader title={festival.name} subtitle={`Cultural Context · ${dateStr}`} bg="#EFF3FC" />

        {/* ── Hero Card ── */}
        <div style={{ padding: "0 24px 24px" }}>
          <div style={{ backgroundColor: C.card,
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: 22, padding: "22px 22px 20px", position: "relative", overflow: "hidden", boxShadow: "3px 3px 0px rgba(0,0,0,0.10)" }}>
            <TangramDecoration primaryColor={festival.color} />
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, backgroundColor: `${festival.color}18`, borderRadius: 22, padding: "4px 12px", marginBottom: 16 }}>
              <span style={{ fontSize: 14, color: festival.color, fontWeight: 700, fontFamily: DM_SANS }}>{festival.type} Festival</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 62, height: 62, borderRadius: 16, backgroundColor: `${festival.color}18`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ fontSize: 15, fontFamily: LONDRINA, color: festival.color, lineHeight: 1 }}>{MONTHS[festival.month - 1]}</span>
                <span style={{ fontSize: 26, fontFamily: LONDRINA, color: festival.color, lineHeight: 1.1 }}>{festival.day}</span>
              </div>
              <div>
                <h2 style={{ margin: "0 0 6px", fontSize: 24, fontFamily: LONDRINA, color: C.strong, lineHeight: 1.2 }}>{festival.name}</h2>
                <p style={{ margin: 0, fontSize: 15, color: C.muted, fontFamily: DM_SANS }}>{festival.type} · {dateStr} 2026</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Representative Photo ── */}
        {photo && (
          <div style={{ padding: "0 24px 24px" }}>
            <div style={{ borderRadius: 22, overflow: "hidden", boxShadow: "3px 3px 0px rgba(0,0,0,0.10)", position: "relative" }}>
              <img
                src={photo.url}
                alt={photo.alt}
                style={{ width: "100%", height: 190, objectFit: "cover", display: "block" }}
              />
              {/* Bottom gradient for color accent */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: 60,
                background: `linear-gradient(to top, ${festival.color}55, transparent)`,
              }} />
            </div>
          </div>
        )}

        {/* ── Culture & Event Guide sections ── */}
        <div style={{ padding: "0 24px 24px" }}>
          <p style={{ margin: "0 0 14px", fontSize: 13, color: C.muted, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: DM_SANS }}>Culture & Event Guide</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {SECTION_DEFS.map(section => (
              <div key={section.key} style={{ backgroundColor: C.card,
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: 22, padding: "16px 18px", boxShadow: "3px 3px 0px rgba(0,0,0,0.10)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 10, backgroundColor: `${festival.color}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <SectionIcon sectionKey={section.key} color={festival.color} size={17} />
                  </div>
                  <span style={{ fontSize: 15, fontFamily: LONDRINA, color: C.strong }}>{section.label}</span>
                </div>
                <p style={{ margin: 0, fontSize: 16, color: C.text, fontFamily: DM_SANS, lineHeight: 1.65 }}>{sectionContent[section.key]}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Linked Activity ���─ */}
        <div style={{ padding: "0 24px 32px" }}>
          <p style={{ margin: "0 0 12px", fontSize: 13, color: C.muted, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: DM_SANS }}>Linked Activity</p>
          {linkedActivity ? (
            <div onClick={() => navigate(`/activity/activity/${linkedActivity.id}`)} style={{
              backgroundColor: C.card,
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: 22, padding: "16px 18px",
              boxShadow: "3px 3px 0px rgba(0,0,0,0.10)", cursor: "pointer",
              display: "flex", alignItems: "center", gap: 14,
              border: `1.5px solid ${festival.color}25`,
            }}>
              <div style={{ width: 50, height: 50, borderRadius: 16, backgroundColor: `${linkedActivity.color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>
                {linkedActivity.emoji}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: 15, fontFamily: LONDRINA, color: C.strong }}>{linkedActivity.title}</p>
                <p style={{ margin: "2px 0 0", fontSize: 14, color: C.muted, fontFamily: DM_SANS }}>{linkedActivity.time} · {linkedActivity.location}</p>
              </div>
              <TactileButton bgColor={festival.color} shadowColor={`${festival.color}88`} small>Go →</TactileButton>
            </div>
          ) : (
            <div style={{ backgroundColor: `${C.blue}10`, border: "1px solid rgba(0,0,0,0.06)", borderRadius: 22, padding: "20px", textAlign: "center" }}>
              <p style={{ margin: "0 0 8px", fontSize: 16, fontFamily: LONDRINA, color: C.strong }}>No linked activity yet</p>
              <p style={{ margin: 0, fontSize: 14, color: C.muted, fontFamily: DM_SANS }}>Browse Explore Activities to find related events.</p>
              <button onClick={() => navigate("/activity/social?tab=explore")} style={{
                marginTop: 12, borderRadius: 10, border: "1px solid rgba(0,0,0,0.06)",
                backgroundColor: `${C.blue}12`, padding: "8px 20px",
                fontSize: 15, fontFamily: LONDRINA, color: C.blue, cursor: "pointer",
              }}>Browse Activities</button>
            </div>
          )}
        </div>
      </div>
      <BottomNav active={1} />
    </PageWrapper>
  );
}

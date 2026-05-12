import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { C, LONDRINA, DM_SANS, PageWrapper, BottomNav, TactileButton, TangramDecoration } from "../../components/kitchen/Shared";

/* ─── Badge icon components (flat solid-filled, white on color bg) ── */
function StarIcon({ s = 20 }: { s?: number }) {
  return <svg width={s} height={s} viewBox="0 0 20 20" fill="white"><path d="M10 2L12.3 7.8H18.5L13.6 11.3L15.9 17L10 13.5L4.1 17L6.4 11.3L1.5 7.8H7.7Z"/></svg>;
}
function GlobeIcon2({ s = 20 }: { s?: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 20 20" fill="white">
      <circle cx="10" cy="10" r="7.5" opacity="0.18"/>
      <path d="M10 2.5C10 2.5 6.5 5.5 6.5 10C6.5 14.5 10 17.5 10 17.5C10 17.5 13.5 14.5 13.5 10C13.5 5.5 10 2.5 10 2.5Z"/>
      <rect x="2.5" y="9" width="15" height="2" rx="1" opacity="0.7"/>
    </svg>
  );
}
function ChatIcon2({ s = 20 }: { s?: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 20 20" fill="white">
      <path d="M2 4C2 3.4 2.5 3 3 3H13C13.6 3 14 3.4 14 4V10C14 10.6 13.6 11 13 11H8.5L6 13V11H3C2.5 11 2 10.6 2 10V4Z"/>
      <path d="M15 6H17C17.5 6 18 6.4 18 7V12C18 12.6 17.5 13 17 13H15.5V14.5L13.5 13H11C10.5 13 10 12.6 10 12V11.5H13C13.6 11.5 14 11.1 14 10.5V6H15Z" opacity="0.65"/>
    </svg>
  );
}
function HouseIcon({ s = 20 }: { s?: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 20 20" fill="white">
      <path d="M10 2.5L18.5 9V10H17V18H3V10H1.5V9L10 2.5Z"/>
      <rect x="7.5" y="12" width="5" height="6" rx="1" fill="rgba(0,0,0,0.15)"/>
    </svg>
  );
}
function LeafIcon({ s = 20 }: { s?: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 20 20" fill="white">
      <path d="M10 2C7 5 3 8 3 13C3 16.5 5.5 18.5 10 18.5C15 18.5 18 16 18 12C18 7 14 2 10 2Z"/>
      <rect x="9.3" y="8" width="1.4" height="10" rx="0.7" fill="rgba(0,0,0,0.2)"/>
    </svg>
  );
}
function ChefIcon({ s = 20 }: { s?: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 20 20" fill="white">
      <circle cx="10" cy="6.5" r="4"/>
      <path d="M6 6C6 6 5 4 3.5 4C2 4 1 5 1 6.5C1 8 2 9 3.5 9L6 10V8.5C5 8 4.5 7.3 4.5 6.5C4.5 5.8 5 5.3 5.5 5.3C6 5.3 6.5 5.7 6.5 6V6Z" opacity="0.7"/>
      <path d="M14 6C14 6 15 4 16.5 4C18 4 19 5 19 6.5C19 8 18 9 16.5 9L14 10V8.5C15 8 15.5 7.3 15.5 6.5C15.5 5.8 15 5.3 14.5 5.3C14 5.3 13.5 5.7 13.5 6V6Z" opacity="0.7"/>
      <rect x="4" y="10" width="12" height="7" rx="1.5"/>
    </svg>
  );
}
function MoonIcon({ s = 20 }: { s?: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 20 20" fill="white">
      <path d="M15.5 11.5C15.5 15.1 12.6 18 9 18C7 18 5.2 17.2 3.9 15.9C5.4 16.5 7.1 16.5 8.8 15.8C11.5 14.7 13.2 11.7 12.5 8.8C12 6.8 10.5 5.2 8.6 4.4C10.7 3.8 13.2 4.8 14.6 6.9C15.2 8 15.5 9.7 15.5 11.5Z"/>
    </svg>
  );
}
function SpeechIcon({ s = 20 }: { s?: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 20 20" fill="white">
      <path d="M2 4C2 3 3 2 4 2H16C17 2 18 3 18 4V13C18 14 17 15 16 15H11L8 18V15H4C3 15 2 14 2 13V4Z"/>
      <rect x="5" y="7" width="10" height="1.5" rx="0.75" fill="rgba(0,0,0,0.2)"/>
      <rect x="5" y="10" width="7" height="1.5" rx="0.75" fill="rgba(0,0,0,0.2)"/>
    </svg>
  );
}
function CompassIcon({ s = 20 }: { s?: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 20 20" fill="white">
      <circle cx="10" cy="10" r="7.5" opacity="0.18"/>
      <circle cx="10" cy="10" r="7.5" fill="none" stroke="white" strokeWidth="1.2" opacity="0.5"/>
      <polygon points="10,4 12,10 10,8.5 8,10"/>
      <polygon points="10,16 8,10 10,11.5 12,10" opacity="0.5"/>
      <circle cx="10" cy="10" r="1.5"/>
    </svg>
  );
}
function LockBadgeIcon({ s = 14 }: { s?: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 14 16" fill="white">
      <rect x="1" y="7" width="12" height="9" rx="2"/>
      <path d="M4 7V5C4 3.3 5.3 2 7 2C8.7 2 10 3.3 10 5V7H8.5V5C8.5 4.2 7.8 3.5 7 3.5C6.2 3.5 5.5 4.2 5.5 5V7H4Z"/>
    </svg>
  );
}

/* ─── Badge data ─────────────────────────────────────────── */
const BADGES = [
  { id: 1, name: "Cleaning Star",      color: C.orange, unlocked: true,  icon: "star",    earned: "10 check-ins"  },
  { id: 2, name: "Culture Explorer",   color: C.blue,   unlocked: true,  icon: "globe",   earned: "5 guides read" },
  { id: 3, name: "Social Butterfly",   color: C.pink,   unlocked: true,  icon: "chat",    earned: "3 activities"  },
  { id: 4, name: "Good Neighbour",     color: C.green,  unlocked: true,  icon: "house",   earned: "10 interactions"},
  { id: 5, name: "Eco Hero",           color: C.green,  unlocked: true,  icon: "leaf",    earned: "20 sorts"      },
  { id: 6, name: "Cooking Master",     color: C.orange, unlocked: false, icon: "chef",    earned: ""              },
  { id: 7, name: "Night Owl",          color: C.purple, unlocked: false, icon: "moon",    earned: ""              },
  { id: 8, name: "Language Champion",  color: C.pink,   unlocked: false, icon: "speech",  earned: ""              },
  { id: 9, name: "Adventure Seeker",   color: C.blue,   unlocked: false, icon: "compass", earned: ""              },
];

const ENERGY_POINTS = 350;
const ENERGY_MAX    = 500;

function BadgeIconRender({ icon, size = 22 }: { icon: string; size?: number }) {
  if (icon === "star")    return <StarIcon    s={size} />;
  if (icon === "globe")   return <GlobeIcon2  s={size} />;
  if (icon === "chat")    return <ChatIcon2   s={size} />;
  if (icon === "house")   return <HouseIcon   s={size} />;
  if (icon === "leaf")    return <LeafIcon    s={size} />;
  if (icon === "chef")    return <ChefIcon    s={size} />;
  if (icon === "moon")    return <MoonIcon    s={size} />;
  if (icon === "speech")  return <SpeechIcon  s={size} />;
  return <CompassIcon s={size} />;
}

function BadgeChip({ badge }: { badge: typeof BADGES[0] }) {
  const bg = badge.unlocked ? badge.color : "#C8C4BC";
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <div style={{ position: "relative" }}>
        <div style={{
          width: 52, height: 52, borderRadius: "50%", backgroundColor: bg,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: badge.unlocked ? `0 4px 12px ${badge.color}40` : "none",
        }}>
          <BadgeIconRender icon={badge.icon} size={24} />
        </div>
        {!badge.unlocked && (
          <div style={{ position: "absolute", bottom: -2, right: -2, width: 20, height: 20, borderRadius: "50%", backgroundColor: "#A0A09A", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #FEF9EF" }}>
            <LockBadgeIcon s={10} />
          </div>
        )}
        {badge.unlocked && (
          <div style={{ position: "absolute", top: -2, right: -2, width: 18, height: 18, borderRadius: "50%", backgroundColor: "#F5C24C", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #FEF9EF" }}>
            <svg width="9" height="9" viewBox="0 0 9 9" fill="white"><path d="M4.5 0.5L5.5 3.5H8.5L6 5.5L7 8.5L4.5 6.5L2 8.5L3 5.5L0.5 3.5H3.5Z"/></svg>
          </div>
        )}
      </div>
      <span style={{ fontSize: 12, fontFamily: DM_SANS, fontWeight: 700, color: badge.unlocked ? C.strong : C.muted, textAlign: "center", lineHeight: 1.3, maxWidth: 56 }}>
        {badge.name}
      </span>
    </div>
  );
}

/* ─── Favorites + History data ───────────────────────────── */
const MY_FAVORITES = [
  { id: 1, label: "Lucia Day Cultural Guide",    sub: "Culture Bridge",  color: C.blue,   path: "/activity/festival/1" },
  { id: 2, label: "Photography Walk",            sub: "Activity · Free", color: C.blue,   path: "/activity/activity/2" },
  { id: 3, label: "Waste Sorting Guide",         sub: "Swedish Living Wiki", color: C.green, path: "/activity/wiki/2" },
];

const MY_HISTORY = [
  { id: 1, label: "Yoga in the Park",    date: "Nov 30", color: C.green  },
  { id: 2, label: "Photography Walk",   date: "Nov 17", color: C.blue   },
  { id: 3, label: "Language Café",      date: "Nov 14", color: C.orange },
];

/* ─── Setting rows ───────────────────────────────────────── */
function SettingRow({ label, sub, color, onTap }: { label: string; sub?: string; color: string; onTap?: () => void }) {
  return (
    <div onClick={onTap} style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 0", cursor: "pointer", borderBottom: `1px solid ${C.divider}` }}>
      <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        {label === "Profile visibility" && <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9.06374 5.42525C9.01945 5.37673 8.98868 5.31743 8.97452 5.25328C8.96036 5.18912 8.9633 5.12238 8.98305 5.05972C9.00279 4.99706 9.03865 4.94069 9.08704 4.89625C9.13542 4.85181 9.19463 4.82086 9.25874 4.8065C10.158 4.60101 11.0776 4.49817 12 4.49994C15.27 4.49994 18.2409 5.74307 20.5931 8.09525C22.3584 9.86057 23.1525 11.6221 23.1853 11.6962C23.2279 11.7921 23.25 11.8959 23.25 12.0009C23.25 12.1058 23.2279 12.2096 23.1853 12.3056C23.1525 12.3796 22.3584 14.1403 20.5931 15.9056C20.3256 16.1718 20.0509 16.424 19.7691 16.6621C19.6949 16.7251 19.5992 16.7568 19.5021 16.7505C19.405 16.7442 19.3141 16.7004 19.2487 16.6284L9.06374 5.42525ZM20.055 19.7456C20.1226 19.8182 20.1752 19.9036 20.2095 19.9966C20.2439 20.0897 20.2595 20.1887 20.2554 20.2879C20.2512 20.3871 20.2275 20.4844 20.1854 20.5743C20.1434 20.6642 20.0839 20.7449 20.0105 20.8116C19.937 20.8784 19.851 20.9299 19.7575 20.9632C19.664 20.9965 19.5649 21.0108 19.4657 21.0055C19.3666 21.0002 19.2696 20.9752 19.1802 20.9321C19.0908 20.889 19.0109 20.8286 18.945 20.7543L16.875 18.4809C15.3398 19.1599 13.6786 19.5071 12 19.4999C8.72999 19.4999 5.75905 18.2568 3.40687 15.9056C1.64155 14.1403 0.843741 12.3796 0.814679 12.3056C0.772035 12.2096 0.75 12.1058 0.75 12.0009C0.75 11.8959 0.772035 11.7921 0.814679 11.6962C0.843741 11.6249 1.64155 9.86057 3.40687 8.09525C4.11214 7.38673 4.89887 6.76427 5.75062 6.24088L3.94499 4.25432C3.87737 4.18167 3.82483 4.09633 3.79043 4.00323C3.75603 3.91014 3.74045 3.81114 3.7446 3.71198C3.74874 3.61282 3.77252 3.51546 3.81457 3.42556C3.85661 3.33566 3.91608 3.255 3.98953 3.18825C4.06298 3.1215 4.14895 3.06999 4.24245 3.03671C4.33595 3.00343 4.43513 2.98904 4.53423 2.99437C4.63334 2.9997 4.7304 3.02465 4.81979 3.06777C4.90918 3.11089 4.98913 3.17132 5.05499 3.24557L20.055 19.7456ZM13.9153 15.2221L8.97562 9.78463C8.46662 10.482 8.21386 11.3337 8.26002 12.1959C8.30618 13.058 8.64844 13.8779 9.22899 14.5169C9.80955 15.156 10.5928 15.5751 11.4466 15.7036C12.3004 15.8321 13.1724 15.662 13.9153 15.2221Z" fill={color}/></svg>}
        {label === "Language preference" && <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 5H11" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 4C7 8.846 7 11 7.5 12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M10 8.5C10 10.786 8 13 6.5 13C5 13 4 11.865 4 11C4 9 5 8 7 8C9 8 12 8.57 12 10.857C12 12.381 11.333 13.428 10 14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 20L16 11L20 20" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M19.1 18H12.9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
        {label !== "Profile visibility" && label !== "Language preference" && <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: color }} />}
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ margin: 0, fontSize: 16, fontFamily: LONDRINA, color: C.strong }}>{label}</p>
        {sub && <p style={{ margin: "1px 0 0", fontSize: 13, color: C.muted, fontFamily: DM_SANS }}>{sub}</p>}
      </div>
      <svg width="12" height="12" viewBox="0 0 12 12" fill={C.muted}><path d="M3.5 1.5L8.5 6L3.5 10.5L5 6Z"/></svg>
    </div>
  );
}

/* ─── Toggle row ─────────────────────────────────────────── */
function ToggleRow({ label, defaultOn = true }: { label: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div style={{ display: "flex", alignItems: "center", padding: "12px 0", borderBottom: `1px solid ${C.divider}` }}>
      <span style={{ flex: 1, fontSize: 16, fontFamily: DM_SANS, color: C.strong }}>{label}</span>
      <div onClick={() => setOn(!on)} style={{ width: 44, height: 26, borderRadius: 99, backgroundColor: on ? C.purple : "#D5D0C8", position: "relative", cursor: "pointer", transition: "background 0.25s" }}>
        <div style={{ width: 22, height: 22, borderRadius: "50%", backgroundColor: "white", position: "absolute", top: 2, left: on ? 20 : 2, transition: "left 0.25s", boxShadow: "0 2px 4px rgba(0,0,0,0.20)" }} />
      </div>
    </div>
  );
}

/* ─── Profile Home Page ──────────────────────────────────── */

/* ─── Profile Geometric Background (Purple) ─────────────── */
function ProfileGeoBg() {
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
      {/* 大方块 — 右上角压边，旋转 14° */}
      <div style={{
        position: "absolute", top: -18, right: -18,
        width: 86, height: 86, borderRadius: 10,
        backgroundColor: C.purple, opacity: 0.09,
        transform: "rotate(14deg)",
      }} />
      {/* 小圆 — 左上压边 */}
      <div style={{
        position: "absolute", top: 20, left: -16,
        width: 48, height: 48, borderRadius: "50%",
        backgroundColor: C.purple, opacity: 0.08,
      }} />
      {/* 中三角 — 左下压边，旋转 -9° */}
      <svg style={{ position: "absolute", bottom: -4, left: 20, opacity: 0.09 }} width="64" height="56">
        <polygon points="32,4 60,52 4,52" fill={C.purple} transform="rotate(-9, 32, 28)" />
      </svg>
    </div>
  );
}


export default function ProfileHome() {
  const navigate  = useNavigate();
    const [expand,  setExpand]  = useState<"favorites" | "history" | null>(null);

  return (
    <PageWrapper bg="#F3F0FB">

        {/* ── 吸顶 Hero Header ── */}
        <div style={{
          position: "relative", flexShrink: 0,
          backgroundColor: `${C.purple}0C`,
          overflow: "hidden", zIndex: 50,
          paddingBottom: 20,
        }}>
          <ProfileGeoBg />
          <div style={{ position: "relative", zIndex: 2, padding: "52px 24px 0" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, backgroundColor: `${C.purple}22`, borderRadius: 22, padding: "3px 10px", marginBottom: 6 }}>
              <span style={{ fontSize: 13, color: C.purpleDark, fontWeight: 700, letterSpacing: "0.06em", fontFamily: DM_SANS }}>MY PROFILE</span>
            </div>
            <h1 style={{ margin: "0 0 12px", fontSize: 40, fontFamily: LONDRINA, color: C.strong, lineHeight: 1.1 }}>Profile</h1>
          </div>
          <div style={{ position: "absolute", bottom: 0, left: 24, right: 24, height: 1, backgroundColor: `${C.purple}22`, zIndex: 2 }} />
        </div>

      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 24, scrollbarWidth: "none" } as React.CSSProperties}>

        {/* ── Profile Card ── */}
        <div style={{ padding: "20px 24px 0" }}>
          <div onClick={() => navigate("/profile/edit")} style={{ backgroundColor: C.card,
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: 22, padding: "22px 22px 20px", position: "relative", overflow: "hidden", boxShadow: "3px 3px 0px rgba(0,0,0,0.10)", cursor: "pointer" }}>

            {/* Chevron right - navigate to edit */}
            <div style={{ position: "absolute", top: "50%", right: 18, transform: "translateY(-50%)" }}>
              <svg width="16" height="16" viewBox="0 0 12 12" fill={C.muted}>
                <path d="M3.5 1.5L8.5 6L3.5 10.5L5 6Z"/>
              </svg>
            </div>
            {/* Avatar + info */}
            <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <div style={{ position: "relative" }}>
                <div style={{ width: 76, height: 76, borderRadius: "50%", backgroundColor: C.orange, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, fontFamily: LONDRINA, color: "white", boxShadow: `0 4px 16px ${C.orange}40` }}>
                  J
                </div>
                {/* Online dot */}
                <div style={{ width: 16, height: 16, borderRadius: "50%", backgroundColor: C.green, position: "absolute", bottom: 2, right: 2, border: "2.5px solid #FEF9EF" }} />
              </div>
              <div>
                <h2 style={{ margin: "0 0 4px", fontSize: 26, fontFamily: LONDRINA, color: C.strong }}>Jingqi</h2>
                <p style={{ margin: "0 0 3px", fontSize: 15, color: C.muted, fontFamily: DM_SANS }}>Room 301 · Floor 3</p>
                <div style={{ display: "flex", gap: 6 }}>
                  <span style={{ backgroundColor: `${C.purple}15`, color: C.purple, borderRadius: 99, padding: "3px 10px", fontSize: 13, fontWeight: 700, fontFamily: DM_SANS }}>3 months</span>
                  <span style={{ backgroundColor: `${C.green}15`, color: C.green, borderRadius: 99, padding: "3px 10px", fontSize: 13, fontWeight: 700, fontFamily: DM_SANS }}>Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Community Energizer ── */}
        <div style={{ padding: "20px 24px 0" }}>
          <div style={{ backgroundColor: C.card,
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: 22, padding: "20px", boxShadow: "3px 3px 0px rgba(0,0,0,0.10)", position: "relative", overflow: "hidden" }}>
            {/* Section header */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, backgroundColor: `${C.purple}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill={C.purple}>
                  <path d="M9 1L11 7H17.5L12.3 10.7L14.3 17L9 13.4L3.7 17L5.7 10.7L0.5 7H7Z"/>
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: 18, fontFamily: LONDRINA, color: C.strong }}>Community Energizer</p>
                <p style={{ margin: "1px 0 0", fontSize: 13, color: C.muted, fontFamily: DM_SANS }}>Your badge collection</p>
              </div>
              <div style={{ backgroundColor: `${C.purple}15`, borderRadius: 10, padding: "6px 12px" }}>
                <p style={{ margin: 0, fontSize: 24, fontFamily: LONDRINA, color: C.purple }}>{ENERGY_POINTS}</p>
                <p style={{ margin: 0, fontSize: 12, color: C.muted, fontFamily: DM_SANS, fontWeight: 700, letterSpacing: "0.05em" }}>ENERGY PTS</p>
              </div>
            </div>

            {/* Energy progress bar */}
            <div style={{ marginBottom: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 13, color: C.muted, fontFamily: DM_SANS, fontWeight: 600 }}>Progress to next level</span>
                <span style={{ fontSize: 13, color: C.purple, fontFamily: DM_SANS, fontWeight: 700 }}>{Math.round(ENERGY_POINTS / ENERGY_MAX * 100)}%</span>
              </div>
              <div style={{ height: 10, backgroundColor: "#F2ECE2", borderRadius: 99, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${ENERGY_POINTS / ENERGY_MAX * 100}%`, background: `linear-gradient(to right, ${C.purple}, ${C.pink})`, borderRadius: 99, transition: "width 0.5s ease" }} />
              </div>
              <p style={{ margin: "8px 0 0", fontSize: 13, color: C.purple, fontFamily: DM_SANS, fontWeight: 600 }}>
                Complete 3 cooking workshops to unlock <strong>Cooking Master</strong>
              </p>
            </div>

            {/* Badge grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
              {BADGES.map(b => <BadgeChip key={b.id} badge={b} />)}
            </div>
          </div>
        </div>

        {/* ── My Favorites ── */}
        <div style={{ padding: "20px 24px 0" }}>
          <div style={{ backgroundColor: C.card,
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: 22, padding: "18px 20px", boxShadow: "3px 3px 0px rgba(0,0,0,0.10)" }}>
            <button onClick={() => setExpand(expand === "favorites" ? null : "favorites")} style={{ width: "100%", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, padding: 0, WebkitTapHighlightColor: "transparent" }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: `${C.orange}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill={C.orange}>
                  <path d="M9 16C9 16 1.5 11.5 1.5 6.5C1.5 4 3.5 2 6 2C7.2 2 8.2 2.6 9 3.4C9.8 2.6 10.8 2 12 2C14.5 2 16.5 4 16.5 6.5C16.5 11.5 9 16 9 16Z"/>
                </svg>
              </div>
              <div style={{ flex: 1, textAlign: "left" }}>
                <p style={{ margin: 0, fontSize: 15, fontFamily: LONDRINA, color: C.strong }}>My Favorites</p>
                <p style={{ margin: "1px 0 0", fontSize: 13, color: C.muted, fontFamily: DM_SANS }}>Bookmarked culture guides & activities</p>
              </div>
              <svg width="12" height="12" viewBox="0 0 12 12" fill={C.muted} style={{ transform: expand === "favorites" ? "rotate(90deg)" : "rotate(0)", transition: "transform 0.2s" }}>
                <path d="M3.5 1.5L8.5 6L3.5 10.5L5 6Z"/>
              </svg>
            </button>
            {expand === "favorites" && (
              <div style={{ marginTop: 14, borderTop: `1px solid ${C.divider}`, paddingTop: 14 }}>
                {MY_FAVORITES.map(f => (
                  <div key={f.id} onClick={() => navigate(f.path)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: `1px solid ${C.divider}`, cursor: "pointer" }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: f.color, flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: 0, fontSize: 15, fontFamily: LONDRINA, color: C.strong }}>{f.label}</p>
                      <p style={{ margin: "1px 0 0", fontSize: 13, color: C.muted, fontFamily: DM_SANS }}>{f.sub}</p>
                    </div>
                    <svg width="10" height="10" viewBox="0 0 12 12" fill={C.muted}><path d="M3.5 1.5L8.5 6L3.5 10.5L5 6Z"/></svg>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── History ── */}
        <div style={{ padding: "14px 24px 0" }}>
          <div style={{ backgroundColor: C.card,
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: 22, padding: "18px 20px", boxShadow: "3px 3px 0px rgba(0,0,0,0.10)" }}>
            <button onClick={() => setExpand(expand === "history" ? null : "history")} style={{ width: "100%", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, padding: 0, WebkitTapHighlightColor: "transparent" }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: `${C.blue}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2ZM12 6C11.7348 6 11.4804 6.10536 11.2929 6.29289C11.1054 6.48043 11 6.73478 11 7V12C11.0001 12.2652 11.1055 12.5195 11.293 12.707L14.293 15.707C14.4816 15.8892 14.7342 15.99 14.9964 15.9877C15.2586 15.9854 15.5094 15.8802 15.6948 15.6948C15.8802 15.5094 15.9854 15.2586 15.9877 14.9964C15.99 14.7342 15.8892 14.4816 15.707 14.293L13 11.586V7C13 6.73478 12.8946 6.48043 12.7071 6.29289C12.5196 6.10536 12.2652 6 12 6Z" fill={C.blue}/>
                </svg>
              </div>
              <div style={{ flex: 1, textAlign: "left" }}>
                <p style={{ margin: 0, fontSize: 15, fontFamily: LONDRINA, color: C.strong }}>Activity History</p>
                <p style={{ margin: "1px 0 0", fontSize: 13, color: C.muted, fontFamily: DM_SANS }}>Past participation records</p>
              </div>
              <svg width="12" height="12" viewBox="0 0 12 12" fill={C.muted} style={{ transform: expand === "history" ? "rotate(90deg)" : "rotate(0)", transition: "transform 0.2s" }}>
                <path d="M3.5 1.5L8.5 6L3.5 10.5L5 6Z"/>
              </svg>
            </button>
            {expand === "history" && (
              <div style={{ marginTop: 14, borderTop: `1px solid ${C.divider}`, paddingTop: 14 }}>
                {MY_HISTORY.map(h => (
                  <div key={h.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: `1px solid ${C.divider}` }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: h.color, flexShrink: 0 }} />
                    <p style={{ flex: 1, margin: 0, fontSize: 15, fontFamily: LONDRINA, color: C.strong }}>{h.label}</p>
                    <span style={{ fontSize: 13, color: C.muted, fontFamily: DM_SANS }}>{h.date}</span>
                    <span style={{ backgroundColor: `${C.green}15`, color: C.green, borderRadius: 99, padding: "2px 8px", fontSize: 12, fontWeight: 700, fontFamily: DM_SANS }}>Attended</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Account Settings ── */}
        <div style={{ padding: "14px 24px 0" }}>
          <p style={{ margin: "0 0 12px", fontSize: 13, color: C.muted, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: DM_SANS }}>Account Settings</p>
          <div style={{ backgroundColor: C.card,
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: 22, padding: "4px 18px", boxShadow: "3px 3px 0px rgba(0,0,0,0.10)" }}>
            <div style={{ padding: "4px 0" }}>
              <ToggleRow label="Activity reminders"       defaultOn={true}  />
              <ToggleRow label="Kitchen task nudges"       defaultOn={true}  />
              <ToggleRow label="Community board updates"   defaultOn={false} />
              <ToggleRow label="Festival & culture alerts" defaultOn={true}  />
            </div>
            <SettingRow label="Profile visibility"  sub="Who can see your profile" color={C.purple} />
            <SettingRow label="Language preference" sub="English"                  color={C.blue}   />
            <div style={{ padding: "13px 0", display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: `${C.pink}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill={C.pink}><circle cx="8" cy="8" r="7"/><rect x="7.2" y="4" width="1.6" height="4" rx="0.8" fill="white"/><circle cx="8" cy="10.5" r="1.1" fill="white"/></svg>
              </div>
              <p style={{ flex: 1, margin: 0, fontSize: 18, fontFamily: LONDRINA, color: C.strong }}>Help & Support</p>
              <svg width="12" height="12" viewBox="0 0 12 12" fill={C.muted}><path d="M3.5 1.5L8.5 6L3.5 10.5L5 6Z"/></svg>
            </div>
          </div>
        </div>

        {/* ── Sign out area ── */}
        <div style={{ padding: "20px 24px 12px" }}>
          <button style={{ width: "100%", borderRadius: 16, border: "1px solid rgba(0,0,0,0.06)", backgroundColor: `${C.pink}08`, padding: "12px 20px", cursor: "pointer", fontSize: 18, fontFamily: LONDRINA, color: C.pink }}>
            Sign Out
          </button>
        </div>
      </div>
      <BottomNav active={4} />
    </PageWrapper>
  );
}

import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import {
  C, LONDRINA, DM_SANS, PageWrapper, GeometricAvatar, SectionHeader,
  BottomNav, TactileButton, SolidBellIcon, SolidChevronRightIcon,
} from "../../components/kitchen/Shared";
import { BUDDIES, FACILITIES, CLUBS, BULLETINS, EVENTS } from "./ActivityShared";


/* ─── Section Header with geometric dot ────────────────────── */
function SectionHeaderWithDot({
  title, color, action, onAction,
}: {
  title: string; color: string; action?: string; onAction?: () => void;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{
          width: 9, height: 9,
          backgroundColor: color,
          transform: "rotate(45deg)",
          borderRadius: 2,
          flexShrink: 0,
          opacity: 0.85,
        }} />
        <span style={{ fontSize: 18, fontFamily: LONDRINA, color: C.strong, lineHeight: 1 }}>{title}</span>
      </div>
      {action && (
        <button onClick={onAction} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: color, fontWeight: 700, fontFamily: DM_SANS, padding: 0 }}>
          {action}
        </button>
      )}
    </div>
  );
}

/* ─── Activity Geometric Background (Blue) ──────────────────── */
function ActivityGeoBg() {
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
      {/* 大菱形 — 右上角压边，旋转 -12° */}
      <div style={{
        position: "absolute", top: -16, right: -20,
        width: 90, height: 90, borderRadius: 10,
        backgroundColor: C.blue, opacity: 0.09,
        transform: "rotate(-12deg)",
      }} />
      {/* 中圆 — 右中，压边 */}
      <div style={{
        position: "absolute", top: 80, right: -20,
        width: 56, height: 56, borderRadius: "50%",
        backgroundColor: C.blue, opacity: 0.07,
      }} />
      {/* 小三角 — 左下角压边，旋转 8° */}
      <svg style={{ position: "absolute", bottom: -4, left: -6, opacity: 0.10 }} width="60" height="52">
        <polygon points="30,4 56,48 4,48" fill={C.blue} transform="rotate(8, 30, 26)" />
      </svg>
    </div>
  );
}


/* ─── Search Bar ─────────────────────────────────────────── */
function SearchBar() {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{
      margin: "0 24px 16px",
      backgroundColor: "white",
            border: "1px solid rgba(0,0,0,0.06)",
      borderRadius: 99, padding: "12px 18px",
      display: "flex", alignItems: "center", gap: 10,
      boxShadow: focused ? `0 0 0 2px ${C.blue}40, 0 4px 16px rgba(0,0,0,0.08)` : "0 2px 12px rgba(0,0,0,0.06)",
      transition: "box-shadow 0.2s ease",
    }}>
      {/* Solid filled search icon */}
      <svg width="18" height="18" viewBox="0 0 18 18">
        <circle cx="7.5" cy="7.5" r="5.5" fill={C.muted}/>
        <circle cx="7.5" cy="7.5" r="3.2" fill="white"/>
        <path d="M10 11L11 10L15.5 14.5L14.5 15.5Z" fill={C.muted}/>
      </svg>
      <input
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Search activities, places, facilities..."
        style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontSize: 16, color: C.strong, fontFamily: DM_SANS }}
      />
    </div>
  );
}

/* ─── Tag Cloud ──────────────────────────────────────────── */
const TAGS = [
  { label: "Music",             color: C.blue    },
  { label: "Yoga",              color: C.green   },
  { label: "Photography",       color: C.blue    },
  { label: "Cooking",           color: C.pink    },
  { label: "Sports",            color: C.blue    },
  { label: "Hiking",            color: C.green   },
  { label: "Art",               color: C.purple  },
  { label: "Language Exchange", color: C.blue    },
  { label: "+ More",            color: C.muted   },
];

function TagCloud() {
  const navigate = useNavigate();
  return (
    <div style={{ display: "flex", gap: 8, overflowX: "auto", padding: "0 24px 20px", scrollbarWidth: "none" } as React.CSSProperties}>
      {TAGS.map(tag => (
        <button
          key={tag.label}
          onClick={() => navigate("/activity/social?tab=explore")}
          style={{
            flexShrink: 0, borderRadius: 99,
            backgroundColor: tag.color === C.muted ? "#F2F3F5" : `${tag.color}18`,
            border: `1.5px solid ${tag.color === C.muted ? "#E0D8CC" : `${tag.color}30`}`,
            color: tag.color === C.muted ? C.muted : tag.color,
            padding: "7px 16px", fontSize: 15, fontWeight: 700,
            fontFamily: DM_SANS, cursor: "pointer", whiteSpace: "nowrap",
          }}
        >
          {tag.label}
        </button>
      ))}
    </div>
  );
}

/* ─── Mini Floor Plan SVG ────────────────────────────────── */
function MiniFloorPlan({ svgHeight = 72 }: { svgHeight?: number }) {
  return (
    <svg width="100%" height={svgHeight} viewBox="0 0 240 72" preserveAspectRatio="xMidYMid meet">
      {/* Building outline */}
      <rect x="4" y="4" width="232" height="64" rx="6" fill="#F2F3F5" stroke="#E0D8CC" strokeWidth="1"/>
      {/* Interior room dividers */}
      <rect x="4" y="4" width="115" height="32" rx="4" fill="#EDE8DF" stroke="#D8D0C4" strokeWidth="0.8"/>
      <rect x="119" y="4" width="117" height="32" rx="4" fill="#EDE8DF" stroke="#D8D0C4" strokeWidth="0.8"/>
      <rect x="4" y="38" width="74" height="30" rx="4" fill="#EDE8DF" stroke="#D8D0C4" strokeWidth="0.8"/>
      <rect x="80" y="38" width="80" height="30" rx="4" fill="#EDE8DF" stroke="#D8D0C4" strokeWidth="0.8"/>
      <rect x="162" y="38" width="74" height="30" rx="4" fill="#EDE8DF" stroke="#D8D0C4" strokeWidth="0.8"/>
      {/* Facility pins (match FACILITIES data approximate positions) */}
      {FACILITIES.map(f => (
        <g key={f.id}>
          <circle cx={f.pin.x / 100 * 240} cy={f.pin.y / 100 * 72} r="7" fill={f.color}/>
          <circle cx={f.pin.x / 100 * 240} cy={f.pin.y / 100 * 72} r="3" fill="white"/>
        </g>
      ))}
    </svg>
  );
}

/* ─── Community Navigator Card ───────────────────────────── */
function GlobeIcon({ color, size = 16 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7" fill={color} />
      <ellipse cx="8" cy="8" rx="3" ry="7" fill="white" opacity="0.18" />
      <rect x="1" y="7" width="14" height="2" rx="1" fill="white" opacity="0.22" />
      <rect x="2.5" y="4" width="11" height="1.5" rx="0.75" fill="white" opacity="0.12" />
      <rect x="2.5" y="10.5" width="11" height="1.5" rx="0.75" fill="white" opacity="0.12" />
    </svg>
  );
}

function NavCard({ title, borderColor, children, badge, onTap }: {
  title: string; borderColor: string; children: React.ReactNode;
  badge?: React.ReactNode; onTap: () => void;
}) {
  const [pressed, setPressed] = useState(false);
  return (
    <button
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => { setPressed(false); onTap(); }}
      onPointerLeave={() => setPressed(false)}
      style={{
        flex: 1, minWidth: 0,
        backgroundColor: C.card,
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: 22,
        padding: "0 0 14px", overflow: "hidden",
        boxShadow: "3px 3px 0px rgba(0,0,0,0.10)",
        border: "1px solid rgba(0,0,0,0.06)",
        transform: pressed ? "scale(0.96)" : "scale(1)",
        transition: "transform 0.1s ease",
        border: "none", cursor: "pointer", textAlign: "left",
        display: "flex", flexDirection: "column", gap: 0,
      }}
    >
      {/* Inner preview area */}
      <div style={{ padding: "12px 12px 8px", flex: 1 }}>
        {children}
      </div>
      {/* Footer: title + badge */}
      <div style={{ padding: "0 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: 15, fontFamily: LONDRINA, color: C.strong }}>{title}</span>
        {badge}
      </div>
    </button>
  );
}

/* ─── Buddy Card (horizontal scroll) ────────────────────── */
function HomeBuddyCard({ buddy }: { buddy: typeof BUDDIES[0] }) {
  const navigate = useNavigate();
  const [joined, setJoined] = useState(false);
  return (
    <div
      onClick={() => navigate(`/activity/buddy/${buddy.id}`)}
      style={{
        flexShrink: 0, width: 168,
        backgroundColor: C.card,
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: 22,
        padding: "16px 14px 14px",
        boxShadow: "3px 3px 0px rgba(0,0,0,0.10)",
        cursor: "pointer", display: "flex", flexDirection: "column", gap: 10,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <GeometricAvatar initial={buddy.initial} color={buddy.color} shape="circle" size={38} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ margin: 0, fontSize: 15, fontFamily: LONDRINA, color: C.strong, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{buddy.name}</p>
          <p style={{ margin: "1px 0 0", fontSize: 12, color: C.muted, fontFamily: DM_SANS }}>{buddy.nationality}</p>
        </div>
      </div>
      <p style={{ margin: 0, fontSize: 15, fontFamily: DM_SANS, fontWeight: 700, color: C.strong, lineHeight: 1.4 }}>{buddy.activity}</p>
      <div style={{ backgroundColor: `${C.blue}15`, borderRadius: 99, padding: "3px 10px", alignSelf: "flex-start" }}>
        <span style={{ fontSize: 13, color: C.blue, fontWeight: 700, fontFamily: DM_SANS }}>{buddy.time}</span>
      </div>
      <button
        onClick={e => { e.stopPropagation(); setJoined(j => !j); }}
        style={{
          borderRadius: 10, border: "none",
          backgroundColor: joined ? C.green : C.blue,
          color: "white", fontSize: 15, fontWeight: 700, fontFamily: DM_SANS,
          padding: "8px 0", cursor: "pointer",
          transition: "background 0.2s ease",
        }}
      >
        {joined ? "Joined ✓" : "Join +"}
      </button>
    </div>
  );
}

/* ─── Activity Home Page ────────────────────────────────── */
export default function ActivityHome() {
  const navigate = useNavigate();

  return (
    <PageWrapper bg="#EFF3FC">

        {/* ── 吸顶 Hero Header ─────────────────────────────── */}
        <div style={{
          position: "relative",
          flexShrink: 0,
          backgroundColor: `${C.blue}0C`,
          overflow: "hidden",
          zIndex: 50,
        }}>
          <ActivityGeoBg />
          <div style={{
            position: "relative", zIndex: 2,
            padding: "52px 24px 12px",
            display: "flex", justifyContent: "space-between", alignItems: "flex-start",
          }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, backgroundColor: `${C.blue}22`, borderRadius: 22, padding: "3px 10px", marginBottom: 6 }}>
                <span style={{ fontSize: 13, color: C.blueDark, fontWeight: 700, letterSpacing: "0.06em", fontFamily: DM_SANS }}>DECEMBER</span>
              </div>
              <h1 style={{ margin: 0, fontSize: 40, fontFamily: LONDRINA, color: C.strong, lineHeight: 1.1 }}>Activities</h1>
              <p style={{ margin: "4px 0 0", fontSize: 14, color: C.muted, fontFamily: DM_SANS, fontWeight: 500 }}>
                Explore · Connect · Belong
              </p>
            </div>
            <button style={{
              width: 46, height: 46, borderRadius: "50%", backgroundColor: "white", border: "none",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "3px 3px 0px rgba(0,0,0,0.10)", cursor: "pointer", marginTop: 28, flexShrink: 0,
            }} onClick={() => navigate("/message/activity")}>
              <SolidBellIcon color={C.text} size={20} />
            </button>
          </div>
          <div style={{ position: "absolute", bottom: 0, left: 24, right: 24, height: 1, backgroundColor: `${C.blue}22`, zIndex: 2 }} />
        </div>

      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 24, scrollbarWidth: "none" } as React.CSSProperties}>

        {/* Search */}
        <SearchBar />

        {/* Tag Cloud */}
        <TagCloud />

        {/* Community Navigator Section */}
        <div style={{ padding: "0 24px 24px" }}>
          <SectionHeaderWithDot title="Community Navigator" color={C.blue} />
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {/* Full-width Facilities card on top */}
            <div style={{ display: "flex" }}>
              <NavCard title="Facilities" borderColor={C.blue} onTap={() => navigate("/activity/facilities")} badge={
                <span style={{ fontSize: 12, color: C.muted, fontFamily: DM_SANS }}>Tap to explore</span>
              }>
                <MiniFloorPlan svgHeight={96} />
              </NavCard>
            </div>
            {/* Three smaller cards below */}
            <div style={{ display: "flex", gap: 8 }}>
              {/* Groups & Clubs */}
              <NavCard title="Groups" borderColor={C.pink} onTap={() => navigate("/activity/groups")} badge={
                <span style={{ fontSize: 10, color: C.muted, fontFamily: DM_SANS }}>3 active</span>
              }>
                {/* Stacked playlist-style cover blocks */}
                <div style={{ position: "relative", height: 58, marginBottom: 2 }}>
                  {CLUBS.slice(0, 3).map((club, i) => {
                    const cc = club.color === C.blue ? C.pink : club.color;
                    return (
                      <div key={club.id} style={{
                        position: "absolute",
                        left: i * 17,
                        top: i * 2,
                        width: 36,
                        height: 50,
                        borderRadius: 10,
                        backgroundColor: cc,
                        border: "2px solid white",
                        boxShadow: "3px 3px 0px rgba(0,0,0,0.10)",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        paddingBottom: 5,
                        zIndex: 3 - i,
                        overflow: "hidden",
                      }}>
                        {/* tiny pattern */}
                        <div style={{ position: "absolute", top: 4, right: -4, width: 24, height: 24, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.12)" }} />
                        <span style={{ fontSize: 12, color: "white", fontFamily: LONDRINA, textAlign: "center", padding: "0 3px", lineHeight: 1.2, zIndex: 1 }}>
                          {club.name.split(" ")[0]}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </NavCard>
              {/* Bulletin Board */}
              <NavCard title="Bulletin" borderColor={C.green} onTap={() => navigate("/activity/bulletin-board")} badge={
                <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#FF4444" }} />
                  <span style={{ fontSize: 10, color: "#FF4444", fontFamily: DM_SANS, fontWeight: 600 }}>2 new</span>
                </div>
              }>
                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                  {BULLETINS.slice(0, 2).map(b => (
                    <div key={b.id} style={{ display: "flex", alignItems: "flex-start", gap: 4 }}>
                      {b.unread && <div style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: C.blue, flexShrink: 0, marginTop: 3 }} />}
                      <p style={{ margin: 0, fontSize: 12, color: C.strong, fontFamily: DM_SANS, lineHeight: 1.3, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", opacity: b.unread ? 1 : 0.6 }}>
                        {b.title}
                      </p>
                    </div>
                  ))}
                </div>
              </NavCard>
              {/* Event Highlights */}
              <NavCard title="Events" borderColor={C.blue} onTap={() => navigate("/activity/event-highlights")} badge={
                <span style={{ fontSize: 10, color: C.muted, fontFamily: DM_SANS }}>Official</span>
              }>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {EVENTS.slice(0, 2).map(ev => (
                    <div key={ev.id} style={{ display: "flex", alignItems: "flex-start", gap: 5 }}>
                      <div style={{ width: 3, minHeight: 24, backgroundColor: ev.color, borderRadius: 99, flexShrink: 0, marginTop: 2 }} />
                      <p style={{ margin: 0, fontSize: 12, fontFamily: DM_SANS, color: C.strong, fontWeight: 700, lineHeight: 1.35, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{ev.name}</p>
                    </div>
                  ))}
                </div>
              </NavCard>
            </div>
          </div>
        </div>

        {/* Social Buddy Section */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ padding: "0 24px" }}>
            <SectionHeaderWithDot title="Social Buddy" color={C.blue} action="See all" onAction={() => navigate("/activity/social?tab=buddy")} />
          </div>
          <div style={{ display: "flex", gap: 14, overflowX: "auto", paddingLeft: 24, paddingRight: 24, paddingBottom: 6, scrollbarWidth: "none" } as React.CSSProperties}>
            {BUDDIES.slice(0, 3).map(buddy => (
              <HomeBuddyCard key={buddy.id} buddy={buddy} />
            ))}
          </div>
        </div>

        {/* Culture Bridge Entry Card */}
        <div style={{ padding: "0 24px 40px" }}>
          <button
            onClick={() => navigate("/activity/culture")}
            style={{
              width: "100%", backgroundColor: C.card,
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: 22,
              padding: "16px 18px", border: "none",
              boxShadow: "3px 3px 0px rgba(0,0,0,0.10)",
              cursor: "pointer", display: "flex", alignItems: "center", gap: 14,
              textAlign: "left",
            }}
          >
            <div style={{ flex: 1 }}>
              <p style={{ margin: "0 0 4px", fontSize: 16, fontFamily: LONDRINA, color: C.strong }}>
                Culture Bridge
              </p>
              <p style={{ margin: 0, fontSize: 14, color: C.muted, fontFamily: DM_SANS, lineHeight: 1.5 }}>
                Swedish tips · Global festivals · Community guides
              </p>
            </div>
            <SolidChevronRightIcon color={C.blue} size={14} />
          </button>
        </div>

      </div>
      <BottomNav active={1} />
    </PageWrapper>
  );
}
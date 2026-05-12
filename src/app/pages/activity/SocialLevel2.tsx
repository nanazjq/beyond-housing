import React from "react";
import { useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router";
import {
  C, LONDRINA, DM_SANS, PageWrapper, BackHeader, GeometricAvatar,
  TactileButton, SolidSparkleIcon, SolidCheckIcon, SolidSendIcon, BottomNav,
} from "../../components/kitchen/Shared";
import { BUDDIES, ACTIVITIES, COMMUNITY_POSTS , FacilityIcon } from "./ActivityShared";

type Tab = "buddy" | "explore" | "board";

/* ─── Tab Bar ────────────────────────────────────────────── */
function TabBar({ active, onSelect }: { active: Tab; onSelect: (t: Tab) => void }) {
  const tabs: { key: Tab; label: string }[] = [
    { key: "buddy",   label: "Buddy Feed"    },
    { key: "explore", label: "Explore"       },
    { key: "board",   label: "Community"     },
  ];
  return (
    <div style={{ display: "flex", padding: "0 20px", gap: 6, marginBottom: 20 }}>
      {tabs.map(t => (
        <button
          key={t.key}
          onClick={() => onSelect(t.key)}
          style={{
            flex: 1, padding: "9px 4px", borderRadius: 10, border: "none", cursor: "pointer",
            backgroundColor: active === t.key ? C.blue : "transparent",
            color: active === t.key ? "white" : C.muted,
            fontSize: 14, fontWeight: 700, fontFamily: DM_SANS,
            transition: "all 0.18s ease",
          }}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

/* ─── Buddy Card (full size for feed) ───────────────────── */
const ACT_ICON_BG: Record<string, string> = {
  [C.green]:  "#EAF6E8",
  [C.blue]:   "#EEF3FC",
  [C.orange]: "#FCF0EC",
  [C.pink]:   "#FBEEF1",
  [C.purple]: "#F0ECFB",
};

function actIconBg(color: string): string {
  return ACT_ICON_BG[color] || `${color}18`;
}

function BuddyFeedCard({ buddy, onTap }: { buddy: typeof BUDDIES[0]; onTap: () => void }) {
  const [joined, setJoined] = useState(false);
  return (
    <div
      onClick={onTap}
      style={{
        backgroundColor: C.card,
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: 22, padding: "16px 16px 14px",
        boxShadow: "3px 3px 0px rgba(0,0,0,0.10)", cursor: "pointer",
        display: "flex", flexDirection: "column", gap: 10,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <GeometricAvatar initial={buddy.initial} color={buddy.color} shape="circle" size={46} />
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 16, fontFamily: LONDRINA, color: C.strong }}>{buddy.name}</span>
            <span style={{ fontSize: 13, color: C.muted, fontFamily: DM_SANS }}>· {buddy.nationality}</span>
          </div>
          <p style={{ margin: "2px 0 0", fontSize: 16, fontFamily: DM_SANS, fontWeight: 700, color: C.strong }}>{buddy.activity}</p>
        </div>
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {buddy.tags.map(tag => (
          <span key={tag} style={{ backgroundColor: `${buddy.color}15`, color: buddy.color, borderRadius: 99, padding: "3px 10px", fontSize: 13, fontWeight: 700, fontFamily: DM_SANS }}>
            {tag}
          </span>
        ))}
        <span style={{ backgroundColor: `${C.blue}15`, color: C.blue, borderRadius: 99, padding: "3px 10px", fontSize: 13, fontWeight: 700, fontFamily: DM_SANS }}>
          {buddy.time}
        </span>
      </div>
      <button
        onClick={e => { e.stopPropagation(); setJoined(j => !j); }}
        style={{
          borderRadius: 10, border: "none",
          backgroundColor: joined ? C.green : C.blue,
          color: "white", fontSize: 16, fontWeight: 700, fontFamily: DM_SANS,
          padding: "10px", cursor: "pointer", transition: "background 0.2s ease",
        }}
      >
        {joined ? "Joined ✓" : "Join +"}
      </button>
    </div>
  );
}

/* ─── Smart Match View ───────────────────────────────────── */
function SmartMatchView({ onBack }: { onBack: () => void }) {
  const navigate = useNavigate();
  const myTags = ["Yoga", "Photography", "Art", "Outdoor"];
  const matches = BUDDIES.filter(b => b.tags.some(t => myTags.includes(t)));
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "0 20px 20px" }}>
        <button onClick={onBack} style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: "white", border: "none", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "3px 3px 0px rgba(0,0,0,0.10)", cursor: "pointer" }}>
          <svg width="18" height="18" viewBox="0 0 20 20"><path d="M13 3.5L5.5 10L13 16.5L11 10Z" fill={C.text}/></svg>
        </button>
        <h2 style={{ margin: 0, fontSize: 22, fontFamily: LONDRINA, color: C.strong }}>People You May Vibe With</h2>
      </div>
      <div style={{ padding: "0 20px", display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
        <span style={{ fontSize: 14, color: C.muted, fontFamily: DM_SANS }}>Based on your interests:</span>
        {myTags.map(t => (
          <span key={t} style={{ backgroundColor: `${C.blue}15`, color: C.blue, borderRadius: 99, padding: "2px 10px", fontSize: 13, fontWeight: 700, fontFamily: DM_SANS }}>{t}</span>
        ))}
      </div>
      <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 12 }}>
        {matches.map(buddy => (
          <BuddyFeedCard key={buddy.id} buddy={buddy} onTap={() => navigate(`/activity/buddy/${buddy.id}`)} />
        ))}
      </div>
    </div>
  );
}

/* ─── Buddy Dashboard ────────────────────────────────────── */
function BuddyDashboardView({ onBack }: { onBack: () => void }) {
  const activities = [
    { title: "Yoga in the Park",   partner: "Sarah K.", time: "Sat 10:00", status: "Confirmed", color: C.green  },
    { title: "Photography Walk",   partner: "Marcus",   time: "Sun 14:00", status: "Waiting",   color: C.blue   },
    { title: "Language Exchange",  partner: "Emma L.",  time: "Thu 19:00", status: "Pending",   color: C.blue },
  ];
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "0 20px 20px" }}>
        <button onClick={onBack} style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: "white", border: "none", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "3px 3px 0px rgba(0,0,0,0.10)", cursor: "pointer" }}>
          <svg width="18" height="18" viewBox="0 0 20 20"><path d="M13 3.5L5.5 10L13 16.5L11 10Z" fill={C.text}/></svg>
        </button>
        <h2 style={{ margin: 0, fontSize: 22, fontFamily: LONDRINA, color: C.strong }}>My Buddy Dashboard</h2>
      </div>
      <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 12 }}>
        {activities.map((a, i) => (
          <div key={i} style={{ backgroundColor: C.card,
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: 22, padding: "16px 18px", boxShadow: "3px 3px 0px rgba(0,0,0,0.10)", display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 4, height: 46, borderRadius: 99, backgroundColor: a.color, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontSize: 15, fontFamily: LONDRINA, color: C.strong }}>{a.title}</p>
              <p style={{ margin: "2px 0 0", fontSize: 14, color: C.muted, fontFamily: DM_SANS }}>with {a.partner} · {a.time}</p>
            </div>
            <span style={{
              borderRadius: 99, padding: "4px 12px", fontSize: 13, fontWeight: 700, fontFamily: DM_SANS,
              backgroundColor: a.status === "Confirmed" ? `${C.green}18` : `${C.blue}18`,
              color: a.status === "Confirmed" ? C.green : C.blue,
            }}>
              {a.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Tab 1: Buddy Feed ──────────────────────────────────── */

/* ─── Shared Modal Backdrop ─────────────────────────────── */
function ModalBackdrop({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "absolute", inset: 0, zIndex: 200, borderRadius: 50, overflow: "hidden",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex", alignItems: "flex-end", justifyContent: "center",
        padding: "0 16px 32px",
      }}
    >
      <div onClick={e => e.stopPropagation()} style={{
        width: "100%",
        backgroundColor: "#EFF3FC", borderRadius: 22,
        padding: "24px 20px 20px",
        boxShadow: "3px 3px 0px rgba(0,0,0,0.10)",
        overflow: "hidden",
        boxSizing: "border-box",
      }}>
        {children}
      </div>
    </div>
  );
}

/* ─── Buddy Need Modal ───────────────────────────────────── */
function BuddyNeedModal({ onClose }: { onClose: () => void }) {
  const [activity, setActivity] = useState("");
  const [keyword, setKeyword] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");

  const inputStyle: React.CSSProperties = {
    width: "100%", borderRadius: 16, border: `1.5px solid ${"#E4E6EA"}`,
    padding: "11px 14px", fontSize: 15, fontFamily: DM_SANS,
    color: C.strong, outline: "none", boxSizing: "border-box",
    backgroundColor: "white", marginBottom: 10,
  };

  return (
    <ModalBackdrop onClose={onClose}>
      <p style={{ margin: "0 0 14px", fontSize: 20, fontFamily: LONDRINA, color: C.strong }}>Post a Buddy Need</p>
      <input placeholder="What activity are you looking for?" value={activity} onChange={e => setActivity(e.target.value)} style={inputStyle} />
      <input placeholder="Keyword (e.g. Yoga, Hiking, Photography)" value={keyword} onChange={e => setKeyword(e.target.value)} style={inputStyle} />
      <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
        <input placeholder="Date & Time (e.g. Sat 10:00)" value={time} onChange={e => setTime(e.target.value)}
          style={{ ...inputStyle, flex: 1, margin: 0 }} />
        <input placeholder="Location" value={location} onChange={e => setLocation(e.target.value)}
          style={{ ...inputStyle, flex: 1, margin: 0 }} />
      </div>
      <div style={{ display: "flex", flexDirection: "row", gap: 12, width: "100%", marginTop: 4 }}>
        <button onClick={onClose} style={{
          flex: 1, borderRadius: 16, border: "none",
          backgroundColor: C.blue, padding: "14px 0",
          cursor: "pointer", color: "white",
          fontFamily: LONDRINA, fontSize: 17, fontWeight: 400,
          boxShadow: `0 4px 0 ${C.blueDark}`,
        }}>Post Need</button>
        <button onClick={onClose} style={{
          flex: 1, borderRadius: 16, border: "none",
          backgroundColor: "#E2E4E8", padding: "14px 0",
          cursor: "pointer", color: C.text,
          fontFamily: LONDRINA, fontSize: 17, fontWeight: 400,
        }}>Cancel</button>
      </div>
    </ModalBackdrop>
  );
}

/* ─── Community Post Modal ───────────────────────────────── */
const TAG_COLORS_MODAL: Record<string, string> = {
  Secondhand: C.blue, Share: C.green, Help: C.pink,
};

function CommunityPostModal({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tag, setTag] = useState("Share");

  const inputStyle: React.CSSProperties = {
    width: "100%", borderRadius: 16, border: `1.5px solid ${"#E4E6EA"}`,
    padding: "11px 14px", fontSize: 15, fontFamily: DM_SANS,
    color: C.strong, outline: "none", boxSizing: "border-box",
    backgroundColor: "white", marginBottom: 10,
  };

  return (
    <ModalBackdrop onClose={onClose}>
      <p style={{ margin: "0 0 14px", fontSize: 20, fontFamily: LONDRINA, color: C.strong }}>New Post</p>
      <input placeholder="Post title..." value={title} onChange={e => setTitle(e.target.value)} style={inputStyle} />
      <textarea placeholder="What's on your mind?" value={body} onChange={e => setBody(e.target.value)} rows={3}
        style={{ ...inputStyle, resize: "none" as const }} />
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        {["Share","Help","Secondhand"].map(t => (
          <button key={t} onClick={() => setTag(t)} style={{
            flex: 1, borderRadius: 99, padding: "6px 0", border: "none", cursor: "pointer",
            backgroundColor: tag === t ? `${TAG_COLORS_MODAL[t]}20` : "#F2F3F5",
            color: tag === t ? TAG_COLORS_MODAL[t] : C.muted,
            fontSize: 13, fontWeight: 700, fontFamily: DM_SANS,
          }}>{t}</button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "row", gap: 12, width: "100%" }}>
        <button onClick={onClose} style={{
          flex: 1, borderRadius: 16, border: "none",
          backgroundColor: C.blue, padding: "14px 0",
          cursor: "pointer", color: "white",
          fontFamily: LONDRINA, fontSize: 17, fontWeight: 400,
          boxShadow: `0 4px 0 ${C.blueDark}`,
        }}>Post</button>
        <button onClick={onClose} style={{
          flex: 1, borderRadius: 16, border: "none",
          backgroundColor: "#E2E4E8", padding: "14px 0",
          cursor: "pointer", color: C.text,
          fontFamily: LONDRINA, fontSize: 17, fontWeight: 400,
        }}>Cancel</button>
      </div>
    </ModalBackdrop>
  );
}

function BuddyFeedTab() {
  const navigate = useNavigate();
  const [view, setView] = useState<"feed" | "match" | "dashboard">("feed");
  if (view === "match")     return <SmartMatchView onBack={() => setView("feed")} />;
  if (view === "dashboard") return <BuddyDashboardView onBack={() => setView("feed")} />;

  return (
    <div style={{ position: "relative" }}>
      {/* Entry rows */}
      <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
        {[
          { label: "Smart Match", sublabel: "People you may vibe with", color: C.blue, icon: "smart", action: () => setView("match") },
          { label: "My Matching",  sublabel: "View confirmed activities",  color: C.blue,   icon: "matching", action: () => setView("dashboard") },
        ].map(entry => (
          <button key={entry.label} onClick={entry.action} style={{
            width: "100%", backgroundColor: C.card,
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: 16, padding: "14px 16px",
            border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 14,
            boxShadow: "3px 3px 0px rgba(0,0,0,0.10)", textAlign: "left",
          }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: `${entry.color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {entry.icon === "smart" && <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M11.9092 13.9998L19.7531 14.0002C20.9957 14.0002 22.0031 15.0075 22.0031 16.2502V17.1553C22.0031 18.2489 21.5256 19.2881 20.6958 20.0005C19.1303 21.3445 16.89 22.0013 14 22.0013L13.821 22.0002C14.1231 21.3917 14.0492 20.644 13.5995 20.1038L13.489 19.9829L11.2591 17.759C11.7394 16.9319 12 15.9854 12 15.0003C12 14.6586 11.9688 14.3242 11.9092 13.9998ZM6.5 10.5003C8.98528 10.5003 11 12.515 11 15.0003C11 16.0941 10.6097 17.0967 9.96089 17.8766L12.7827 20.6909C13.076 20.9834 13.0766 21.4583 12.784 21.7515C12.5181 22.0181 12.1014 22.0428 11.8076 21.8253L11.7234 21.7528L8.82025 18.8567C8.14274 19.2652 7.34881 19.5003 6.5 19.5003C4.01472 19.5003 2 17.4855 2 15.0003C2 12.515 4.01472 10.5003 6.5 10.5003ZM6.5 12.0003C4.84315 12.0003 3.5 13.3434 3.5 15.0003C3.5 16.6571 4.84315 18.0003 6.5 18.0003C8.15685 18.0003 9.5 16.6571 9.5 15.0003C9.5 13.3434 8.15685 12.0003 6.5 12.0003ZM14 2.00488C16.7614 2.00488 19 4.24346 19 7.00488C19 9.76631 16.7614 12.0049 14 12.0049C11.2386 12.0049 9 9.76631 9 7.00488C9 4.24346 11.2386 2.00488 14 2.00488Z" fill={entry.color}/></svg>}
              {entry.icon === "matching" && <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M14.77 12.4C14.92 12.47 15.09 12.5 15.25 12.5C15.58 12.5 15.89 12.37 16.13 12.14L18.31 10H19.25C20.77 10 22 8.77 22 7.25V4.75C22 3.23 20.77 2 19.25 2H14.75C13.23 2 12 3.23 12 4.75V7.25C12 8.51 12.85 9.57 14 9.9V11.25C14 11.75 14.31 12.2 14.77 12.4ZM8 13.5C6.07 13.5 4.5 11.93 4.5 10C4.5 8.07 6.07 6.5 8 6.5C9.93 6.5 11.5 8.07 11.5 10C11.5 11.93 9.93 13.5 8 13.5ZM8.00086 22C5.94086 22 4.36086 21.44 3.30086 20.33C1.96434 18.9257 1.99727 17.1555 2.00067 16.9727L2.00086 16.96C2.00086 15.89 2.90086 15 4.00086 15H12.0009C13.1009 15 14.0009 15.9 14.0009 17L14.001 17.0064C14.004 17.1325 14.0461 18.9165 12.7009 20.33C11.6409 21.44 10.0609 22 8.00086 22Z" fill={entry.color}/></svg>}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontSize: 15, fontFamily: LONDRINA, color: C.strong }}>{entry.label}</p>
              <p style={{ margin: "1px 0 0", fontSize: 14, color: C.muted, fontFamily: DM_SANS }}>{entry.sublabel}</p>
            </div>
            <svg width="12" height="12" viewBox="0 0 12 12"><path d="M3.5 1.5L8 6L3.5 10.5L5 6Z" fill={C.muted}/></svg>
          </button>
        ))}
      </div>

      {/* Post a Need form (collapsible) */}


      {/* Feed */}
      <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 12 }}>
        {BUDDIES.map(buddy => (
          <BuddyFeedCard key={buddy.id} buddy={buddy} onTap={() => navigate(`/activity/buddy/${buddy.id}`)} />
        ))}
      </div>


    </div>
  );
}

/* ─── Category Selector ─────────────────────────────────── */
const CATEGORIES = [
  { key: "All",         svg: (c: string) => <svg width="18" height="18" viewBox="0 0 24 24" fill={c}><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg> },
  { key: "Sports",      svg: (c: string) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M21.3786 11.4997C19.9489 16.2596 16.1795 20.0071 11.4064 21.4063L2.59373 12.5936C3.99287 7.82051 7.74038 4.05114 12.5003 2.62141L21.3786 11.4997ZM13.7197 9.21967L9.21967 13.7197C8.92678 14.0126 8.92678 14.4874 9.21967 14.7803C9.51256 15.0732 9.98744 15.0732 10.2803 14.7803L14.7803 10.2803C15.0732 9.98744 15.0732 9.51256 14.7803 9.21967C14.4874 8.92678 14.0126 8.92678 13.7197 9.21967ZM2.19916 14.3203L9.67968 21.8008C8.88925 21.9318 8.07758 22 7.25 22H6.25C3.90279 22 2 20.0972 2 17.75V16.75C2 15.9224 2.06816 15.1107 2.19916 14.3203ZM14.2169 2.21669L21.7833 9.78314C21.9258 8.96012 22 8.11373 22 7.25V6.25C22 3.90279 20.0972 2 17.75 2H16.75C15.8863 2 15.0399 2.07424 14.2169 2.21669Z" fill={c}/></svg> },
  { key: "Music",       svg: (c: string) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M23.4056 4.34436L19.6556 0.594365C19.5149 0.453634 19.324 0.374573 19.125 0.374573C18.926 0.374573 18.7351 0.453634 18.5944 0.594365C18.4537 0.735095 18.3746 0.925967 18.3746 1.12499C18.3746 1.32401 18.4537 1.51488 18.5944 1.65561L18.8147 1.87499L13.1738 7.51499C11.0372 6.40312 8.6447 6.49593 7.19533 7.94436C6.81283 8.32849 6.51322 8.78701 6.31501 9.29155C6.25415 9.42834 6.15484 9.54449 6.02918 9.62588C5.90352 9.70726 5.75692 9.75038 5.6072 9.74999C4.23939 9.79593 3.05158 10.2862 2.17126 11.1666C1.03876 12.3019 0.562513 13.9312 0.819388 15.7566C1.06876 17.5031 1.97533 19.2328 3.37501 20.625C4.7747 22.0172 6.50064 22.9275 8.25001 23.1769C8.5635 23.2237 8.87993 23.2482 9.19689 23.25C10.6331 23.25 11.8997 22.7597 12.8306 21.8287C13.711 20.9484 14.2013 19.7606 14.2472 18.3928C14.247 18.2428 14.2906 18.096 14.3725 17.9703C14.4544 17.8446 14.5711 17.7454 14.7085 17.685C15.2131 17.4869 15.6716 17.1873 16.0556 16.8047C17.5041 15.3553 17.5969 12.9609 16.485 10.8262L22.125 5.1853L22.3444 5.40561C22.4852 5.54621 22.6761 5.62527 22.875 5.62527C23.0739 5.62527 23.2648 5.54621 23.4056 5.40561C23.5462 5.26488 23.6253 5.07401 23.6253 4.87499C23.6253 4.67597 23.5462 4.4851 23.4056 4.34436ZM8.78064 19.2797C8.64 19.4202 8.44931 19.4992 8.25048 19.4992C8.05165 19.4992 7.86096 19.4202 7.72033 19.2797L4.72032 16.2797C4.57972 16.1389 4.50078 15.9481 4.50086 15.7492C4.50095 15.5503 4.58006 15.3595 4.72079 15.2189C4.86152 15.0783 5.05235 14.9993 5.25128 14.9994C5.45022 14.9995 5.64097 15.0786 5.78157 15.2194L8.78158 18.2194C8.922 18.3601 9.00078 18.5509 9.0006 18.7497C9.00043 18.9485 8.92131 19.1392 8.78064 19.2797ZM12.7313 14.9803C12.3642 15.3475 11.8965 15.5976 11.3872 15.699C10.878 15.8004 10.3502 15.7485 9.87043 15.5498C9.39072 15.3512 8.98068 15.0147 8.6922 14.583C8.40371 14.1513 8.24973 13.6437 8.24973 13.1245C8.24973 12.6053 8.40371 12.0977 8.6922 11.666C8.98068 11.2343 9.39072 10.8979 9.87043 10.6992C10.3502 10.5006 10.878 10.4487 11.3872 10.55C11.8965 10.6514 12.3642 10.9015 12.7313 11.2687C13.2233 11.761 13.4997 12.4285 13.4997 13.1245C13.4997 13.8205 13.2233 14.488 12.7313 14.9803ZM15.6431 9.5428C15.4665 9.3245 15.2788 9.11547 15.0806 8.91655C14.8816 8.71815 14.6723 8.53039 14.4535 8.35405L16.5 6.3103L17.6897 7.49999L15.6431 9.5428ZM18.75 6.43874L17.5613 5.24999L19.875 2.9353L21.0647 4.12499L18.75 6.43874Z" fill={c}/></svg> },
  { key: "Photography", svg: (c: string) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22.5 4.5C23.325 4.5 24 5.175 24 6V19.5C24 20.325 23.325 21 22.5 21H1.5C0.675 21 0 20.325 0 19.5V6C0 5.175 0.675 4.5 1.5 4.5C1.5 3.675 2.175 3 3 3H9C9.825 3 10.5 3.675 10.5 4.5H22.5ZM15.75 18C18.66 18 21 15.66 21 12.75C21 9.84 18.66 7.5 15.75 7.5C12.84 7.5 10.5 9.84 10.5 12.75C10.5 15.66 12.84 18 15.75 18ZM19.5 12.75C19.5 14.82 17.805 16.5 15.75 16.5C13.695 16.5 12 14.805 12 12.75C12 10.695 13.695 9 15.75 9C17.805 9 19.5 10.695 19.5 12.75ZM9 7.5V6H3V7.5H9Z" fill={c}/></svg> },
  { key: "Cooking",     svg: (c: string) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path fillRule="evenodd" clipRule="evenodd" d="M9 5C9 4.20435 9.31607 3.44129 9.87868 2.87868C10.4413 2.31607 11.2044 2 12 2C12.7956 2 13.5587 2.31607 14.1213 2.87868C14.6839 3.44129 15 4.20435 15 5H16C17.0609 5 18.0783 5.42143 18.8284 6.17157C19.5786 6.92172 20 7.93913 20 9H4C4 7.93913 4.42143 6.92172 5.17157 6.17157C5.92172 5.42143 6.93913 5 8 5H9ZM12 4C12.2652 4 12.5196 4.10536 12.7071 4.29289C12.8946 4.48043 13 4.73478 13 5H11C11 4.73478 11.1054 4.48043 11.2929 4.29289C11.4804 4.10536 11.7348 4 12 4ZM21 10C21.2652 10 21.5196 10.1054 21.7071 10.2929C21.8946 10.4804 22 10.7348 22 11C22 11.2652 21.8946 11.5196 21.7071 11.7071C21.5196 11.8946 21.2652 12 21 12H20V19C20 19.7956 19.6839 20.5587 19.1213 21.1213C18.5587 21.6839 17.7956 22 17 22H7C6.20435 22 5.44129 21.6839 4.87868 21.1213C4.31607 20.5587 4 19.7956 4 19V12H3C2.73478 12 2.48043 11.8946 2.29289 11.7071C2.10536 11.5196 2 11.2652 2 11C2 10.7348 2.10536 10.4804 2.29289 10.2929C2.48043 10.1054 2.73478 10 3 10H21ZM12 13C11.2044 13 10.4413 13.3161 9.87868 13.8787C9.31607 14.4413 9 15.2044 9 16C9 16.7956 9.31607 17.5587 9.87868 18.1213C10.4413 18.6839 11.2044 19 12 19C12.7956 19 13.5587 18.6839 14.1213 18.1213C14.6839 17.5587 15 16.7956 15 16C15 15.2044 14.6839 14.4413 14.1213 13.8787C13.5587 13.3161 12.7956 13 12 13ZM12 15C12.2652 15 12.5196 15.1054 12.7071 15.2929C12.8946 15.4804 13 15.7348 13 16C13 16.2652 12.8946 16.5196 12.7071 16.7071C12.5196 16.8946 12.2652 17 12 17C11.7348 17 11.4804 16.8946 11.2929 16.7071C11.1054 16.5196 11 16.2652 11 16C11 15.7348 11.1054 15.4804 11.2929 15.2929C11.4804 15.1054 11.7348 15 12 15Z" fill={c}/></svg> },
  { key: "Art",         svg: (c: string) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M21.75 3C21.75 2.80109 21.671 2.61032 21.5303 2.46967C21.3897 2.32902 21.1989 2.25 21 2.25C16.8675 2.25 12.6272 6.91031 10.2722 9.99656C9.43112 9.73898 8.54137 9.68224 7.6744 9.83089C6.80743 9.97954 5.98741 10.3294 5.2802 10.8525C4.57298 11.3755 3.99829 12.0571 3.60228 12.8426C3.20627 13.628 2.99999 14.4954 2.99999 15.375C2.99999 18.27 1.16811 19.5684 1.08093 19.6284C0.947885 19.7183 0.847179 19.8484 0.793618 19.9998C0.740056 20.1511 0.736465 20.3156 0.783373 20.4692C0.830281 20.6227 0.925213 20.7571 1.05421 20.8527C1.1832 20.9482 1.33946 20.9999 1.49999 21H8.62499C9.50461 21 10.372 20.7937 11.1574 20.3977C11.9428 20.0017 12.6245 19.427 13.1475 18.7198C13.6706 18.0126 14.0205 17.1926 14.1691 16.3256C14.3178 15.4586 14.261 14.5689 14.0034 13.7278C17.0906 11.3728 21.75 7.1325 21.75 3ZM11.6644 10.6453C11.9856 10.2291 12.3009 9.83688 12.6103 9.46875C13.3675 9.98035 14.0196 10.6324 14.5312 11.3897C14.1625 11.6984 13.7703 12.0138 13.3547 12.3356C12.9176 11.6586 12.3414 11.0824 11.6644 10.6453ZM15.6675 10.3941C15.1013 9.59512 14.4039 8.89778 13.605 8.33156C16.5844 5.09438 18.8316 4.11281 20.1581 3.84C19.8909 5.1675 18.9047 7.41469 15.6675 10.3941Z" fill={c}/></svg> },
  { key: "Language",    svg: (c: string) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4.91307 2.65823C6.9877 2.38888 9.10296 2.25 11.2503 2.25C13.3974 2.25 15.5124 2.38885 17.5869 2.65815C19.5091 2.90769 20.8783 4.51937 20.9923 6.38495C20.6665 6.27614 20.3212 6.20396 19.96 6.17399C18.5715 6.05874 17.1673 6 15.75 6C14.3326 6 12.9285 6.05874 11.54 6.17398C9.1817 6.36971 7.5 8.36467 7.5 10.6082V14.8937C7.5 16.5844 8.45468 18.1326 9.9328 18.8779L7.28033 21.5303C7.06583 21.7448 6.74324 21.809 6.46299 21.6929C6.18273 21.5768 6 21.3033 6 21V16.9705C5.63649 16.9316 5.27417 16.8887 4.91308 16.8418C2.90466 16.581 1.5 14.8333 1.5 12.8626V6.63738C1.5 4.66672 2.90466 2.91899 4.91307 2.65823Z" fill={c}/><path d="M15.75 7.5C14.3741 7.5 13.0114 7.55702 11.6641 7.66884C10.1248 7.7966 9 9.10282 9 10.6082V14.8937C9 16.4014 10.128 17.7083 11.6692 17.8341C12.9131 17.9357 14.17 17.9912 15.4384 17.999L18.2197 20.7803C18.4342 20.9948 18.7568 21.059 19.037 20.9429C19.3173 20.8268 19.5 20.5533 19.5 20.25V17.8601C19.6103 17.8518 19.7206 17.8432 19.8307 17.8342C21.372 17.7085 22.5 16.4015 22.5 14.8938V10.6082C22.5 9.10283 21.3752 7.79661 19.836 7.66885C18.4886 7.55702 17.1259 7.5 15.75 7.5Z" fill={c}/></svg> },
  { key: "Hiking",      svg: (c: string) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M8.97618 3.5597C8.87311 3.15852 8.46433 2.91685 8.06314 3.01993C7.73793 3.10348 7.51754 3.38792 7.50064 3.70636C5.6813 4.30069 4.54951 5.22333 3.8766 6.29451C3.16922 7.42055 3.02805 8.61916 3.00366 9.54098C3.00284 9.57227 3.00214 9.60328 3.00157 9.63399L2.49507 10.2672C1.67456 11.293 1.90359 12.8006 2.99173 13.5365L12.0592 19.6683C13.3411 20.5352 14.8532 20.9984 16.4006 20.9984H18.609C20.4825 20.9984 22.0013 19.4796 22.0013 17.6061C22.0013 17.448 21.99 17.2926 21.9683 17.1404C21.7309 15.4796 20.2964 14.3302 19.0169 13.7133C18.6025 13.5135 18.2591 13.2524 18.0308 12.9171L15.4482 8.47252C15.7877 8.37861 16.024 8.05448 15.995 7.69024C15.9621 7.27734 15.6008 6.96925 15.1879 7.00212C14.8584 7.02834 14.5293 7.03451 14.2038 7.02102C11.8441 6.92321 9.83857 5.82005 9.13035 4.03429C9.07006 3.88228 9.01843 3.72412 8.97618 3.5597ZM6.3935 5.85964L7.97851 8.60495C8.39272 9.32239 8.14691 10.2398 7.42947 10.654L7.04446 10.8763L4.52321 9.17543C4.57551 8.47924 4.73072 7.75472 5.14677 7.09242C5.41326 6.6682 5.80465 6.24163 6.3935 5.85964ZM8.43459 11.8141L11.228 10.2013C11.9454 9.7871 12.8628 10.0329 13.277 10.7503L13.8009 11.6578C14.2151 12.3752 13.9693 13.2926 13.2519 13.7068L12.1679 14.3326L8.43459 11.8141ZM16.3694 17.9965H20.461C20.2811 18.8543 19.5202 19.4984 18.609 19.4984H16.4006C15.1527 19.4984 13.9333 19.1248 12.8995 18.4257L3.832 12.2939C3.46929 12.0486 3.39294 11.5461 3.66645 11.2042L4.08068 10.6863L13.713 17.1843C14.4977 17.7137 15.4228 17.9965 16.3694 17.9965Z" fill={c}/></svg> },
];

/* ─── Tab 2: Explore Activities ──────────────────────────── */
function ExploreTab() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [pressedCat, setPressedCat] = useState<string | null>(null);
  const [distanceSort, setDistanceSort] = useState<"near"|"far">("near");
  const [timeFilter, setTimeFilter] = useState<"all"|"morning"|"afternoon"|"evening">("all");
  const [costFilter, setCostFilter] = useState<"all"|"free"|"paid">("all");

  let filtered = activeCategory === "All" ? ACTIVITIES : ACTIVITIES.filter(a => a.category === activeCategory);
  // Cost filter
  if (costFilter === "free") filtered = filtered.filter(a => String(a.cost).toLowerCase() === "free");
  if (costFilter === "paid") filtered = filtered.filter(a => String(a.cost).toLowerCase() !== "free");
  // Time filter
  if (timeFilter === "morning") filtered = filtered.filter(a => { const parts = (a.time||"").split(" "); const h = parts.length > 1 ? parseInt(parts[1].split(":")[0]) : parseInt(parts[0].split(":")[0]); return h >= 6 && h < 12; });
  if (timeFilter === "afternoon") filtered = filtered.filter(a => { const parts = (a.time||"").split(" "); const h = parts.length > 1 ? parseInt(parts[1].split(":")[0]) : parseInt(parts[0].split(":")[0]); return h >= 12 && h < 18; });
  if (timeFilter === "evening") filtered = filtered.filter(a => { const parts = (a.time||"").split(" "); const h = parts.length > 1 ? parseInt(parts[1].split(":")[0]) : parseInt(parts[0].split(":")[0]); return h >= 18; });
  // Distance sort
  const getDist = (loc: string) => {
    const m = loc.match(/([\d.]+)\s*(km|m)/i);
    if (!m) return 999;
    return m[2].toLowerCase() === "km" ? parseFloat(m[1]) * 1000 : parseFloat(m[1]);
  };
  if (distanceSort === "near") filtered = [...filtered].sort((a, b) => getDist(a.location||"") - getDist(b.location||""));
  if (distanceSort === "far") filtered = [...filtered].sort((a, b) => getDist(b.location||"") - getDist(a.location||""));

  const normal = filtered.filter(a => !a.deepdive);
  const deepdive = filtered.filter(a => a.deepdive);

  return (
    <div style={{ position: "relative" }}>
      {/* ── Row 1: Category chips — 水平单行，图标+文字内联 ── */}
      <div style={{ display: "flex", gap: 6, overflowX: "auto", padding: "0 20px 10px", scrollbarWidth: "none" } as React.CSSProperties}>
        {CATEGORIES.map(cat => {
          const isActive = activeCategory === cat.key;
          return (
            <button key={cat.key}
              onPointerDown={() => setPressedCat(cat.key)}
              onPointerUp={() => { setPressedCat(null); setActiveCategory(cat.key); }}
              onPointerLeave={() => setPressedCat(null)}
              style={{
              flexShrink: 0, borderRadius: 99,
              padding: "6px 14px",
              border: "none", cursor: "pointer",
              backgroundColor: isActive ? C.blue : "rgba(255,255,255,0.7)",
              color: isActive ? "white" : C.muted,
              fontSize: 13, fontWeight: 600, fontFamily: DM_SANS,
              boxShadow: isActive ? "2px 2px 0px rgba(0,0,0,0.12)" : "none",
              transition: "all 0.15s ease",
              transform: pressedCat === cat.key ? "scale(0.93)" : "scale(1)",
              display: "flex", alignItems: "center", gap: 6,
            }}>
              {cat.svg(isActive ? "white" : C.muted)}
              <span>{cat.key}</span>
            </button>
          );
        })}
      </div>

      {/* ── Row 2: Filters button + active filter tags ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 20px 14px", position: "relative" }}>

        {/* Filters trigger */}
        <button onClick={() => setActiveFilter(activeFilter === "panel" ? null : "panel")} style={{
          display: "flex", alignItems: "center", gap: 6,
          borderRadius: 99, padding: "6px 14px", border: "none", cursor: "pointer",
          backgroundColor: (distanceSort !== "near" || timeFilter !== "all" || costFilter !== "all") ? C.blue : "white",
          color: (distanceSort !== "near" || timeFilter !== "all" || costFilter !== "all") ? "white" : C.text,
          fontSize: 13, fontWeight: 600, fontFamily: DM_SANS,
          boxShadow: "2px 2px 0px rgba(0,0,0,0.10)", flexShrink: 0,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 5h18M6 12h12M10 19h4"/>
            <line x1="3" y1="5" x2="21" y2="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <line x1="6" y1="12" x2="18" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <line x1="10" y1="19" x2="14" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Filters {(distanceSort !== "near" || timeFilter !== "all" || costFilter !== "all") && "·  On"}
        </button>

        {/* Active filter tags */}
        {distanceSort === "far" && (
          <div style={{ display: "flex", alignItems: "center", gap: 5, backgroundColor: `${C.blue}15`, borderRadius: 99, padding: "5px 12px" }}>
            <span style={{ fontSize: 12, color: C.blue, fontFamily: DM_SANS, fontWeight: 600 }}>Farthest first</span>
            <button onClick={() => setDistanceSort("near")} style={{ background: "none", border: "none", cursor: "pointer", color: C.blue, fontSize: 14, lineHeight: 1, padding: 0 }}>×</button>
          </div>
        )}
        {timeFilter !== "all" && (
          <div style={{ display: "flex", alignItems: "center", gap: 5, backgroundColor: `${C.blue}15`, borderRadius: 99, padding: "5px 12px" }}>
            <span style={{ fontSize: 12, color: C.blue, fontFamily: DM_SANS, fontWeight: 600, textTransform: "capitalize" }}>{timeFilter}</span>
            <button onClick={() => setTimeFilter("all")} style={{ background: "none", border: "none", cursor: "pointer", color: C.blue, fontSize: 14, lineHeight: 1, padding: 0 }}>×</button>
          </div>
        )}
        {costFilter !== "all" && (
          <div style={{ display: "flex", alignItems: "center", gap: 5, backgroundColor: `${C.blue}15`, borderRadius: 99, padding: "5px 12px" }}>
            <span style={{ fontSize: 12, color: C.blue, fontFamily: DM_SANS, fontWeight: 600, textTransform: "capitalize" }}>{costFilter}</span>
            <button onClick={() => setCostFilter("all")} style={{ background: "none", border: "none", cursor: "pointer", color: C.blue, fontSize: 14, lineHeight: 1, padding: 0 }}>×</button>
          </div>
        )}

        {/* Filter panel */}
        {activeFilter === "panel" && (
          <div style={{
            position: "absolute", top: "calc(100% + 4px)", left: 20, zIndex: 200,
            backgroundColor: "white", borderRadius: 22,
            boxShadow: "0 8px 32px rgba(0,0,0,0.14)", overflow: "hidden", minWidth: 280,
            border: "1px solid rgba(0,0,0,0.06)",
          }}>
            {/* Distance */}
            <div style={{ padding: "16px 18px 12px" }}>
              <p style={{ margin: "0 0 10px", fontSize: 12, fontWeight: 700, color: C.muted, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: DM_SANS }}>Distance</p>
              <div style={{ display: "flex", gap: 8 }}>
                {[{v:"near",l:"Nearest"},{v:"far",l:"Farthest"}].map(o => (
                  <button key={o.v} onClick={() => setDistanceSort(o.v as "near"|"far")} style={{
                    borderRadius: 99, padding: "6px 16px", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: DM_SANS,
                    backgroundColor: distanceSort === o.v ? C.blue : `${C.blue}10`,
                    color: distanceSort === o.v ? "white" : C.blue,
                  }}>{o.l}</button>
                ))}
              </div>
            </div>
            <div style={{ height: 1, backgroundColor: C.divider, margin: "0 18px" }} />
            {/* Time */}
            <div style={{ padding: "12px 18px" }}>
              <p style={{ margin: "0 0 10px", fontSize: 12, fontWeight: 700, color: C.muted, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: DM_SANS }}>Time of day</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {[{v:"all",l:"Any"},{v:"morning",l:"Morning"},{v:"afternoon",l:"Afternoon"},{v:"evening",l:"Evening"}].map(o => (
                  <button key={o.v} onClick={() => setTimeFilter(o.v as "all"|"morning"|"afternoon"|"evening")} style={{
                    borderRadius: 99, padding: "6px 16px", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: DM_SANS,
                    backgroundColor: timeFilter === o.v ? C.blue : `${C.blue}10`,
                    color: timeFilter === o.v ? "white" : C.blue,
                  }}>{o.l}</button>
                ))}
              </div>
            </div>
            <div style={{ height: 1, backgroundColor: C.divider, margin: "0 18px" }} />
            {/* Cost */}
            <div style={{ padding: "12px 18px 16px" }}>
              <p style={{ margin: "0 0 10px", fontSize: 12, fontWeight: 700, color: C.muted, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: DM_SANS }}>Cost</p>
              <div style={{ display: "flex", gap: 8 }}>
                {[{v:"all",l:"Any"},{v:"free",l:"Free"},{v:"paid",l:"Paid"}].map(o => (
                  <button key={o.v} onClick={() => setCostFilter(o.v as "all"|"free"|"paid")} style={{
                    borderRadius: 99, padding: "6px 16px", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: DM_SANS,
                    backgroundColor: costFilter === o.v ? C.blue : `${C.blue}10`,
                    color: costFilter === o.v ? "white" : C.blue,
                  }}>{o.l}</button>
                ))}
              </div>
            </div>
            {/* Done */}
            <div style={{ padding: "0 18px 16px" }}>
              <button onClick={() => setActiveFilter(null)} style={{
                width: "100%", borderRadius: 99, padding: "10px", border: "none", cursor: "pointer",
                backgroundColor: C.blue, color: "white", fontSize: 14, fontWeight: 700, fontFamily: DM_SANS,
              }}>Done</button>
            </div>
          </div>
        )}
      </div>

      {/* Discovery Feed */}
      <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 12, marginBottom: normal.length ? 24 : 0 }}>
        {normal.map(act => (
          <div key={act.id} onClick={() => navigate(`/activity/activity/${act.id}`)} style={{
            backgroundColor: C.card,
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: 22, padding: "16px 16px 14px",
            boxShadow: "3px 3px 0px rgba(0,0,0,0.10)", cursor: "pointer",
            display: "flex", gap: 14, alignItems: "flex-start",
          }}>
            <div style={{ width: 52, height: 52, borderRadius: 16, backgroundColor: actIconBg(act.color), display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>
              {act.emoji}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ margin: "0 0 3px", fontSize: 16, fontFamily: LONDRINA, color: C.strong }}>{act.title}</p>
              <p style={{ margin: "0 0 6px", fontSize: 14, color: C.muted, fontFamily: DM_SANS }}>{act.time} · {act.location}</p>
              <p style={{ margin: "0 0 8px", fontSize: 14, color: C.text, fontFamily: DM_SANS, lineHeight: 1.5, display: "-webkit-box", overflow: "hidden", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{act.desc}</p>
              <div style={{ display: "flex", gap: 6 }}>
                <span style={{ backgroundColor: actIconBg(act.color), color: act.color, borderRadius: 99, padding: "3px 10px", fontSize: 13, fontWeight: 700, fontFamily: DM_SANS }}>{act.cost}</span>
                <span style={{ backgroundColor: "#F2F3F5", color: C.muted, borderRadius: 99, padding: "3px 10px", fontSize: 13, fontWeight: 600, fontFamily: DM_SANS }}>{act.spots} spots</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Activity DeepDive Section */}
      {deepdive.length > 0 && (
        <div style={{ padding: "0 20px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <SolidSparkleIcon color={C.blue} size={14} />
            <span style={{ fontSize: 13, color: C.blue, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: DM_SANS }}>Activity DeepDive</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {deepdive.map(act => (
              <div key={act.id} onClick={() => navigate(`/activity/activity/${act.id}?deep=1`)} style={{
                backgroundColor: actIconBg(act.color),
                border: `1.5px solid ${act.color}70`,
                borderRadius: 22, padding: "18px 16px",
                cursor: "pointer", display: "flex", gap: 14,
              }}>
                <div style={{ width: 48, height: 48, borderRadius: 10, backgroundColor: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
                  {act.emoji}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                    <SolidSparkleIcon color={act.color} size={11} />
                    <span style={{ fontSize: 12, color: act.color, fontWeight: 700, fontFamily: DM_SANS, letterSpacing: "0.05em" }}>GROWTH PICK</span>
                  </div>
                  <p style={{ margin: "0 0 4px", fontSize: 15, fontFamily: LONDRINA, color: C.strong }}>{act.title}</p>
                  <p style={{ margin: 0, fontSize: 14, color: C.muted, fontFamily: DM_SANS }}>{act.time} · {act.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}


    </div>
  );
}

/* ─── Post Card ──────────────────────────────────────────── */
const TAG_COLORS: Record<string, string> = {
  Secondhand: C.blue, Share: C.green, Help: C.pink,
};

function PostCard({ post, onTap }: { post: typeof COMMUNITY_POSTS[0]; onTap: () => void }) {
  const [liked, setLiked] = useState(false);
  const tagColor = TAG_COLORS[post.tag] ?? C.muted;
  return (
    <div onClick={onTap} style={{ backgroundColor: C.card,
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: 22, padding: "16px", boxShadow: "3px 3px 0px rgba(0,0,0,0.10)", cursor: "pointer" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <GeometricAvatar initial={post.initial} color={post.color} shape="circle" size={36} />
        <div style={{ flex: 1 }}>
          <span style={{ fontSize: 15, fontFamily: LONDRINA, color: C.strong }}>{post.name}</span>
          <span style={{ fontSize: 13, color: C.muted, fontFamily: DM_SANS }}> · {post.timePosted}</span>
        </div>
        <span style={{ backgroundColor: `${tagColor}18`, color: tagColor, borderRadius: 99, padding: "3px 10px", fontSize: 12, fontWeight: 700, fontFamily: DM_SANS }}>{post.tag}</span>
      </div>
      <p style={{ margin: "0 0 6px", fontSize: 15, fontFamily: LONDRINA, color: C.strong }}>{post.title}</p>
      <p style={{ margin: "0 0 12px", fontSize: 15, color: C.text, fontFamily: DM_SANS, lineHeight: 1.55, display: "-webkit-box", overflow: "hidden", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{post.content}</p>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <button onClick={e => { e.stopPropagation(); setLiked(l => !l); }} style={{ display: "flex", alignItems: "center", gap: 5, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
          <svg width="15" height="15" viewBox="0 0 15 15">
            <path d="M7.5 13.5C7.5 13.5 1.5 9.5 1.5 5.5C1.5 3.3 3.3 1.5 5.5 1.5C6.5 1.5 7.5 2 7.5 2C7.5 2 8.5 1.5 9.5 1.5C11.7 1.5 13.5 3.3 13.5 5.5C13.5 9.5 7.5 13.5 7.5 13.5Z"
              fill={liked ? C.pink : C.muted} opacity={liked ? 1 : 0.35}/>
          </svg>
          <span style={{ fontSize: 14, color: liked ? C.pink : C.muted, fontFamily: DM_SANS, fontWeight: 600 }}>{post.likes + (liked ? 1 : 0)}</span>
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <svg width="15" height="15" viewBox="0 0 15 15"><path d="M2 3C2 2.4 2.4 2 3 2H12C12.6 2 13 2.4 13 3V9C13 9.6 12.6 10 12 10H8.5L6 13V10H3C2.4 10 2 9.6 2 9V3Z" fill={C.muted} opacity="0.35"/></svg>
          <span style={{ fontSize: 14, color: C.muted, fontFamily: DM_SANS, fontWeight: 600 }}>{post.comments}</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Tab 3: Community Board ─────────────────────────────── */
function CommunityBoardTab() {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState<"newest" | "hottest">("newest");
  const [showPostForm, setShowPostForm] = useState(false);
  const sorted = sortBy === "hottest" ? [...COMMUNITY_POSTS].sort((a, b) => b.likes - a.likes) : COMMUNITY_POSTS;

  return (
    <div style={{ position: "relative" }}>
      {/* Sort filters */}
      <div style={{ display: "flex", gap: 8, padding: "0 20px 16px" }}>
        {(["newest", "hottest"] as const).map(s => (
          <button key={s} onClick={() => setSortBy(s)} style={{
            borderRadius: 99, padding: "7px 18px", border: "none", cursor: "pointer",
            backgroundColor: sortBy === s ? C.blue : "white",
            color: sortBy === s ? "white" : C.text,
            fontSize: 15, fontWeight: 700, fontFamily: DM_SANS,
            boxShadow: "3px 3px 0px rgba(0,0,0,0.10)", transition: "all 0.15s ease",
          }}>
            {s === "newest" ? "Newest" : <span style={{display:"flex",alignItems:"center",gap:4}}>Hottest <FlameIcon color={C.orange} size={15}/></span>}
          </button>
        ))}
      </div>

      {/* Feed */}
      <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 12 }}>
        {sorted.map(post => (
          <PostCard key={post.id} post={post} onTap={() => navigate(`/activity/post/${post.id}`)} />
        ))}
      </div>


    </div>
  );
}

/* ─── Social Level 2 Page ────────────────────────────────── */
function FlameIcon({ color = "black", size = 18 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M6.15636 9.3231L6.15395 9.32491L6.15 9.3279L6.13963 9.33586C6.13164 9.34204 6.12151 9.34999 6.10942 9.35973C6.08524 9.37919 6.05314 9.40581 6.01442 9.43966C5.93703 9.50732 5.83284 9.6042 5.71236 9.73104C5.47171 9.98437 5.16368 10.3598 4.8751 10.8629C4.29291 11.8779 3.80368 13.3906 4.07868 15.4142C4.34997 17.4107 5.18833 19.0801 6.60711 20.244C8.02084 21.4038 9.93533 22 12.25 22C14.6375 22 16.5425 21.1054 17.8042 19.5699C19.0544 18.0486 19.6122 15.9741 19.4787 13.706C19.3508 11.5302 18.1656 9.87945 17.1188 8.42123C17.0177 8.28043 16.9179 8.14142 16.8205 8.00391C15.6785 6.39222 14.7768 4.90657 14.9959 2.82863C15.0182 2.61721 14.9497 2.40625 14.8075 2.24824C14.6652 2.09023 14.4626 2 14.25 2C13.868 2 13.4309 2.11822 13.0077 2.29599C12.5715 2.47923 12.0984 2.74751 11.6351 3.09694C10.7104 3.79438 9.78589 4.84563 9.29236 6.25159C8.80006 7.65408 9.04947 8.99089 9.41008 9.9632C9.64689 10.6017 9.39005 11.233 9.00347 11.4165C8.66159 11.5789 8.25252 11.4427 8.07619 11.1078L7.26887 9.57452C7.16673 9.38052 6.98481 9.24093 6.77099 9.19248C6.55717 9.14403 6.33215 9.19209 6.15636 9.3231Z" fill={color}/>
    </svg>
  );
}

export default function SocialLevel2() {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawTab = searchParams.get("tab") as Tab | null;
  const activeTab: Tab = rawTab && ["buddy","explore","board"].includes(rawTab) ? rawTab : "explore";
  const navigate = useNavigate();

  const setTab = (t: Tab) => setSearchParams({ tab: t });

  return (
    <PageWrapper bg="#EFF3FC">
      <div style={{ flex: 1, overflowY: "auto", scrollbarWidth: "none", paddingBottom: 16 } as React.CSSProperties}>
        <div style={{ position: "sticky", top: 0, zIndex: 49, backgroundColor: "#EFF3FC" }}>
          <BackHeader
            title={activeTab === "buddy" ? "Social Buddy" : activeTab === "explore" ? "Explore Activities" : "Community Board"}
            subtitle="Activity Module"
            onBack={() => navigate("/activity")}
            bg="#EFF3FC"
          />
          <TabBar active={activeTab} onSelect={setTab} />
        </div>

        {activeTab === "buddy"   && <BuddyFeedTab onPostClick={() => {}} />}
        {activeTab === "explore" && <ExploreTab />}
        {activeTab === "board"   && <CommunityBoardTab />}
      </div>

      {/* FAB - absolute within phone container, above nav */}
      <FabButton activeTab={activeTab} />

      <BottomNav active={1} />
    </PageWrapper>
  );
}

/* ─── FAB Button ─────────────────────────────────────────── */
function FabButton({ activeTab }: { activeTab: Tab }) {
  const navigate = useNavigate();
  const [showBuddyModal, setShowBuddyModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);

  const handleFab = () => {
    if (activeTab === "buddy") setShowBuddyModal(true);
    else if (activeTab === "explore") navigate("/activity/create");
    else setShowPostModal(true);
  };

  return (
    <>
      <button
        onClick={handleFab}
        style={{
          position: "absolute", bottom: 80, right: 20,
          width: 52, height: 52, borderRadius: "50%",
          backgroundColor: C.blue, border: "none",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 6px 20px ${C.blue}55`, cursor: "pointer",
          zIndex: 50,
        }}
      >
        <svg width="22" height="22" viewBox="0 0 22 22">
          <rect x="9.5" y="2" width="3" height="18" rx="1.5" fill="white"/>
          <rect x="2" y="9.5" width="18" height="3" rx="1.5" fill="white"/>
        </svg>
      </button>
      {showBuddyModal && <BuddyNeedModal onClose={() => setShowBuddyModal(false)} />}
      {showPostModal && <CommunityPostModal onClose={() => setShowPostModal(false)} />}
    </>
  );
}
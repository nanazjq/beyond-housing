import React from "react";
import { useNavigate } from "react-router";
import { C, LONDRINA, DM_SANS, PageWrapper, BottomNav, GeometricAvatar } from "../../components/kitchen/Shared";

const PINK = C.pink;

/* ─── Chat data ──────────────────────────────────────────── */
type Chat = {
  id: number; initial: string; color: string; name: string;
  preview: string; time: string; unread?: number; isGroup?: boolean;
};

const CHATS: Chat[] = [
  { id: 1, initial: "M", color: C.pink,   name: "Marcus",                  preview: "See you at Gamla Stan! 📷",                     time: "14:30", unread: 2 },
  { id: 2, initial: "G", color: C.blue,   name: "Photography Walk Group",  preview: "Let's meet at the metro exit!",                  time: "13:00", unread: 5, isGroup: true },
  { id: 3, initial: "S", color: C.blue,   name: "Sarah K.",                preview: "Should we bring yoga mats?",                    time: "09:15" },
  { id: 4, initial: "L", color: C.green,  name: "Lena",                    preview: "Haha yeah the yoga was so good 😄",              time: "Yesterday" },
  { id: 5, initial: "F", color: C.purple, name: "Floor 3 Residents",       preview: "Anyone know where the extra chairs are?",        time: "Yesterday", unread: 1, isGroup: true },
  { id: 6, initial: "T", color: C.orange, name: "Tom",                     preview: "Thanks for the heads up about the elevator!",   time: "Mon" },
  { id: 7, initial: "A", color: C.blue,   name: "Aiko",                    preview: "Are you going to the Winter Mixer? 🎉",          time: "Mon" },
  { id: 8, initial: "W", color: C.green,  name: "Winter Mixer Group",      preview: "Confirmed: 18:00 at Common Hall. See you all!", time: "Sun", isGroup: true },
  { id: 9, initial: "N", color: C.pink,   name: "Nina",                    preview: "The Swedish fika yesterday was amazing ☕",       time: "Sun" },
];

/* ─── Group icon ─────────────────────────────────────────── */
function GroupIcon({ color, size = 20 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill={color}>
      <circle cx="6" cy="7" r="3"/>
      <path d="M0 17C0 13.5 2.5 11.5 6 11.5C9.5 11.5 12 13.5 12 17H0Z"/>
      <circle cx="14" cy="8" r="2.5" opacity="0.7"/>
      <path d="M9 17C9 14 11 12 14 12C17 12 19 14 19 17H9Z" opacity="0.7"/>
    </svg>
  );
}

/* ─── Single chat row ────────────────────────────────────── */
function ChatRow({ chat, isLast }: { chat: Chat; isLast: boolean }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/message/chat/${chat.id}`)}
      style={{
        display: "flex", alignItems: "center", gap: 14,
        padding: "14px 18px",
        borderBottom: isLast ? "none" : `1px solid ${C.divider}`,
        cursor: "pointer",
      }}
    >
      {/* Avatar */}
      <div style={{ position: "relative", flexShrink: 0 }}>
        {chat.isGroup ? (
          <div style={{ width: 50, height: 50, borderRadius: 16, backgroundColor: `${chat.color}20`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <GroupIcon color={chat.color} size={22} />
          </div>
        ) : (
          <GeometricAvatar initial={chat.initial} color={chat.color} size={50} shape="circle" />
        )}
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 3 }}>
          <span style={{
            fontSize: 17, fontFamily: LONDRINA, color: C.strong,
            fontWeight: chat.unread ? 700 : 400,
          }}>{chat.name}</span>
          <span style={{
            fontSize: 12, fontFamily: DM_SANS, flexShrink: 0, marginLeft: 8,
            color: chat.unread ? PINK : C.muted,
            fontWeight: chat.unread ? 700 : 400,
          }}>{chat.time}</span>
        </div>
        <p style={{
          margin: 0, fontSize: 14, fontFamily: DM_SANS, lineHeight: 1.4,
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
          color: chat.unread ? C.text : C.muted,
          fontWeight: chat.unread ? 600 : 400,
        }}>{chat.preview}</p>
      </div>

      {/* Unread badge */}
      {chat.unread && (
        <div style={{ width: 22, height: 22, borderRadius: "50%", backgroundColor: PINK, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ fontSize: 12, color: "white", fontFamily: DM_SANS, fontWeight: 700 }}>{chat.unread}</span>
        </div>
      )}
    </div>
  );
}

/* ─── Geometric background ───────────────────────────────── */
function MessageGeoBg() {
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
      <div style={{ position: "absolute", top: 14, right: -22, width: 88, height: 88, borderRadius: 10, backgroundColor: C.pink, opacity: 0.09, transform: "rotate(15deg)" }} />
      <svg style={{ position: "absolute", bottom: -6, left: -8, opacity: 0.09 }} width="96" height="84">
        <polygon points="48,5 90,79 6,79" fill={C.pink} transform="rotate(-11, 48, 42)" />
      </svg>
      <div style={{ position: "absolute", top: 68, right: 44, width: 20, height: 20, borderRadius: "50%", backgroundColor: C.pink, opacity: 0.14 }} />
    </div>
  );
}

/* ─── Message Home ───────────────────────────────────────── */
export default function MessageHome() {
  const navigate = useNavigate();
  const totalUnread = CHATS.reduce((s, c) => s + (c.unread ?? 0), 0);

  return (
    <PageWrapper bg="#FCF2F5">

      {/* ── 吸顶 Hero Header ── */}
      <div style={{ position: "relative", flexShrink: 0, backgroundColor: `${PINK}0C`, overflow: "hidden", zIndex: 50 }}>
        <MessageGeoBg />
        <div style={{ position: "relative", zIndex: 2, padding: "52px 24px 16px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, backgroundColor: `${PINK}22`, borderRadius: 22, padding: "3px 10px", marginBottom: 6 }}>
              <span style={{ fontSize: 13, color: C.pinkDark, fontWeight: 700, letterSpacing: "0.06em", fontFamily: DM_SANS }}>INBOX</span>
            </div>
            <h1 style={{ margin: 0, fontSize: 40, fontFamily: LONDRINA, color: C.strong, lineHeight: 1.1 }}>Messages</h1>
            <p style={{ margin: "4px 0 0", fontSize: 14, color: C.muted, fontFamily: DM_SANS, fontWeight: 500 }}>
              {totalUnread > 0 ? `${totalUnread} unread messages` : "All caught up!"}
            </p>
          </div>
          <div style={{ width: 46, height: 46, borderRadius: "50%", backgroundColor: "white", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "3px 3px 0px rgba(0,0,0,0.10)", marginTop: 28, flexShrink: 0 }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill={PINK}>
              <path d="M2 4C2 2.9 2.9 2 4 2H16C17.1 2 18 2.9 18 4V13C18 14.1 17.1 15 16 15H11.5L9 18V15H4C2.9 15 2 14.1 2 13V4Z"/>
            </svg>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 24, right: 24, height: 1, backgroundColor: `${PINK}22`, zIndex: 2 }} />
      </div>

      {/* ── Chat list ── */}
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 24, scrollbarWidth: "none" } as React.CSSProperties}>
        {/* Search bar */}
        <div style={{ padding: "14px 24px 4px" }}>
          <div style={{ backgroundColor: "white", borderRadius: 99, padding: "10px 16px", display: "flex", alignItems: "center", gap: 10, border: "1px solid rgba(0,0,0,0.06)", boxShadow: "3px 3px 0px rgba(0,0,0,0.10)" }}>
            <svg width="16" height="16" viewBox="0 0 18 18">
              <circle cx="7.5" cy="7.5" r="5.5" fill={C.muted}/>
              <circle cx="7.5" cy="7.5" r="3.2" fill="white"/>
              <path d="M10 11L11 10L15.5 14.5L14.5 15.5Z" fill={C.muted}/>
            </svg>
            <span style={{ fontSize: 15, color: C.muted, fontFamily: DM_SANS }}>Search conversations…</span>
          </div>
        </div>

        {/* Chat rows — individual cards */}
        <div style={{ padding: "20px 24px 24px" }}>
          <div style={{ backgroundColor: C.card, border: "1px solid rgba(0,0,0,0.06)", borderRadius: 22, overflow: "hidden", boxShadow: "3px 3px 0px rgba(0,0,0,0.10)" }}>
            {CHATS.map((chat, i) => (
              <ChatRow key={chat.id} chat={chat} isLast={i === CHATS.length - 1} />
            ))}
          </div>
        </div>
      </div>

      <BottomNav active={3} />
    </PageWrapper>
  );
}

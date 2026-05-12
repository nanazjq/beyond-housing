import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { C, LONDRINA, DM_SANS, PageWrapper, BackHeader, GeometricAvatar, BottomNav, TactileButton } from "../../components/kitchen/Shared";

/* ─── Data ───────────────────────────────────────────────── */
type PraiseMsg   = { id: number; from: string; initial: string; color: string; text: string; time: string };
type ReminderMsg = { id: number; from: string; initial: string; color: string; text: string; time: string; task: string };

const PRAISE_MSGS: PraiseMsg[] = [
  { id: 1, from: "Mia",  initial: "M", color: C.pink,   text: "Nice work keeping the countertop spotless! Really makes the kitchen feel great 🌟", time: "2h ago" },
  { id: 2, from: "Sam",  initial: "S", color: C.green,  text: "Thanks for cleaning so thoroughly this week. The whole kitchen benefits from it!",    time: "2d ago" },
  { id: 3, from: "Leo",  initial: "L", color: C.purple, text: "You remembered to wipe the microwave — super appreciated, always forgotten!",         time: "4d ago" },
];

const REMINDER_MSGS: ReminderMsg[] = [
  { id: 1, from: "Alex", initial: "A", color: C.blue,   text: "Hey! Your turn for dishes is tomorrow. Just a friendly heads-up 😊",   time: "Yesterday", task: "Wash Dishes"     },
  { id: 2, from: "Mia",  initial: "M", color: C.pink,   text: "Quick reminder: countertop cleaning is on you this week!",              time: "3d ago",    task: "Clean Countertop"},
];

/* ─── Custom reaction icons ──────────────────────────────── */
function getReactionIcons(color: string) {
  return [
    {
      id: "thumbs",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M7 11V19C7 19.2652 6.89464 19.5196 6.70711 19.7071C6.51957 19.8946 6.26522 20 6 20H4C3.73478 20 3.48043 19.8946 3.29289 19.7071C3.10536 19.5196 3 19.2652 3 19V12C3 11.7348 3.10536 11.4804 3.29289 11.2929C3.48043 11.1054 3.73478 11 4 11H7C8.06087 11 9.07828 10.5786 9.82843 9.82843C10.5786 9.07828 11 8.06087 11 7V6C11 5.46957 11.2107 4.96086 11.5858 4.58579C11.9609 4.21071 12.4696 4 13 4C13.5304 4 14.0391 4.21071 14.4142 4.58579C14.7893 4.96086 15 5.46957 15 6V11H18C18.5304 11 19.0391 11.2107 19.4142 11.5858C19.7893 11.9609 20 12.4696 20 13L19 18C18.8562 18.6135 18.5834 19.1402 18.2227 19.501C17.8619 19.8617 17.4328 20.0368 17 20H10C9.20435 20 8.44129 19.6839 7.87868 19.1213C7.31607 18.5587 7 17.7956 7 17" fill={color}/>
          <path d="M7 11V19C7 19.2652 6.89464 19.5196 6.70711 19.7071C6.51957 19.8946 6.26522 20 6 20H4C3.73478 20 3.48043 19.8946 3.29289 19.7071C3.10536 19.5196 3 19.2652 3 19V12C3 11.7348 3.10536 11.4804 3.29289 11.2929C3.48043 11.1054 3.73478 11 4 11H7ZM7 11C8.06087 11 9.07828 10.5786 9.82843 9.82843C10.5786 9.07828 11 8.06087 11 7V6C11 5.46957 11.2107 4.96086 11.5858 4.58579C11.9609 4.21071 12.4696 4 13 4C13.5304 4 14.0391 4.21071 14.4142 4.58579C14.7893 4.96086 15 5.46957 15 6V11H18C18.5304 11 19.0391 11.2107 19.4142 11.5858C19.7893 11.9609 20 12.4696 20 13L19 18C18.8562 18.6135 18.5834 19.1402 18.2227 19.501C17.8619 19.8617 17.4328 20.0368 17 20H10C9.20435 20 8.44129 19.6839 7.87868 19.1213C7.31607 18.5587 7 17.7956 7 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      id: "smile",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M3 12C3 13.1819 3.23279 14.3522 3.68508 15.4442C4.13738 16.5361 4.80031 17.5282 5.63604 18.364C6.47177 19.1997 7.46392 19.8626 8.55585 20.3149C9.64778 20.7672 10.8181 21 12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8626 17.5282 19.1997 18.364 18.364C19.1997 17.5282 19.8626 16.5361 20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12C21 10.8181 20.7672 9.64778 20.3149 8.55585C19.8626 7.46392 19.1997 6.47177 18.364 5.63604C17.5282 4.80031 16.5361 4.13738 15.4442 3.68508C14.3522 3.23279 13.1819 3 12 3C10.8181 3 9.64778 3.23279 8.55585 3.68508C7.46392 4.13738 6.47177 4.80031 5.63604 5.63604C4.80031 6.47177 4.13738 7.46392 3.68508 8.55585C3.23279 9.64778 3 10.8181 3 12Z" fill={color} stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 9H9.01" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M15 9H15.01" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M8 13C8 14.0609 8.42143 15.0783 9.17157 15.8284C9.92172 16.5786 10.9391 17 12 17C13.0609 17 14.0783 16.5786 14.8284 15.8284C15.5786 15.0783 16 14.0609 16 13H8Z" fill="white"/>
        </svg>
      ),
    },
    {
      id: "celebrate",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M4 5H6" stroke={color} strokeWidth="2" strokeLinecap="round"/>
          <path d="M5 4V6" stroke={color} strokeWidth="2" strokeLinecap="round"/>
          <path d="M11.5 4L11 6" stroke={color} strokeWidth="2" strokeLinecap="round"/>
          <path d="M18 5H20" stroke={color} strokeWidth="2" strokeLinecap="round"/>
          <path d="M19 4V6" stroke={color} strokeWidth="2" strokeLinecap="round"/>
          <path d="M15 9L14 10" stroke={color} strokeWidth="2" strokeLinecap="round"/>
          <path d="M18 13L20 12.5" stroke={color} strokeWidth="2" strokeLinecap="round"/>
          <path d="M18 19H20" stroke={color} strokeWidth="2" strokeLinecap="round"/>
          <path d="M19 18V20" stroke={color} strokeWidth="2" strokeLinecap="round"/>
          <path d="M13.9998 16.518L7.4818 10L3.0918 19.58C3.00504 19.766 2.9776 19.9742 3.01323 20.1763C3.04885 20.3785 3.14581 20.5647 3.29094 20.7099C3.43607 20.855 3.62234 20.952 3.82447 20.9876C4.02661 21.0232 4.2348 20.9958 4.4208 20.909L13.9998 16.518Z" fill={color} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      id: "love",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M19.4998 12.5719L11.9998 19.9999L4.49981 12.5719C4.00512 12.0905 3.61546 11.5119 3.35536 10.8726C3.09527 10.2332 2.97037 9.54688 2.98855 8.85687C3.00673 8.16685 3.16758 7.48807 3.46097 6.86327C3.75436 6.23847 4.17395 5.68119 4.6933 5.22651C5.21265 4.77184 5.82052 4.42962 6.47862 4.22141C7.13673 4.01321 7.83082 3.94352 8.51718 4.01673C9.20354 4.08995 9.86731 4.30449 10.4667 4.64684C11.0661 4.98919 11.5881 5.45193 11.9998 6.00593C12.4133 5.45595 12.9359 4.99725 13.5349 4.65854C14.1339 4.31982 14.7963 4.10838 15.4807 4.03745C16.1652 3.96652 16.8569 4.03763 17.5126 4.24632C18.1683 4.45502 18.7738 4.79681 19.2914 5.2503C19.8089 5.70379 20.2272 6.25922 20.5202 6.88182C20.8132 7.50443 20.9746 8.18082 20.9941 8.86864C21.0137 9.55647 20.8911 10.2409 20.6339 10.8792C20.3768 11.5174 19.9907 12.0958 19.4998 12.5779" fill={color}/>
        </svg>
      ),
    },
  ];
}
/* ─── Praise Card ────────────────────────────────────────── */
function PraiseCard({ msg }: { msg: PraiseMsg }) {
  const [reacted, setReacted]   = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  return (
    <div style={{ backgroundColor: C.card,
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: 22, padding: "16px 18px", boxShadow: "3px 3px 0px rgba(0,0,0,0.10)", marginBottom: 12 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
        <GeometricAvatar initial={msg.initial} color={msg.color} size={40} />
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, fontSize: 16, fontFamily: LONDRINA, color: C.strong }}>
            <span style={{ color: msg.color }}>{msg.from}</span> praised you
          </p>
          <p style={{ margin: "1px 0 0", fontSize: 13, color: C.muted, fontFamily: DM_SANS }}>{msg.time}</p>
        </div>
        <div style={{ width: 32, height: 32, borderRadius: 10, backgroundColor: `${C.orange}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill={C.orange}>
            <path d="M8 1L9.8 5.8H15L10.7 8.6L12.4 13.4L8 10.6L3.6 13.4L5.3 8.6L1 5.8H6.2Z"/>
          </svg>
        </div>
      </div>

      {/* Quote */}
      <div style={{ backgroundColor: `${msg.color}08`, borderRadius: 16, padding: "12px 14px", marginBottom: 14, borderLeft: "3px solid rgba(0,0,0,0.08)" }}>
        <span style={{ fontSize: 16, color: `${msg.color}60`, fontFamily: LONDRINA, lineHeight: 0.8, display: "block", marginBottom: 4 }}>"</span>
        <p style={{ margin: 0, fontSize: 15, color: C.text, fontFamily: DM_SANS, lineHeight: 1.55, fontStyle: "italic" }}>{msg.text}</p>
      </div>

      {/* Actions */}
      {confirmed ? (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ backgroundColor: `${C.green}15`, borderRadius: 10, padding: "8px 14px", display: "flex", gap: 7, alignItems: "center" }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill={C.green}><circle cx="7" cy="7" r="7"/><path d="M3.5 7L5.5 9.5L10.5 4.5L9.5 3.5L5.5 7.5L4.5 6.5L3.5 7Z" fill="white"/></svg>
            <span style={{ fontSize: 14, color: C.green, fontFamily: DM_SANS, fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
              {reacted
                ? <>{getReactionIcons(C.green).find(r => r.id === reacted)?.icon} Reacted!</>
                : "Confirmed!"}
            </span>
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <TactileButton bgColor={C.green} shadowColor={`${C.green}88`} small onClick={() => setConfirmed(true)}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="white"><circle cx="6.5" cy="6.5" r="6.5"/><path d="M3 6.5L5 9L10 4.5L9 3.5L5 7.5L4 6L3 6.5Z" fill="white"/></svg>
            Confirm
          </TactileButton>
          {getReactionIcons(msg.color).map(r => (
            <button
              key={r.id}
              onClick={() => { setReacted(r.id); setConfirmed(true); }}
              style={{
                backgroundColor: `${msg.color}15`,
                border: "none",
                borderRadius: 10,
                padding: "7px 10px",
                cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >{r.icon}</button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Reminder Card ──────────────────────────────────────── */
function ReminderCard({ msg }: { msg: ReminderMsg }) {
  const navigate = useNavigate();
  return (
    <div style={{ backgroundColor: C.card,
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: 22, padding: "16px 18px", boxShadow: "3px 3px 0px rgba(0,0,0,0.10)", marginBottom: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
        <GeometricAvatar initial={msg.initial} color={msg.color} size={40} />
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, fontSize: 16, fontFamily: LONDRINA, color: C.strong }}>
            <span style={{ color: msg.color }}>{msg.from}</span> reminded you
          </p>
          <p style={{ margin: "1px 0 0", fontSize: 13, color: C.muted, fontFamily: DM_SANS }}>{msg.time}</p>
        </div>
        <div style={{ width: 32, height: 32, borderRadius: 10, backgroundColor: `${C.orange}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill={C.orange}>
            <path d="M8 1C5.8 1 4 2.8 4 5V9.5L3 11V12H13V11L12 9.5V5C12 2.8 10.2 1 8 1Z"/>
            <rect x="6" y="12" width="4" height="2.5" rx="1.25"/>
          </svg>
        </div>
      </div>

      <p style={{ margin: "0 0 14px", fontSize: 15, color: C.text, fontFamily: DM_SANS, lineHeight: 1.55 }}>{msg.text}</p>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ backgroundColor: `${msg.color}12`, borderRadius: 10, padding: "6px 12px", display: "flex", gap: 6, alignItems: "center" }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: msg.color }} />
          <span style={{ fontSize: 13, color: msg.color, fontFamily: DM_SANS, fontWeight: 700 }}>{msg.task}</span>
        </div>
        <button onClick={() => navigate("/kitchen")} style={{ marginLeft: "auto", backgroundColor: `${msg.color}15`, border: `1.5px solid ${msg.color}30`, borderRadius: 10, padding: "6px 14px", cursor: "pointer", fontSize: 14, fontFamily: LONDRINA, color: msg.color }}>
          View Task →
        </button>
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────── */
export default function KitchenInteractionDetail() {
  return (
    <PageWrapper bg="#FDF5F2">
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 24, scrollbarWidth: "none" } as React.CSSProperties}>
        <BackHeader title="Kitchen Hub" subtitle="Praise & Reminders" bg="#FDF5F2" />

        {/* Praise section */}
        <div style={{ padding: "0 24px 8px" }}>
          <p style={{ margin: "0 0 14px", fontSize: 13, color: C.muted, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: DM_SANS }}>Praise ({PRAISE_MSGS.length})</p>
          {PRAISE_MSGS.map(m => <PraiseCard key={m.id} msg={m} />)}
        </div>

        {/* Reminders section */}
        <div style={{ padding: "0 24px 32px" }}>
          <p style={{ margin: "0 0 14px", fontSize: 13, color: C.muted, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: DM_SANS }}>Reminders ({REMINDER_MSGS.length})</p>
          {REMINDER_MSGS.map(m => <ReminderCard key={m.id} msg={m} />)}
        </div>
      </div>
      <BottomNav active={0} />
    </PageWrapper>
  );
}

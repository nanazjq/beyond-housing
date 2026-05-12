import React, { useState } from "react";
import { useParams } from "react-router";
import {
  C, LONDRINA, DM_SANS, PageWrapper, BackHeader, SectionHeader,
  GeometricAvatar, MATES, TangramDecoration,
  SolidBellIcon, SolidSmileIcon, SolidSuitcaseIcon, SolidBookIcon,
  SolidMailIcon, SolidPhoneIcon,
} from "../components/kitchen/Shared";

/* ─── Message Board Cards ──────────────────────────────── */
const MESSAGES = [
  {
    id: 1,
    icon: <SolidSuitcaseIcon color={C.blue} size={15} />,
    /* Fix 2: watermark is same solid icon at larger size, NOT emoji */
    watermark: (color: string) => <SolidSuitcaseIcon color={color} size={42} />,
    tag: "Business Trip",
    tagColor: C.blue,
    bg: C.blueLight,
    text: "Hey! I'll be away Nov 13–15. Could someone cover my Wednesday task? I'll make it up next week, I promise!",
    date: "Nov 12",
  },
  {
    id: 2,
    icon: <SolidBookIcon color={C.purple} size={15} />,
    watermark: (color: string) => <SolidBookIcon color={color} size={42} />,
    tag: "Exam Week",
    tagColor: C.purple,
    bg: C.purpleLight,
    text: "Exam week survivor mode ON! Please keep the kitchen quiet after 10 PM — my study room is right next door. Thanks so much!",
    date: "Nov 10",
  },
];

/* ─── Task Status Row ──────────────────────────────────── */
function TaskRow({ label, done }: { label: string; done: boolean }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 0" }}>
      {done ? (
        <svg width="20" height="20" viewBox="0 0 20 20">
          <circle cx="10" cy="10" r="10" fill={C.orange}/>
          <path d="M5 10L8.5 13.5L15 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 20 20">
          <circle cx="10" cy="10" r="8.5" fill="none" stroke="#D8D2C8" strokeWidth="2"/>
        </svg>
      )}
      <span style={{ flex: 1, fontSize: 16, fontFamily: DM_SANS, fontWeight: 600, color: done ? C.muted : C.strong, textDecoration: done ? "line-through" : "none" }}>
        {label}
      </span>
    </div>
  );
}

/* ─── Mate Profile Page ─────────────────────────────────── */
function FlameIcon({ color = "black", size = 18 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M6.15636 9.3231L6.15395 9.32491L6.15 9.3279L6.13963 9.33586C6.13164 9.34204 6.12151 9.34999 6.10942 9.35973C6.08524 9.37919 6.05314 9.40581 6.01442 9.43966C5.93703 9.50732 5.83284 9.6042 5.71236 9.73104C5.47171 9.98437 5.16368 10.3598 4.8751 10.8629C4.29291 11.8779 3.80368 13.3906 4.07868 15.4142C4.34997 17.4107 5.18833 19.0801 6.60711 20.244C8.02084 21.4038 9.93533 22 12.25 22C14.6375 22 16.5425 21.1054 17.8042 19.5699C19.0544 18.0486 19.6122 15.9741 19.4787 13.706C19.3508 11.5302 18.1656 9.87945 17.1188 8.42123C17.0177 8.28043 16.9179 8.14142 16.8205 8.00391C15.6785 6.39222 14.7768 4.90657 14.9959 2.82863C15.0182 2.61721 14.9497 2.40625 14.8075 2.24824C14.6652 2.09023 14.4626 2 14.25 2C13.868 2 13.4309 2.11822 13.0077 2.29599C12.5715 2.47923 12.0984 2.74751 11.6351 3.09694C10.7104 3.79438 9.78589 4.84563 9.29236 6.25159C8.80006 7.65408 9.04947 8.99089 9.41008 9.9632C9.64689 10.6017 9.39005 11.233 9.00347 11.4165C8.66159 11.5789 8.25252 11.4427 8.07619 11.1078L7.26887 9.57452C7.16673 9.38052 6.98481 9.24093 6.77099 9.19248C6.55717 9.14403 6.33215 9.19209 6.15636 9.3231Z" fill={color}/>
    </svg>
  );
}

export default function MateProfile() {
  const { id } = useParams();
  const mate = MATES.find(m => m.id === Number(id)) ?? MATES[0];

  const [praised, setPraised] = useState(false);
  const [reminded, setReminded] = useState(false);
  const [praiseCount, setPraiseCount] = useState(7);

  const handlePraise = () => { if (!praised) { setPraised(true); setPraiseCount(c => c + 1); } };
  const handleRemind = () => setReminded(true);

  return (
    <PageWrapper bg="#FDF5F2">
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 40, scrollbarWidth: "none" } as React.CSSProperties}>
        <BackHeader title={mate.name} subtitle={`Room ${mate.room} · Kitchen A`} bg="#FDF5F2" />

        {/* ── Fix 1: Hero card — exact same style as "My Cleaning Task" card ── */}
        <div style={{ padding: "0 24px 24px" }}>
          <div style={{
            backgroundColor: C.card,                    /* white, like Task card */
            borderRadius: 22,                            /* same as Task card */
            padding: "22px 22px 20px",
            position: "relative", overflow: "hidden",
            border: "1px solid rgba(0,0,0,0.06)", boxShadow: "3px 3px 0px rgba(0,0,0,0.10)",   /* same shadow */
          }}>
            {/* Fix 1: TangramDecoration with mate's color as primary */}
            <TangramDecoration primaryColor={mate.color} />

            {/* Status badge — mate's color accent */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              backgroundColor: `${mate.color}18`, borderRadius: 22, padding: "4px 12px",
              marginBottom: 18,
            }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: mate.color, boxShadow: `0 0 0 2px ${mate.color}40` }} />
              <span style={{ fontSize: 14, color: mate.color, fontWeight: 700, fontFamily: DM_SANS }}>Kitchen Mate</span>
            </div>

            {/* Avatar + name centred row */}
            <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 18 }}>
              <GeometricAvatar initial={mate.initial} color={mate.color} shape="circle" size={64} />
              <div>
                <h2 style={{ margin: "0 0 6px", fontSize: 26, fontFamily: LONDRINA, color: C.strong, lineHeight: 1.15 }}>
                  {mate.name}
                </h2>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  <span style={{ backgroundColor: `${mate.color}18`, color: mate.color, borderRadius: 22, padding: "3px 10px", fontSize: 14, fontWeight: 700, fontFamily: DM_SANS }}>
                    Room {mate.room}
                  </span>
                  <span style={{ backgroundColor: "#F2ECE2", color: C.text, borderRadius: 22, padding: "3px 10px", fontSize: 14, fontWeight: 600, fontFamily: DM_SANS }}>
                    {mate.nationality}
                  </span>
                </div>
              </div>
            </div>

            {/* Stats row */}
            <div style={{ display: "flex", gap: 1, borderTop: `1px solid ${C.divider}`, paddingTop: 16 }}>
              {[
                { label: "Streak",    value: <span style={{display:"flex",alignItems:"center",gap:4}}>5 <FlameIcon color={C.orange} size={16}/></span> },
                { label: "Check-ins", value: "18"   },
                { label: "Stars",     value: String(praiseCount) },
              ].map((s, i, arr) => (
                <div key={s.label} style={{
                  flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
                  borderRight: i < arr.length - 1 ? `1px solid ${mate.color}20` : "none",
                  padding: "0 8px",
                }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontFamily: LONDRINA, color: mate.color, gap: 4 }}>{s.value}</div>
                  <p style={{ margin: "2px 0 0", fontSize: 12, color: C.muted, fontWeight: 600, fontFamily: DM_SANS }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Contact Information (Fix 4: SolidMailIcon + SolidPhoneIcon, display-only) ── */}
        <div style={{ padding: "0 24px 24px" }}>
          <SectionHeader title="Contact Information" />
          <div style={{ backgroundColor: C.card,
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: 22, overflow: "hidden", boxShadow: "3px 3px 0px rgba(0,0,0,0.10)" }}>
            {[
              { icon: <SolidMailIcon  color={C.blue}  size={17} />, label: "Email", value: "alex@university.edu", color: C.blue  },
              { icon: <SolidPhoneIcon color={C.green} size={17} />, label: "Phone", value: "+1 (555) 012-3456",    color: C.green },
            ].map((c, i, arr) => (
              <div key={c.label}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 18px" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, backgroundColor: `${c.color}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {c.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: 13, color: C.muted, fontWeight: 500, fontFamily: DM_SANS }}>{c.label}</p>
                    <p style={{ margin: "1px 0 0", fontSize: 16, fontFamily: LONDRINA, color: C.strong }}>{c.value}</p>
                  </div>
                </div>
                {i < arr.length - 1 && <div style={{ height: 1, backgroundColor: C.divider, margin: "0 18px" }} />}
              </div>
            ))}
          </div>
        </div>

        {/* ── Message Board (Fix 2: solid watermark icons, no emoji) ── */}
        <div style={{ padding: "0 24px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <span style={{ fontSize: 13, color: C.muted, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: DM_SANS }}>
              Message Board
            </span>
            <div style={{ height: 1, flex: 1, background: `linear-gradient(90deg, ${C.divider}, transparent)` }} />
            <div style={{ backgroundColor: `${C.orange}15`, borderRadius: 22, padding: "2px 8px", fontSize: 13, color: C.orange, fontWeight: 700, fontFamily: DM_SANS }}>
              Status Updates
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {MESSAGES.map(msg => (
              <div key={msg.id} style={{
                backgroundColor: msg.bg,
                borderRadius: 22, padding: "18px 18px 14px",
                border: `1.5px solid ${msg.tagColor}20`,
                position: "relative", overflow: "hidden",
              }}>
                {/* Fix 2: solid SVG watermark (same style as tag icon, just larger + low opacity) */}
                <div style={{ position: "absolute", top: 10, right: 12, opacity: 0.12, lineHeight: 1, pointerEvents: "none" }}>
                  {msg.watermark(msg.tagColor)}
                </div>

                {/* Tag badge with solid icon */}
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  backgroundColor: "white",
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: 22, padding: "5px 11px", marginBottom: 12,
                  color: msg.tagColor, fontSize: 14, fontWeight: 700, fontFamily: DM_SANS,
                  boxShadow: `0 2px 8px ${msg.tagColor}20`,
                }}>
                  {msg.icon}
                  {msg.tag}
                </div>

                <p style={{ margin: "0 0 12px", fontSize: 16, color: C.text, lineHeight: 1.6, fontFamily: DM_SANS }}>
                  {msg.text}
                </p>

                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <GeometricAvatar initial={mate.initial} color={mate.color} shape="circle" size={22} />
                  <span style={{ fontSize: 14, color: C.muted, fontWeight: 500, fontFamily: DM_SANS }}>
                    {mate.name} · {msg.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Weekly Task ── */}
        <div style={{ padding: "0 24px 32px" }}>
          <SectionHeader title="This Week's Task" />
          <div style={{ backgroundColor: C.card,
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: 22, padding: "20px 20px 18px", boxShadow: "3px 3px 0px rgba(0,0,0,0.10)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18, backgroundColor: `${mate.color}12`, borderRadius: 16, padding: "12px 16px" }}>
              <div style={{ width: 42, height: 42, borderRadius: 10, background: `linear-gradient(135deg, ${mate.color}, ${mate.color}CC)`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 4px 12px ${mate.color}40`, flexShrink: 0 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M21 3L13 11.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 11.0885C4.98269 11.8736 6.96539 12.0368 9.44573 11.0854L9.4459 11.0853C10.5863 10.648 11.1564 10.4293 11.5929 10.5204C12.0295 10.6116 12.3973 10.9757 13.1329 11.704C13.5802 12.1468 13.8038 12.3682 13.9178 12.6769C14.0317 12.9855 14.0081 13.2593 13.9611 13.8068L13.961 13.8074C13.5261 18.8664 10.5089 22 10.5089 22C7.95832 21.3688 6.81386 21.0327 5.46347 18.5552C5.46347 18.5552 6.76132 17.9491 7.46347 17.5552C8.18598 17.1499 8.96347 16.0552 8.96347 16.0552L7.96347 14.5552C7.96347 14.5552 7.14689 15.6647 6.46347 16.0552C5.78005 16.4457 4.46347 16.5552 4.46347 16.5552C3.69356 15.1427 3.18177 13.4279 3 11.0885Z" fill="white" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8.5 7.25C8.5 7.94036 7.94036 8.5 7.25 8.5C6.55964 8.5 6 7.94036 6 7.25C6 6.55964 6.55964 6 7.25 6C7.94036 6 8.5 6.55964 8.5 7.25Z" fill="white" stroke="white" strokeWidth="1.5"/>
                  <path d="M11.9635 3.80518C11.9635 4.21939 11.6277 4.55518 11.2135 4.55518C10.7993 4.55518 10.4635 4.21939 10.4635 3.80518C10.4635 3.39096 10.7993 3.05518 11.2135 3.05518C11.6277 3.05518 11.9635 3.39096 11.9635 3.80518Z" fill="white" stroke="white"/>
                </svg>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 16, fontFamily: LONDRINA, color: C.strong }}>{mate.task}</p>
                <p style={{ margin: "2px 0 0", fontSize: 14, color: C.muted, fontFamily: DM_SANS }}>
                  {mate.taskDone ? "Completed this week" : "Due this week"}
                </p>
              </div>
            </div>

            <div style={{ borderTop: `1px solid ${C.divider}`, paddingTop: 12, marginBottom: 18 }}>
              <TaskRow label="Wipe down surfaces" done={mate.taskDone} />
              <div style={{ height: 1, backgroundColor: C.divider }} />
              <TaskRow label="Clean stovetop" done={false} />
              <div style={{ height: 1, backgroundColor: C.divider }} />
              <TaskRow label="Scrub the sink" done={false} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {/* Praise button */}
              <button onClick={handlePraise} disabled={praised} style={{
                width: "100%", borderRadius: 16,
                border: `2px solid ${praised ? C.orange : `${C.orange}50`}`,
                backgroundColor: praised ? C.orangeLight : "white",
                padding: "13px 20px", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                cursor: praised ? "default" : "pointer", transition: "all 0.2s ease",
              }}>
                <svg width="17" height="17" viewBox="0 0 17 17">
                  <path d="M8.5 1L10.3 6.2H16L11.3 9.4L13.1 14.6L8.5 11.4L3.9 14.6L5.7 9.4L1 6.2H6.7Z"
                    fill={praised ? C.orange : "none"} stroke={C.orange} strokeWidth="1.5" strokeLinejoin="round"/>
                </svg>
                <span style={{ fontSize: 15, fontFamily: LONDRINA, color: C.orange }}>
                  {praised ? `${mate.name} got your star!` : `Give ${mate.name} a Star!`}
                </span>
                {!praised && (
                  <div style={{ backgroundColor: `${C.orange}18`, borderRadius: 22, padding: "1px 8px", fontSize: 14, color: C.orange, fontWeight: 700, fontFamily: DM_SANS }}>
                    {praiseCount}
                  </div>
                )}
              </button>

              {/* Remind button */}
              <button onClick={handleRemind} style={{
                width: "100%", borderRadius: 16,
                border: `2px solid ${reminded ? `${C.pink}60` : `${C.pink}30`}`,
                backgroundColor: reminded ? C.pinkLight : "white",
                padding: "13px 20px", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                cursor: reminded ? "default" : "pointer", transition: "all 0.2s ease",
              }}>
                {reminded ? <SolidSmileIcon color={C.pink} size={17} /> : <SolidBellIcon color={C.pink} size={17} />}
                <span style={{ fontSize: 15, fontFamily: LONDRINA, color: C.pink }}>
                  {reminded ? "Gentle nudge sent!" : `Gently remind ${mate.name}`}
                </span>
              </button>

              <p style={{ margin: 0, textAlign: "center", fontSize: 13, color: C.muted, fontFamily: DM_SANS }}>
                {reminded ? `${mate.name} will receive a soft notification` : "A warm nudge, not a command"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
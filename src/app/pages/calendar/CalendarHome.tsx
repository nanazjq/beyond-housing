import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { C, LONDRINA, DM_SANS, PageWrapper, BottomNav, TangramDecoration } from "../../components/kitchen/Shared";

/* ─── Calendar Event Data ────────────────────────────────── */
type CalEvent = { type: "kitchen" | "activity"; label: string; time?: string; location?: string; path?: string };

const CALENDAR_EVENTS: Record<number, CalEvent[]> = {
  9:  [{ type: "kitchen",  label: "Wash Dishes",         location: "Kitchen B1",          path: "/" }],
  11: [{ type: "activity", label: "Yoga in the Park",     time: "10:00", location: "Hagaparken · 500m", path: "/activity/activity/1" }],
  13: [{ type: "activity", label: "Lucia Celebration",    time: "17:00", location: "Common Hall",       path: "/activity/event/3" },
       { type: "kitchen",  label: "Sweep Floor",          location: "Kitchen B1",          path: "/" }],
  15: [{ type: "activity", label: "Photography Walk",     time: "14:00", location: "Gamla Stan · 2.1km",path: "/activity/activity/2" }],
  17: [{ type: "kitchen",  label: "Clean Countertop",     location: "Kitchen B1",          path: "/" }],
  19: [{ type: "activity", label: "Swedish Language Café",time: "19:00", location: "Study Lounge · 2F", path: "/activity/activity/4" }],
  20: [{ type: "activity", label: "Winter Mixer Party",   time: "18:00", location: "Common Hall",       path: "/activity/event/1" }],
  22: [{ type: "kitchen",  label: "Wipe Microwave",       location: "Kitchen B1",          path: "/" }],
  24: [{ type: "activity", label: "Christmas Eve",        time: "All day" }],
  31: [{ type: "activity", label: "New Year's Eve",       time: "21:00" }],
};

const MONTH_OFFSET = 5; // Dec 2026
const MONTH_DAYS   = 31;
const MONTH_NAME   = "December 2026";
const DAY_LABELS   = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

/* ─── Icons ──────────────────────────────────────────────── */
function KitchenIcon({ color, size = 15 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill={color}>
      <path d="M3 2H5V7.5C5 8.3 4.3 9 3.5 9H3V2Z"/>
      <rect x="3.8" y="9" width="1.4" height="6" rx="0.7"/>
      <rect x="8" y="2" width="2" height="13" rx="1"/>
      <path d="M7 2H11V6.5C11 7.3 10.5 8 10 8L8 9L6 8C5.5 8 5 7.3 5 6.5V2H7Z" opacity="0.7"/>
    </svg>
  );
}

function ActivityIcon({ color, size = 15 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill={color}>
      <path d="M8 1L9.5 5.5H14.5L10.5 8.5L12 13L8 10L4 13L5.5 8.5L1.5 5.5H6.5Z"/>
    </svg>
  );
}

function ChevronIcon({ color, size = 12 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill={color}>
      <path d="M3.5 1.5L8.5 6L3.5 10.5L5 6Z"/>
    </svg>
  );
}

function CalendarNavIcon({ color, dir, size = 18 }: { color: string; dir: "left" | "right"; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill={color}>
      {dir === "left"
        ? <path d="M12 3L6 9L12 15L10.5 9Z"/>
        : <path d="M6 3L12 9L6 15L7.5 9Z"/>}
    </svg>
  );
}

/* ─── Calendar Grid ──────────────────────────────────────── */
function CalendarGrid({ selected, onSelect }: { selected: number | null; onSelect: (d: number) => void }) {
  const cells: (number | null)[] = [
    ...Array(MONTH_OFFSET).fill(null),
    ...Array.from({ length: MONTH_DAYS }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div>
      {/* Day headers */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: 4 }}>
        {DAY_LABELS.map(d => (
          <div key={d} style={{ textAlign: "center", fontSize: 14, color: C.muted, fontFamily: DM_SANS, fontWeight: 700, padding: "4px 0" }}>{d}</div>
        ))}
      </div>
      {/* Date cells */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 3 }}>
        {cells.map((day, i) => {
          const events   = day ? (CALENDAR_EVENTS[day] ?? []) : [];
          const hasKit   = events.some(e => e.type === "kitchen");
          const hasAct   = events.some(e => e.type === "activity");
          const isSel    = day === selected;
          const isToday  = day === 10; // demo "today"
          return (
            <div
              key={i}
              onClick={() => day && onSelect(day)}
              style={{
                borderRadius: 10, cursor: day ? "pointer" : "default",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                padding: "5px 0 4px",
                backgroundColor: isSel ? C.green : isToday ? `${C.green}18` : "transparent",
                transition: "background 0.15s ease",
              }}
            >
              {day && (
                <>
                  <span style={{ fontSize: 18, fontFamily: LONDRINA, lineHeight: 1, color: isSel ? "white" : isToday ? C.green : C.strong }}>
                    {day}
                  </span>
                  {/* Dots row */}
                  <div style={{ display: "flex", gap: 2, marginTop: 3, height: 5 }}>
                    {hasKit && <div style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: isSel ? "white" : C.orange }} />}
                    {hasAct && <div style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: isSel ? "rgba(255,255,255,0.7)" : C.blue }} />}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Legend ─────────────────────────────────────────────── */
function DotLegend() {
  return (
    <div style={{ display: "flex", gap: 14, marginTop: 14, paddingTop: 12, borderTop: `1px solid ${C.divider}` }}>
      {[
        { color: C.orange, label: "Kitchen Task" },
        { color: C.blue, label: "Activity" },
      ].map(l => (
        <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: l.color }} />
          <span style={{ fontSize: 14, color: C.muted, fontFamily: DM_SANS, fontWeight: 600 }}>{l.label}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Agenda Card ────────────────────────────────────────── */
function AgendaCard({ event }: { event: CalEvent }) {
  const navigate = useNavigate();
  const isKit  = event.type === "kitchen";
  const color  = isKit ? C.orange : C.blue;
  const btnTxt = isKit ? "Check In →" : "View Details →";

  return (
    <div style={{
      backgroundColor: C.card,
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: 22,
      padding: "16px 18px", marginBottom: 12,
      boxShadow: "3px 3px 0px rgba(0,0,0,0.10)",
      display: "flex", gap: 14, alignItems: "center",
      border: "1px solid rgba(0,0,0,0.06)",
    }}>
      <div style={{ width: 44, height: 44, borderRadius: 16, backgroundColor: `${color}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        {isKit
          ? <KitchenIcon  color={color} size={20} />
          : <ActivityIcon color={color} size={20} />}
      </div>
      <div style={{ flex: 1 }}>
        <p style={{ margin: "0 0 3px", fontSize: 15, fontFamily: LONDRINA, color: C.strong }}>{event.label}</p>
        {event.time && (
          <p style={{ margin: "0 0 2px", fontSize: 14, color: color, fontFamily: DM_SANS, fontWeight: 700 }}>{event.time}</p>
        )}
        {event.location && (
          <p style={{ margin: 0, fontSize: 13, color: C.muted, fontFamily: DM_SANS }}>{event.location}</p>
        )}
      </div>
      {event.path && (
        <button onClick={() => navigate(event.path!)} style={{
          backgroundColor: `${color}15`, border: "1px solid rgba(0,0,0,0.06)",
          borderRadius: 10, padding: "6px 12px", cursor: "pointer",
          fontSize: 13, fontFamily: LONDRINA, color: color, flexShrink: 0,
        }}>
          {btnTxt}
        </button>
      )}
    </div>
  );
}

/* ─── Calendar Home Page ─────────────────────────────────── */

/* ─── Calendar Geometric Background (Green) ─────────────── */
function CalendarGeoBg() {
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
      {/* 大圆 — 右上角压边 */}
      <div style={{
        position: "absolute", top: -24, right: -24,
        width: 96, height: 96, borderRadius: "50%",
        backgroundColor: C.green, opacity: 0.09,
      }} />
      {/* 中三角 — 左侧压边，旋转 -15° */}
      <svg style={{ position: "absolute", top: 40, left: -14, opacity: 0.09 }} width="72" height="64">
        <polygon points="36,5 67,59 5,59" fill={C.green} transform="rotate(-15, 36, 32)" />
      </svg>
      {/* 小菱形 — 右下，旋转 20° */}
      <div style={{
        position: "absolute", top: 108, right: 36,
        width: 22, height: 22, borderRadius: 3,
        backgroundColor: C.green, opacity: 0.13,
        transform: "rotate(20deg)",
      }} />
    </div>
  );
}


export default function CalendarHome() {
  const [selected, setSelected] = useState<number | null>(10);
  const dayEvents = selected ? (CALENDAR_EVENTS[selected] ?? []) : [];

  return (
    <PageWrapper bg="#F2F8F4">
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* ── 吸顶 Hero Header ── */}
        <div style={{
          position: "relative", flexShrink: 0,
          backgroundColor: `${C.green}0C`,
          overflow: "hidden", zIndex: 50,
        }}>
          <CalendarGeoBg />
          <div style={{
            position: "relative", zIndex: 2,
            padding: "52px 24px 16px",
            display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, backgroundColor: `${C.green}22`, borderRadius: 22, padding: "3px 10px", marginBottom: 6 }}>
                <span style={{ fontSize: 13, color: C.greenDark, fontWeight: 700, letterSpacing: "0.06em", fontFamily: DM_SANS }}>DECEMBER 2026</span>
              </div>
              <h1 style={{ margin: 0, fontSize: 40, fontFamily: LONDRINA, color: C.strong, lineHeight: 1.1 }}>Calendar</h1>
              <p style={{ margin: "4px 0 0", fontSize: 14, color: C.muted, fontFamily: DM_SANS, fontWeight: 500 }}>Your schedule at a glance</p>
            </div>
            <div style={{ display: "flex", gap: 6, marginBottom: 4 }}>
              <button style={{ width: 34, height: 34, borderRadius: 10, backgroundColor: "white", border: "none", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "3px 3px 0px rgba(0,0,0,0.10)", cursor: "pointer" }}>
                <CalendarNavIcon color={C.muted} dir="left" size={18} />
              </button>
              <button style={{ width: 34, height: 34, borderRadius: 10, backgroundColor: "white", border: "none", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "3px 3px 0px rgba(0,0,0,0.10)", cursor: "pointer" }}>
                <CalendarNavIcon color={C.muted} dir="right" size={18} />
              </button>
            </div>
          </div>
          <div style={{ position: "absolute", bottom: 0, left: 24, right: 24, height: 1, backgroundColor: `${C.green}22`, zIndex: 2 }} />
        </div>

        {/* ── Calendar Card (fixed) ── */}
        <div style={{ padding: "0 24px", flexShrink: 0 }}>
          <div style={{ backgroundColor: C.card,
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: 22, padding: "18px 16px 14px", boxShadow: "3px 3px 0px rgba(0,0,0,0.10)", position: "relative", overflow: "hidden" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <span style={{ fontSize: 17, fontFamily: LONDRINA, color: C.strong }}>{MONTH_NAME}</span>
              {selected && (
                <span style={{ fontSize: 14, color: C.green, fontFamily: DM_SANS, fontWeight: 700, backgroundColor: `${C.green}15`, borderRadius: 99, padding: "3px 10px" }}>
                  Dec {selected}
                </span>
              )}
            </div>
            <CalendarGrid selected={selected} onSelect={setSelected} />
            <DotLegend />
          </div>
        </div>

        {/* ── Daily Agenda (scrollable) ── */}
        <div style={{ flex: 1, overflowY: "auto", padding: "18px 24px 100px", scrollbarWidth: "none" } as React.CSSProperties}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <span style={{ fontSize: 13, color: C.muted, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: DM_SANS }}>
              {selected ? `Daily Agenda · Dec ${selected}` : "Daily Agenda"}
            </span>
            <span style={{ fontSize: 13, color: C.green, fontFamily: DM_SANS, fontWeight: 700 }}>
              {dayEvents.length} {dayEvents.length === 1 ? "item" : "items"}
            </span>
          </div>

          {dayEvents.length > 0 ? (
            dayEvents.map((e, i) => <AgendaCard key={i} event={e} />)
          ) : (
            <div style={{ backgroundColor: `${C.green}10`, border: "1px solid rgba(0,0,0,0.06)", borderRadius: 22, padding: "28px 20px", textAlign: "center" }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", backgroundColor: `${C.green}18`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                <ActivityIcon color={C.green} size={22} />
              </div>
              <p style={{ margin: "0 0 4px", fontSize: 16, fontFamily: LONDRINA, color: C.green }}>Nothing scheduled</p>
              <p style={{ margin: 0, fontSize: 14, color: C.muted, fontFamily: DM_SANS }}>Tap a highlighted date to see events</p>
            </div>
          )}
        </div>
      </div>
      <BottomNav active={2} />
    </PageWrapper>
  );
}

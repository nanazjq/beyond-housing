import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import {
  C, LONDRINA, DM_SANS, PageWrapper, BackHeader, SectionHeader, BottomNav,
} from "../../components/kitchen/Shared";
import { WIKI_CATEGORIES, FESTIVALS } from "./ActivityShared";

/* ─── Month Calendar ─────────────────────────────────────── */
const MONTH_DAYS = 31;
const MONTH_OFFSET = 5; // Dec 2024 starts on Sunday (0) → Saturday = 6
const MONTH_NAME = "December 2026";

/* ─── Wiki Geometric Shapes Layout ──────────────────────── */

/* ─── Wiki Float Animation ───────────────────────────────── */
const floatKeyframes = `
  @keyframes float0 { 0%,100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-5px) rotate(0deg); } }
  @keyframes float1 { 0%,100% { transform: translateY(0px) rotate(6deg); } 50% { transform: translateY(-4px) rotate(6deg); } }
  @keyframes float2 { 0%,100% { transform: translateY(0px) rotate(12deg); } 50% { transform: translateY(-6px) rotate(12deg); } }
  @keyframes float3 { 0%,100% { transform: translateY(0px) rotate(-4deg); } 50% { transform: translateY(-4px) rotate(-4deg); } }
  @keyframes float4 { 0%,100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-5px) rotate(0deg); } }
  @keyframes float5 { 0%,100% { transform: translateY(0px) rotate(-12deg); } 50% { transform: translateY(-6px) rotate(-12deg); } }
  @keyframes float6 { 0%,100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-4px) rotate(0deg); } }
  @keyframes float7 { 0%,100% { transform: translateY(0px) rotate(10deg); } 50% { transform: translateY(-5px) rotate(10deg); } }
  @keyframes float8 { 0%,100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-6px) rotate(0deg); } }
`;

function WikiShapes({ onNavigate }: { onNavigate: (id: number) => void }) {
  // 等边三角形，圆角用 stroke-linejoin="round" + stroke 技巧
  // 简单正确的等边三角形路径（无凹槽）
  const S = 115; // 边长
  const TH = Math.round(S * Math.sqrt(3) / 2);

  const ITEMS = [
    { id: 1, title: ["Laundry"],             shape: "circle",   color: "#4A7BC8", bg: "#D6E4F8", w: 108, h: 108, top: 8,   left: 8,   rot: 0   },
    { id: 3, title: ["Quiet", "Hours"],      shape: "square",   color: "#7B5DB4", bg: "#E2D9F3", w: 106, h: 106, top: 4,   left: 192, rot: 6   },
    { id: 2, title: ["Waste", "Sorting"],    shape: "triangle", color: "#3D7A56", bg: "#C8E8D4", w: S,   h: TH,  top: 28,  left: 100, rot: 12  },
    { id: 5, title: ["Supermarket"],         shape: "square",   color: "#C96B4E", bg: "#F9D5C8", w: 106, h: 106, top: 118, left: 4,   rot: -4  },
    { id: 6, title: ["Public", "Transport"], shape: "circle",   color: "#BB5770", bg: "#F5C8D4", w: 108, h: 108, top: 112, left: 192, rot: 0   },
    { id: 8, title: ["Banking", "& ID"],     shape: "triangle", color: "#4A7BC8", bg: "#D6E4F8", w: S,   h: TH,  top: 130, left: 98,  rot: -12 },
    { id: 7, title: ["Systembolaget"],       shape: "circle",   color: "#BB5770", bg: "#F5C8D4", w: 116, h: 116, top: 224, left: 2,   rot: 0   },
    { id: 9, title: ["Recycling", "System"], shape: "square",   color: "#3D7A56", bg: "#C8E8D4", w: 106, h: 106, top: 230, left: 192, rot: 10  },
    { id: 4, title: ["Winter", "Survival"],  shape: "triangle", color: "#4A7BC8", bg: "#D6E4F8", w: S,   h: TH,  top: 236, left: 100, rot: 0   },
  ];

  const ANIM = [
    [3.2, 0], [2.8, 0.4], [3.6, 0.8], [3.0, 0.2], [2.6, 0.6],
    [3.4, 1.0], [2.9, 0.3], [3.1, 0.7], [3.8, 0.5],
  ];

  return (
    <>
      <style>{floatKeyframes}</style>
      <div style={{ position: "relative", width: "100%", height: 355 }}>
        {ITEMS.map((item, idx) => {
          const { shape, color, bg, w, h, top, left, rot, title, id } = item;
          const [dur, delay] = ANIM[idx];
          const fontSize = 13;
          const floatAnim: React.CSSProperties = {
            animation: `float${idx} ${dur}s ease-in-out ${delay}s infinite`,
          };

          const text = (
            <div style={{
              position: "absolute", inset: 0, zIndex: 2,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              padding: shape === "triangle" ? `${Math.round(h * 0.28)}px 12px 4px` : "0 8px",
            }}>
              {title.map((line, i) => (
                <span key={i} style={{
                  display: "block", textAlign: "center",
                  fontSize, fontFamily: DM_SANS, fontWeight: 700,
                  color, lineHeight: 1.3,
                }}>{line}</span>
              ))}
            </div>
          );

          if (shape === "circle") {
            return (
              <div key={id} onClick={() => onNavigate(id)} style={{ position: "absolute", top, left, width: w, height: h, cursor: "pointer", ...floatAnim }}>
                <div style={{ width: w, height: h, borderRadius: "50%", backgroundColor: bg }} />
                {text}
              </div>
            );
          }

          if (shape === "square") {
            return (
              <div key={id} onClick={() => onNavigate(id)} style={{ position: "absolute", top, left, width: w, height: h, cursor: "pointer", transform: `rotate(${rot}deg)`, ...floatAnim }}>
                <div style={{ width: w, height: h, borderRadius: 10, backgroundColor: bg }} />
                {text}
              </div>
            );
          }

          const pad = 14;
          const x1 = w / 2, y1 = pad;
          const x2 = w - pad, y2 = h - pad;
          const x3 = pad, y3 = h - pad;

          return (
            <div key={id} onClick={() => onNavigate(id)} style={{ position: "absolute", top, left, width: w, height: h, cursor: "pointer", transform: `rotate(${rot}deg)`, ...floatAnim }}>
              <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ display: "block", overflow: "visible" }}>
                <polygon points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`} fill={bg} stroke={bg} strokeWidth="20" strokeLinejoin="round" />
              </svg>
              {text}
            </div>
          );
        })}
      </div>
    </>
  );
}


function CalendarGrid({ onDayTap }: { onDayTap: (day: number) => void }) {
  const [selected, setSelected] = useState<number | null>(null);
  const festivalDays = new Map(FESTIVALS.filter(f => f.month === 12).map(f => [f.day, f]));
  const dayLabels = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  const cells: (number | null)[] = [
    ...Array(MONTH_OFFSET).fill(null),
    ...Array.from({ length: MONTH_DAYS }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div>
      {/* Day header */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: 6 }}>
        {dayLabels.map(d => (
          <div key={d} style={{ textAlign: "center", fontSize: 12, color: C.muted, fontFamily: DM_SANS, fontWeight: 700, padding: "4px 0" }}>{d}</div>
        ))}
      </div>
      {/* Day cells */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
        {cells.map((day, i) => {
          const festival = day ? festivalDays.get(day) : null;
          const isSelected = day === selected;
          return (
            <div
              key={i}
              onClick={() => { if (day) { setSelected(day); onDayTap(day); } }}
              style={{
                height: 36, borderRadius: 10, cursor: day ? "pointer" : "default",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2,
                backgroundColor: isSelected ? C.blue : festival ? `${C.blue}18` : "transparent",
                transition: "background 0.15s ease",
              }}
            >
              {day && (
                <>
                  <span style={{ fontSize: 14, fontFamily: LONDRINA, color: isSelected ? "white" : festival ? C.blue : C.strong, lineHeight: 1 }}>
                    {day}
                  </span>
                  {festival && (
                    <div style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: isSelected ? "white" : C.blue }} />
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Festival Bottom Sheet ──────────────────────────────── */
function FestivalSheet({ day, onClose, onOpen }: { day: number; onClose: () => void; onOpen: (id: number) => void }) {
  const festival = FESTIVALS.find(f => f.month === 12 && f.day === day);
  if (!festival) { onClose(); return null; }
  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.3)", zIndex: 200 }} />
      <div style={{
        position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "100%", maxWidth: 430,
        backgroundColor: "white",
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: "24px 24px 0 0",
        padding: "20px 24px 40px", zIndex: 201,
        boxShadow: "0 -4px 30px rgba(0,0,0,0.12)",
      }}>
        <div style={{ width: 40, height: 4, borderRadius: 99, backgroundColor: "#E4E6EA", margin: "0 auto 20px" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <div style={{ width: 46, height: 46, borderRadius: 16, backgroundColor: `${festival.color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 22 }}>🎉</span>
          </div>
          <div>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <h3 style={{ margin: 0, fontSize: 20, fontFamily: LONDRINA, color: C.strong }}>{festival.name}</h3>
              <span style={{ fontSize: 12, color: festival.color, fontWeight: 700, fontFamily: DM_SANS, backgroundColor: `${festival.color}15`, borderRadius: 99, padding: "2px 8px" }}>{festival.type}</span>
            </div>
            <p style={{ margin: "2px 0 0", fontSize: 14, color: C.muted, fontFamily: DM_SANS }}>Dec {festival.day}</p>
          </div>
        </div>
        <p style={{ margin: "0 0 16px", fontSize: 15, color: C.text, fontFamily: DM_SANS, lineHeight: 1.6 }}>{festival.background}</p>
        <button onClick={() => onOpen(festival.id)} style={{
          width: "100%", backgroundColor: `${festival.color}18`, border: `1.5px solid ${festival.color}30`,
          borderRadius: 16, padding: "12px 16px", cursor: "pointer", textAlign: "center",
          fontSize: 16, fontFamily: LONDRINA, color: festival.color,
        }}>
          Full Cultural Guide →
        </button>
      </div>
    </>
  );
}

/* ─── Culture Bridge Page ───────────────────────────────── */
export default function CultureBridge() {
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  return (
    <PageWrapper bg="#EFF3FC">
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 24, scrollbarWidth: "none" } as React.CSSProperties}>
        <BackHeader title="Culture Bridge" subtitle="Learn, explore, connect 🌏" bg="#EFF3FC" />

        {/* Swedish Living Wiki */}
        <div style={{ padding: "0 24px 28px" }}>
          <SectionHeader title="Swedish Living Wiki" />
          <div style={{ backgroundColor: C.card,
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: 22, padding: "20px 16px", boxShadow: "3px 3px 0px rgba(0,0,0,0.10)" }}>
            <WikiShapes onNavigate={(id) => navigate(`/activity/wiki/${id}`)} />
          </div>
        </div>

        {/* Community Cultural Calendar */}
        <div style={{ padding: "0 24px 32px" }}>
          <SectionHeader title="Cultural Calendar" />
          <div style={{ backgroundColor: C.card,
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: 22, padding: "20px", boxShadow: "3px 3px 0px rgba(0,0,0,0.10)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ margin: 0, fontSize: 18, fontFamily: LONDRINA, color: C.strong }}>{MONTH_NAME}</h3>
            </div>
            <CalendarGrid onDayTap={d => setSelectedDay(d)} />

            {/* Upcoming festivals list */}
            <div style={{ marginTop: 18, borderTop: `1px solid ${"#E4E6EA"}`, paddingTop: 16 }}>
              <p style={{ margin: "0 0 12px", fontSize: 13, color: C.muted, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: DM_SANS }}>Upcoming</p>
              {FESTIVALS.filter(f => f.month === 12).map(f => (
                <div key={f.id} onClick={() => navigate(`/activity/festival/${f.id}`)} style={{
                  display: "flex", alignItems: "center", gap: 12, padding: "10px 0",
                  borderBottom: `1px solid ${"#E4E6EA"}`, cursor: "pointer",
                }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, backgroundColor: `${f.color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontSize: 16, fontFamily: LONDRINA, color: f.color }}>Dec {f.day}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: 16, fontFamily: LONDRINA, color: C.strong }}>{f.name}</p>
                    <p style={{ margin: "1px 0 0", fontSize: 13, color: C.muted, fontFamily: DM_SANS }}>{f.type}</p>
                  </div>
                  <svg width="12" height="12" viewBox="0 0 12 12"><path d="M3.5 1.5L8 6L3.5 10.5L5 6Z" fill={C.muted}/></svg>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedDay !== null && (
        <FestivalSheet
          day={selectedDay}
          onClose={() => setSelectedDay(null)}
          onOpen={id => { navigate(`/activity/festival/${id}`); setSelectedDay(null); }}
        />
      )}

      <BottomNav active={1} />
    </PageWrapper>
  );
}
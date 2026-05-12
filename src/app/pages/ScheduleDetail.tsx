import React from "react";
import { useState, useRef, useEffect } from "react";
import {
  C, LONDRINA, DM_SANS, PageWrapper, BackHeader, SectionHeader,
  GeometricAvatar, TactileButton,
  SCHEDULE_W46, SCHEDULE_W47,
  SolidCheckIcon, SolidSparkleIcon,
  SolidAlertIcon, SolidWandIcon, SolidSendIcon, SolidCloseIcon,
  SolidRefreshIcon, SolidChevronRightIcon,
} from "../components/kitchen/Shared";

/* ─── AI Chat Messages ──────────────────────────────────── */
type ChatMsg = { role: "ai" | "user"; text: string; type?: "card" };

const INITIAL_CHAT: ChatMsg[] = [
  { role: "ai", text: "Hi! I'm your Kitchen AI. I've analyzed Week 47's schedule and found a potential conflict." },
  { role: "ai", text: "Jingqi declared an Exam Week (Nov 18–22). However, Jingqi has tasks on Tuesday and Friday of that same week." },
];

/* ─── Conflict Preview Card ─────────────────────────────── */
function ConflictCard({ onApply, onRegenerate, applied }: {
  onApply: () => void; onRegenerate: () => void; applied: boolean;
}) {
  return (
    <div style={{
      backgroundColor: "white",
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: 22,
      border: `1.5px solid ${applied ? `${C.green}50` : `${C.orange}30`}`,
      overflow: "hidden", boxShadow: "3px 3px 0px rgba(0,0,0,0.10)",
      margin: "4px 0",
    }}>
      {/* Header */}
      <div style={{
        padding: "12px 16px",
        backgroundColor: applied ? C.greenLight : C.orangeLight,
        display: "flex", alignItems: "center", gap: 8,
      }}>
        {applied
          ? <SolidCheckIcon color={C.green} size={16} />
          : <SolidAlertIcon color={C.orange} size={16} />}
        <span style={{ fontSize: 15, fontWeight: 800, color: applied ? C.greenDark : C.orangeDark }}>
          {applied ? "✅ Schedule Applied!" : "Conflict Detected & Resolved"}
        </span>
      </div>

      <div style={{ padding: "14px 16px" }}>
        {/* Changes */}
        {[
          {
            date: "Tue Nov 18", original: { who: "Jingqi", color: C.orange },
            suggested: { who: "Mia", color: C.pink },
            task: "Clean Countertop",
          },
          {
            date: "Fri Nov 21", original: { who: "Jingqi", color: C.orange },
            suggested: { who: "Alex", color: C.blue },
            task: "Wipe Microwave",
          },
        ].map((change, i, arr) => (
          <div key={i}>
            <div style={{ marginBottom: i < arr.length - 1 ? 12 : 0 }}>
              <p style={{ margin: "0 0 8px", fontSize: 13, color: C.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {change.date} · {change.task}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {/* Original */}
                <div style={{
                  flex: 1, backgroundColor: "#FFF5F5", borderRadius: 10, padding: "8px 10px",
                  display: "flex", alignItems: "center", gap: 6,
                  border: "1px solid #FFE0E0",
                }}>
                  <GeometricAvatar initial={change.original.who[0]} color={change.original.color} shape="circle" size={22} />
                  <div>
                    <p style={{ margin: 0, fontSize: 13, color: "#CC4444", fontWeight: 700, textDecoration: "line-through" }}>
                      {change.original.who}
                    </p>
                    <p style={{ margin: 0, fontSize: 12, color: C.muted }}>Exam week</p>
                  </div>
                </div>
                <SolidChevronRightIcon size={14} color={C.muted} />
                {/* Suggested */}
                <div style={{
                  flex: 1, backgroundColor: C.greenLight, borderRadius: 10, padding: "8px 10px",
                  display: "flex", alignItems: "center", gap: 6,
                  border: "1px solid rgba(0,0,0,0.06)",
                }}>
                  <GeometricAvatar initial={change.suggested.who[0]} color={change.suggested.color} shape="circle" size={22} />
                  <div>
                    <p style={{ margin: 0, fontSize: 13, color: C.greenDark, fontWeight: 700 }}>
                      {change.suggested.who}
                    </p>
                    <p style={{ margin: 0, fontSize: 12, color: C.green }}>Available ✓</p>
                  </div>
                </div>
              </div>
            </div>
            {i < arr.length - 1 && <div style={{ height: 1, backgroundColor: C.divider, margin: "12px 0" }} />}
          </div>
        ))}

        {/* Jingqi's makeup day */}
        {!applied && (
          <div style={{
            marginTop: 12, padding: "10px 12px",
            backgroundColor: `${C.blue}10`, borderRadius: 10,
            border: "1px solid rgba(0,0,0,0.06)",
          }}>
            <p style={{ margin: 0, fontSize: 14, color: C.blue, fontWeight: 600 }}>
              💡 Jingqi's tasks rescheduled to Sun Nov 23 & Mon Nov 24. Fairness score: 94/100
            </p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {!applied && (
        <div style={{ padding: "0 16px 16px", display: "flex", gap: 10 }}>
          <button
            onClick={onRegenerate}
            style={{
              flex: 1, borderRadius: 10, border: `1.5px solid ${C.divider}`,
              backgroundColor: "white", padding: "11px 16px",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              cursor: "pointer", fontWeight: 700, fontSize: 15, color: C.text,
            }}
          >
            <SolidRefreshIcon color={C.orange} size={14} /> Regenerate
          </button>
          <button
            onClick={onApply}
            style={{
              flex: 1, borderRadius: 10, border: "none",
              background: `linear-gradient(135deg, ${C.orange}, ${C.orangeDark})`,
              padding: "11px 16px",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              cursor: "pointer", fontWeight: 700, fontSize: 15, color: "white",
              boxShadow: `0 4px 12px ${C.orange}50`,
            }}
          >
            <SolidCheckIcon color="white" size={14} /> Apply
          </button>
        </div>
      )}
    </div>
  );
}

/* ─── AI Chat Panel ─────────────────────────────────────── */
function AiPanel({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<ChatMsg[]>(INITIAL_CHAT);
  const [input, setInput] = useState("");
  const [showCard, setShowCard] = useState(false);
  const [applied, setApplied] = useState(false);
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-show the conflict card after mount
  useEffect(() => {
    const t = setTimeout(() => setShowCard(true), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, showCard]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, {
        role: "ai",
        text: "Got it! I've re-analyzed the schedule. The conflict resolution above looks optimal. You can apply it directly or request another arrangement.",
      }]);
    }, 1400);
  };

  const handleApply = () => {
    setApplied(true);
    setMessages(prev => [...prev, {
      role: "ai",
      text: "🎉 Done! Week 47's schedule has been updated. All members will be notified automatically.",
    }]);
  };

  const handleRegenerate = () => {
    setShowCard(false);
    setMessages(prev => [...prev, { role: "user", text: "Please regenerate another suggestion." }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, {
        role: "ai",
        text: "Recalculating... Here's an alternative resolution based on availability and fairness score.",
      }]);
      setTimeout(() => setShowCard(true), 300);
    }, 1500);
  };

  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 200, borderRadius: 50, overflow: "hidden",
      display: "flex", flexDirection: "column",
      justifyContent: "flex-end", alignItems: "center",
    }}>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.4)", backdropFilter: "blur(2px)" }}
      />

      {/* Panel */}
      <div style={{
        position: "relative", width: "100%", maxWidth: 430,
        backgroundColor: "#FDF5F2", borderRadius: "28px 28px 0 0",
        height: "80dvh", display: "flex", flexDirection: "column",
        boxShadow: "0 -8px 40px rgba(0,0,0,0.15)",
        animation: "slideUp 0.3s ease",
      }}>
        {/* Handle + Header */}
        <div style={{ padding: "12px 20px 0", flexShrink: 0 }}>
          <div style={{ width: 36, height: 4, borderRadius: 99, backgroundColor: C.divider, margin: "0 auto 16px" }} />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 38, height: 38, borderRadius: 10,
                background: `linear-gradient(135deg, ${C.orange}, ${C.orangeDark})`,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: `0 4px 12px ${C.orange}40`,
              }}>
                <SolidWandIcon size={18} color="white" />
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 16, fontWeight: 800, color: C.strong }}>Kitchen AI</p>
                <p style={{ margin: 0, fontSize: 13, color: C.green, fontWeight: 600 }}>● Online · Smart Scheduler</p>
              </div>
            </div>
            <button onClick={onClose} style={{
              width: 34, height: 34, borderRadius: 10,
              backgroundColor: "#F2ECE2", border: "none",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
            }}>
              <SolidCloseIcon size={16} color={C.text} />
            </button>
          </div>
          <div style={{ height: 1, backgroundColor: C.divider }} />
        </div>

        {/* Chat Messages */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px", scrollbarWidth: "none" }}>
          {messages.map((msg, i) => (
            <div key={i} style={{
              display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              marginBottom: 12,
              gap: 8,
              alignItems: "flex-end",
            }}>
              {msg.role === "ai" && (
                <div style={{
                  width: 28, height: 28, borderRadius: 10, flexShrink: 0,
                  background: `linear-gradient(135deg, ${C.orange}, ${C.orangeDark})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <SolidSparkleIcon color="white" size={12} />
                </div>
              )}
              <div style={{
                maxWidth: "78%",
                backgroundColor: msg.role === "user" ? C.orange : "white",
                color: msg.role === "user" ? "white" : C.text,
                borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                padding: "11px 14px",
                fontSize: 16, lineHeight: 1.55, fontWeight: 500,
                boxShadow: msg.role === "ai" ? "0 2px 12px rgba(0,0,0,0.07)" : `0 4px 14px ${C.orange}40`,
              }}>
                {msg.text}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {typing && (
            <div style={{ display: "flex", gap: 8, alignItems: "flex-end", marginBottom: 12 }}>
              <div style={{
                width: 28, height: 28, borderRadius: 10, flexShrink: 0,
                background: `linear-gradient(135deg, ${C.orange}, ${C.orangeDark})`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <SolidSparkleIcon color="white" size={12} />
              </div>
              <div style={{
                backgroundColor: "white",
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: "18px 18px 18px 4px",
                padding: "14px 16px", display: "flex", gap: 4, alignItems: "center",
                boxShadow: "3px 3px 0px rgba(0,0,0,0.10)",
              }}>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{
                    width: 7, height: 7, borderRadius: "50%", backgroundColor: C.muted,
                    animation: `bounce 1.2s ease ${i * 0.2}s infinite`,
                  }} />
                ))}
              </div>
            </div>
          )}

          {/* Conflict Card */}
          {showCard && (
            <div style={{ marginBottom: 12 }}>
              <ConflictCard onApply={handleApply} onRegenerate={handleRegenerate} applied={applied} />
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div style={{
          padding: "12px 20px 20px",
          borderTop: `1px solid ${C.divider}`,
          display: "flex", gap: 10,
        }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSend()}
            placeholder="Ask the AI anything..."
            style={{
              flex: 1, borderRadius: 16, border: `1.5px solid ${C.divider}`,
              backgroundColor: "white", padding: "11px 16px",
              fontSize: 16, color: C.strong, outline: "none",
              fontFamily: "inherit",
            }}
          />
          <button
            onClick={handleSend}
            style={{
              width: 42, height: 42, borderRadius: 10, border: "none",
              backgroundColor: input.trim() ? C.orange : "#E8E4DC",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: input.trim() ? "pointer" : "not-allowed", flexShrink: 0,
              transition: "background 0.2s ease",
            }}
          >
            <SolidSendIcon color={input.trim() ? "white" : C.muted} size={17} />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @keyframes bounce { 0%,80%,100% { transform: translateY(0); } 40% { transform: translateY(-5px); } }
      `}</style>
    </div>
  );
}

/* ─── Schedule Row ─────────────────────────────────────── */
function ScheduleRow({
  item, isLast, hasConflict,
}: {
  item: { day: string; date: string; person: string; initial: string; task: string; color: string };
  isLast: boolean;
  hasConflict?: boolean;
}) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 14, padding: "14px 18px",
      backgroundColor: hasConflict ? "#FFF8F6" : "transparent",
      borderBottom: isLast ? "none" : `1px solid ${C.divider}`,
    }}>
      <div style={{ textAlign: "center", minWidth: 30 }}>
        <p style={{ margin: 0, fontSize: 12, color: C.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", fontFamily: DM_SANS }}>
          {item.day}
        </p>
        <p style={{ margin: "2px 0 0", fontSize: 20, fontFamily: LONDRINA, color: hasConflict ? C.orange : C.strong }}>
          {item.date}
        </p>
      </div>
      <div style={{ width: 3, height: 38, backgroundColor: hasConflict ? C.orange : item.color, borderRadius: 99, flexShrink: 0 }} />
      <div style={{ flex: 1 }}>
        <p style={{ margin: 0, fontSize: 16, fontFamily: LONDRINA, color: C.strong }}>{item.task}</p>
        <p style={{ margin: "2px 0 0", fontSize: 14, color: C.muted, fontFamily: DM_SANS }}>{item.person}</p>
      </div>
      <div style={{ position: "relative" }}>
        <GeometricAvatar initial={item.initial} color={hasConflict ? C.orange : item.color} shape="circle" size={34} />
        {hasConflict && (
          <div style={{
            position: "absolute", top: -4, right: -4,
            width: 14, height: 14, borderRadius: "50%",
            backgroundColor: C.orange, border: "2px solid white",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontSize: 8, color: "white", fontWeight: 900 }}>!</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Schedule Detail Page ──────────────────────────────── */
export default function ScheduleDetail() {
  const [activeWeek, setActiveWeek] = useState<46 | 47>(46);
  const [aiOpen, setAiOpen] = useState(false);
  const schedule = activeWeek === 46 ? SCHEDULE_W46 : SCHEDULE_W47;
  const hasConflicts = activeWeek === 47;

  return (
    <PageWrapper bg="#FDF5F2">
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 40, scrollbarWidth: "none" }}>
        <BackHeader title="Cleaning Schedule" subtitle="Kitchen Area A" bg="#FDF5F2" />

        {/* Week Tabs */}
        <div style={{ padding: "0 24px 20px" }}>
          <div style={{
            display: "flex", gap: 8,
            backgroundColor: "white",
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: 16,
            padding: 5, boxShadow: "3px 3px 0px rgba(0,0,0,0.10)",
          }}>
            {([46, 47] as const).map(week => (
              <button
                key={week}
                onClick={() => setActiveWeek(week)}
                style={{
                  flex: 1, borderRadius: 16, border: "none", padding: "11px 16px",
                  backgroundColor: activeWeek === week ? C.orange : "transparent",
                  color: activeWeek === week ? "white" : C.muted,
                  fontFamily: LONDRINA, fontSize: 16, cursor: "pointer",
                  boxShadow: activeWeek === week ? `0 4px 14px ${C.orange}50` : "none",
                  transition: "all 0.2s ease",
                }}
              >
                Week {week}
                {week === 47 && (
                  <span style={{
                    marginLeft: 6, fontSize: 13,
                    backgroundColor: activeWeek === 47 ? "rgba(255,255,255,0.3)" : `${C.orange}20`,
                    color: activeWeek === 47 ? "white" : C.orange,
                    borderRadius: 22, padding: "1px 6px",
                    fontFamily: DM_SANS, fontWeight: 700,
                  }}>
                    2 <svg width="13" height="13" viewBox="0 0 24 24" fill="none" style={{display:"inline",verticalAlign:"middle",marginLeft:2}}><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" fill="white"/><line x1="12" y1="9" x2="12" y2="13" stroke="#E4886B" strokeWidth="2" strokeLinecap="round"/><line x1="12" y1="17" x2="12.01" y2="17" stroke="#E4886B" strokeWidth="2" strokeLinecap="round"/></svg>
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Conflict Banner */}
        {hasConflicts && (
          <div style={{ padding: "0 24px 20px" }}>
            <div style={{
              backgroundColor: C.orangeLight,
              borderRadius: 16, padding: "14px 16px",
              display: "flex", alignItems: "center", gap: 12,
              border: "1px solid rgba(0,0,0,0.06)",
            }}>
              <SolidAlertIcon color={C.orange} size={20} />
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: 15, fontFamily: LONDRINA, color: C.orangeDark }}>
                  2 Scheduling Conflicts Detected
                </p>
                <p style={{ margin: "2px 0 0", fontSize: 14, color: C.orange, fontFamily: DM_SANS }}>
                  Jingqi has exam week Nov 18–22. Tap AI to auto-resolve.
                </p>
              </div>
              <button
                onClick={() => setAiOpen(true)}
                style={{
                  backgroundColor: C.orange, borderRadius: 10,
                  border: "none", padding: "7px 12px",
                  fontSize: 15, fontFamily: LONDRINA, color: "white",
                  cursor: "pointer",
                }}
              >
                Fix
              </button>
            </div>
          </div>
        )}

        {/* Schedule List */}
        <div style={{ padding: "0 24px 28px" }}>
          <SectionHeader title={`Week ${activeWeek} · Nov ${activeWeek === 46 ? "10–16" : "17–23"}`} />
          <div style={{
            backgroundColor: "white",
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: 22,
            overflow: "hidden", boxShadow: "3px 3px 0px rgba(0,0,0,0.10)",
          }}>
            {schedule.map((item, i) => (
              <ScheduleRow
                key={item.id}
                item={item}
                isLast={i === schedule.length - 1}
                hasConflict={"conflict" in item ? (item as typeof SCHEDULE_W47[0]).conflict : false}
              />
            ))}
          </div>
        </div>

        {/* Legend */}
        <div style={{ padding: "0 24px 32px" }}>
          <SectionHeader title="Members" />
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {[
              { name: "Jingqi (You)", color: C.orange, initial: "J" },
              { name: "Alex",         color: C.blue,   initial: "A" },
              { name: "Mia",          color: C.pink,   initial: "M" },
              { name: "Sam",          color: C.green,  initial: "S" },
              { name: "Leo",          color: C.purple, initial: "L" },
            ].map(m => (
              <div key={m.name} style={{
                display: "flex", alignItems: "center", gap: 7,
                backgroundColor: "white",
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: 22, padding: "7px 12px",
                boxShadow: "3px 3px 0px rgba(0,0,0,0.10)",
              }}>
                <GeometricAvatar initial={m.initial} color={m.color} shape="circle" size={22} />
                <span style={{ fontSize: 15, fontFamily: DM_SANS, fontWeight: 600, color: C.text }}>{m.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Floating Button */}
      <button
        onClick={() => setAiOpen(true)}
        style={{
          position: "absolute",
          bottom: 90,
          right: 20,
          width: 58, height: 58,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${C.orange}, ${C.orangeDark})`,
          border: "none",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", zIndex: 90,
          boxShadow: `0 8px 28px ${C.orange}55`,
          animation: "pulse 2.5s ease infinite",
        }}
      >
        <SolidWandIcon size={24} color="white" />
      </button>

      {aiOpen && <AiPanel onClose={() => setAiOpen(false)} />}

      <style>{`
        @keyframes pulse {
          0%, 100% { box-shadow: 0 8px 28px ${C.orange}55; transform: scale(1); }
          50% { box-shadow: 0 8px 36px ${C.orange}75; transform: scale(1.04); }
        }
      `}</style>
    </PageWrapper>
  );
}
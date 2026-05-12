import React from "react";
import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router";
import { C, LONDRINA, DM_SANS, PageWrapper } from "../components/kitchen/Shared";
import { Flame, Trophy, Zap } from "lucide-react";

/* ─── Constants ─────────────────────────────────────────── */
const ORANGE      = "#E4886B";
const ORANGE_DARK = "#C96B4E";
const BLUE        = "#5D89E0";
const PINK        = "#DB7790";
const BG          = "#FDF5F2";

/* ─── Types ──────────────────────────────────────────────────── */
type DayStatus = "completed" | "today" | "upcoming" | "rest";
type ParticleShape = "triangle" | "diamond" | "square";

interface WeekDay { day: string; date: number; status: DayStatus; }
interface Particle {
  id: number; x: number; y: number; rotation: number;
  size: number; color: string; shape: ParticleShape;
  duration: number; delay: number; scale: number;
}

/* ─── Data ───────────────────────────────────────────────────── */
const WEEK: WeekDay[] = [
  { day: "M", date: 26, status: "completed" },
  { day: "T", date: 27, status: "completed" },
  { day: "W", date: 28, status: "today"     },
  { day: "T", date: 29, status: "upcoming"  },
  { day: "F", date: 30, status: "upcoming"  },
  { day: "S", date: 1,  status: "rest"      },
  { day: "S", date: 2,  status: "rest"      },
];

/* ─── Confetti generator ─────────────────────────────────────── */
const CONFETTI_COLORS = [ORANGE, BLUE, PINK, "#F5C24C", "#9B7DD4"];
const CONFETTI_SHAPES: ParticleShape[] = ["triangle", "diamond", "square"];
const CLIP_PATHS: Record<ParticleShape, string> = {
  triangle: "polygon(50% 0%, 100% 100%, 0% 100%)",
  diamond:  "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
  square:   "",
};

function generateParticles(): Particle[] {
  const count = 32;
  return Array.from({ length: count }, (_, i) => {
    // Spread evenly around 360° with small jitter
    const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.6;
    // Bias upward slightly for natural confetti feel
    const biasY  = Math.sin(angle) < 0 ? 1.3 : 0.85;
    const dist   = 90 + Math.random() * 170;
    return {
      id:       i,
      x:        Math.cos(angle) * dist,
      y:        Math.sin(angle) * dist * biasY,
      rotation: (Math.random() - 0.5) * 600,
      size:     8 + Math.random() * 16,
      scale:    0.6 + Math.random() * 0.8,
      color:    CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      shape:    CONFETTI_SHAPES[i % 3],
      duration: 0.85 + Math.random() * 0.55,
      delay:    i < 8 ? 0 : Math.random() * 0.35,
    };
  });
}

/* ─── Day Circle ─────────────────────────────────────────────── */
function DayCircle({
  day, date, status, doneOverride = false,
}: WeekDay & { doneOverride?: boolean }) {
  const isComplete  = status === "completed" || doneOverride;
  const isTodayFill = status === "today" && !doneOverride;
  const isUpcoming  = status === "upcoming";
  const isRest      = status === "rest";

  const circleBg     = isTodayFill ? ORANGE : "white";
  const circleBorder = isComplete
    ? `2.5px solid ${ORANGE}`
    : isTodayFill
    ? "none"
    : isUpcoming
    ? "2px solid #E0D9CE"
    : "2px solid transparent";
  const circleBgRest = isRest ? "#F5F0E8" : circleBg;
  const glow = isTodayFill ? `0 0 0 4px ${ORANGE}22` : "none";
  const dayLabelColor = (isComplete || isTodayFill) ? ORANGE : "#C0B8AC";

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
      {/* Day letter */}
      <span style={{
        fontFamily: DM_SANS, fontSize: 12, fontWeight: 700,
        color: dayLabelColor, letterSpacing: "0.06em",
      }}>
        {day}
      </span>

      {/* Circle */}
      <div style={{
        width: 38, height: 38, borderRadius: "50%",
        backgroundColor: circleBgRest,
        border: circleBorder,
        boxShadow: glow,
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
      }}>
        {isComplete ? (
          <svg width="15" height="12" viewBox="0 0 15 12">
            <path d="M1 6L5.5 10.5L14 1" stroke={ORANGE} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        ) : (
          <span style={{
            fontFamily: LONDRINA,
            fontSize: 16,
            color: isTodayFill ? "white"
              : isUpcoming ? "#B0A898"
              : "#D0C9BE",
          }}>
            {date}
          </span>
        )}
      </div>
    </div>
  );
}

/* ─── Ring Progress ──────────────────────────────────────────── */
function RingProgress({ pct, current, total }: { pct: number; current: number; total: number }) {
  const r    = 50;
  const cx   = 63;
  const circ = 2 * Math.PI * r;
  const dash = circ * (1 - pct / 100);
  return (
    <div style={{ position: "relative", width: 126, height: 126, flexShrink: 0 }}>
      <svg width="126" height="126" style={{ transform: "rotate(-90deg)" }}>
        <circle cx={cx} cy={cx} r={r} fill="none" stroke={`${ORANGE}18`} strokeWidth={13} />
        <circle
          cx={cx} cy={cx} r={r} fill="none"
          stroke={ORANGE} strokeWidth={13}
          strokeDasharray={circ} strokeDashoffset={dash}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.9s cubic-bezier(0.65,0,0.35,1)" }}
        />
      </svg>
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      }}>
        <span style={{ fontFamily: LONDRINA, fontSize: 34, color: "#3A3A3A", lineHeight: 1 }}>
          {current}
        </span>
        <span style={{ fontFamily: DM_SANS, fontSize: 13, color: "#A8A8A8", fontWeight: 500, marginTop: 1 }}>
          of {total}
        </span>
      </div>
    </div>
  );
}

/* ─── Stat Card ──────────────────────────────────────────────── */
function StatCard({
  icon, value, label, color,
}: { icon: React.ReactNode; value: string; label: string; color: string }) {
  return (
    <div style={{
      flex: 1, backgroundColor: "white",
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: 22,
      padding: "16px 10px", display: "flex", flexDirection: "column",
      alignItems: "center", gap: 6,
      boxShadow: "3px 3px 0px rgba(0,0,0,0.10)",
    }}>
      <div style={{
        width: 34, height: 34, borderRadius: 10,
        backgroundColor: `${color}14`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {icon}
      </div>
      <span style={{ fontFamily: LONDRINA, fontSize: 22, color, lineHeight: 1 }}>
        {value}
      </span>
      <span style={{ fontFamily: DM_SANS, fontSize: 13, fontWeight: 600, color: "#A8A8A8" }}>
        {label}
      </span>
    </div>
  );
}

/* ─── Tactile Pill Button ────────────────────────────────────── */
function PillButton({ children, onClick, disabled }: {
  children: React.ReactNode; onClick?: () => void; disabled?: boolean;
}) {
  const [pressed, setPressed] = useState(false);
  return (
    <button
      disabled={disabled}
      style={{
        width: "100%", borderRadius: 16,
        backgroundColor: disabled ? "#E8E4DC" : ORANGE,
        border: "none", padding: "15px 24px",
        fontFamily: DM_SANS, fontSize: 16, fontWeight: 700,
        color: disabled ? "#A8A8A8" : "white",
        cursor: disabled ? "not-allowed" : "pointer",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        transform: pressed ? "translateY(4px)" : "translateY(0)",
        boxShadow: pressed || disabled ? "none" : `0 5px 0 0 ${ORANGE_DARK}, 0 8px 24px ${ORANGE}38`,
        transition: "transform 0.08s ease, box-shadow 0.08s ease",
        userSelect: "none",
        WebkitTapHighlightColor: "transparent",
      }}
      onPointerDown={() => !disabled && setPressed(true)}
      onPointerUp={() => { setPressed(false); !disabled && onClick?.(); }}
      onPointerLeave={() => setPressed(false)}
      onPointerCancel={() => setPressed(false)}
    >
      {children}
    </button>
  );
}

/* ─── SuccessContent (replaces SuccessOverlay) ───────────── */
function SuccessContent({ onClose }: { onClose: () => void }) {
  const particles = useMemo(() => generateParticles(), []);
  const [burst, setBurst] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setBurst(true));
    return () => cancelAnimationFrame(t);
  }, []);

  return (
    <div style={{
      flex: 1,
      backgroundColor: BG,
      display: "flex", flexDirection: "column",
      justifyContent: "space-between",
      overflow: "hidden",
      animation: "successSlideIn 0.4s cubic-bezier(0.32,0.72,0,1) both",
      position: "relative",
    } as React.CSSProperties}>
      {/* Back arrow */}
      <div style={{ position: "sticky", top: 0, zIndex: 50, backgroundColor: "#FDF5F2", padding: "52px 24px 8px", flexShrink: 0 }}>
        <button
          onClick={onClose}
          style={{
            width: 42, height: 42, borderRadius: 10,
            backgroundColor: "white", border: "none",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "3px 3px 0px rgba(0,0,0,0.10)",
            cursor: "pointer",
          }}
        >
          {/* Solid back arrow — matches BackHeader style */}
          <svg width="20" height="20" viewBox="0 0 20 20">
            <path d="M13 3.5L5.5 10L13 16.5L11 10Z" fill="#6C6C6C"/>
          </svg>
        </button>
      </div>

      {/* ── Confetti Burst Zone ── */}
      <div style={{
        position: "relative",
        height: 150, flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        marginTop: 0,
      }}>
        {burst && particles.map(p => (
          <div
            key={p.id}
            style={{
              position: "absolute",
              top: "50%", left: "50%",
              width: p.size, height: p.size,
              backgroundColor: p.color,
              clipPath: CLIP_PATHS[p.shape] || undefined,
              borderRadius: p.shape === "square" ? 3 : 0,
              ["--tx" as string]: `${p.x}px`,
              ["--ty" as string]: `${p.y}px`,
              ["--rot" as string]: `${p.rotation}deg`,
              ["--sc" as string]: String(p.scale),
              animation: `confettiBurst ${p.duration}s ${p.delay}s ease-out both`,
              willChange: "transform, opacity",
            } as React.CSSProperties}
          />
        ))}

        <div style={{
          position: "absolute",
          width: 150, height: 150, borderRadius: "50%",
          background: `radial-gradient(circle, ${ORANGE}18 0%, transparent 70%)`,
        }} />

        <div style={{
          position: "relative", zIndex: 5,
          width: 80, height: 80, borderRadius: "50%",
          background: `linear-gradient(135deg, ${ORANGE}, ${ORANGE_DARK})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 12px 40px ${ORANGE}55`,
          animation: "bounceIn 0.7s 0.15s cubic-bezier(0.34,1.56,0.64,1) both",
        }}>
          {/* Solid check icon */}
          <svg width="40" height="40" viewBox="0 0 40 40">
            <path d="M8 20L16 28L32 12" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
        </div>
      </div>

      {/* Heading */}
      <div style={{ textAlign: "center", padding: "4px 20px 16px", animation: "fadeUp 0.5s 0.45s ease both" }}>
        <h1 style={{
          fontFamily: LONDRINA, fontSize: 28, color: "#3A3A3A",
          margin: "0 0 6px", lineHeight: 1.15,
        }}>
          Check-in Successful! 🎉
        </h1>
        <p style={{ fontFamily: DM_SANS, fontSize: 16, color: "#A8A8A8", margin: 0, fontWeight: 500 }}>
          Great job — your progress has been updated.
        </p>
      </div>

      {/* Updated Weekly Tracker */}
      <div style={{ padding: "0 20px 12px", animation: "fadeUp 0.5s 0.6s ease both" }}>
        <p style={{
          fontFamily: DM_SANS, fontSize: 13, fontWeight: 700,
          color: "#A8A8A8", letterSpacing: "0.08em", textTransform: "uppercase",
          margin: "0 0 12px",
        }}>
          This Week
        </p>
        <div style={{
          backgroundColor: "white",
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: 22,
          padding: "14px 14px 12px",
          boxShadow: "3px 3px 0px rgba(0,0,0,0.10)",
        }}>
          <div style={{ display: "flex", gap: 4 }}>
            {WEEK.map((d, i) => (
              <DayCircle key={i} {...d} doneOverride={d.status === "today"} />
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 9, height: 9, borderRadius: "50%", border: "1px solid rgba(0,0,0,0.06)", backgroundColor: "white" }} />
              <span style={{ fontFamily: DM_SANS, fontSize: 12, color: "#A8A8A8", fontWeight: 500 }}>Completed</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 9, height: 9, borderRadius: "50%", backgroundColor: ORANGE }} />
              <span style={{ fontFamily: DM_SANS, fontSize: 12, color: "#A8A8A8", fontWeight: 500 }}>Today ✓</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 9, height: 9, borderRadius: "50%", backgroundColor: "#D0C9BE" }} />
              <span style={{ fontFamily: DM_SANS, fontSize: 12, color: "#A8A8A8", fontWeight: 500 }}>Rest Day</span>
            </div>
          </div>
        </div>
      </div>

      {/* 75% Progress */}
      <div style={{ padding: "0 20px 12px", animation: "fadeUp 0.5s 0.75s ease both" }}>
        <div style={{
          backgroundColor: "white",
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: 22,
          padding: "16px 18px", boxShadow: "3px 3px 0px rgba(0,0,0,0.10)",
        }}>
          <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
            <RingProgress pct={75} current={3} total={4} />
            <div style={{ flex: 1, paddingTop: 6 }}>
              <span style={{ fontFamily: LONDRINA, fontSize: 40, color: ORANGE, lineHeight: 1, display: "block" }}>75%</span>
              <p style={{ fontFamily: DM_SANS, fontSize: 15, color: "#6C6C6C", margin: "6px 0 12px", lineHeight: 1.55 }}>
                You've completed <strong style={{ color: ORANGE }}>75%</strong> of your weekly tasks!
              </p>
              <div style={{ height: 8, backgroundColor: "#F2ECE2", borderRadius: 99, overflow: "hidden" }}>
                <div style={{
                  height: "100%", width: "75%",
                  background: `linear-gradient(90deg, ${ORANGE}CC, ${ORANGE})`,
                  borderRadius: 99,
                }} />
              </div>
              <p style={{ fontFamily: DM_SANS, fontSize: 13, color: "#A8A8A8", margin: "6px 0 0", fontWeight: 500 }}>
                3 completed · 1 remaining
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Done button */}
      <div style={{ padding: "0 20px 32px", animation: "fadeUp 0.5s 0.9s ease both" }}>
        <PillButton onClick={onClose}>
          <svg width="18" height="18" viewBox="0 0 18 18">
            <circle cx="9" cy="9" r="9" fill="white" opacity="0.3"/>
            <path d="M4.5 9L7.5 12.5L13.5 5.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
          Done — Back to Kitchen
        </PillButton>
      </div>

      <style>{`
        @keyframes confettiBurst {
          0% { transform: translate(-50%, -50%) scale(0) rotate(0deg); opacity: 1; }
          65% { opacity: 1; }
          100% { transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(var(--sc)) rotate(var(--rot)); opacity: 0; }
        }
        @keyframes bounceIn {
          0%   { transform: scale(0); opacity: 0; }
          60%  { transform: scale(1.15); opacity: 1; }
          80%  { transform: scale(0.93); }
          100% { transform: scale(1); }
        }
        @keyframes successSlideIn {
          from { transform: translateY(20px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        @keyframes fadeUp {
          from { transform: translateY(14px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>
    </div>
  );
}

/* ─── Main Check-in Page ─────────────────────────────────── */
export default function CheckIn() {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <PageWrapper bg="#FDF5F2">
      <div style={{ flex: 1, overflowY: "auto", scrollbarWidth: "none", fontFamily: DM_SANS } as React.CSSProperties}>
        {showSuccess ? (
          <SuccessContent onClose={() => navigate("/kitchen")} />
        ) : (
          <div style={{ paddingBottom: 50 }}>

            {/* ── Page Header ── */}
            <div style={{ position: "sticky", top: 0, zIndex: 50, backgroundColor: "#FDF5F2", display: "flex", alignItems: "center", padding: "52px 20px 24px", gap: 14 }}>
              <button
                onClick={() => navigate(-1)}
                style={{
                  width: 42, height: 42, borderRadius: 10,
                  backgroundColor: "white", border: "none",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "3px 3px 0px rgba(0,0,0,0.10)",
                  cursor: "pointer", flexShrink: 0,
                }}
              >
                {/* Solid back arrow */}
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <path d="M13 3.5L5.5 10L13 16.5L11 10Z" fill="#6C6C6C"/>
                </svg>
              </button>
              <div>
                <h1 style={{ fontFamily: LONDRINA, fontSize: 26, color: "#3A3A3A", margin: 0, lineHeight: 1.15 }}>
                  Check-in Progress
                </h1>
                <p style={{ fontFamily: DM_SANS, fontSize: 15, color: "#A8A8A8", margin: "3px 0 0", fontWeight: 500 }}>
                  Week 18 · Clean the Countertop
                </p>
              </div>
            </div>

            {/* ── Section 1: Stats Row ── */}
            <div style={{ padding: "0 20px 24px" }}>
              <div style={{ display: "flex", gap: 10 }}>
                <StatCard
                  icon={
                    <svg width="17" height="17" viewBox="0 0 17 17">
                      <circle cx="8.5" cy="8.5" r="8.5" fill={ORANGE}/>
                      <path d="M4 8.5L7 11.5L13 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    </svg>
                  }
                  value="2" label="Check-ins" color={ORANGE}
                />
                <StatCard icon={<Flame size={17} color={PINK} fill={PINK} />} value="3 days" label="Streak" color={PINK} />
                <StatCard icon={<Trophy size={17} color={BLUE} fill={BLUE} />} value="#2 / 5" label="Rank" color={BLUE} />
              </div>
            </div>

            {/* ── Section 2: Weekly Tracker ── */}
            <div style={{ padding: "0 20px 24px" }}>
              <p style={{
                fontFamily: DM_SANS, fontSize: 13, fontWeight: 700,
                color: "#A8A8A8", letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 12px",
              }}>
                This Week
              </p>
              <div style={{ backgroundColor: "white",
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: 22, padding: "22px 14px 18px", boxShadow: "3px 3px 0px rgba(0,0,0,0.10)" }}>
                <div style={{ display: "flex", gap: 4 }}>
                  {WEEK.map((d, i) => <DayCircle key={i} {...d} />)}
                </div>
                <div style={{ display: "flex", justifyContent: "center", gap: 18, marginTop: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <div style={{ width: 9, height: 9, borderRadius: "50%", border: "1px solid rgba(0,0,0,0.06)", backgroundColor: "white" }} />
                    <span style={{ fontFamily: DM_SANS, fontSize: 12, color: "#A8A8A8", fontWeight: 500 }}>Completed</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <div style={{ width: 9, height: 9, borderRadius: "50%", backgroundColor: ORANGE }} />
                    <span style={{ fontFamily: DM_SANS, fontSize: 12, color: "#A8A8A8", fontWeight: 500 }}>Today</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <div style={{ width: 9, height: 9, borderRadius: "50%", backgroundColor: "#D0C9BE" }} />
                    <span style={{ fontFamily: DM_SANS, fontSize: 12, color: "#A8A8A8", fontWeight: 500 }}>Rest Day</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Section 3: Completion Rate ── */}
            <div style={{ padding: "0 20px 24px" }}>
              <p style={{
                fontFamily: DM_SANS, fontSize: 13, fontWeight: 700,
                color: "#A8A8A8", letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 12px",
              }}>
                Completion Rate
              </p>
              <div style={{ backgroundColor: "white",
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: 22, padding: "24px 20px", boxShadow: "3px 3px 0px rgba(0,0,0,0.10)" }}>
                <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                  <RingProgress pct={40} current={2} total={5} />
                  <div style={{ flex: 1, paddingTop: 4 }}>
                    <span style={{ fontFamily: LONDRINA, fontSize: 40, color: ORANGE, lineHeight: 1, display: "block" }}>40%</span>
                    <p style={{ fontFamily: DM_SANS, fontSize: 15, color: "#6C6C6C", margin: "6px 0 12px", lineHeight: 1.55 }}>
                      You've completed <strong style={{ color: ORANGE }}>40%</strong> of your weekly tasks so far.
                    </p>
                    <div style={{ height: 7, backgroundColor: "#F2ECE2", borderRadius: 99, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: "40%", background: `linear-gradient(90deg, ${ORANGE}CC, ${ORANGE})`, borderRadius: 99 }} />
                    </div>
                    <p style={{ fontFamily: DM_SANS, fontSize: 13, color: "#A8A8A8", margin: "7px 0 0", fontWeight: 500 }}>
                      2 completed · 3 remaining
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Section 4: Check-in Action ── */}
            <div style={{ padding: "0 20px 40px" }}>
              <div style={{ backgroundColor: "#FDE8DF", borderRadius: 22, padding: "20px 20px 22px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 18 }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: 10, flexShrink: 0,
                    backgroundColor: `${ORANGE}22`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Zap size={20} color={ORANGE} fill={ORANGE} />
                  </div>
                  <div>
                    <p style={{ fontFamily: DM_SANS, fontWeight: 700, fontSize: 16, color: "#3A3A3A", margin: 0 }}>
                      Ready to check in?
                    </p>
                    <p style={{ fontFamily: DM_SANS, fontSize: 15, color: "#A8A8A8", margin: "3px 0 0", fontWeight: 400 }}>
                      Make sure you've completed the task first!
                    </p>
                  </div>
                </div>
                <PillButton onClick={() => setShowSuccess(true)}>
                  <svg width="18" height="18" viewBox="0 0 18 18">
                    <circle cx="9" cy="9" r="9" fill="rgba(255,255,255,0.3)"/>
                    <path d="M4.5 9L7.5 12.5L13.5 5.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  </svg>
                  Confirm Today's Check-in
                </PillButton>
                <p style={{ fontFamily: DM_SANS, fontSize: 14, color: "#B0A898", textAlign: "center", margin: "10px 0 0" }}>
                  Wednesday, Apr 28 · Clean the Countertop
                </p>
              </div>
            </div>

          </div>
        )}
      </div>
    </PageWrapper>
  );
}
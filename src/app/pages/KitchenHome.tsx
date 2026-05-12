import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import {
  C, LONDRINA, DM_SANS, PageWrapper, GeometricAvatar, TactileButton,
  BottomNav, SectionHeader, TangramDecoration, MATES, SCHEDULE_W46,
  SolidBellIcon, SolidSparkleIcon, SolidTaskIcon, SolidCheckIcon,
  SolidMailIcon, SolidPhoneIcon, SolidChevronRightIcon,
} from "../components/kitchen/Shared";

/* ─── Section Header with geometric diamond dot ─────────── */
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
        <button
          onClick={onAction}
          style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: color, fontWeight: 700, fontFamily: DM_SANS, padding: 0 }}
        >
          {action}
        </button>
      )}
    </div>
  );
}

/* ─── Kitchen Geometric Background Decoration ───────────── */
function KitchenGeoBg() {
  return (
    <div style={{
      position: "absolute", inset: 0,
      zIndex: 0, overflow: "hidden", pointerEvents: "none",
    }}>
      {/* 大三角 — 右上角压边，旋转 -17° */}
      <svg
        style={{ position: "absolute", top: 18, right: -18, opacity: 0.10 }}
        width="120" height="104"
      >
        <polygon
          points="60,7 113,97 7,97"
          fill={C.orange}
          transform="rotate(-17, 60, 52)"
        />
      </svg>
      {/* 中圆 — 左侧压边 */}
      <div style={{
        position: "absolute", top: 52, left: -28,
        width: 80, height: 80, borderRadius: "50%",
        backgroundColor: C.orange,
        opacity: 0.08,
      }} />
      {/* 小方块 — Hero 右下，旋转 23° */}
      <div style={{
        position: "absolute", top: 108, right: 32,
        width: 26, height: 26, borderRadius: 4,
        backgroundColor: C.orange,
        opacity: 0.13,
        transform: "rotate(23deg)",
      }} />
    </div>
  );
}

/* ─── Progress Bar ──────────────────────────────────────── */
function ProgressBar({ current, total, color }: { current: number; total: number; color: string }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ fontSize: 14, color: C.muted, fontWeight: 500, fontFamily: DM_SANS }}>Weekly Progress</span>
        <div style={{ backgroundColor: `${color}20`, borderRadius: 22, padding: "2px 10px", display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ fontSize: 15, color, fontFamily: LONDRINA }}>{current}</span>
          <span style={{ fontSize: 14, color: `${color}80`, fontFamily: DM_SANS }}>/ {total}</span>
        </div>
      </div>
      <div style={{ height: 5, backgroundColor: "#F2ECE2", borderRadius: 99, overflow: "hidden" }}>
        <div style={{
          height: "100%", width: `${pct}%`,
          background: `linear-gradient(90deg, ${color}CC, ${color})`,
          borderRadius: 99, transition: "width 0.5s ease",
        }} />
      </div>
    </div>
  );
}

/* ─── Contact Action Panel ──────────────────────────────── */
function ContactActionPanel() {
  const [emailPressed, setEmailPressed] = useState(false);
  const [phonePressed, setPhonePressed] = useState(false);

  return (
    <div style={{ padding: "0 24px 40px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <div style={{ height: 1, flex: 1, backgroundColor: C.divider }} />
        <span style={{ fontSize: 13, color: C.muted, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: DM_SANS }}>
          Contact the Staff
        </span>
        <div style={{ height: 1, flex: 1, backgroundColor: C.divider }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <a href="mailto:kitchen@dormhub.com" style={{ textDecoration: "none" }}
          onPointerDown={() => setEmailPressed(true)}
          onPointerUp={() => setEmailPressed(false)}
          onPointerLeave={() => setEmailPressed(false)}>
          <div style={{
            backgroundColor: C.card,
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: 22, padding: "16px 20px",
            display: "flex", alignItems: "center", gap: 14,
            transform: emailPressed ? "scale(0.98)" : "scale(1)",
            transition: "transform 0.1s ease", boxShadow: "3px 3px 0px rgba(0,0,0,0.10)",
          }}>
            <div style={{ width: 46, height: 46, borderRadius: 16, backgroundColor: C.blueLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <SolidMailIcon color={C.blue} size={20} />
            </div>
            <div>
              <span style={{ fontSize: 13, color: C.muted, fontWeight: 600, fontFamily: DM_SANS, display: "block" }}>Official Email</span>
              <span style={{ fontSize: 15, color: C.blue, fontWeight: 700, fontFamily: DM_SANS }}>kitchen@dormhub.com</span>
            </div>
          </div>
        </a>
        <a href="tel:+15550123456" style={{ textDecoration: "none" }}
          onPointerDown={() => setPhonePressed(true)}
          onPointerUp={() => setPhonePressed(false)}
          onPointerLeave={() => setPhonePressed(false)}>
          <div style={{
            backgroundColor: C.card,
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: 22, padding: "16px 20px",
            display: "flex", alignItems: "center", gap: 14,
            transform: phonePressed ? "scale(0.98)" : "scale(1)",
            transition: "transform 0.1s ease", boxShadow: "3px 3px 0px rgba(0,0,0,0.10)",
          }}>
            <div style={{ width: 46, height: 46, borderRadius: 16, backgroundColor: `${C.pink}20`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <SolidPhoneIcon color={C.pink} size={20} />
            </div>
            <div>
              <span style={{ fontSize: 13, color: C.muted, fontWeight: 600, fontFamily: DM_SANS, display: "block" }}>Emergency Line</span>
              <span style={{ fontSize: 15, color: C.pink, fontWeight: 700, fontFamily: DM_SANS }}>+1 (555) 012-3456</span>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}

/* ─── Kitchen Home ──────────────────────────────────────── */
export default function KitchenHome() {
  const navigate = useNavigate();
  const [checkedIn, setCheckedIn] = useState(false);

  return (
    <PageWrapper bg="#FDF5F2">

      {/* ── 吸顶 Hero Header ─────────────────────────────── */}
      <div style={{
        position: "relative",
        flexShrink: 0,
        backgroundColor: `${C.orange}0C`,
        overflow: "hidden",
        zIndex: 50,
      }}>
        <KitchenGeoBg />

        <div style={{
          position: "relative", zIndex: 2,
          padding: "52px 24px 16px",
          display: "flex", justifyContent: "space-between", alignItems: "flex-start",
        }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, backgroundColor: `${C.orange}22`, borderRadius: 22, padding: "3px 10px", marginBottom: 6 }}>
              <span style={{ fontSize: 13, color: C.orangeDark, fontWeight: 700, letterSpacing: "0.06em", fontFamily: DM_SANS }}>WEEK 46</span>
            </div>
            <h1 style={{ margin: 0, fontSize: 40, fontFamily: LONDRINA, color: C.strong, lineHeight: 1.1 }}>Kitchen</h1>
            <p style={{ margin: "4px 0 0", fontSize: 14, color: C.muted, fontFamily: DM_SANS, fontWeight: 500 }}>
              Your shared kitchen · Area B1
            </p>
          </div>

          <button style={{
            width: 46, height: 46, borderRadius: "50%", backgroundColor: "white", border: "none",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "3px 3px 0px rgba(0,0,0,0.10)",
            cursor: "pointer", position: "relative", marginTop: 28, flexShrink: 0,
          }} onClick={() => navigate("/message/kitchen")}>
            <SolidBellIcon color={C.text} size={20} />
            <div style={{ position: "absolute", top: 10, right: 10, width: 8, height: 8, borderRadius: "50%", backgroundColor: C.pink, border: "2px solid white" }} />
          </button>
        </div>

        {/* 底部细分隔线 */}
        <div style={{
          position: "absolute", bottom: 0, left: 24, right: 24,
          height: 1, backgroundColor: `${C.orange}22`, zIndex: 2,
        }} />
      </div>

      {/* ── 可滚动内容区 ─────────────────────────────────── */}
      <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden", paddingBottom: 24, scrollbarWidth: "none" }}>

        {/* My Cleaning Task */}
        <div style={{ padding: "20px 24px 24px" }}>
          <SectionHeaderWithDot title="My Cleaning Task" color={C.orange} />
          <div style={{
            backgroundColor: C.card,
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: 22, padding: "22px 22px 18px",
            position: "relative", overflow: "hidden", boxShadow: "3px 3px 0px rgba(0,0,0,0.10)",
          }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, backgroundColor: C.orangeLight, borderRadius: 22, padding: "4px 12px", marginBottom: 16 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: C.orange, boxShadow: `0 0 0 2px ${C.orange}40` }} />
              <span style={{ fontSize: 14, color: C.orange, fontWeight: 700, fontFamily: DM_SANS }}>In Progress</span>
            </div>
            <h2 style={{ margin: "0 0 4px", fontSize: 28, fontFamily: LONDRINA, color: C.strong, lineHeight: 1.2 }}>
              Clean the<br />Countertop
            </h2>
            <p style={{ margin: "0 0 20px", fontSize: 15, color: C.muted, fontFamily: DM_SANS }}>Due today · Kitchen Area A</p>
            <div style={{ marginBottom: 20 }}>
              <ProgressBar current={2} total={5} color={C.orange} />
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <TactileButton bgColor="#EDE8DF" shadowColor="#CCC7BE" textColor={C.text} flex onClick={() => navigate("/task-detail")}>
                <SolidTaskIcon color={C.text} size={15} /> Task Details
              </TactileButton>
              <TactileButton bgColor={C.orange} shadowColor={C.orangeDark} flex onClick={() => navigate("/check-in")}>
                {checkedIn
                  ? <><SolidCheckIcon color="white" size={15} /> Checked In!</>
                  : <><SolidSparkleIcon color="white" size={14} /> Check-in</>}
              </TactileButton>
            </div>
          </div>
        </div>

        {/* My Kitchen Mates */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ padding: "0 24px" }}>
            <SectionHeaderWithDot title="My Kitchen Mates" color={C.orange} action="See all" />
          </div>
          <div style={{ display: "flex", gap: 20, overflowX: "auto", paddingLeft: 24, paddingRight: 24, paddingBottom: 6, scrollbarWidth: "none" } as React.CSSProperties}>
            {MATES.map((mate) => (
              <div
                key={mate.id}
                onClick={() => navigate(`/mate/${mate.id}`)}
                style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, cursor: "pointer" }}
              >
                <GeometricAvatar initial={mate.initial} color={mate.color} shape="circle" size={56} />
                <div style={{ textAlign: "center" }}>
                  <p style={{ margin: 0, fontSize: 15, fontFamily: LONDRINA, color: C.strong, lineHeight: 1.2 }}>{mate.name}</p>
                  <p style={{ margin: "2px 0 0", fontSize: 13, color: C.muted, fontFamily: DM_SANS }}>Rm {mate.room}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Our Cleaning Schedule */}
        <div style={{ padding: "0 24px 24px" }}>
          <SectionHeaderWithDot title="Our Cleaning Schedule" color={C.orange} action="View all" onAction={() => navigate("/schedule")} />
          <div style={{
            backgroundColor: C.card,
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: 22, overflow: "hidden",
            boxShadow: "3px 3px 0px rgba(0,0,0,0.10)",
          }}>
            {SCHEDULE_W46.slice(0, 4).map((item, index) => (
              <div key={item.id} onClick={() => navigate("/schedule")} style={{
                display: "flex", alignItems: "center", gap: 14, padding: "14px 18px",
                backgroundColor: item.isMe ? `${item.color}08` : "transparent",
                borderBottom: index < 3 ? `1px solid ${C.divider}` : "none",
                cursor: "pointer",
              }}>
                <div style={{ textAlign: "center", minWidth: 32 }}>
                  <p style={{ margin: 0, fontSize: 12, color: C.muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em", fontFamily: DM_SANS }}>{item.day}</p>
                  <p style={{ margin: "1px 0 0", fontSize: 20, fontFamily: LONDRINA, color: item.isMe ? item.color : C.strong }}>{item.date}</p>
                </div>
                <div style={{ width: 3, height: 38, backgroundColor: item.color, borderRadius: 99, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: 16, fontFamily: LONDRINA, color: C.strong }}>{item.task}</p>
                  <p style={{ margin: "1px 0 0", fontSize: 14, color: C.muted, fontFamily: DM_SANS }}>{item.person}{item.isMe ? " (you)" : ""}</p>
                </div>
                <GeometricAvatar initial={item.initial} color={item.color} shape="circle" size={34} />
              </div>
            ))}
            {/* View Full Schedule 已移除，用上方 SectionHeader 的 View all 代替 */}
          </div>
        </div>

        <ContactActionPanel />
      </div>

      <BottomNav active={0} />
    </PageWrapper>
  );
}

import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";

/* ─── Font Families ──────────────────────────────────────── */
export const LONDRINA = "'Londrina Solid', cursive";
export const DM_SANS  = "'DM Sans', sans-serif";

/* ─── Design Tokens ─────────────────────────────────────── */
export const C = {
  bg: "#FEF9EF",
  orange: "#E4886B", orangeDark: "#C96B4E", orangeLight: "#FFF0EB",
  blue: "#5D89E0",   blueDark: "#3D69C0",   blueLight: "#EEF3FC",
  pink: "#DB7790",   pinkDark: "#BB5770",   pinkLight: "#FCEEF1",
  green: "#559A6E",  greenDark: "#357A4E",  greenLight: "#EBF5EF",
  purple: "#9B7DD4", purpleDark: "#7B5DB4", purpleLight: "#F0ECFB",
  text: "#6C6C6C", strong: "#3A3A3A", muted: "#7A7A7A",
  card: "#FFFFFF", divider: "#F2ECE2",
};

/* ─── Types ──────────────────────────────────────────────── */
export type Shape = "circle" | "diamond" | "triangle" | "square";

/* ─── Data (Fix 3: all shapes → circle; Fix 5: names + no flags) ─ */
export const MATES = [
  { id: 1, name: "Jingqi", room: "301", color: C.orange, initial: "J", shape: "circle" as Shape, nationality: "Chinese",  task: "Clean Countertop", taskDone: false },
  { id: 2, name: "Alex",   room: "302", color: C.blue,   initial: "A", shape: "circle" as Shape, nationality: "German",   task: "Wash Dishes",     taskDone: true  },
  { id: 3, name: "Mia",    room: "303", color: C.pink,   initial: "M", shape: "circle" as Shape, nationality: "American", task: "Sweep the Floor", taskDone: false },
  { id: 4, name: "Sam",    room: "304", color: C.green,  initial: "S", shape: "circle" as Shape, nationality: "French",   task: "Empty Trash",     taskDone: true  },
  { id: 5, name: "Leo",    room: "305", color: C.purple, initial: "L", shape: "circle" as Shape, nationality: "Japanese", task: "Wipe Microwave",  taskDone: false },
];

export const SCHEDULE_W46 = [
  { id: 1, day: "Mon", date: "10", person: "Jingqi", initial: "J", task: "Clean Countertop", color: C.orange, isMe: true  },
  { id: 2, day: "Tue", date: "11", person: "Alex",   initial: "A", task: "Wash Dishes",      color: C.blue,   isMe: false },
  { id: 3, day: "Wed", date: "12", person: "Mia",    initial: "M", task: "Sweep Floor",      color: C.pink,   isMe: false },
  { id: 4, day: "Thu", date: "13", person: "Sam",    initial: "S", task: "Empty Trash",      color: C.green,  isMe: false },
  { id: 5, day: "Fri", date: "14", person: "Leo",    initial: "L", task: "Wipe Microwave",   color: C.purple, isMe: false },
];

export const SCHEDULE_W47 = [
  { id: 1, day: "Mon", date: "17", person: "Alex",   initial: "A", task: "Wash Dishes",      color: C.blue,   conflict: false },
  { id: 2, day: "Tue", date: "18", person: "Jingqi", initial: "J", task: "Clean Countertop", color: C.orange, conflict: true  },
  { id: 3, day: "Wed", date: "19", person: "Sam",    initial: "S", task: "Sweep Floor",      color: C.green,  conflict: false },
  { id: 4, day: "Thu", date: "20", person: "Leo",    initial: "L", task: "Empty Trash",      color: C.purple, conflict: false },
  { id: 5, day: "Fri", date: "21", person: "Jingqi", initial: "J", task: "Wipe Microwave",   color: C.orange, conflict: true  },
];

/* ─── PageWrapper ────────────────────────────────────────── */
export function PageWrapper({ children, bg }: { children: React.ReactNode; bg?: string }) {
  return (
    <div style={{
      minHeight: "100dvh", backgroundColor: "#2A2520",
      display: "flex", justifyContent: "center",
      alignItems: "center", padding: "20px 0",
    }}>
      <div style={{
        width: 390, height: 844, flexShrink: 0,
        backgroundColor: bg || C.bg, display: "flex", flexDirection: "column",
        position: "relative", overflow: "hidden",
        borderRadius: 50,
        boxShadow: "0 60px 120px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)",
      }}>
        {children}
      </div>
    </div>
  );
}

/* ─── GeometricAvatar (Fix 3: always circle) ─────────────── */
export function GeometricAvatar({
  initial, color, shape: _shape, size = 48,
}: { initial: string; color: string; shape?: Shape; size?: number }) {
  return (
    <div style={{
      width: size, height: size,
      backgroundColor: color,
      borderRadius: "50%",   /* always circle */
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "white", fontWeight: 700, fontSize: size * 0.38,
      flexShrink: 0, letterSpacing: "0.02em",
      fontFamily: LONDRINA,
    }}>
      {initial}
    </div>
  );
}

/* ─── TactileButton ──────────────────────────────────────── */
export function TactileButton({
  children, bgColor, shadowColor, textColor = "white", outlined = false,
  flex = false, onClick, small = false, disabled = false, fullWidth = false,
}: {
  children: React.ReactNode;
  bgColor?: string; shadowColor?: string; textColor?: string;
  outlined?: boolean; flex?: boolean; onClick?: () => void;
  small?: boolean; disabled?: boolean; fullWidth?: boolean;
}) {
  const [pressed, setPressed] = useState(false);
  const resolvedBg = bgColor ?? C.orange;
  const resolvedShadow = shadowColor ?? C.orangeDark;
  return (
    <button
      disabled={disabled}
      style={{
        backgroundColor: outlined ? "transparent" : disabled ? "#E8E4DC" : resolvedBg,
        color: outlined ? resolvedBg : disabled ? C.muted : textColor,
        border: outlined ? `1.5px solid ${resolvedBg}` : "none",
        borderRadius: 16, padding: small ? "9px 16px" : "13px 22px",
        transform: pressed ? "translateY(4px)" : "translateY(0px)",
        boxShadow: pressed || outlined || disabled ? "none" : `0 5px 0 0 ${resolvedShadow}`,
        transition: "transform 0.08s ease, box-shadow 0.08s ease",
        cursor: disabled ? "not-allowed" : "pointer",
        fontWeight: 700, fontSize: small ? 13 : 15,
        display: "flex", alignItems: "center", gap: 6,
        flex: flex ? 1 : "none", width: fullWidth ? "100%" : "auto",
        justifyContent: "center", whiteSpace: "nowrap",
        userSelect: "none", WebkitTapHighlightColor: "transparent",
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

/* ─── BackHeader (Fix 4: solid filled back arrow) ───────── */
export function BackHeader({ title, subtitle, onBack, bg }: { title: string; subtitle?: string; onBack?: () => void; bg?: string }) {
  const navigate = useNavigate();
  return (
    <div style={{ position: "sticky", top: 0, zIndex: 50, backgroundColor: bg || "#FEF9EF", display: "flex", alignItems: "center", padding: "52px 24px 16px", gap: 14 }}>
      <button
        onClick={() => onBack ? onBack() : navigate(-1)}
        style={{
          width: 42, height: 42, borderRadius: 10,
          backgroundColor: "white", border: "none",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "2px 2px 0px rgba(0,0,0,0.10)",
          cursor: "pointer", flexShrink: 0,
          WebkitTapHighlightColor: "transparent",
        }}
      >
        {/* Solid filled back arrow */}
        <svg width="20" height="20" viewBox="0 0 20 20">
          <path d="M13 3.5L5.5 10L13 16.5L11 10Z" fill={C.text}/>
        </svg>
      </button>
      <div>
        <h1 style={{ margin: 0, fontSize: 24, fontFamily: LONDRINA, color: C.strong, lineHeight: 1.15 }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ margin: "3px 0 0", fontSize: 15, color: C.muted, fontFamily: DM_SANS }}>{subtitle}</p>
        )}
      </div>
    </div>
  );
}

/* ─── SectionHeader ──────────────────────────────────────── */
export function SectionHeader({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
      <span style={{ fontSize: 13, color: C.muted, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: DM_SANS }}>
        {title}
      </span>
      {action && (
        <button onClick={onAction} style={{
          display: "flex", alignItems: "center", gap: 4,
          color: C.blue, fontSize: 15, background: "none",
          border: "none", cursor: "pointer", fontWeight: 600, padding: 0,
          fontFamily: DM_SANS,
        }}>
          {action}
          {/* Solid right arrow */}
          <svg width="12" height="12" viewBox="0 0 12 12">
            <path d="M3.5 1.5L8 6L3.5 10.5L5 6Z" fill={C.blue}/>
          </svg>
        </button>
      )}
    </div>
  );
}

/* ─── Custom Solid Icon Components ────────────────────── */

export function SolidBellIcon({ color, size = 20 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20">
      <path d="M10 1C7.2 1 5 3.2 5 6V11L3 13V14H17V13L15 11V6C15 3.2 12.8 1 10 1Z" fill={color}/>
      <rect x="7.5" y="14" width="5" height="4" rx="2" fill={color}/>
    </svg>
  );
}

export function SolidSparkleIcon({ color, size = 16 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16">
      <path d="M8 1L9.6 6.4L15 8L9.6 9.6L8 15L6.4 9.6L1 8L6.4 6.4Z" fill={color}/>
    </svg>
  );
}

export function SolidCheckIcon({ color = "#E4886B", size = 18 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18">
      <circle cx="9" cy="9" r="9" fill={color}/>
      <path d="M4.5 9L7.5 12.5L13.5 5.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}

export function SolidTaskIcon({ color, size = 15 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 15 15">
      <rect x="2" y="1" width="11" height="13" rx="2" fill={color}/>
      <rect x="4.5" y="4"  width="6" height="1.5" rx="0.75" fill="white" opacity="0.85"/>
      <rect x="4.5" y="7"  width="6" height="1.5" rx="0.75" fill="white" opacity="0.85"/>
      <rect x="4.5" y="10" width="4" height="1.5" rx="0.75" fill="white" opacity="0.85"/>
    </svg>
  );
}

export function SolidSuitcaseIcon({ color, size = 15 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16">
      <rect x="0.5" y="5.5" width="15" height="9.5" rx="2.5" fill={color}/>
      <path d="M5 5.5V4C5 3 5.8 2.5 7 2.5H9C10.2 2.5 11 3 11 4V5.5"
        fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="0.5" y="9" width="15" height="2" rx="0" fill="rgba(0,0,0,0.18)"/>
      <rect x="7.25" y="7.5" width="1.5" height="5" rx="0.75" fill="white" opacity="0.5"/>
    </svg>
  );
}

export function SolidBookIcon({ color, size = 15 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16">
      <rect x="1" y="1" width="10" height="14" rx="2" fill={color}/>
      <rect x="3.5" y="4.5" width="6" height="1.3" rx="0.65" fill="white" opacity="0.7"/>
      <rect x="3.5" y="7.2" width="6" height="1.3" rx="0.65" fill="white" opacity="0.7"/>
      <rect x="3.5" y="9.9" width="4" height="1.3" rx="0.65" fill="white" opacity="0.7"/>
      <rect x="11" y="1" width="4" height="14" rx="1.5" fill={color}/>
    </svg>
  );
}

export function SolidSmileIcon({ color, size = 17 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18">
      <circle cx="9" cy="9" r="9" fill={color}/>
      <circle cx="6.5" cy="7.5" r="1.3" fill="white"/>
      <circle cx="11.5" cy="7.5" r="1.3" fill="white"/>
      <path d="M5.5 11C6.2 12.5 11.8 12.5 12.5 11" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

/* Fix 4: New solid icons for Mail, Phone, Alert, Wand, Send, Close, Refresh, ChevronRight */
export function SolidMailIcon({ color, size = 17 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 14">
      <rect x="0" y="0" width="18" height="14" rx="2.5" fill={color}/>
      <path d="M0.5 2L9 8L17.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </svg>
  );
}

export function SolidPhoneIcon({ color, size = 17 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 18">
      <rect x="0" y="0" width="12" height="18" rx="3" fill={color}/>
      <circle cx="6" cy="15" r="1.3" fill="white"/>
      <rect x="3.5" y="2" width="5" height="1.5" rx="0.75" fill="white" opacity="0.55"/>
    </svg>
  );
}

export function SolidAlertIcon({ color, size = 20 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 18">
      <polygon points="10,1 19.5,17 0.5,17" fill={color}/>
      <rect x="9" y="7" width="2" height="5" rx="1" fill="white"/>
      <circle cx="10" cy="14.5" r="1.2" fill="white"/>
    </svg>
  );
}

export function SolidWandIcon({ color = "white", size = 18 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18">
      {/* Wand stick (solid diagonal bar) */}
      <rect x="2" y="13.5" width="9" height="2.5" rx="1.25" fill={color}
        transform="rotate(-45,6.5,14.75)"/>
      {/* 4-point star at tip */}
      <path d="M13.5 1L14.7 5H18.5L15.4 7.5L16.6 11.5L13.5 9L10.4 11.5L11.6 7.5L8.5 5H12.3Z"
        fill={color}/>
    </svg>
  );
}

export function SolidSendIcon({ color = "white", size = 17 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 17 17">
      <path d="M1.5 1.5L16 8.5L1.5 15.5V10.5L11 8.5L1.5 6.5Z" fill={color}/>
    </svg>
  );
}

export function SolidCloseIcon({ color, size = 16 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16">
      <rect x="1.5" y="6.75" width="13" height="2.5" rx="1.25" fill={color}
        transform="rotate(45,8,8)"/>
      <rect x="1.5" y="6.75" width="13" height="2.5" rx="1.25" fill={color}
        transform="rotate(-45,8,8)"/>
    </svg>
  );
}

export function SolidRefreshIcon({ color, size = 14 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14">
      <path d="M11.5 7C11.5 9.5 9.5 11.5 7 11.5C4.5 11.5 2.5 9.5 2.5 7C2.5 4.8 4 3 6 2.6"
        stroke={color} strokeWidth="2" fill="none" strokeLinecap="round"/>
      <polygon points="6,0 9.5,3 5,4.5" fill={color}/>
    </svg>
  );
}

export function SolidChevronRightIcon({ color = C.blue, size = 13 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12">
      <path d="M3.5 1.5L8 6L3.5 10.5L5 6Z" fill={color}/>
    </svg>
  );
}

/* ─── BottomNav ──────────────────────────────────────────── */
export function BottomNav({ active = 0 }: { active?: number }) {
  const navigate = useNavigate();
  /* Per-tab active colours */
  const TAB_COLORS = [C.orange, C.blue, C.green, C.pink, C.purple];
  const items = [
    {
      label: "Kitchen", path: "/kitchen",
      svg: (c: string) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M3.74347 2.81561C3.77691 2.33855 4.17541 2 4.62048 2C5.10623 2 5.5 2.39377 5.5 2.87952V7.37402C5.5 7.7192 5.77982 7.99902 6.125 7.99902C6.47018 7.99902 6.75 7.7192 6.75 7.37402V2.75C6.75 2.33579 7.08579 2 7.5 2C7.91421 2 8.25 2.33579 8.25 2.75V7.37402C8.25 7.7192 8.52982 7.99902 8.875 7.99902C9.22018 7.99902 9.5 7.7192 9.5 7.37402V2.87952C9.5 2.39377 9.89377 2 10.3795 2C10.8246 2 11.2231 2.33855 11.2565 2.81561C11.2995 3.42827 11.5 6.37042 11.5 8C11.5 9.35041 10.8301 10.5443 9.80784 11.2674C9.59197 11.4201 9.53994 11.582 9.54532 11.6644C9.66817 13.5423 10 18.6815 10 19.4975C10 20.8782 8.88071 21.9975 7.5 21.9975C6.11929 21.9975 5 20.8782 5 19.4975C5 18.6815 5.33183 13.5423 5.45468 11.6644C5.46006 11.582 5.40803 11.4201 5.19216 11.2674C4.1699 10.5443 3.5 9.35041 3.5 8C3.5 6.37042 3.70051 3.42827 3.74347 2.81561ZM13 7.75C13 4.57436 15.5744 2 18.75 2C19.1642 2 19.5 2.33579 19.5 2.75V11.25C19.5 11.5677 19.6063 13.1447 19.7246 14.8917L19.7302 14.9745C19.8594 16.8829 20 18.9581 20 19.4975C20 20.8782 18.8807 21.9975 17.5 21.9975C16.1193 21.9975 15 20.8782 15 19.4975C15 18.9829 15.1278 16.8855 15.2516 14.9631C15.3141 13.9917 15.3767 13.0506 15.4236 12.3525L15.4473 12H14.75C13.7835 12 13 11.2165 13 10.25V7.75Z" fill={c}/>
        </svg>
      ),
    },
    {
      label: "Activity", path: "/activity",
      svg: (c: string) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M9.24606 14.0013C10.2126 14.0013 10.9961 14.7848 10.9961 15.7513V19.2513C10.9961 20.2178 10.2126 21.0013 9.24606 21.0013H3.75C2.7835 21.0013 2 20.2178 2 19.2513V15.7513C2 14.7848 2.7835 14.0013 3.75 14.0013H9.24606ZM20.25 14.0013C21.2165 14.0013 22 14.7848 22 15.7513V19.2513C22 20.2178 21.2165 21.0013 20.25 21.0013H14.7539C13.7874 21.0013 13.0039 20.2178 13.0039 19.2513V15.7513C13.0039 14.7848 13.7874 14.0013 14.7539 14.0013H20.25ZM20.25 2.99609C21.2165 2.99609 22 3.7796 22 4.74609V10.2495C22 11.216 21.2165 11.9995 20.25 11.9995H3.75C2.7835 11.9995 2 11.216 2 10.2495V4.74609C2 3.82792 2.70711 3.0749 3.60647 3.00189L3.75 2.99609H20.25Z" fill={c}/>
        </svg>
      ),
    },
    {
      label: "Calendar", path: "/calendar",
      svg: (c: string) => (
        <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
          <path d="M4 0.5C4 0.367392 3.94732 0.240215 3.85355 0.146447C3.75979 0.0526784 3.63261 0 3.5 0C3.36739 0 3.24021 0.0526784 3.14645 0.146447C3.05268 0.240215 3 0.367392 3 0.5V1H2C1.46957 1 0.960859 1.21071 0.585786 1.58579C0.210714 1.96086 0 2.46957 0 3L0 4H16V3C16 2.46957 15.7893 1.96086 15.4142 1.58579C15.0391 1.21071 14.5304 1 14 1H13V0.5C13 0.367392 12.9473 0.240215 12.8536 0.146447C12.7598 0.0526784 12.6326 0 12.5 0C12.3674 0 12.2402 0.0526784 12.1464 0.146447C12.0527 0.240215 12 0.367392 12 0.5V1H4V0.5ZM16 14V5H0V14C0 14.5304 0.210714 15.0391 0.585786 15.4142C0.960859 15.7893 1.46957 16 2 16H14C14.5304 16 15.0391 15.7893 15.4142 15.4142C15.7893 15.0391 16 14.5304 16 14Z" fill={c}/>
        </svg>
      ),
    },
    {
      label: "Messages", path: "/message",
      svg: (c: string) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M21.75 6V18C21.75 18.3978 21.592 18.7794 21.3107 19.0607C21.0294 19.342 20.6479 19.5 20.25 19.5H7.78128L4.72503 22.14L4.71659 22.1466C4.44662 22.3755 4.10397 22.5008 3.75003 22.5C3.52997 22.4996 3.31268 22.451 3.11346 22.3575C2.85434 22.2381 2.63511 22.0466 2.48198 21.8058C2.32886 21.5651 2.24833 21.2853 2.25003 21V6C2.25003 5.60218 2.40806 5.22064 2.68937 4.93934C2.97067 4.65804 3.3522 4.5 3.75003 4.5H20.25C20.6479 4.5 21.0294 4.65804 21.3107 4.93934C21.592 5.22064 21.75 5.60218 21.75 6Z" fill={c}/>
        </svg>
      ),
    },
    {
      label: "Profile", path: "/profile",
      svg: (c: string) => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M6.36449 7.13551C6.36441 6.16239 6.6163 5.20584 7.09566 4.35898C7.57501 3.51212 8.26548 2.80382 9.09985 2.30303C9.93421 1.80225 10.884 1.52605 11.8568 1.50133C12.8296 1.47661 13.7923 1.70421 14.651 2.16197C15.5097 2.61973 16.2353 3.29205 16.757 4.11347C17.2787 4.93489 17.5789 5.87742 17.6282 6.84928C17.6776 7.82114 17.4744 8.78922 17.0386 9.65925C16.6027 10.5293 15.9489 11.2716 15.141 11.814C16.7927 12.4301 18.2273 13.5173 19.2672 14.9408C20.307 16.3643 20.9064 18.0617 20.991 19.8225C20.9978 19.9702 20.9755 20.1177 20.9253 20.2567C20.8751 20.3958 20.798 20.5235 20.6984 20.6328C20.5988 20.742 20.4787 20.8305 20.3449 20.8932C20.211 20.956 20.0661 20.9918 19.9185 20.9985H4.08149C3.78355 20.9845 3.50335 20.8528 3.30252 20.6322C3.10168 20.4117 2.99664 20.1205 3.01049 19.8225C3.09481 18.0614 3.69403 16.3638 4.7339 14.9399C5.77377 13.5161 7.20857 12.4287 8.86049 11.8125C8.09236 11.2978 7.46282 10.6019 7.02749 9.78621C6.59217 8.97049 6.36446 8.06011 6.36449 7.13551Z" fill={c}/>
        </svg>
      ),
    },
  ];
  return (
    <nav style={{
      flexShrink: 0,
      width: "100%",
      backgroundColor: "white", borderTop: `1px solid ${C.divider}`,
      display: "flex", alignItems: "center",
      paddingTop: "10px",
      paddingLeft: "4px",
      paddingRight: "4px",
      paddingBottom: "calc(12px + env(safe-area-inset-bottom, 0px))",
      zIndex: 100, boxShadow: "0 -4px 24px rgba(0,0,0,0.07)",
      boxSizing: "border-box",
    } as React.CSSProperties}>
      {items.map((item, i) => {
        const isActive = i === active;
        const activeColor = TAB_COLORS[i];
        const iconColor = isActive ? activeColor : C.muted;
        return (
          <button key={i} onClick={() => navigate(item.path)} style={{
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            background: "none", border: "none", cursor: "pointer",
            flex: 1,
            padding: "6px 8px", borderRadius: 10, position: "relative",
            minHeight: 44,
            WebkitTapHighlightColor: "transparent",
          }}>
            {isActive && <div style={{ position: "absolute", top: -1, left: "50%", transform: "translateX(-50%)", width: 24, height: 3, borderRadius: 99, backgroundColor: activeColor }} />}
            {item.svg(iconColor)}
          </button>
        );
      })}
    </nav>
  );
}

/* ─── TangramDecoration (Fix 1: accepts primaryColor) ───── */
export function TangramDecoration({ primaryColor }: { primaryColor?: string } = {}) {
  const pc = primaryColor ?? C.orange;
  return (
    <svg width="130" height="130" viewBox="0 0 130 130"
      style={{ position: "absolute", top: 0, right: 0, pointerEvents: "none" }} aria-hidden="true">
      <polygon points="130,0 130,90 40,0" fill={pc}   opacity="0.11"/>
      <rect x="74" y="14" width="32" height="32" fill={C.blue}  opacity="0.13" rx="4" transform="rotate(22,90,30)"/>
      <polygon points="55,72 90,72 72,48"           fill={C.pink}  opacity="0.14"/>
      <polygon points="100,55 130,55 125,75 95,75"  fill={C.green} opacity="0.10"/>
    </svg>
  );
}
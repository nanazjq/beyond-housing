import React from "react";
import { useNavigate } from "react-router";
import { C, LONDRINA, DM_SANS, PageWrapper, BackHeader, BottomNav } from "../../components/kitchen/Shared";

/* ─── Data ───────────────────────────────────────────────── */
type NoticeMsg = { id: number; title: string; body: string; time: string; unread: boolean; type: "badge" | "announcement" | "survey" };
type ActivityMsg = { id: number; title: string; body: string; time: string; activityColor: string; navPath?: string };
type CultureMsg  = { id: number; title: string; body: string; time: string; festivalId?: number };

const NOTICES: NoticeMsg[] = [
  { id: 1, title: "Elevator A Maintenance",         body: "Elevator A will be out of service Dec 15–16. Please use the stairs or Elevator B.", time: "1h ago",   unread: true,  type: "announcement" },
  { id: 2, title: "Badge Unlocked: Cleaning Star!", body: "Congratulations! You completed 10 kitchen check-ins and earned the Cleaning Star badge. Your energy grows!",  time: "2d ago",   unread: true,  type: "badge" },
  { id: 3, title: "Resident Survey",                body: "Help us improve your living experience. The 5-minute survey closes Dec 20. Your response is valued.",             time: "3d ago",   unread: false, type: "survey" },
];

const ACTIVITY_MSGS: ActivityMsg[] = [
  { id: 1, title: "Yoga in the Park — Confirmed",  body: "You're all set for Saturday 10:00 at Hagaparken. Bring water and a mat if you have one!",  time: "3h ago",   activityColor: C.green,  navPath: "/activity/activity/1" },
  { id: 2, title: "Photography Walk — Reminder",   body: "Tomorrow at 14:00, Gamla Stan. Check-in opens 30 minutes before. Don't forget your camera!",time: "1d ago",   activityColor: C.blue,   navPath: "/activity/activity/2" },
  { id: 3, title: "Winter Mixer Party — Waitlist", body: "Good news! A spot opened up. You have 24h to confirm your spot or it releases to the next person.", time: "2d ago", activityColor: C.orange, navPath: "/activity/event/1" },
];

const CULTURE_MSGS: CultureMsg[] = [
  { id: 1, title: "Lucia Day — Dec 13",          body: "Candlelit processions begin at dusk. Residents are welcome to observe. Dress warmly — some processions are outdoors!", time: "Today",  festivalId: 1 },
  { id: 2, title: "Winter Solstice — Dec 21",    body: "The shortest day of the year. Many residents mark it with candles and gathering. Check the Cultural Calendar for details.", time: "Today",  festivalId: 2 },
  { id: 3, title: "Swedish Christmas Traditions",body: "Christmas Eve (Dec 24) is the main celebration in Sweden. Families gather for julbord feast. Everything closes by afternoon!", time: "2d ago", festivalId: 3 },
];

/* ─── Icons ──────────────────────────────────────────────── */
function BadgeTrophyIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill={C.orange}>
      <path d="M9 1L11 7H17L12.5 10.5L14.5 16.5L9 13L3.5 16.5L5.5 10.5L1 7H7Z"/>
    </svg>
  );
}
function AnnouncementIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill={C.blue}>
      <path d="M9 1C6 1 3.5 3.5 3.5 6.5V11L2 13V14H16V13L14.5 11V6.5C14.5 3.5 12 1 9 1Z"/>
      <rect x="7" y="14" width="4" height="3" rx="1.5"/>
    </svg>
  );
}
function SurveyIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill={C.purple}>
      <rect x="2" y="1.5" width="14" height="15" rx="2.5"/>
      <rect x="5" y="5"  width="8" height="1.5" rx="0.75" fill="white" opacity="0.8"/>
      <rect x="5" y="8.5"  width="8" height="1.5" rx="0.75" fill="white" opacity="0.8"/>
      <rect x="5" y="12" width="5" height="1.5" rx="0.75" fill="white" opacity="0.6"/>
    </svg>
  );
}
function CheckCircleIcon({ color, size = 18 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill={color}>
      <circle cx="9" cy="9" r="8.5"/>
      <path d="M4.5 9L7 12L13.5 5.5L12 4.5L7 9.5L6 8L4.5 9Z" fill="white"/>
    </svg>
  );
}
function GlobeFullIcon({ color, size = 18 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill={color}>
      <circle cx="9" cy="9" r="7.5" opacity="0.2"/>
      <path d="M9 1.5C9 1.5 6 4.5 6 9C6 13.5 9 16.5 9 16.5C9 16.5 12 13.5 12 9C12 4.5 9 1.5 9 1.5Z"/>
      <rect x="1.5" y="8" width="15" height="2" rx="1" opacity="0.7"/>
    </svg>
  );
}

/* ─── Notice Card ────────────────────────────────────────── */
function NoticeCard({ n }: { n: NoticeMsg }) {
  const isBadge = n.type === "badge";
  const isSurvey = n.type === "survey";
  const color = isBadge ? C.orange : isSurvey ? C.purple : C.blue;
  return (
    <div style={{ backgroundColor: C.card,
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: 22, padding: "16px 18px", boxShadow: "3px 3px 0px rgba(0,0,0,0.10)", marginBottom: 12, borderLeft: n.unread ? `4px solid ${color}` : "none" }}>
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
        <div style={{ width: 38, height: 38, borderRadius: 10, backgroundColor: `${color}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
          {isBadge  ? <BadgeTrophyIcon   size={18} />
          : isSurvey ? <SurveyIcon         size={18} />
          :            <AnnouncementIcon   size={18} />}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 5 }}>
            <p style={{ margin: 0, fontSize: 16, fontFamily: LONDRINA, color: C.strong, flex: 1 }}>{n.title}</p>
            <span style={{ fontSize: 12, color: C.muted, fontFamily: DM_SANS, flexShrink: 0, marginLeft: 8 }}>{n.time}</span>
          </div>
          <p style={{ margin: 0, fontSize: 15, color: C.text, fontFamily: DM_SANS, lineHeight: 1.55 }}>{n.body}</p>
          {isBadge && (
            <div style={{ marginTop: 10, backgroundColor: `${C.orange}12`, borderRadius: 10, padding: "8px 12px", display: "flex", alignItems: "center", gap: 8 }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill={C.orange}>
                <path d="M9 1L11 7H17L12.5 10.5L14.5 16.5L9 13L3.5 16.5L5.5 10.5L1 7H7Z"/>
              </svg>
              <span style={{ fontSize: 14, color: C.orange, fontFamily: DM_SANS, fontWeight: 700 }}>Cleaning Star · +80 Energy Points added!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Activity Tracking Card ─────────────────────────────── */
function ActivityCard({ a }: { a: ActivityMsg }) {
  const navigate = useNavigate();
  return (
    <div style={{ backgroundColor: C.card,
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: 22, padding: "16px 18px", boxShadow: "3px 3px 0px rgba(0,0,0,0.10)", marginBottom: 12 }}>
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
        <div style={{ width: 38, height: 38, borderRadius: 10, backgroundColor: `${a.activityColor}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
          <CheckCircleIcon color={a.activityColor} size={18} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 5 }}>
            <p style={{ margin: 0, fontSize: 16, fontFamily: LONDRINA, color: a.activityColor, flex: 1 }}>{a.title}</p>
            <span style={{ fontSize: 12, color: C.muted, fontFamily: DM_SANS, flexShrink: 0, marginLeft: 8 }}>{a.time}</span>
          </div>
          <p style={{ margin: "0 0 10px", fontSize: 15, color: C.text, fontFamily: DM_SANS, lineHeight: 1.55 }}>{a.body}</p>
          {a.navPath && (
            <button onClick={() => navigate(a.navPath!)} style={{ backgroundColor: `${a.activityColor}15`, border: `1.5px solid ${a.activityColor}30`, borderRadius: 10, padding: "6px 14px", cursor: "pointer", fontSize: 14, fontFamily: LONDRINA, color: a.activityColor }}>
              View Activity →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Culture Card ───────────────────────────────────────── */
function CultureCard({ c }: { c: CultureMsg }) {
  const navigate = useNavigate();
  return (
    <div style={{ backgroundColor: C.card,
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: 22, padding: "16px 18px", boxShadow: "3px 3px 0px rgba(0,0,0,0.10)", marginBottom: 12 }}>
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
        <div style={{ width: 38, height: 38, borderRadius: 10, backgroundColor: `${C.orange}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
          <GlobeFullIcon color={C.orange} size={18} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 5 }}>
            <p style={{ margin: 0, fontSize: 16, fontFamily: LONDRINA, color: C.strong, flex: 1 }}>{c.title}</p>
            <span style={{ fontSize: 12, color: C.muted, fontFamily: DM_SANS, flexShrink: 0, marginLeft: 8 }}>{c.time}</span>
          </div>
          <p style={{ margin: "0 0 10px", fontSize: 15, color: C.text, fontFamily: DM_SANS, lineHeight: 1.55 }}>{c.body}</p>
          {c.festivalId && (
            <button onClick={() => navigate(`/activity/festival/${c.festivalId}`)} style={{ backgroundColor: `${C.orange}12`, border: "1px solid rgba(0,0,0,0.06)", borderRadius: 10, padding: "6px 14px", cursor: "pointer", fontSize: 14, fontFamily: LONDRINA, color: C.orange }}>
              Open Cultural Guide →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────── */
export default function AssistantDetailHub() {
  return (
    <PageWrapper bg="#FCF2F5">
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 24, scrollbarWidth: "none" } as React.CSSProperties}>
        <BackHeader title="System Notices" subtitle="Building · Badges · Surveys" bg="#FCF2F5" />

        {/* System Notices */}
        <div style={{ padding: "0 24px 32px" }}>
          <p style={{ margin: "0 0 14px", fontSize: 13, color: C.muted, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: DM_SANS }}>System Notices</p>
          {NOTICES.map(n => <NoticeCard key={n.id} n={n} />)}
        </div>

        {/* System Notices only */}
        <div style={{ height: 8 }} />
      </div>
      <BottomNav active={3} />
    </PageWrapper>
  );
}

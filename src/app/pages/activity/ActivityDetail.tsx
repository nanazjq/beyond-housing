import React from "react";
import { useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router";
import {
  C, LONDRINA, DM_SANS, PageWrapper, BackHeader, GeometricAvatar,
  TactileButton, BottomNav, SolidSparkleIcon, TangramDecoration,
} from "../../components/kitchen/Shared";
import { ACTIVITIES, BUDDIES } from "./ActivityShared";

/* ─── Inline icon components (flat solid-filled) ─────────── */
function BuddyIcon({ color, size = 16 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill={color}>
      <circle cx="4.5" cy="4" r="2.5" />
      <path d="M0 13C0 10 2 7.5 4.5 7.5C7 7.5 9 10 9 13H0Z" />
      <circle cx="11.5" cy="5" r="2" opacity="0.75" />
      <path d="M7 13C7 10.5 8.5 8.8 11.5 8.8C14.5 8.8 16 10.5 16 13H7Z" opacity="0.75" />
    </svg>
  );
}

function GlobeIcon({ color, size = 16 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7" fill={color} />
      <ellipse cx="8" cy="8" rx="3" ry="7" fill="white" opacity="0.18" />
      <rect x="1" y="7" width="14" height="2" rx="1" fill="white" opacity="0.22" />
      <rect x="2.5" y="4" width="11" height="1.5" rx="0.75" fill="white" opacity="0.12" />
      <rect x="2.5" y="10.5" width="11" height="1.5" rx="0.75" fill="white" opacity="0.12" />
    </svg>
  );
}

function CalendarCheckIcon({ color, size = 16 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill={color}>
      <rect x="1" y="3.5" width="14" height="11" rx="2.5" />
      <rect x="1" y="3.5" width="14" height="4.5" rx="2" fill={color} opacity="0.7" />
      <rect x="4.5" y="1" width="2" height="4" rx="1" />
      <rect x="9.5" y="1" width="2" height="4" rx="1" />
      <path d="M5.5 10L7.5 12L11 8.5L9.8 7.5L7.5 10L6.5 9L5.5 10Z" fill="white" />
    </svg>
  );
}

/* ─── Past Moments photo data ─────────────────────────────── */
const ACTIVITY_PAST_PHOTOS: Record<number, { url: string; caption: string; date: string }[]> = {
  1: [
    { url: "https://images.unsplash.com/photo-1758798469179-dea5d63257ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800", caption: "Saturday session", date: "Nov 30" },
    { url: "https://images.unsplash.com/photo-1663029915661-150b156761e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800", caption: "Sunrise flow", date: "Nov 16" },
    { url: "https://images.unsplash.com/photo-1776254516657-1b948be6f36a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800", caption: "Closing meditation", date: "Nov 9" },
  ],
  2: [
    { url: "https://images.unsplash.com/photo-1751650224194-403fc583a9b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800", caption: "Gamla Stan walk", date: "Dec 1" },
    { url: "https://images.unsplash.com/photo-1613117943919-d743b983c89b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800", caption: "Portrait session", date: "Nov 17" },
    { url: "https://images.unsplash.com/photo-1635928061729-b8e1a3195594?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800", caption: "City night shots", date: "Nov 3" },
  ],
  3: [
    { url: "https://images.unsplash.com/photo-1745031601345-30fb3f97b118?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800", caption: "Köttbullar prep", date: "Nov 29" },
    { url: "https://images.unsplash.com/photo-1772724317813-c7aec42c9d26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800", caption: "Hands in the kitchen", date: "Nov 15" },
    { url: "https://images.unsplash.com/photo-1604349347116-c9eeaf23700f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800", caption: "Fresh kanelbullar", date: "Nov 1" },
  ],
  4: [
    { url: "https://images.unsplash.com/photo-1690191864293-3fc9f1bd330b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800", caption: "Thursday practice", date: "Nov 28" },
    { url: "https://images.unsplash.com/photo-1590650046871-92c887180603?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800", caption: "Fika & Swedish", date: "Nov 21" },
    { url: "https://images.unsplash.com/photo-1582848890404-ed087c1b3f0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800", caption: "Game night edition", date: "Nov 7" },
  ],
  5: [
    { url: "https://images.unsplash.com/photo-1760112901304-de816d4a855d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800", caption: "Writing hour", date: "Nov 27" },
    { url: "https://images.unsplash.com/photo-1758273240112-c7724c9bb4a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800", caption: "Quiet room vibes", date: "Nov 20" },
    { url: "https://images.unsplash.com/photo-1776254516657-1b948be6f36a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800", caption: "Breathe & reflect", date: "Nov 13" },
  ],
  6: [
    { url: "https://images.unsplash.com/photo-1624520629915-b0e93365c56f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800", caption: "Tyresta forest", date: "Nov 24" },
    { url: "https://images.unsplash.com/photo-1767006023092-6a2b24b42aea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800", caption: "Summit panorama", date: "Nov 10" },
    { url: "https://images.unsplash.com/photo-1666471433216-cca799427229?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800", caption: "Autumn trail", date: "Oct 27" },
  ],
  7: [
    { url: "https://images.unsplash.com/photo-1645340207130-b42395776e73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800", caption: "Watercolour session", date: "Nov 27" },
    { url: "https://images.unsplash.com/photo-1766932901295-d4185660341b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800", caption: "Craft supplies spread", date: "Nov 20" },
    { url: "https://images.unsplash.com/photo-1476993142943-7f8140eeeefd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800", caption: "Sketch & draw", date: "Nov 6" },
  ],
  8: [
    { url: "https://images.unsplash.com/photo-1637351620482-fba388bae09d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800", caption: "Last Friday jam", date: "Nov 29" },
    { url: "https://images.unsplash.com/photo-1651289081581-09295cd8f862?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800", caption: "Acoustic session", date: "Nov 22" },
    { url: "https://images.unsplash.com/photo-1761959168878-ffbf71e12859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800", caption: "Rhythm section night", date: "Nov 15" },
  ],
};

/* ─── Past Moment photo card ─────────────────────────────── */
function MomentCard({ url, caption, date, color }: { url: string; caption: string; date: string; color: string }) {
  return (
    <div style={{
      flexShrink: 0, width: 222, height: 150,
      borderRadius: 16, overflow: "hidden",
      boxShadow: "3px 3px 0px rgba(0,0,0,0.10)",
      position: "relative",
    }}>
      <img src={url} alt={caption} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.55) 100%)" }} />
      <div style={{
        position: "absolute", top: 9, left: 9,
        backgroundColor: "rgba(255,255,255,0.22)", backdropFilter: "blur(6px)",
        borderRadius: 99, padding: "3px 8px",
      }}>
        <span style={{ fontSize: 9, color: "white", fontFamily: DM_SANS, fontWeight: 700, letterSpacing: "0.04em" }}>{date}</span>
      </div>
      <p style={{ position: "absolute", bottom: 9, left: 11, right: 11, margin: 0, fontSize: 14, fontFamily: LONDRINA, color: "white", lineHeight: 1.3 }}>{caption}</p>
    </div>
  );
}

/* ─── Empty state for first-time activities ──────────────── */
function PastMomentsEmpty({ color }: { color: string }) {
  return (
    <div style={{
      backgroundColor: `${color}10`, border: "1px solid rgba(0,0,0,0.06)",
      borderRadius: 16, padding: "28px 20px", textAlign: "center",
    }}>
      <div style={{ width: 52, height: 52, borderRadius: "50%", backgroundColor: `${color}15`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill={color} opacity={0.7}>
          <rect x="3" y="3" width="8" height="8" rx="2" />
          <rect x="13" y="3" width="8" height="8" rx="2" />
          <rect x="3" y="13" width="8" height="8" rx="2" />
          <path d="M17 13V21M13 17H21" stroke="white" strokeWidth="2" />
        </svg>
      </div>
      <p style={{ margin: "0 0 4px", fontSize: 16, fontFamily: LONDRINA, color: color }}>First time happening!</p>
      <p style={{ margin: 0, fontSize: 14, fontFamily: DM_SANS, color: C.muted, lineHeight: 1.5 }}>Be the first to document this activity and share the moment.</p>
    </div>
  );
}

/* ─── Stars ──────────────────────────────────────────────── */
function Stars({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <svg key={i} width="13" height="13" viewBox="0 0 13 13">
          <path d="M6.5 1L7.8 5H12L8.6 7.5L9.9 11.5L6.5 9L3.1 11.5L4.4 7.5L1 5H5.2Z"
            fill={i <= count ? "#F5C24C" : "#F2F3F5"} />
        </svg>
      ))}
    </div>
  );
}

const REVIEWS = [
  { name: "Yuki T.",  initial: "Y", color: C.green,  rating: 5, text: "Amazing session! The instructor was great and the park setting was perfect." },
  { name: "Emma L.",  initial: "E", color: C.purple, rating: 4, text: "Loved it. Bring water and sunscreen — it can get warm even in October." },
  { name: "Marcus",   initial: "M", color: C.pink,   rating: 5, text: "Genuinely one of the best activities I've joined since moving here." },
];

/* ─── Page ───────────────────────────────────────────────── */
export default function ActivityDetail() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const isDeepDive = searchParams.get("deep") === "1";
  const navigate = useNavigate();

  const activity = ACTIVITIES.find(a => a.id === Number(id)) ?? ACTIVITIES[0];
  const photos = ACTIVITY_PAST_PHOTOS[activity.id];
  const [signed, setSigned] = useState(false);
  const [showBuddySection, setShowBuddySection] = useState(false);

  return (
    <PageWrapper bg="#EFF3FC">
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 24, scrollbarWidth: "none" } as React.CSSProperties}>
        <BackHeader title={isDeepDive ? "Growth Insight" : "Activity Details"} subtitle={activity.category} bg="#EFF3FC" />

        {/* ── Hero Card ── */}
        <div style={{ padding: "0 24px 24px" }}>
          <div style={{ backgroundColor: C.card,
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: 22, padding: "22px 22px 20px", position: "relative", overflow: "hidden", boxShadow: "3px 3px 0px rgba(0,0,0,0.10)" }}>
            <TangramDecoration primaryColor={activity.color} />
            {isDeepDive && (
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, backgroundColor: `${activity.color}18`, borderRadius: 22, padding: "4px 12px", marginBottom: 14 }}>
                <SolidSparkleIcon color={activity.color} size={11} />
                <span style={{ fontSize: 13, color: activity.color, fontWeight: 700, fontFamily: DM_SANS, letterSpacing: "0.05em" }}>GROWTH PICK · High-value Experience</span>
              </div>
            )}
            <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 16 }}>
              <div style={{ width: 64, height: 64, borderRadius: 16, backgroundColor: `${activity.color}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, flexShrink: 0 }}>
                {activity.emoji}
              </div>
              <div>
                <h2 style={{ margin: "0 0 6px", fontSize: 26, fontFamily: LONDRINA, color: C.strong, lineHeight: 1.2 }}>{activity.title}</h2>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  <span style={{ backgroundColor: `${activity.color}18`, color: activity.color, borderRadius: 99, padding: "3px 10px", fontSize: 13, fontWeight: 700, fontFamily: DM_SANS }}>{activity.category}</span>
                  <span style={{ backgroundColor: "#F2F3F5", color: C.muted, borderRadius: 99, padding: "3px 10px", fontSize: 13, fontWeight: 600, fontFamily: DM_SANS }}>{activity.cost}</span>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 1, borderTop: `1px solid ${"#E4E6EA"}`, paddingTop: 14, borderBottom: `1px solid ${"#E4E6EA"}`, paddingBottom: 14, marginBottom: 14 }}>
              {[
                { label: "When",  value: activity.time,     flex: 1   },
                { label: "Where", value: activity.location, flex: 1.6 },
                { label: "Spots", value: activity.spots,    flex: 0.9 },
              ].map((info, i, arr) => (
                <div key={info.label} style={{ flex: info.flex, textAlign: "center", borderRight: i < arr.length - 1 ? `1px solid ${"#E4E6EA"}` : "none" }}>
                  <p style={{ margin: 0, fontSize: 15, fontFamily: LONDRINA, color: activity.color }}>{info.value}</p>
                  <p style={{ margin: "2px 0 0", fontSize: 12, color: C.muted, fontFamily: DM_SANS, fontWeight: 600 }}>{info.label}</p>
                </div>
              ))}
            </div>
            <p style={{ margin: 0, fontSize: 16, color: C.text, fontFamily: DM_SANS, lineHeight: 1.65 }}>{activity.desc}</p>
          </div>
        </div>

        {/* ── Past Moments ── */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ padding: "0 24px", marginBottom: 14 }}>
            <span style={{ fontSize: 13, color: C.muted, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: DM_SANS }}>
              Past Moments
            </span>
          </div>
          {photos && photos.length > 0 ? (
            <div style={{ display: "flex", gap: 12, overflowX: "auto", scrollbarWidth: "none", paddingLeft: 24, paddingRight: 24, paddingBottom: 4 } as React.CSSProperties}>
              {photos.map((p, i) => (
                <MomentCard key={i} {...p} color={activity.color} />
              ))}
            </div>
          ) : (
            <div style={{ padding: "0 24px" }}>
              <PastMomentsEmpty color={activity.color} />
            </div>
          )}
        </div>

        {/* ── Growth Insight (deepdive) ── */}
        {isDeepDive && (
          <div style={{ padding: "0 24px 24px" }}>
            <p style={{ margin: "0 0 12px", fontSize: 13, color: C.muted, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: DM_SANS }}>Core Value Assessment</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { label: "Mindfulness Impact",  score: 90, color: activity.color },
                { label: "Social Connection",   score: 72, color: C.blue        },
                { label: "Cultural Learning",   score: 65, color: C.pink        },
                { label: "Physical Wellbeing",  score: 55, color: C.green       },
              ].map(item => (
                <div key={item.label} style={{ backgroundColor: C.card,
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: 16, padding: "14px 16px", boxShadow: "3px 3px 0px rgba(0,0,0,0.10)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <span style={{ fontSize: 15, fontFamily: DM_SANS, fontWeight: 600, color: C.strong }}>{item.label}</span>
                    <span style={{ fontSize: 16, fontFamily: LONDRINA, color: item.color }}>{item.score}%</span>
                  </div>
                  <div style={{ height: 7, backgroundColor: "#F2F3F5", borderRadius: 99, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${item.score}%`, backgroundColor: item.color, borderRadius: 99 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Action Buttons ── */}
        <div style={{ padding: "0 24px 24px", display: "flex", flexDirection: "column", gap: 10 }}>
          <TactileButton bgColor={signed ? C.green : activity.color} shadowColor={`${signed ? C.green : activity.color}88`} fullWidth onClick={() => setSigned(true)}>
            {signed ? (
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
                <CalendarCheckIcon color="white" size={16} />
                Signed Up!
              </span>
            ) : (
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
                <CalendarCheckIcon color="white" size={16} />
                Sign Up for This Activity
              </span>
            )}
          </TactileButton>

          <button onClick={() => setShowBuddySection(!showBuddySection)} style={{
            width: "100%", borderRadius: 16, border: "1px solid rgba(0,0,0,0.06)",
            backgroundColor: showBuddySection ? `${C.blue}10` : "white",
            padding: "12px 20px", cursor: "pointer",
            fontSize: 15, fontFamily: LONDRINA, color: C.blue,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}>
            <BuddyIcon color={C.blue} size={16} />
            Find a Buddy for This Activity
          </button>

          <button onClick={() => navigate("/activity/culture")} style={{
            width: "100%", borderRadius: 16, border: "1px solid rgba(0,0,0,0.06)",
            backgroundColor: "white", padding: "12px 20px", cursor: "pointer",
            fontSize: 15, fontFamily: LONDRINA, color: C.green,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          }}>
            <GlobeIcon color={C.green} size={16} />
            Culture Portal — Swedish Context
          </button>
        </div>

        {/* ── Find a Buddy (expanded) ── */}
        {showBuddySection && (
          <div style={{ padding: "0 24px 24px" }}>
            <p style={{ margin: "0 0 12px", fontSize: 13, color: C.muted, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: DM_SANS }}>People Joining</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {BUDDIES.filter(b => b.activity === activity.title || Math.random() > 0.4).slice(0, 3).map(buddy => (
                <div key={buddy.id} onClick={() => navigate(`/activity/buddy/${buddy.id}`)} style={{
                  backgroundColor: C.card,
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: 16, padding: "12px 16px",
                  display: "flex", alignItems: "center", gap: 12, cursor: "pointer",
                  boxShadow: "3px 3px 0px rgba(0,0,0,0.10)",
                }}>
                  <GeometricAvatar initial={buddy.initial} color={buddy.color} shape="circle" size={40} />
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: 0, fontSize: 16, fontFamily: LONDRINA, color: C.strong }}>{buddy.name}</p>
                    <p style={{ margin: "2px 0 0", fontSize: 13, color: C.muted, fontFamily: DM_SANS }}>{buddy.nationality}</p>
                  </div>
                  <span style={{ backgroundColor: `${C.blue}18`, color: C.blue, borderRadius: 99, padding: "4px 12px", fontSize: 13, fontWeight: 700, fontFamily: DM_SANS }}>Invite</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Reviews ── */}
        <div style={{ padding: "0 24px 32px" }}>
          <p style={{ margin: "0 0 12px", fontSize: 13, color: C.muted, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: DM_SANS }}>
            Past Reviews ({activity.reviews})
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {REVIEWS.map((r, i) => (
              <div key={i} style={{ backgroundColor: C.card,
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: 16, padding: "14px 16px", boxShadow: "3px 3px 0px rgba(0,0,0,0.10)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <GeometricAvatar initial={r.initial} color={r.color} shape="circle" size={32} />
                  <div>
                    <p style={{ margin: 0, fontSize: 15, fontFamily: LONDRINA, color: C.strong }}>{r.name}</p>
                    <Stars count={r.rating} />
                  </div>
                </div>
                <p style={{ margin: 0, fontSize: 15, color: C.text, fontFamily: DM_SANS, lineHeight: 1.55 }}>{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNav active={1} />
    </PageWrapper>
  );
}

import React from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  C, LONDRINA, DM_SANS, PageWrapper, BackHeader,
  TactileButton, BottomNav, TangramDecoration,
} from "../../components/kitchen/Shared";
import { EVENTS } from "./ActivityShared";

/* ─── Flat solid icons ───────────────────────────────────── */
function TicketIcon({ color, size = 16 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill={color}>
      <path d="M1 5.5C1 4.7 1.7 4 2.5 4H13.5C14.3 4 15 4.7 15 5.5V6.5C14.1 6.5 13.5 7.2 13.5 8C13.5 8.8 14.1 9.5 15 9.5V10.5C15 11.3 14.3 12 13.5 12H2.5C1.7 12 1 11.3 1 10.5V9.5C1.9 9.5 2.5 8.8 2.5 8C2.5 7.2 1.9 6.5 1 6.5V5.5Z" />
      <circle cx="8" cy="8" r="1.5" fill="white" opacity="0.6" />
    </svg>
  );
}

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

/* ─── Per-event "Past Moments" photo data ─────────────────── */
const EVENT_MOMENTS: Record<number, {
  photos: { url: string; caption: string; date: string }[];
  reviews: { initial: string; color: string; name: string; quote: string }[];
}> = {
  1: {
    photos: [
      { url: "https://images.unsplash.com/photo-1772724317603-f6fae52cffff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800", caption: "The mixer in full swing", date: "Last Dec" },
      { url: "https://images.unsplash.com/photo-1585581279665-df6fe25e71e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800", caption: "Secret Santa round 🎁", date: "Last Dec" },
      { url: "https://images.unsplash.com/photo-1768508947770-bb3eaf08f971?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800", caption: "End-of-night cheers", date: "Last Dec" },
    ],
    reviews: [
      { initial: "S", color: C.blue,   name: "Sarah K.",  quote: "Best party of the semester! The secret Santa was absolutely hilarious." },
      { initial: "M", color: C.pink,   name: "Marcus",    quote: "Incredible atmosphere — met so many new people that one night." },
    ],
  },
  2: {
    photos: [
      { url: "https://images.unsplash.com/photo-1590650046871-92c887180603?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800", caption: "Welcome coffee & fika", date: "Jan 3" },
      { url: "https://images.unsplash.com/photo-1582848890404-ed087c1b3f0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800", caption: "Getting to know each other", date: "Jan 3" },
      { url: "https://images.unsplash.com/photo-1690191864293-3fc9f1bd330b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800", caption: "Building tour group", date: "Jan 3" },
    ],
    reviews: [
      { initial: "E", color: C.purple, name: "Emma L.",   quote: "Made me feel so at home from day one. The fika was a lovely bonus!" },
      { initial: "Y", color: C.green,  name: "Yuki T.",   quote: "Really helpful overview of everything. Highly recommend to all newcomers." },
    ],
  },
  3: {
    photos: [
      { url: "https://images.unsplash.com/photo-1768508947770-bb3eaf08f971?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800", caption: "Lucia procession 🕯️", date: "Dec 13" },
      { url: "https://images.unsplash.com/photo-1772724317603-f6fae52cffff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800", caption: "Carols in the Common Hall", date: "Dec 13" },
      { url: "https://images.unsplash.com/photo-1585581279665-df6fe25e71e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800", caption: "Post-procession gathering", date: "Dec 13" },
    ],
    reviews: [
      { initial: "P", color: C.pink,   name: "Priya M.",  quote: "A magical Swedish tradition I'll never forget. Truly beautiful." },
      { initial: "L", color: C.blue, name: "Li Wei",    quote: "Lovely to experience Swedish culture together as a whole community." },
    ],
  },
};

/* ─── Horizontal Photo Card ──────────────────────────────── */
function MomentCard({
  url, caption, date,
}: { url: string; caption: string; date: string }) {
  return (
    <div style={{
      flexShrink: 0,
      width: 228,
      height: 158,
      borderRadius: 16,
      overflow: "hidden",
      boxShadow: "3px 3px 0px rgba(0,0,0,0.10)",
      position: "relative",
    }}>
      {/* Photo */}
      <img
        src={url}
        alt={caption}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
      {/* Gradient overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.55) 100%)",
      }} />
      {/* Date badge top-left */}
      <div style={{
        position: "absolute", top: 10, left: 10,
        backgroundColor: "rgba(255,255,255,0.22)",
        backdropFilter: "blur(6px)",
        borderRadius: 99, padding: "3px 9px",
      }}>
        <span style={{ fontSize: 9, color: "white", fontFamily: DM_SANS, fontWeight: 700, letterSpacing: "0.04em" }}>
          {date}
        </span>
      </div>
      {/* Caption */}
      <p style={{
        position: "absolute", bottom: 10, left: 12, right: 12,
        margin: 0, fontSize: 14, fontFamily: LONDRINA, color: "white", lineHeight: 1.3,
      }}>
        {caption}
      </p>
    </div>
  );
}

/* ─── Review Card ────────────────────────────────────────── */
function ReviewCard({
  initial, color, name, quote,
}: { initial: string; color: string; name: string; quote: string }) {
  return (
    <div style={{
      backgroundColor: C.card,
            border: "1px solid rgba(0,0,0,0.06)",
      borderRadius: 16,
      padding: "16px",
      boxShadow: "3px 3px 0px rgba(0,0,0,0.10)",
      display: "flex",
      gap: 12,
      alignItems: "flex-start",
    }}>
      {/* Avatar */}
      <div style={{
        width: 36, height: 36, borderRadius: "50%",
        backgroundColor: color,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "white", fontSize: 15, fontFamily: LONDRINA,
        flexShrink: 0,
      }}>
        {initial}
      </div>
      <div style={{ flex: 1 }}>
        {/* Quote mark */}
        <span style={{ fontSize: 22, color: `${color}60`, fontFamily: LONDRINA, lineHeight: 0.8, display: "block", marginBottom: 4 }}>"</span>
        <p style={{ margin: "0 0 6px", fontSize: 15, color: C.text, fontFamily: DM_SANS, lineHeight: 1.55, fontStyle: "italic" }}>
          {quote}
        </p>
        <span style={{ fontSize: 13, color: color, fontFamily: DM_SANS, fontWeight: 700 }}>{name}</span>
      </div>
    </div>
  );
}

/* ─── Event Detail Page ──────────────────────────────────── */
export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const event    = EVENTS.find(e => e.id === Number(id)) ?? EVENTS[0];
  const moments  = EVENT_MOMENTS[event.id] ?? EVENT_MOMENTS[1];
  const [booked, setBooked] = useState(false);

  return (
    <PageWrapper bg="#EFF3FC">
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 24, scrollbarWidth: "none" } as React.CSSProperties}>
        <BackHeader title="Event Details" subtitle={event.type} bg="#EFF3FC" />

        {/* ── Main info card ── */}
        <div style={{ padding: "0 24px 24px" }}>
          <div style={{
            backgroundColor: C.card,
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: 22,
            padding: "22px 22px 20px",
            position: "relative", overflow: "hidden",
            boxShadow: "3px 3px 0px rgba(0,0,0,0.10)",
          }}>
            <TangramDecoration primaryColor={event.color} />
            <span style={{
              backgroundColor: `${event.color}18`, color: event.color,
              borderRadius: 99, padding: "4px 12px",
              fontSize: 13, fontWeight: 700, fontFamily: DM_SANS,
              display: "inline-block", marginBottom: 14,
            }}>{event.type}</span>
            <h2 style={{ margin: "0 0 6px", fontSize: 26, fontFamily: LONDRINA, color: C.strong }}>{event.name}</h2>
            <p style={{ margin: "0 0 16px", fontSize: 15, color: C.muted, fontFamily: DM_SANS }}>{event.time}</p>
            <p style={{ margin: "0 0 16px", fontSize: 16, color: C.text, fontFamily: DM_SANS, lineHeight: 1.65 }}>{event.desc}</p>
            <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 14, borderTop: `1px solid ${"#E4E6EA"}` }}>
              <div>
                <p style={{ margin: 0, fontSize: 12, color: C.muted, fontFamily: DM_SANS }}>Capacity</p>
                <p style={{ margin: "2px 0 0", fontSize: 16, fontFamily: LONDRINA, color: event.color }}>{event.capacity}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ margin: 0, fontSize: 12, color: C.muted, fontFamily: DM_SANS }}>When</p>
                <p style={{ margin: "2px 0 0", fontSize: 16, fontFamily: LONDRINA, color: C.strong }}>{event.time}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Past Moments section ── */}
        <div style={{ marginBottom: 28 }}>
          {/* Section label */}
          <div style={{ padding: "0 24px", marginBottom: 14 }}>
            <span style={{
              fontSize: 13, color: C.muted, fontWeight: 700,
              letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: DM_SANS,
            }}>
              Past Moments
            </span>
          </div>

          {/* Horizontal photo scroll */}
          <div style={{
            display: "flex", gap: 12,
            overflowX: "auto", scrollbarWidth: "none",
            paddingLeft: 24, paddingRight: 24, paddingBottom: 4,
          } as React.CSSProperties}>
            {moments.photos.map((p, i) => (
              <MomentCard key={i} {...p} />
            ))}
          </div>
        </div>

        {/* ── What people said ── */}
        <div style={{ padding: "0 24px 28px" }}>
          <span style={{
            fontSize: 13, color: C.muted, fontWeight: 700,
            letterSpacing: "0.08em", textTransform: "uppercase",
            fontFamily: DM_SANS, display: "block", marginBottom: 14,
          }}>
            What people said
          </span>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {moments.reviews.map((r, i) => (
              <ReviewCard key={i} {...r} />
            ))}
          </div>
        </div>

        {/* ── Book a Spot ── */}
        <div style={{ padding: "0 24px 16px" }}>
          <TactileButton
            bgColor={booked ? C.green : event.color}
            shadowColor={`${booked ? C.green : event.color}88`}
            fullWidth
            onClick={() => setBooked(true)}
          >
            {booked ? (
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
                <TicketIcon color="white" size={15} />
                Booked! See you there.
              </span>
            ) : (
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
                <TicketIcon color="white" size={15} />
                Book a Spot
              </span>
            )}
          </TactileButton>
        </div>

        {/* ── Find a Buddy ── */}
        <div style={{ padding: "0 24px 32px" }}>
          <button
            onClick={() => navigate("/activity/social?tab=buddy")}
            style={{
              width: "100%", borderRadius: 16,
              border: "1px solid rgba(0,0,0,0.06)",
              backgroundColor: "white",
              padding: "12px 20px", cursor: "pointer",
              fontSize: 15, fontFamily: LONDRINA, color: C.blue,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            }}
          >
            <BuddyIcon color={C.blue} size={16} />
            Find a Buddy for This Event
          </button>
        </div>
      </div>
      <BottomNav active={1} />
    </PageWrapper>
  );
}
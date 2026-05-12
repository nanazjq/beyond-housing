import React from "react";
import { useState } from "react";
import { useParams } from "react-router";
import {
  C, LONDRINA, DM_SANS, PageWrapper, BackHeader, GeometricAvatar,
  TactileButton, BottomNav, TangramDecoration,
} from "../../components/kitchen/Shared";
import { CLUBS, BUDDIES } from "./ActivityShared";

/* ─── Per-club archive photo data ────────────────────────── */
const CLUB_ARCHIVE: Record<number, {
  photos: { url: string; caption: string }[];
}> = {
  1: {
    // Photography Club — blues, street & portrait
    photos: [
      { url: "https://images.unsplash.com/photo-1751650224194-403fc583a9b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", caption: "Gamla Stan walk" },
      { url: "https://images.unsplash.com/photo-1613117943919-d743b983c89b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", caption: "Portrait session" },
      { url: "https://images.unsplash.com/photo-1635928061729-b8e1a3195594?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", caption: "City night shoot" },
      { url: "https://images.unsplash.com/photo-1751650224194-403fc583a9b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", caption: "Waterfront explore" },
      { url: "https://images.unsplash.com/photo-1635928061729-b8e1a3195594?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", caption: "Bokeh practice" },
      { url: "https://images.unsplash.com/photo-1613117943919-d743b983c89b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", caption: "Winter light" },
    ],
  },
  2: {
    // Yoga & Mindfulness — greens, soft light
    photos: [
      { url: "https://images.unsplash.com/photo-1758798469179-dea5d63257ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", caption: "Park session" },
      { url: "https://images.unsplash.com/photo-1776254516657-1b948be6f36a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", caption: "Quiet room flow" },
      { url: "https://images.unsplash.com/photo-1663029915661-150b156761e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", caption: "Sunrise stretch" },
      { url: "https://images.unsplash.com/photo-1663029915661-150b156761e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", caption: "Beach morning" },
      { url: "https://images.unsplash.com/photo-1758798469179-dea5d63257ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", caption: "Group vinyasa" },
      { url: "https://images.unsplash.com/photo-1776254516657-1b948be6f36a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", caption: "End meditation" },
    ],
  },
  3: {
    // Language Exchange — warm, diverse groups
    photos: [
      { url: "https://images.unsplash.com/photo-1690191864293-3fc9f1bd330b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", caption: "Swedish practice" },
      { url: "https://images.unsplash.com/photo-1590650046871-92c887180603?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", caption: "Café conversation" },
      { url: "https://images.unsplash.com/photo-1582848890404-ed087c1b3f0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", caption: "Games night" },
      { url: "https://images.unsplash.com/photo-1582848890404-ed087c1b3f0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", caption: "Fika & français" },
      { url: "https://images.unsplash.com/photo-1690191864293-3fc9f1bd330b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", caption: "Japanese corner" },
      { url: "https://images.unsplash.com/photo-1590650046871-92c887180603?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", caption: "New voices" },
    ],
  },
  4: {
    // Nordic Hiking Crew — forest, mountain, nature
    photos: [
      { url: "https://images.unsplash.com/photo-1624520629915-b0e93365c56f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", caption: "Tyresta forest" },
      { url: "https://images.unsplash.com/photo-1767006023092-6a2b24b42aea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", caption: "Summit view" },
      { url: "https://images.unsplash.com/photo-1666471433216-cca799427229?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", caption: "Autumn trail" },
      { url: "https://images.unsplash.com/photo-1666471433216-cca799427229?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", caption: "Creek crossing" },
      { url: "https://images.unsplash.com/photo-1624520629915-b0e93365c56f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", caption: "Morning mist" },
      { url: "https://images.unsplash.com/photo-1767006023092-6a2b24b42aea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400", caption: "Group at peak" },
    ],
  },
};

/* ─── Archive Photo Item ─────────────────────────────────── */
function ArchivePhoto({
  url, caption, clubColor,
}: { url: string; caption: string; clubColor: string }) {
  return (
    <div style={{
      borderRadius: 16,
      overflow: "hidden",
      position: "relative",
      aspectRatio: "1 / 1",
      boxShadow: "3px 3px 0px rgba(0,0,0,0.10)",
    }}>
      {/* Photo */}
      <img
        src={url}
        alt={caption}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
      {/* Subtle tint overlay using club color */}
      <div style={{
        position: "absolute", inset: 0,
        background: `linear-gradient(to bottom, ${clubColor}00 50%, ${clubColor}55 100%)`,
      }} />
      {/* Caption */}
      <p style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        margin: 0,
        padding: "4px 6px 6px",
        fontSize: 9, fontFamily: DM_SANS, fontWeight: 700,
        color: "white",
        lineHeight: 1.2,
        textShadow: "0 1px 3px rgba(0,0,0,0.5)",
      }}>
        {caption}
      </p>
    </div>
  );
}

/* ─── Club Detail Page ───────────────────────────────────── */
export default function ClubDetail() {
  const { id } = useParams();
  const club     = CLUBS.find(c => c.id === Number(id)) ?? CLUBS[0];
  const archive  = CLUB_ARCHIVE[club.id] ?? CLUB_ARCHIVE[1];
  const [joined, setJoined] = useState(false);

  const members = BUDDIES.slice(0, club.members > BUDDIES.length ? BUDDIES.length : 5);

  return (
    <PageWrapper bg="#EFF3FC">
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 24, scrollbarWidth: "none" } as React.CSSProperties}>
        <BackHeader title={club.name} subtitle={`Organiser: ${club.organizer}`} bg="#EFF3FC" />

        {/* ── Hero Card ── */}
        <div style={{ padding: "0 24px 24px" }}>
          <div style={{
            backgroundColor: C.card,
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: 22,
            padding: "22px 22px 20px",
            position: "relative", overflow: "hidden",
            boxShadow: "3px 3px 0px rgba(0,0,0,0.10)",
          }}>
            <TangramDecoration primaryColor={club.color} />

            {/* Badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              backgroundColor: `${club.color}18`, borderRadius: 22, padding: "4px 12px", marginBottom: 16,
            }}>
              <span style={{ fontSize: 14, color: club.color, fontWeight: 700, fontFamily: DM_SANS }}>✦ {club.badge}</span>
            </div>

            {/* Club avatar + name */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
              <GeometricAvatar initial={club.initial} color={club.color} shape="circle" size={64} />
              <div>
                <h2 style={{ margin: "0 0 4px", fontSize: 24, fontFamily: LONDRINA, color: C.strong }}>{club.name}</h2>
                <div style={{ display: "flex", gap: 6 }}>
                  <span style={{ backgroundColor: `${club.color}18`, color: club.color, borderRadius: 22, padding: "3px 10px", fontSize: 13, fontWeight: 700, fontFamily: DM_SANS }}>
                    {club.members} members
                  </span>
                  <span style={{ backgroundColor: "#F2F3F5", color: C.muted, borderRadius: 22, padding: "3px 10px", fontSize: 13, fontWeight: 600, fontFamily: DM_SANS }}>
                    Active
                  </span>
                </div>
              </div>
            </div>

            {/* Mission */}
            <p style={{ margin: "0 0 14px", fontSize: 16, color: C.text, fontFamily: DM_SANS, lineHeight: 1.65, fontStyle: "italic" }}>
              "{club.mission}"
            </p>

            {/* Next activity */}
            <div style={{
              backgroundColor: `${club.color}10`, borderRadius: 10, padding: "10px 14px",
              display: "flex", alignItems: "center", gap: 10,
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14">
                <rect x="0" y="0" width="14" height="14" rx="3" fill={club.color}/>
                <circle cx="4" cy="9" r="1.5" fill="white"/>
                <circle cx="7" cy="9" r="1.5" fill="white"/>
                <circle cx="10" cy="9" r="1.5" fill="white"/>
                <rect x="0" y="0" width="14" height="5" rx="3" fill={club.color}/>
              </svg>
              <span style={{ fontSize: 14, color: club.color, fontFamily: DM_SANS, fontWeight: 700 }}>Next: {club.nextActivity}</span>
            </div>
          </div>
        </div>

        {/* ── Active Members ── */}
        <div style={{ padding: "0 24px 24px" }}>
          <p style={{
            margin: "0 0 12px", fontSize: 13, color: C.muted,
            fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: DM_SANS,
          }}>Active Members</p>
          <div style={{ backgroundColor: C.card,
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: 22, padding: "16px", boxShadow: "3px 3px 0px rgba(0,0,0,0.10)" }}>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              {members.map(m => (
                <div key={m.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                  <GeometricAvatar initial={m.initial} color={m.color} shape="circle" size={42} />
                  <span style={{ fontSize: 12, color: C.muted, fontFamily: DM_SANS, textAlign: "center" }}>{m.name.split(" ")[0]}</span>
                </div>
              ))}
              {club.members > members.length && (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                  <div style={{ width: 42, height: 42, borderRadius: "50%", backgroundColor: "#F2F3F5", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 14, color: C.muted, fontFamily: DM_SANS, fontWeight: 700 }}>+{club.members - members.length}</span>
                  </div>
                  <span style={{ fontSize: 12, color: C.muted, fontFamily: DM_SANS }}>more</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Activity Archive ── */}
        <div style={{ padding: "0 24px 24px" }}>
          {/* Section label */}
          <p style={{
            margin: "0 0 14px", fontSize: 13, color: C.muted,
            fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: DM_SANS,
          }}>Activity Archive</p>

          {/* 3-column photo grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 8,
          }}>
            {archive.photos.map((photo, i) => (
              <ArchivePhoto
                key={i}
                url={photo.url}
                caption={photo.caption}
                clubColor={club.color}
              />
            ))}
          </div>

          {/* Small note below grid */}
          <p style={{
            margin: "10px 0 0", fontSize: 13, color: C.muted,
            fontFamily: DM_SANS, textAlign: "center",
          }}>
            {archive.photos.length} past activities shared
          </p>
        </div>

        {/* ── Culture Accessibility Badge ── */}
        <div style={{ padding: "0 24px 24px" }}>
          <div style={{
            backgroundColor: `${C.blue}10`,
            border: "1px solid rgba(0,0,0,0.06)",
            borderRadius: 16, padding: "14px 18px",
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <span style={{ fontSize: 22 }}>🌍</span>
            <div>
              <p style={{ margin: "0 0 2px", fontSize: 15, fontFamily: LONDRINA, color: C.blue }}>Culture Accessibility Badge</p>
              <p style={{ margin: 0, fontSize: 13, color: C.muted, fontFamily: DM_SANS }}>
                This club is open to all nationalities and skill levels. English is the working language.
              </p>
            </div>
          </div>
        </div>

        {/* ── Join Button ── */}
        <div style={{ padding: "0 24px 32px" }}>
          <TactileButton
            bgColor={joined ? C.green : club.color}
            shadowColor={`${joined ? C.green : club.color}88`}
            fullWidth
            onClick={() => setJoined(true)}
          >
            {joined ? "✓ You're a member!" : `Join ${club.name}`}
          </TactileButton>
        </div>
      </div>
      <BottomNav active={1} />
    </PageWrapper>
  );
}

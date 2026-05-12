import React from "react";
import { useNavigate } from "react-router";
import {
  C, LONDRINA, DM_SANS, PageWrapper, BackHeader, SectionHeader,
  TactileButton, BottomNav,
} from "../../components/kitchen/Shared";
import { CLUBS } from "./ActivityShared";

/* ─── Decorative SVG pattern for cover ───────────────────── */
function CoverPattern({ color }: { color: string }) {
  return (
    <svg
      width="100%" height="100%"
      viewBox="0 0 280 130"
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      preserveAspectRatio="xMidYMid slice"
    >
      <circle cx="230" cy="20"  r="60" fill="white" opacity="0.06"/>
      <circle cx="260" cy="100" r="45" fill="white" opacity="0.05"/>
      <rect   x="0"   y="90"  width="90" height="90" rx="20" fill="white" opacity="0.04" transform="rotate(-20,45,135)"/>
      <polygon points="20,10 60,10 40,45" fill="white" opacity="0.06"/>
    </svg>
  );
}

/* ─── Overlapping member avatars ─────────────────────────── */
const AVATAR_SEEDS = [
  { init: "J", color: C.blue   },
  { init: "M", color: C.green  },
  { init: "S", color: C.pink   },
  { init: "A", color: C.purple },
  { init: "E", color: C.blue   },
];

function MemberAvatars({ count }: { count: number }) {
  const shown = AVATAR_SEEDS.slice(0, 3);
  const extra = Math.max(0, count - 3);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ display: "flex" }}>
        {shown.map((av, i) => (
          <div key={i} style={{
            width: 24, height: 24, borderRadius: "50%",
            backgroundColor: av.color,
            border: "2px solid white",
            marginLeft: i > 0 ? -8 : 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 9, color: "white", fontFamily: LONDRINA,
            zIndex: shown.length - i,
            position: "relative",
            flexShrink: 0,
          }}>
            {av.init}
          </div>
        ))}
        {extra > 0 && (
          <div style={{
            width: 24, height: 24, borderRadius: "50%",
            backgroundColor: "#E8E2D8",
            border: "2px solid white",
            marginLeft: -8,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 8, color: C.muted, fontFamily: DM_SANS, fontWeight: 700,
            position: "relative",
            flexShrink: 0,
          }}>
            +{extra}
          </div>
        )}
      </div>
      <span style={{ fontSize: 14, color: C.muted, fontFamily: DM_SANS }}>
        {count} members
      </span>
    </div>
  );
}

/* ─── Group Card ─────────────────────────────────────────── */
function GroupCard({ club }: { club: typeof CLUBS[0] }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/activity/club/${club.id}`)}
      style={{
        backgroundColor: C.card,
            border: "1px solid rgba(0,0,0,0.06)",
        borderRadius: 22,
        overflow: "hidden",
        boxShadow: "3px 3px 0px rgba(0,0,0,0.10)",
        cursor: "pointer",
        transform: "scale(1)",
        transition: "transform 0.15s ease",
      }}
    >
      {/* ── Cover area ── */}
      <div style={{
        height: 130,
        backgroundColor: club.color,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "0 16px 14px",
        overflow: "hidden",
      }}>
        <CoverPattern color={club.color} />

        {/* Badge pill */}
        <div style={{
          alignSelf: "flex-start",
          backgroundColor: "rgba(255,255,255,0.22)",
          borderRadius: 99,
          padding: "3px 10px",
          marginBottom: 8,
          backdropFilter: "blur(4px)",
        }}>
          <span style={{ fontSize: 12, color: "white", fontFamily: DM_SANS, fontWeight: 700, letterSpacing: "0.04em" }}>
            {club.badge}
          </span>
        </div>

        {/* Group name */}
        <h3 style={{ margin: 0, fontSize: 20, fontFamily: LONDRINA, color: "white", lineHeight: 1.15 }}>
          {club.name}
        </h3>
      </div>

      {/* ── Content area ── */}
      <div style={{ padding: "14px 16px 16px" }}>
        {/* Description */}
        <p style={{
          margin: "0 0 12px",
          fontSize: 14,
          color: C.text,
          fontFamily: DM_SANS,
          lineHeight: 1.5,
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 1,
          WebkitBoxOrient: "vertical",
        } as React.CSSProperties}>
          {club.mission}
        </p>

        {/* Footer: avatars + next activity */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <MemberAvatars count={club.members} />
          <div style={{
            backgroundColor: `${club.color}14`,
            borderRadius: 10,
            padding: "4px 10px",
          }}>
            <span style={{ fontSize: 12, color: club.color, fontFamily: DM_SANS, fontWeight: 700 }}>
              {club.nextActivity.split(" · ")[0]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Groups & Clubs Screen ──────────────────────────────── */
export default function GroupsScreen() {
  const navigate = useNavigate();

  return (
    <PageWrapper bg="#EFF3FC">
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 24, scrollbarWidth: "none" } as React.CSSProperties}>
        <BackHeader title="Groups & Clubs" subtitle="Join an active community" bg="#EFF3FC" />

        {/* Intro banner */}
        <div style={{ padding: "0 24px 20px" }}>
          <div style={{
            backgroundColor: `${C.blue}12`,
            borderRadius: 16,
            padding: "14px 16px",
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: `${C.blue}20`, display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M13 13C14.0609 13 15.0783 13.4214 15.8284 14.1716C16.5786 14.9217 17 15.9391 17 17V18.5C17 18.8978 16.842 19.2794 16.5607 19.5607C16.2794 19.842 15.8978 20 15.5 20H3.5C3.10218 20 2.72064 19.842 2.43934 19.5607C2.15804 19.2794 2 18.8978 2 18.5V17C2 15.9391 2.42143 14.9217 3.17157 14.1716C3.92172 13.4214 4.93913 13 6 13H13ZM19 13C19.7956 13 20.5587 13.3161 21.1213 13.8787C21.6839 14.4413 22 15.2044 22 16V17.5C22 17.8978 21.842 18.2794 21.5607 18.5607C21.2794 18.842 20.8978 19 20.5 19H19V17C19.0006 16.2237 18.8202 15.4579 18.473 14.7635C18.1258 14.0691 17.6214 13.4653 17 13H19ZM9.5 3C10.6935 3 11.8381 3.47411 12.682 4.31802C13.5259 5.16193 14 6.30653 14 7.5C14 8.69347 13.5259 9.83807 12.682 10.682C11.8381 11.5259 10.6935 12 9.5 12C8.30653 12 7.16193 11.5259 6.31802 10.682C5.47411 9.83807 5 8.69347 5 7.5C5 6.30653 5.47411 5.16193 6.31802 4.31802C7.16193 3.47411 8.30653 3 9.5 3ZM18 6C18.7956 6 19.5587 6.31607 20.1213 6.87868C20.6839 7.44129 21 8.20435 21 9C21 9.79565 20.6839 10.5587 20.1213 11.1213C19.5587 11.6839 18.7956 12 18 12C17.2044 12 16.4413 11.6839 15.8787 11.1213C15.3161 10.5587 15 9.79565 15 9C15 8.20435 15.3161 7.44129 15.8787 6.87868C16.4413 6.31607 17.2044 6 18 6Z" fill={C.blue}/></svg></div>
            <div>
              <p style={{ margin: 0, fontSize: 16, fontFamily: LONDRINA, color: C.strong }}>
                {CLUBS.length} active groups
              </p>
              <p style={{ margin: "2px 0 0", fontSize: 14, color: C.muted, fontFamily: DM_SANS }}>
                Find your tribe and make connections
              </p>
            </div>
          </div>
        </div>

        {/* Club cards */}
        <div style={{ padding: "0 24px 32px" }}>
          <SectionHeader title="All Groups" />
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {CLUBS.map(club => (
              <GroupCard key={club.id} club={club} />
            ))}
          </div>
        </div>

        {/* Start your own group CTA */}
        <div style={{ padding: "0 24px 40px" }}>
          <div style={{
            backgroundColor: C.card,
            border: "1px solid rgba(0,0,0,0.06)",
            borderRadius: 22,
            padding: "20px",
            boxShadow: "3px 3px 0px rgba(0,0,0,0.10)",
            textAlign: "center",
          }}>
            <p style={{ margin: "0 0 6px", fontSize: 18, fontFamily: LONDRINA, color: C.strong }}>
              Can't find your vibe?
            </p>
            <p style={{ margin: "0 0 14px", fontSize: 14, color: C.muted, fontFamily: DM_SANS }}>
              Start your own group and invite neighbours
            </p>
            <TactileButton
              bgColor={C.blue}
              shadowColor={C.blueDark}
              fullWidth
              onClick={() => navigate("/activity/create")}
            >
              + Create a Group
            </TactileButton>
          </div>
        </div>
      </div>

      <BottomNav active={1} />
    </PageWrapper>
  );
}

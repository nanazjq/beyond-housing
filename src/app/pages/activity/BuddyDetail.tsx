import React from "react";
import { useState } from "react";
import { useParams } from "react-router";
import {
  C, LONDRINA, DM_SANS, PageWrapper, BackHeader, GeometricAvatar,
  TactileButton, BottomNav, TangramDecoration,
} from "../../components/kitchen/Shared";
import { BUDDIES, ACTIVITIES } from "./ActivityShared";

export default function BuddyDetail() {
  const { id } = useParams();
  const buddy = BUDDIES.find(b => b.id === Number(id)) ?? BUDDIES[0];
  const relatedActivity = ACTIVITIES.find(a => a.title === buddy.activity);
  const [sent, setSent] = useState(false);

  return (
    <PageWrapper bg="#EFF3FC">
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 24, scrollbarWidth: "none" } as React.CSSProperties}>
        <BackHeader title="Buddy Invitation" subtitle="Send a companion request" bg="#EFF3FC" />

        {/* Social Card */}
        <div style={{ padding: "0 24px 24px" }}>
          <div style={{ backgroundColor: C.card,
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: 22, padding: "22px 22px 20px", position: "relative", overflow: "hidden", boxShadow: "3px 3px 0px rgba(0,0,0,0.10)" }}>
            <TangramDecoration primaryColor={buddy.color} />

            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, backgroundColor: `${buddy.color}18`, borderRadius: 22, padding: "4px 12px", marginBottom: 18 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: buddy.color }} />
              <span style={{ fontSize: 14, color: buddy.color, fontWeight: 700, fontFamily: DM_SANS }}>Looking for a Buddy</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 18 }}>
              <GeometricAvatar initial={buddy.initial} color={buddy.color} shape="circle" size={68} />
              <div>
                <h2 style={{ margin: "0 0 4px", fontSize: 26, fontFamily: LONDRINA, color: C.strong }}>{buddy.name}</h2>
                <div style={{ display: "flex", gap: 6 }}>
                  <span style={{ backgroundColor: `${buddy.color}18`, color: buddy.color, borderRadius: 22, padding: "3px 10px", fontSize: 14, fontWeight: 700, fontFamily: DM_SANS }}>
                    {buddy.nationality}
                  </span>
                </div>
              </div>
            </div>

            <p style={{ margin: "0 0 16px", fontSize: 16, color: C.text, fontFamily: DM_SANS, lineHeight: 1.6, fontStyle: "italic" }}>
              "{buddy.bio}"
            </p>

            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {buddy.tags.map(tag => (
                <span key={tag} style={{ backgroundColor: "#F2F3F5", color: C.text, borderRadius: 99, padding: "4px 12px", fontSize: 14, fontWeight: 600, fontFamily: DM_SANS }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Activity Context */}
        <div style={{ padding: "0 24px 24px" }}>
          <p style={{ margin: "0 0 12px", fontSize: 13, color: C.muted, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: DM_SANS }}>Activity Context</p>
          <div style={{ backgroundColor: C.card,
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: 22, padding: "16px 18px", boxShadow: "3px 3px 0px rgba(0,0,0,0.10)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 52, height: 52, borderRadius: 16, backgroundColor: `${buddy.color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>
                {relatedActivity?.emoji ?? "🎯"}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: 16, fontFamily: LONDRINA, color: C.strong }}>{buddy.activity}</p>
                <p style={{ margin: "3px 0 0", fontSize: 14, color: C.muted, fontFamily: DM_SANS }}>{buddy.time}</p>
                {relatedActivity && (
                  <p style={{ margin: "3px 0 0", fontSize: 14, color: C.muted, fontFamily: DM_SANS }}>{relatedActivity.location} · {relatedActivity.cost}</p>
                )}
              </div>
            </div>
            {relatedActivity && (
              <div style={{ marginTop: 12, padding: "10px 14px", backgroundColor: "#F2F3F5", borderRadius: 10 }}>
                <p style={{ margin: 0, fontSize: 15, color: C.text, fontFamily: DM_SANS, lineHeight: 1.55 }}>{relatedActivity.desc}</p>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ padding: "0 24px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
          <TactileButton
            bgColor={sent ? C.green : buddy.color}
            shadowColor={`${sent ? C.green : buddy.color}88`}
            fullWidth
            onClick={() => setSent(true)}
          >
            {sent ? (
              <>
                <svg width="17" height="17" viewBox="0 0 17 17"><circle cx="8.5" cy="8.5" r="8.5" fill="rgba(255,255,255,0.25)"/><path d="M4 9L6.5 12L13.5 6L12 4.5L6.5 10.5L5.5 8Z" fill="white"/></svg>
                Request Sent! Check Messages →
              </>
            ) : (
              <>
                <svg width="17" height="17" viewBox="0 0 17 17"><path d="M1.5 1.5L16 8.5L1.5 15.5V10.5L11 8.5L1.5 6.5Z" fill="white"/></svg>
                Send Companion Request
              </>
            )}
          </TactileButton>

          {sent && (
            <p style={{ margin: 0, textAlign: "center", fontSize: 14, color: C.muted, fontFamily: DM_SANS }}>
              {buddy.name} will receive your request in the Message module.
            </p>
          )}
        </div>

        {/* Similar Buddies */}
        <div style={{ padding: "0 24px 32px" }}>
          <p style={{ margin: "0 0 12px", fontSize: 13, color: C.muted, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: DM_SANS }}>Others Joining</p>
          <div style={{ display: "flex", gap: -6 }}>
            {BUDDIES.filter(b => b.id !== buddy.id).slice(0, 5).map((b, i) => (
              <div key={b.id} style={{ marginLeft: i > 0 ? -10 : 0, zIndex: 5 - i }}>
                <GeometricAvatar initial={b.initial} color={b.color} shape="circle" size={36} />
              </div>
            ))}
            <div style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: "#F2F3F5", display: "flex", alignItems: "center", justifyContent: "center", marginLeft: -10, zIndex: 0 }}>
              <span style={{ fontSize: 13, color: C.muted, fontFamily: DM_SANS, fontWeight: 700 }}>+3</span>
            </div>
          </div>
          <p style={{ margin: "8px 0 0", fontSize: 14, color: C.muted, fontFamily: DM_SANS }}>8 people are interested in this activity</p>
        </div>
      </div>
      <BottomNav active={1} />
    </PageWrapper>
  );
}
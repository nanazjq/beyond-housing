import React from "react";
import { useState } from "react";
import { useParams } from "react-router";
import {
  C, LONDRINA, DM_SANS, PageWrapper, BackHeader, GeometricAvatar, BottomNav,
} from "../../components/kitchen/Shared";
import { COMMUNITY_POSTS } from "./ActivityShared";

const TAG_COLORS: Record<string, string> = {
  Secondhand: C.orange, Share: C.green, Help: C.pink,
};

const MOCK_COMMENTS = [
  { name: "Tom W.",   initial: "T", color: C.blue,   text: "Thanks for the heads up! I'll swing by after dinner.",   time: "1h ago" },
  { name: "Priya M.", initial: "P", color: C.pink,   text: "DM'd you! Really interested in this.",                    time: "2h ago" },
  { name: "Erik S.",  initial: "E", color: C.green,  text: "Is it still available? Can pick it up tomorrow morning.", time: "3h ago" },
];

/* ─── Send icon (flat solid) ─────────────────────────────── */
function SendIcon({ color }: { color: string }) {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill={color}>
      <path d="M1.5 1.5L16 8.5L1.5 15.5V10.5L11 8.5L1.5 6.5Z" />
    </svg>
  );
}

export default function PostDetail() {
  const { id } = useParams();
  const post     = COMMUNITY_POSTS.find(p => p.id === Number(id)) ?? COMMUNITY_POSTS[0];
  const tagColor = TAG_COLORS[post.tag] ?? C.muted;
  const [liked, setLiked]       = useState(false);
  const [reply, setReply]       = useState("");
  const [comments, setComments] = useState(MOCK_COMMENTS.slice(0, post.comments > 3 ? 3 : Math.min(post.comments, 3)));

  const handlePost = () => {
    if (!reply.trim()) return;
    setComments(c => [...c, { name: "You", initial: "J", color: C.blue, text: reply, time: "Just now" }]);
    setReply("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handlePost(); }
  };

  return (
    <PageWrapper bg="#EFF3FC">
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 24, scrollbarWidth: "none" } as React.CSSProperties}>
        <BackHeader title="Post Detail" subtitle="Community Board" bg="#EFF3FC" />

        {/* ── Full Post card ── */}
        <div style={{ padding: "0 24px 24px" }}>
          <div style={{ backgroundColor: C.card,
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: 22, padding: "20px", boxShadow: "3px 3px 0px rgba(0,0,0,0.10)" }}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <GeometricAvatar initial={post.initial} color={post.color} shape="circle" size={44} />
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontSize: 15, fontFamily: LONDRINA, color: C.strong }}>{post.name}</p>
                <p style={{ margin: "2px 0 0", fontSize: 14, color: C.muted, fontFamily: DM_SANS }}>{post.timePosted}</p>
              </div>
              <span style={{ backgroundColor: `${tagColor}18`, color: tagColor, borderRadius: 99, padding: "4px 12px", fontSize: 13, fontWeight: 700, fontFamily: DM_SANS }}>
                {post.tag}
              </span>
            </div>

            <h2 style={{ margin: "0 0 12px", fontSize: 22, fontFamily: LONDRINA, color: C.strong, lineHeight: 1.25 }}>{post.title}</h2>
            <p style={{ margin: "0 0 18px", fontSize: 16, color: C.text, fontFamily: DM_SANS, lineHeight: 1.7 }}>{post.content}</p>

            {/* Reactions */}
            <div style={{ display: "flex", gap: 16, borderTop: `1px solid ${"#E4E6EA"}`, paddingTop: 14 }}>
              <button onClick={() => setLiked(l => !l)} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <path d="M9 16C9 16 1.5 11.5 1.5 6.5C1.5 4 3.5 2 6 2C7.2 2 8.2 2.6 9 3.4C9.8 2.6 10.8 2 12 2C14.5 2 16.5 4 16.5 6.5C16.5 11.5 9 16 9 16Z"
                    fill={liked ? C.pink : C.muted} opacity={liked ? 1 : 0.35} />
                </svg>
                <span style={{ fontSize: 15, color: liked ? C.pink : C.muted, fontFamily: DM_SANS, fontWeight: 600 }}>
                  {post.likes + (liked ? 1 : 0)} Likes
                </span>
              </button>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <path d="M2 3.5C2 2.7 2.7 2 3.5 2H14.5C15.3 2 16 2.7 16 3.5V10.5C16 11.3 15.3 12 14.5 12H10.5L7.5 15V12H3.5C2.7 12 2 11.3 2 10.5V3.5Z" fill={C.muted} opacity="0.35" />
                </svg>
                <span style={{ fontSize: 15, color: C.muted, fontFamily: DM_SANS, fontWeight: 600 }}>{comments.length} Replies</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Replies — single card ── */}
        <div style={{ padding: "0 24px 32px" }}>
          {/* Section label */}
          <p style={{ margin: "0 0 14px", fontSize: 13, color: C.muted, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: DM_SANS }}>
            Replies ({comments.length})
          </p>

          {/* ONE single card containing all replies + input */}
          <div style={{ backgroundColor: C.card,
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: 22, boxShadow: "3px 3px 0px rgba(0,0,0,0.10)", overflow: "hidden" }}>
            {/* Reply rows */}
            {comments.map((c, i) => (
              <div key={i}>
                <div style={{ padding: "16px 18px", display: "flex", gap: 12 }}>
                  <GeometricAvatar initial={c.initial} color={c.color} shape="circle" size={36} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 5 }}>
                      <span style={{ fontSize: 15, fontFamily: LONDRINA, color: C.strong }}>{c.name}</span>
                      <span style={{ fontSize: 13, color: C.muted, fontFamily: DM_SANS }}>{c.time}</span>
                    </div>
                    <p style={{ margin: 0, fontSize: 15, color: C.text, fontFamily: DM_SANS, lineHeight: 1.55 }}>{c.text}</p>
                  </div>
                </div>
                {/* Thin divider between replies */}
                <div style={{ height: 1, backgroundColor: "#E4E6EA", marginLeft: 66 }} />
              </div>
            ))}

            {/* Write a reply input — at the bottom of the same card */}
            <div style={{ padding: "12px 18px", display: "flex", gap: 10, alignItems: "center" }}>
              <GeometricAvatar initial="J" color={C.blue} shape="circle" size={34} />
              <div style={{
                flex: 1, backgroundColor: "#F2F3F5", borderRadius: 10,
                padding: "8px 12px", display: "flex", alignItems: "center", gap: 8,
              }}>
                <input
                  value={reply}
                  onChange={e => setReply(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Write a reply..."
                  style={{
                    flex: 1, border: "none", outline: "none",
                    background: "transparent", fontSize: 15,
                    fontFamily: DM_SANS, color: C.strong,
                  }}
                />
              </div>
              <button
                onClick={handlePost}
                style={{
                  width: 36, height: 36, borderRadius: 10, border: "none",
                  backgroundColor: reply.trim() ? C.blue : "#E8E4DC",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: reply.trim() ? "pointer" : "not-allowed", flexShrink: 0,
                  transition: "background 0.2s ease",
                }}
              >
                <SendIcon color={reply.trim() ? "white" : C.muted} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <BottomNav active={1} />
    </PageWrapper>
  );
}

import React from "react";
import { useNavigate } from "react-router";
import { C, LONDRINA, DM_SANS, PageWrapper, BottomNav } from "../../components/kitchen/Shared";

const CHATS = [
  { id: 1, name: "Kevin", sub: "Yoga in the Park", preview: "Let's meet at 9:45 at the entrance?", time: "10:36", unread: 2, color: C.blue, initial: "KV" },
  { id: 2, name: "Sara", sub: "Fika Friday", preview: "See you at Fika Friday! ☕", time: "09:12", unread: 0, color: C.pink, initial: "SA" },
  { id: 3, name: "Photo Walk Group", sub: "4 members", preview: "Marco: Weather looks perfect!", time: "Yesterday", unread: 5, color: C.green, initial: "P", isGroup: true },
  { id: 4, name: "Priya", sub: "Yoga in the Park", preview: "Yoga was amazing, thanks!", time: "Mon", unread: 0, color: C.orange, initial: "PR" },
];

export default function ChatList() {
  const navigate = useNavigate();
  return (
    <PageWrapper bg="#FCF2F5">
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 24, scrollbarWidth: "none" } as React.CSSProperties}>
        <div style={{ padding: "52px 24px 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
            <button onClick={() => navigate(-1)} style={{ width: 42, height: 42, borderRadius: 10, backgroundColor: "white", border: "none", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "3px 3px 0px rgba(0,0,0,0.10)", cursor: "pointer", flexShrink: 0 }}>
              <svg width="20" height="20" viewBox="0 0 20 20"><path d="M13 3.5L5.5 10L13 16.5L11 10Z" fill={C.text}/></svg>
            </button>
            <div>
              <h2 style={{ margin: 0, fontSize: 28, fontFamily: LONDRINA, color: C.strong }}>Social Intercom</h2>
              <p style={{ margin: 0, fontSize: 14, color: C.muted, fontFamily: DM_SANS }}>Your chats & activity groups</p>
            </div>
          </div>

          <div style={{ backgroundColor: C.card,
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: 22, overflow: "hidden", boxShadow: "3px 3px 0px rgba(0,0,0,0.10)" }}>
            {CHATS.map((chat, i) => (
              <div key={chat.id}
                onClick={() => navigate(`/message/chat/${chat.id}`)}
                style={{
                  display: "flex", alignItems: "center", gap: 14,
                  padding: "14px 18px",
                  borderBottom: i < CHATS.length - 1 ? `1px solid ${C.divider}` : "none",
                  cursor: "pointer", position: "relative"
                }}>
                <div style={{
                  width: 48, height: 48,
                  borderRadius: chat.isGroup ? 16 : "50%",
                  backgroundColor: chat.color,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18, fontFamily: LONDRINA, color: "white",
                  flexShrink: 0, position: "relative"
                }}>
                  {chat.initial}
                  {chat.unread > 0 && (
                    <div style={{
                      position: "absolute", top: -4, right: -4,
                      width: 20, height: 20, borderRadius: "50%",
                      backgroundColor: chat.color === C.blue ? C.blue : C.pink,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      border: `2px solid ${C.bg}`
                    }}>
                      <span style={{ fontSize: 11, color: "white", fontFamily: DM_SANS, fontWeight: 700 }}>{chat.unread}</span>
                    </div>
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                    <p style={{ margin: 0, fontSize: 16, fontFamily: LONDRINA, color: C.strong, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{chat.name}</p>
                    <span style={{ fontSize: 12, color: C.muted, fontFamily: DM_SANS, flexShrink: 0, marginLeft: 8 }}>{chat.time}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: 14, color: C.muted, fontFamily: DM_SANS, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{chat.preview}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNav active="message" />
    </PageWrapper>
  );
}

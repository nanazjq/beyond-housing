import React from "react";
import { useNavigate } from "react-router";
import {
  C, LONDRINA, DM_SANS, PageWrapper, BackHeader, SectionHeader,
  BottomNav, SolidChevronRightIcon,
} from "../../components/kitchen/Shared";
import { BULLETINS } from "./ActivityShared";

/* ─── Bulletin Board Screen ──────────────────────────────── */
export default function BulletinBoardScreen() {
  const navigate = useNavigate();

  const unreadCount = BULLETINS.filter(b => b.unread).length;

  return (
    <PageWrapper bg="#EFF3FC">
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 24, scrollbarWidth: "none" } as React.CSSProperties}>
        <BackHeader title="Bulletin Board" subtitle="Official notices & announcements" bg="#EFF3FC" />

        {/* Unread banner */}
        {unreadCount > 0 && (
          <div style={{ padding: "0 24px 20px" }}>
            <div style={{
              backgroundColor: `${C.blue}12`,
              borderRadius: 16, padding: "14px 16px",
              display: "flex", alignItems: "center", gap: 12,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                backgroundColor: `${C.blue}20`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18,
              }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M19.5 3H17.25V2.25C17.25 2.05109 17.171 1.86032 17.0303 1.71967C16.8897 1.57902 16.6989 1.5 16.5 1.5C16.3011 1.5 16.1103 1.57902 15.9697 1.71967C15.829 1.86032 15.75 2.05109 15.75 2.25V3H12.75V2.25C12.75 2.05109 12.671 1.86032 12.5303 1.71967C12.3897 1.57902 12.1989 1.5 12 1.5C11.8011 1.5 11.6103 1.57902 11.4697 1.71967C11.329 1.86032 11.25 2.05109 11.25 2.25V3H8.25V2.25C8.25 2.05109 8.17098 1.86032 8.03033 1.71967C7.88968 1.57902 7.69891 1.5 7.5 1.5C7.30109 1.5 7.11032 1.57902 6.96967 1.71967C6.82902 1.86032 6.75 2.05109 6.75 2.25V3H4.5C4.30109 3 4.11032 3.07902 3.96967 3.21967C3.82902 3.36032 3.75 3.55109 3.75 3.75V18.75C3.75 19.5456 4.06607 20.3087 4.62868 20.8713C5.19129 21.4339 5.95435 21.75 6.75 21.75H17.25C18.0456 21.75 18.8087 21.4339 19.3713 20.8713C19.9339 20.3087 20.25 19.5456 20.25 18.75V3.75C20.25 3.55109 20.171 3.36032 20.0303 3.21967C19.8897 3.07902 19.6989 3 19.5 3ZM15 15.75H9C8.80109 15.75 8.61032 15.671 8.46967 15.5303C8.32902 15.3897 8.25 15.1989 8.25 15C8.25 14.8011 8.32902 14.6103 8.46967 14.4697C8.61032 14.329 8.80109 14.25 9 14.25H15C15.1989 14.25 15.3897 14.329 15.5303 14.4697C15.671 14.6103 15.75 14.8011 15.75 15C15.75 15.1989 15.671 15.3897 15.5303 15.5303C15.3897 15.671 15.1989 15.75 15 15.75ZM15 12.75H9C8.80109 12.75 8.61032 12.671 8.46967 12.5303C8.32902 12.3897 8.25 12.1989 8.25 12C8.25 11.8011 8.32902 11.6103 8.46967 11.4697C8.61032 11.329 8.80109 11.25 9 11.25H15C15.1989 11.25 15.3897 11.329 15.5303 11.4697C15.671 11.6103 15.75 11.8011 15.75 12C15.75 12.1989 15.671 12.3897 15.5303 12.5303C15.3897 12.671 15.1989 12.75 15 12.75Z" fill={C.blue}/></svg></div>
              <div>
                <p style={{ margin: 0, fontSize: 16, fontFamily: LONDRINA, color: C.strong }}>
                  {unreadCount} unread notice{unreadCount > 1 ? "s" : ""}
                </p>
                <p style={{ margin: "2px 0 0", fontSize: 14, color: C.muted, fontFamily: DM_SANS }}>
                  Stay updated with the latest from management
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Notices list */}
        <div style={{ padding: "0 24px 32px" }}>
          <SectionHeader title="All Notices" />
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {BULLETINS.map(b => (
              <div
                key={b.id}
                onClick={() => navigate(`/activity/bulletin/${b.id}`)}
                style={{
                  backgroundColor: C.card,
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: 16, padding: "16px",
                  display: "flex", alignItems: "flex-start", gap: 12, cursor: "pointer",
                  boxShadow: "3px 3px 0px rgba(0,0,0,0.10)",
                  borderLeft: b.unread ? `3.5px solid ${C.green}` : "3.5px solid transparent",
                  opacity: b.unread ? 1 : 0.75,
                }}
              >
                {/* Unread dot */}
                <div style={{ paddingTop: 4, flexShrink: 0 }}>
                  {b.unread ? (
                    <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: C.green }} />
                  ) : (
                    <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "transparent" }} />
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    margin: "0 0 4px", fontSize: 16, fontFamily: LONDRINA, color: C.strong,
                    overflow: "hidden", display: "-webkit-box",
                    WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
                  } as React.CSSProperties}>
                    {b.title}
                  </p>
                  <p style={{ margin: "0 0 6px", fontSize: 14, color: C.muted, fontFamily: DM_SANS }}>{b.date}</p>
                  <p style={{
                    margin: 0, fontSize: 14, color: C.text, fontFamily: DM_SANS, lineHeight: 1.5,
                    overflow: "hidden", display: "-webkit-box",
                    WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
                  } as React.CSSProperties}>
                    {b.content}
                  </p>
                </div>
                <SolidChevronRightIcon color={C.muted} size={12} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav active={1} />
    </PageWrapper>
  );
}

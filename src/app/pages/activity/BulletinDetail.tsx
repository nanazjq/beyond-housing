import React from "react";
import { useParams } from "react-router";
import { C, LONDRINA, DM_SANS, PageWrapper, BackHeader, BottomNav } from "../../components/kitchen/Shared";
import { BULLETINS } from "./ActivityShared";

export default function BulletinDetail() {
  const { id } = useParams();
  const bulletin = BULLETINS.find(b => b.id === Number(id)) ?? BULLETINS[0];
  return (
    <PageWrapper bg="#EFF3FC">
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 24, scrollbarWidth: "none" } as React.CSSProperties}>
        <BackHeader title="Official Notice" subtitle={`Posted ${bulletin.date}`} bg="#EFF3FC" />
        <div style={{ padding: "0 24px 24px" }}>
          <div style={{ backgroundColor: C.card,
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: 22, padding: "24px 22px", boxShadow: "3px 3px 0px rgba(0,0,0,0.10)" }}>
            {bulletin.unread && (
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, backgroundColor: `${C.blue}18`, borderRadius: 22, padding: "4px 12px", marginBottom: 16 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: C.blue }} />
                <span style={{ fontSize: 14, color: C.blue, fontWeight: 700, fontFamily: DM_SANS }}>New Notice</span>
              </div>
            )}
            <h2 style={{ margin: "0 0 8px", fontSize: 22, fontFamily: LONDRINA, color: C.strong, lineHeight: 1.3 }}>{bulletin.title}</h2>
            <p style={{ margin: "0 0 20px", fontSize: 14, color: C.muted, fontFamily: DM_SANS }}>Posted {bulletin.date} by Management</p>
            <p style={{ margin: 0, fontSize: 15, color: C.text, fontFamily: DM_SANS, lineHeight: 1.8 }}>{bulletin.content}</p>
          </div>
        </div>
      </div>
      <BottomNav active={1} />
    </PageWrapper>
  );
}

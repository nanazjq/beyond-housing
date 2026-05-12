import React from "react";
import { useNavigate } from "react-router";
import {
  C, LONDRINA, DM_SANS, PageWrapper, BackHeader, SectionHeader,
  TactileButton, BottomNav,
} from "../../components/kitchen/Shared";
import { EVENTS } from "./ActivityShared";

/* ─── Event Highlights Screen ────────────────────────────── */
export default function EventHighlightsScreen() {
  const navigate = useNavigate();

  return (
    <PageWrapper bg="#EFF3FC">
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 24, scrollbarWidth: "none" } as React.CSSProperties}>
        <BackHeader title="Event Highlights" subtitle="Official resident events" bg="#EFF3FC" />

        {/* Header banner */}
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
            }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M8.07599 7.25999L8.17099 7.34299L16.657 15.828C16.7682 15.9391 16.8517 16.0749 16.9006 16.2243C16.9495 16.3737 16.9625 16.5325 16.9386 16.6879C16.9146 16.8433 16.8543 16.9908 16.7627 17.1185C16.671 17.2462 16.5505 17.3506 16.411 17.423L16.295 17.473L5.90999 21.3C3.95799 22.02 2.05699 20.185 2.64999 18.236L2.69999 18.09L6.52599 7.70499C6.57658 7.56743 6.65678 7.44266 6.76093 7.33953C6.86508 7.2364 6.99062 7.15742 7.12868 7.10819C7.26673 7.05896 7.41392 7.04068 7.55983 7.05464C7.70573 7.06861 7.84678 7.11447 7.97299 7.18899L8.07599 7.25999ZM17.107 11.604C18.018 11.652 19.267 11.844 20.353 12.496C20.5732 12.6265 20.7349 12.8365 20.8049 13.0827C20.8749 13.3289 20.8478 13.5925 20.7293 13.8194C20.6108 14.0462 20.4097 14.2189 20.1677 14.302C19.9256 14.3851 19.6609 14.3722 19.428 14.266L19.324 14.211C18.642 13.801 17.77 13.641 17.002 13.601C16.6856 13.5827 16.3683 13.584 16.052 13.605L15.736 13.636C15.4751 13.6697 15.2115 13.5992 15.0022 13.4399C14.793 13.2805 14.6549 13.0451 14.6179 12.7847C14.581 12.5243 14.6481 12.2598 14.8048 12.0485C14.9615 11.8373 15.1951 11.6962 15.455 11.656C16.0027 11.5852 16.5559 11.5675 17.107 11.603M19.132 8.817C19.3868 8.81753 19.6318 8.9153 19.8169 9.09035C20.0021 9.2654 20.1134 9.50452 20.1282 9.75889C20.143 10.0133 20.0602 10.2637 19.8966 10.459C19.733 10.6544 19.501 10.7799 19.248 10.81L19.132 10.817H18.424C18.1692 10.8165 17.9242 10.7187 17.7391 10.5436C17.5539 10.3686 17.4426 10.1295 17.4278 9.8751C17.413 9.62074 17.4958 9.37031 17.6594 9.17497C17.823 8.97962 18.055 8.85409 18.308 8.824L18.424 8.817H19.132ZM15.95 8.04999C16.1222 8.22219 16.2256 8.45129 16.2409 8.69431C16.2562 8.93734 16.1822 9.17759 16.033 9.36999L15.95 9.46399L14.889 10.525C14.709 10.7043 14.4676 10.8085 14.2136 10.8162C13.9597 10.824 13.7123 10.7348 13.5217 10.5667C13.3312 10.3987 13.2117 10.1644 13.1876 9.91152C13.1635 9.6586 13.2366 9.40599 13.392 9.20499L13.475 9.11099L14.535 8.05099C14.7479 7.83802 15.0394 7.72 15.3425 7.72C15.6456 7.72 15.937 7.83802 16.15 8.04999H15.95ZM13.363 2.78499C13.811 4.13099 13.571 5.605 13.291 6.63499C13.1227 7.27714 12.8916 7.90115 12.601 8.49799C12.4826 8.73536 12.2747 8.91597 12.0231 9.00008C11.7716 9.08419 11.4969 9.06491 11.2595 8.94649C11.0221 8.82808 10.8415 8.62021 10.7574 8.36863C10.6733 8.11705 10.6926 7.84236 10.811 7.60499C11.0429 7.12555 11.2271 6.62447 11.361 6.10899C11.588 5.27699 11.702 4.37399 11.527 3.63399C11.4224 3.29293 11.4041 3.16046 11.4121 3.02827C11.4202 2.89608 11.4544 2.7668 11.5128 2.64793C11.5712 2.52907 11.6526 2.42299 11.7524 2.33586C11.8521 2.24872 11.9681 2.18226 12.0938 2.14035C12.2194 2.09843 12.3521 2.08188 12.4842 2.09166C12.6163 2.10144 12.7451 2.13737 12.8631 2.19734C12.9812 2.25731 13.0862 2.34014 13.172 2.44102C13.2578 2.5419 13.3227 2.65882 13.363 2.78499Z" fill={C.blue}/></svg></div>
            <div>
              <p style={{ margin: 0, fontSize: 16, fontFamily: LONDRINA, color: C.strong }}>
                {EVENTS.length} upcoming events
              </p>
              <p style={{ margin: "2px 0 0", fontSize: 14, color: C.muted, fontFamily: DM_SANS }}>
                Official events hosted by your residence
              </p>
            </div>
          </div>
        </div>

        {/* Events list */}
        <div style={{ padding: "0 24px 32px" }}>
          <SectionHeader title="Upcoming Events" />
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {EVENTS.map(ev => (
              <div
                key={ev.id}
                onClick={() => navigate(`/activity/event/${ev.id}`)}
                style={{
                  backgroundColor: C.card,
            border: "1px solid rgba(0,0,0,0.06)",
                  borderRadius: 22,
                  overflow: "hidden",
                  boxShadow: "3px 3px 0px rgba(0,0,0,0.10)",
                  cursor: "pointer",
                }}
              >
                {/* Colored top stripe */}
                <div style={{
                  height: 6,
                  backgroundColor: ev.color,
                }} />

                <div style={{ padding: "16px" }}>
                  {/* Type badge */}
                  <div style={{ marginBottom: 8 }}>
                    <span style={{
                      backgroundColor: `${ev.color}18`,
                      color: ev.color,
                      borderRadius: 99, padding: "3px 12px",
                      fontSize: 12, fontWeight: 700, fontFamily: DM_SANS,
                    }}>
                      {ev.type}
                    </span>
                  </div>

                  <p style={{ margin: "0 0 4px", fontSize: 18, fontFamily: LONDRINA, color: C.strong }}>
                    {ev.name}
                  </p>
                  <p style={{ margin: "0 0 10px", fontSize: 14, color: C.muted, fontFamily: DM_SANS }}>
                    🕐 {ev.time}
                  </p>
                  <p style={{
                    margin: "0 0 14px", fontSize: 15, color: C.text,
                    fontFamily: DM_SANS, lineHeight: 1.55,
                  }}>
                    {ev.desc}
                  </p>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{
                      display: "flex", alignItems: "center", gap: 6,
                      backgroundColor: `${ev.color}10`, borderRadius: 10, padding: "6px 12px",
                    }}>
                      <div style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: ev.color }} />
                      <span style={{ fontSize: 13, color: ev.color, fontFamily: DM_SANS, fontWeight: 700 }}>
                        {ev.capacity} capacity
                      </span>
                    </div>
                    <TactileButton
                      bgColor={ev.color}
                      shadowColor={`${ev.color}88`}
                      small
                      onClick={() => navigate(`/activity/event/${ev.id}`)}
                    >
                      View Details
                    </TactileButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav active={1} />
    </PageWrapper>
  );
}

import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import {
  C, LONDRINA, DM_SANS, PageWrapper, BackHeader, SectionHeader,
  TactileButton, BottomNav, SolidChevronRightIcon,
} from "../../components/kitchen/Shared";
import { FACILITIES , FacilityIcon } from "./ActivityShared";

/* ─── Interactive Floor Plan ─────────────────────────────── */
function FloorPlanMap({ onPinTap }: { onPinTap: (id: number) => void }) {
  const [active, setActive] = useState<number | null>(null);
  return (
    <svg width="100%" height="180" viewBox="0 0 320 180" style={{ cursor: "pointer" }}>
      <rect x="0" y="0" width="320" height="180" rx="16" fill="#F2F3F5"/>
      <text x="12" y="22" fontSize="9" fill={C.muted} fontFamily="sans-serif" fontWeight="600" letterSpacing="0.08em">FLOOR PLAN — GROUND FLOOR</text>
      <rect x="10" y="30" width="145" height="70" rx="6" fill="#EDE8DF" stroke="#D8D0C4" strokeWidth="1"/>
      <rect x="165" y="30" width="145" height="70" rx="6" fill="#EDE8DF" stroke="#D8D0C4" strokeWidth="1"/>
      <rect x="10" y="110" width="93" height="60" rx="6" fill="#EDE8DF" stroke="#D8D0C4" strokeWidth="1"/>
      <rect x="113" y="110" width="94" height="60" rx="6" fill="#EDE8DF" stroke="#D8D0C4" strokeWidth="1"/>
      <rect x="217" y="110" width="93" height="60" rx="6" fill="#EDE8DF" stroke="#D8D0C4" strokeWidth="1"/>
      <rect x="10" y="105" width="300" height="10" rx="2" fill="#E0D8CC" opacity="0.7"/>
      {[
        { x: 82,  y: 68,  label: "Left Wing"  },
        { x: 238, y: 68,  label: "Right Wing"  },
        { x: 56,  y: 143, label: "B1 Area"     },
        { x: 160, y: 143, label: "Lobby"        },
        { x: 264, y: 143, label: "Service"      },
      ].map(r => (
        <text key={r.label} x={r.x} y={r.y} textAnchor="middle" fontSize="8" fill="#A8A8A8" fontFamily="sans-serif">{r.label}</text>
      ))}
      {FACILITIES.map(f => {
        const cx = f.pin.x / 100 * 320;
        const cy = f.pin.y / 100 * 180;
        const isActive = active === f.id;
        return (
          <g key={f.id} onClick={() => { setActive(f.id); onPinTap(f.id); }}>
            {isActive && <circle cx={cx} cy={cy} r="18" fill={f.color} opacity="0.15"/>}
            <circle cx={cx} cy={cy} r="11" fill="rgba(0,0,0,0.1)" transform="translate(1,2)"/>
            <circle cx={cx} cy={cy} r="11" fill={f.color}/>
            <circle cx={cx} cy={cy} r="4" fill="white"/>
            <rect x={cx - 24} y={cy - 26} width="48" height="14" rx="4" fill="white" opacity={isActive ? 1 : 0}/>
            <text x={cx} y={cy - 16} textAnchor="middle" fontSize="7.5" fill={C.strong} fontFamily="sans-serif" opacity={isActive ? 1 : 0} fontWeight="700">{f.name}</text>
          </g>
        );
      })}
    </svg>
  );
}

/* ─── Facility Bottom Sheet ──────────────────────────────── */
function FacilityBottomSheet({ facilityId, onClose, onOpen }: { facilityId: number; onClose: () => void; onOpen: () => void }) {
  const f = FACILITIES.find(x => x.id === facilityId);
  if (!f) return null;
  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.3)", zIndex: 200 }} />
      <div style={{
        position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "100%", maxWidth: 430,
        backgroundColor: "white",
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: "24px 24px 0 0",
        padding: "20px 24px 40px", zIndex: 201,
        boxShadow: "0 -4px 30px rgba(0,0,0,0.12)",
      }}>
        <div style={{ width: 40, height: 4, borderRadius: 99, backgroundColor: "#E4E6EA", margin: "0 auto 20px" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
          <div style={{ width: 52, height: 52, borderRadius: 16, backgroundColor: `${f.color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <FacilityIcon type={f.svgIcon || "laundry"} color={f.color} size={26} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: 22, fontFamily: LONDRINA, color: C.strong }}>{f.name}</h3>
            <p style={{ margin: "3px 0 0", fontSize: 15, color: C.muted, fontFamily: DM_SANS }}>{f.floor}</p>
          </div>
        </div>
        <div style={{ backgroundColor: `${f.color}10`, borderRadius: 16, padding: "12px 16px", marginBottom: 16 }}>
          <p style={{ margin: 0, fontSize: 15, color: C.text, fontFamily: DM_SANS, lineHeight: 1.55 }}>Open: <strong>{f.hours}</strong></p>
        </div>
        <TactileButton bgColor={f.color} shadowColor={`${f.color}99`} fullWidth onClick={onOpen}>
          View Full Details
        </TactileButton>
      </div>
    </>
  );
}

/* ─── Facilities List ────────────────────────────────────── */
function FacilitiesList() {
  const navigate = useNavigate();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {FACILITIES.map(f => (
        <div key={f.id} onClick={() => navigate(`/activity/facility/${f.id}`)} style={{
          backgroundColor: C.card,
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: 16, padding: "14px 16px",
          display: "flex", alignItems: "center", gap: 14, cursor: "pointer",
          boxShadow: "3px 3px 0px rgba(0,0,0,0.10)", borderLeft: "3px solid rgba(0,0,0,0.08)",
        }}>
          <FacilityIcon type={f.svgIcon || "laundry"} color={f.color} size={24} />
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontSize: 15, fontFamily: LONDRINA, color: C.strong }}>{f.name}</p>
            <p style={{ margin: "2px 0 0", fontSize: 14, color: C.muted, fontFamily: DM_SANS }}>{f.floor} · {f.hours}</p>
          </div>
          <SolidChevronRightIcon color={C.muted} size={12} />
        </div>
      ))}
    </div>
  );
}

/* ─── Facilities Screen ──────────────────────────────────── */
export default function FacilitiesScreen() {
  const navigate = useNavigate();
  const [activePinId, setActivePinId] = useState<number | null>(null);

  return (
    <PageWrapper bg="#EFF3FC">
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 24, scrollbarWidth: "none" } as React.CSSProperties}>
        <BackHeader title="Facilities" subtitle="Floor plan & room details" bg="#EFF3FC" />

        {/* Floor plan card */}
        <div style={{ padding: "0 24px 24px" }}>
          <div style={{ backgroundColor: C.card,
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: 22, overflow: "hidden", boxShadow: "3px 3px 0px rgba(0,0,0,0.10)" }}>
            <div style={{ padding: "16px 18px 10px" }}>
              <p style={{ margin: "0 0 4px", fontSize: 16, fontFamily: LONDRINA, color: C.strong }}>Building Map</p>
              <p style={{ margin: 0, fontSize: 14, color: C.muted, fontFamily: DM_SANS }}>Tap a pin to see facility details</p>
            </div>
            <div style={{ padding: "0 16px 16px" }}>
              <FloorPlanMap onPinTap={id => setActivePinId(id)} />
            </div>
            <div style={{ padding: "0 16px 16px", display: "flex", gap: 10, flexWrap: "wrap" }}>
              {FACILITIES.map(f => (
                <div key={f.id} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: f.color }} />
                  <span style={{ fontSize: 12, color: C.muted, fontFamily: DM_SANS }}>{f.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Facilities list */}
        <div style={{ padding: "0 24px 32px" }}>
          <SectionHeader title="All Facilities" />
          <FacilitiesList />
        </div>
      </div>

      {activePinId !== null && (
        <FacilityBottomSheet
          facilityId={activePinId}
          onClose={() => setActivePinId(null)}
          onOpen={() => { navigate(`/activity/facility/${activePinId}`); setActivePinId(null); }}
        />
      )}

      <BottomNav active={1} />
    </PageWrapper>
  );
}

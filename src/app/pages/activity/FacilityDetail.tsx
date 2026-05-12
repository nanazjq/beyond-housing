import React from "react";
import { useState } from "react";
import { useParams } from "react-router";
import {
  C, LONDRINA, DM_SANS, PageWrapper, BackHeader, TactileButton, BottomNav, TangramDecoration,
} from "../../components/kitchen/Shared";
import { FACILITIES , FacilityIcon } from "./ActivityShared";

/* ─── Per-facility photo data (realistic Unsplash images) ── */
const FACILITY_PHOTOS: Record<number, { url: string; label: string }[]> = {
  1: [ // Laundry Room
    { url: "https://images.unsplash.com/photo-1777058621579-347ab26da65e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600", label: "Machines (B1)" },
    { url: "https://images.unsplash.com/photo-1604762434310-c6def6a3d844?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600", label: "Folding area" },
    { url: "https://images.unsplash.com/photo-1777058621579-347ab26da65e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600", label: "Booking panel" },
  ],
  2: [ // Gym
    { url: "https://images.unsplash.com/photo-1775993703558-e7afab02b7bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600", label: "Equipment floor" },
    { url: "https://images.unsplash.com/photo-1652364653960-1c23c208ef43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600", label: "Cardio zone" },
    { url: "https://images.unsplash.com/photo-1775993703558-e7afab02b7bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600", label: "Free weights" },
  ],
  3: [ // Study Lounge
    { url: "https://images.unsplash.com/photo-1760166699654-5d0e10f51994?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600", label: "Silent zone" },
    { url: "https://images.unsplash.com/photo-1766431014989-3a1fce5420a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600", label: "Reading nook" },
    { url: "https://images.unsplash.com/photo-1760166699654-5d0e10f51994?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600", label: "Group room" },
  ],
  4: [ // Common Kitchen
    { url: "https://images.unsplash.com/photo-1776313756994-d9e9ab7b2d5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600", label: "Main kitchen" },
    { url: "https://images.unsplash.com/photo-1772724317813-c7aec42c9d26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600", label: "Cooking area" },
    { url: "https://images.unsplash.com/photo-1604349347116-c9eeaf23700f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600", label: "Baking shelf" },
  ],
  5: [ // Bike Storage
    { url: "https://images.unsplash.com/photo-1580137331426-c28eb6be023b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600", label: "Storage racks" },
    { url: "https://images.unsplash.com/photo-1761483202449-2ddcea4bb5bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600", label: "Bike bay" },
    { url: "https://images.unsplash.com/photo-1580137331426-c28eb6be023b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600", label: "Lock area" },
  ],
};

export default function FacilityDetail() {
  const { id } = useParams();
  const facility = FACILITIES.find(f => f.id === Number(id)) ?? FACILITIES[0];
  const photos   = FACILITY_PHOTOS[facility.id] ?? FACILITY_PHOTOS[1];
  const [reminded, setReminded] = useState(false);

  return (
    <PageWrapper bg="#EFF3FC">
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 24, scrollbarWidth: "none" } as React.CSSProperties}>
        <BackHeader title={facility.name} subtitle={facility.floor} bg="#EFF3FC" />

        {/* ── Hero Card ── */}
        <div style={{ padding: "0 24px 24px" }}>
          <div style={{ backgroundColor: C.card,
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: 22, padding: "22px 22px 20px", position: "relative", overflow: "hidden", boxShadow: "3px 3px 0px rgba(0,0,0,0.10)" }}>
            <TangramDecoration primaryColor={facility.color} />
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, backgroundColor: `${facility.color}18`, borderRadius: 22, padding: "4px 12px", marginBottom: 16 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: facility.color }} />
              <span style={{ fontSize: 14, color: facility.color, fontWeight: 700, fontFamily: DM_SANS }}>Open Now · {facility.hours}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 64, height: 64, borderRadius: 16, backgroundColor: `${facility.color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <FacilityIcon type={facility.svgIcon || "laundry"} color={facility.color} size={28} />
              </div>
              <div>
                <h2 style={{ margin: "0 0 4px", fontSize: 26, fontFamily: LONDRINA, color: C.strong }}>{facility.name}</h2>
                <p style={{ margin: 0, fontSize: 15, color: C.muted, fontFamily: DM_SANS }}>{facility.floor}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Photos (real facility images) ── */}
        <div style={{ padding: "0 24px 24px" }}>
          <p style={{ margin: "0 0 12px", fontSize: 13, color: C.muted, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: DM_SANS }}>Photos</p>
          <div style={{ display: "flex", gap: 10, overflowX: "auto", scrollbarWidth: "none" } as React.CSSProperties}>
            {photos.map((photo, i) => (
              <div key={i} style={{ flexShrink: 0, width: 150, height: 104, borderRadius: 16, overflow: "hidden", position: "relative", boxShadow: "3px 3px 0px rgba(0,0,0,0.10)" }}>
                <img src={photo.url} alt={photo.label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                {/* Label overlay */}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "6px 8px", background: `linear-gradient(to top, ${facility.color}99, transparent)` }}>
                  <span style={{ fontSize: 9, color: "white", fontFamily: DM_SANS, fontWeight: 700, letterSpacing: "0.03em" }}>{photo.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Basic Info ── */}
        <div style={{ padding: "0 24px 24px" }}>
          <p style={{ margin: "0 0 12px", fontSize: 13, color: C.muted, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: DM_SANS }}>Basic Info</p>
          <div style={{ backgroundColor: C.card,
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: 22, padding: "16px 18px", boxShadow: "3px 3px 0px rgba(0,0,0,0.10)" }}>
            {[
              { label: "Location",      value: facility.floor },
              { label: "Opening Hours", value: facility.hours },
            ].map((row, i, arr) => (
              <div key={row.label} style={{ padding: "10px 0", borderBottom: i < arr.length - 1 ? `1px solid ${"#E4E6EA"}` : "none", display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 15, color: C.muted, fontFamily: DM_SANS }}>{row.label}</span>
                <span style={{ fontSize: 15, fontFamily: DM_SANS, fontWeight: 700, color: C.strong }}>{row.value}</span>
              </div>
            ))}
            <div style={{ paddingTop: 10 }}>
              <p style={{ margin: "0 0 4px", fontSize: 14, color: C.muted, fontFamily: DM_SANS }}>Description</p>
              <p style={{ margin: 0, fontSize: 16, color: C.text, fontFamily: DM_SANS, lineHeight: 1.6 }}>
                {facility.name} — available {facility.hours}. Scan your resident card to enter.
              </p>
            </div>
          </div>
        </div>

        {/* ── Usage Manual ── */}
        <div style={{ padding: "0 24px 24px" }}>
          <p style={{ margin: "0 0 12px", fontSize: 13, color: C.muted, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: DM_SANS }}>Usage Manual</p>
          <div style={{ backgroundColor: C.card,
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: 22, padding: "16px 18px", boxShadow: "3px 3px 0px rgba(0,0,0,0.10)" }}>
            {facility.steps.map((step, i) => (
              <div key={i} style={{ display: "flex", gap: 14, padding: "10px 0", borderBottom: i < facility.steps.length - 1 ? `1px solid ${"#E4E6EA"}` : "none" }}>
                <div style={{ width: 26, height: 26, borderRadius: "50%", backgroundColor: `${facility.color}18`, border: `1.5px solid ${facility.color}40`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontSize: 14, fontFamily: LONDRINA, color: facility.color }}>{i + 1}</span>
                </div>
                <p style={{ margin: 0, flex: 1, fontSize: 16, color: C.text, fontFamily: DM_SANS, lineHeight: 1.55, paddingTop: 3 }}>{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Rules ── */}
        <div style={{ padding: "0 24px 24px" }}>
          <p style={{ margin: "0 0 12px", fontSize: 13, color: C.muted, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: DM_SANS }}>Rules</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {facility.rules.map((rule, i) => (
              <span key={i} style={{ backgroundColor: "#EEF3FC", border: "1px solid rgba(0,0,0,0.06)", color: C.text, borderRadius: 99, padding: "6px 14px", fontSize: 14, fontFamily: DM_SANS, lineHeight: 1.4 }}>
                <svg width="10" height="10" viewBox="0 0 10 10" style={{ marginRight: 5, verticalAlign: "middle" }} fill={C.orange}>
                  <path d="M5 0L10 9H0L5 0Z" opacity="0.85" />
                  <rect x="4.3" y="3.5" width="1.4" height="3" rx="0.7" fill="white" />
                  <circle cx="5" cy="7.5" r="0.7" fill="white" />
                </svg>
                {rule}
              </span>
            ))}
          </div>
        </div>

        {/* ── Reminder Button ── */}
        <div style={{ padding: "0 24px 32px" }}>
          <TactileButton
            bgColor={reminded ? C.green : facility.color}
            shadowColor={`${reminded ? C.green : facility.color}88`}
            fullWidth
            onClick={() => setReminded(true)}
          >
            {reminded ? "✓ Reminder set in Messages" : `Set Reminder for ${facility.name}`}
          </TactileButton>
          {reminded && (
            <p style={{ margin: "8px 0 0", textAlign: "center", fontSize: 14, color: C.muted, fontFamily: DM_SANS }}>
              You'll be reminded via the Message module.
            </p>
          )}
        </div>
      </div>
      <BottomNav active={1} />
    </PageWrapper>
  );
}

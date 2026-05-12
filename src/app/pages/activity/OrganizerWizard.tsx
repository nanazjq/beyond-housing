import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import {
  C, LONDRINA, DM_SANS, PageWrapper, BackHeader, TactileButton, BottomNav, TangramDecoration,
} from "../../components/kitchen/Shared";

const CATEGORIES = ["Sports","Music","Photography","Cooking","Art","Language","Hiking","Other"];
const VENUES = [
  { label: "Community Kitchen · B1", emoji: "🍳" },
  { label: "Study Lounge · 2F",      emoji: "📚" },
  { label: "Common Room · 1F",       emoji: "🛋️" },
  { label: "Music Room · B1",        emoji: "🎸" },
  { label: "Gym · 1F",               emoji: "💪" },
  { label: "Outdoor / Park",         emoji: "🌿" },
];

export default function OrganizerWizard() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // Form state
  const [title, setTitle]       = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate]         = useState("");
  const [time, setTime]         = useState("");
  const [venue, setVenue]       = useState("");
  const [desc, setDesc]         = useState("");
  const [cost, setCost]         = useState("Free");
  const [maxPeople, setMaxPeople] = useState("10");
  const [published, setPublished] = useState(false);

  const canNext1 = title && category && date && time;
  const canNext2 = desc;

  function ProgressBar() {
    return (
      <div style={{ display: "flex", gap: 6, padding: "0 24px 20px" }}>
        {[1, 2, 3].map(s => (
          <div key={s} style={{ flex: 1, height: 4, borderRadius: 99, backgroundColor: s <= step ? C.blue : "#E4E6EA", transition: "background 0.2s ease" }} />
        ))}
      </div>
    );
  }

  if (published) {
    return (
      <PageWrapper bg="#EFF3FC">
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 32px", textAlign: "center" }}>
          <div style={{ width: 88, height: 88, borderRadius: "50%", background: `linear-gradient(135deg, ${C.blue}, ${C.blueDark})`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 12px 40px ${C.blue}55`, marginBottom: 24 }}>
            <svg width="40" height="40" viewBox="0 0 40 40"><path d="M8 20L16 28L32 12L28 8L16 21L12 16Z" fill="white"/></svg>
          </div>
          <h1 style={{ margin: "0 0 10px", fontSize: 32, fontFamily: LONDRINA, color: C.strong }}>Activity Published!</h1>
          <p style={{ margin: "0 0 32px", fontSize: 16, color: C.muted, fontFamily: DM_SANS, lineHeight: 1.6 }}>
            "{title}" is now live on the Explore Activities feed. Residents can discover and join it.
          </p>
          <TactileButton bgColor={C.blue} shadowColor={C.blueDark} fullWidth onClick={() => navigate("/activity/social?tab=explore")}>
            View in Explore Feed
          </TactileButton>
          <button onClick={() => navigate("/activity")} style={{ marginTop: 14, background: "none", border: "none", cursor: "pointer", fontSize: 16, color: C.muted, fontFamily: DM_SANS }}>
            Back to Activity Home
          </button>
        </div>
        <BottomNav active={1} />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper bg="#EFF3FC">
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 24, scrollbarWidth: "none" } as React.CSSProperties}>
        <BackHeader
          title="Create Activity"
          subtitle={`Step ${step} of 3 — ${step === 1 ? "Activity Info" : step === 2 ? "Description & Details" : "Preview & Publish"}`}
        bg="#EFF3FC" />
        <ProgressBar />

        {/* ── Step 1: Activity Info ── */}
        {step === 1 && (
          <div style={{ padding: "0 24px" }}>
            {/* Title */}
            <div style={{ marginBottom: 20 }}>
              <p style={{ margin: "0 0 8px", fontSize: 14, color: C.muted, fontWeight: 700, fontFamily: DM_SANS }}>ACTIVITY TITLE *</p>
              <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Sunday Yoga in the Park"
                style={{ width: "100%", borderRadius: 16, border: `1.5px solid ${"#E4E6EA"}`, padding: "12px 16px", fontSize: 15, fontFamily: DM_SANS, color: C.strong, outline: "none", boxSizing: "border-box", backgroundColor: "white" }} />
            </div>

            {/* Category */}
            <div style={{ marginBottom: 20 }}>
              <p style={{ margin: "0 0 8px", fontSize: 14, color: C.muted, fontWeight: 700, fontFamily: DM_SANS }}>CATEGORY *</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {CATEGORIES.map(cat => (
                  <button key={cat} onClick={() => setCategory(cat)} style={{
                    borderRadius: 99, padding: "7px 16px", border: "none", cursor: "pointer",
                    backgroundColor: category === cat ? C.blue : "#F2F3F5",
                    color: category === cat ? "white" : C.text,
                    fontSize: 15, fontWeight: 700, fontFamily: DM_SANS, transition: "all 0.15s ease",
                  }}>{cat}</button>
                ))}
              </div>
            </div>

            {/* Date + Time */}
            <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
              <div style={{ flex: 1 }}>
                <p style={{ margin: "0 0 8px", fontSize: 14, color: C.muted, fontWeight: 700, fontFamily: DM_SANS }}>DATE *</p>
                <input type="date" value={date} onChange={e => setDate(e.target.value)}
                  style={{ width: "100%", borderRadius: 16, border: `1.5px solid ${"#E4E6EA"}`, padding: "12px 14px", fontSize: 16, fontFamily: DM_SANS, color: C.strong, outline: "none", boxSizing: "border-box", backgroundColor: "white" }} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: "0 0 8px", fontSize: 14, color: C.muted, fontWeight: 700, fontFamily: DM_SANS }}>TIME *</p>
                <input type="time" value={time} onChange={e => setTime(e.target.value)}
                  style={{ width: "100%", borderRadius: 16, border: `1.5px solid ${"#E4E6EA"}`, padding: "12px 14px", fontSize: 16, fontFamily: DM_SANS, color: C.strong, outline: "none", boxSizing: "border-box", backgroundColor: "white" }} />
              </div>
            </div>

            {/* Venue Fast-Link */}
            <div style={{ marginBottom: 28 }}>
              <p style={{ margin: "0 0 8px", fontSize: 14, color: C.muted, fontWeight: 700, fontFamily: DM_SANS }}>VENUE (quick-select or type)</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 10 }}>
                {VENUES.map(v => (
                  <button key={v.label} onClick={() => setVenue(v.label)} style={{
                    borderRadius: 10, padding: "10px 14px", cursor: "pointer",
                    backgroundColor: venue === v.label ? `${C.blue}15` : "#F2F3F5",
                    border: `1.5px solid ${venue === v.label ? C.blue : "#E4E6EA"}`,
                    display: "flex", alignItems: "center", gap: 10, textAlign: "left",
                  } as React.CSSProperties}>
                    <span style={{ fontSize: 18 }}>{v.emoji}</span>
                    <span style={{ fontSize: 15, fontFamily: DM_SANS, color: venue === v.label ? C.blue : C.text, fontWeight: venue === v.label ? 700 : 400 }}>{v.label}</span>
                  </button>
                ))}
              </div>
              <input value={venue} onChange={e => setVenue(e.target.value)} placeholder="Or type a custom location..."
                style={{ width: "100%", borderRadius: 16, border: `1.5px solid ${"#E4E6EA"}`, padding: "11px 16px", fontSize: 16, fontFamily: DM_SANS, color: C.strong, outline: "none", boxSizing: "border-box", backgroundColor: "white" }} />
            </div>

            <TactileButton bgColor={C.blue} shadowColor={C.blueDark} fullWidth onClick={() => canNext1 && setStep(2)} disabled={!canNext1}>
              Continue →
            </TactileButton>
          </div>
        )}

        {/* ── Step 2: Description & Details ── */}
        {step === 2 && (
          <div style={{ padding: "0 24px" }}>
            <div style={{ marginBottom: 20 }}>
              <p style={{ margin: "0 0 8px", fontSize: 14, color: C.muted, fontWeight: 700, fontFamily: DM_SANS }}>DESCRIPTION *</p>
              <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="Tell people what to expect, what to bring, and who is welcome..."
                rows={5}
                style={{ width: "100%", borderRadius: 16, border: `1.5px solid ${"#E4E6EA"}`, padding: "12px 16px", fontSize: 16, fontFamily: DM_SANS, color: C.strong, outline: "none", boxSizing: "border-box", resize: "none", backgroundColor: "white" }} />
            </div>

            <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
              <div style={{ flex: 1 }}>
                <p style={{ margin: "0 0 8px", fontSize: 14, color: C.muted, fontWeight: 700, fontFamily: DM_SANS }}>COST</p>
                <div style={{ display: "flex", gap: 6 }}>
                  {["Free", "Paid"].map(opt => (
                    <button key={opt} onClick={() => setCost(opt)} style={{
                      flex: 1, borderRadius: 10, padding: "11px 0", border: "none", cursor: "pointer",
                      backgroundColor: cost === opt ? C.blue : "#F2F3F5",
                      color: cost === opt ? "white" : C.text,
                      fontSize: 15, fontWeight: 700, fontFamily: DM_SANS,
                    }}>{opt}</button>
                  ))}
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: "0 0 8px", fontSize: 14, color: C.muted, fontWeight: 700, fontFamily: DM_SANS }}>MAX PEOPLE</p>
                <input type="number" value={maxPeople} onChange={e => setMaxPeople(e.target.value)} min="1" max="100"
                  style={{ width: "100%", borderRadius: 16, border: `1.5px solid ${"#E4E6EA"}`, padding: "11px 14px", fontSize: 16, fontFamily: DM_SANS, color: C.strong, outline: "none", boxSizing: "border-box", backgroundColor: "white" }} />
              </div>
            </div>

            <div style={{ display: "flex", gap: 10, marginBottom: 0 }}>
              <button onClick={() => setStep(1)} style={{ flex: 1, borderRadius: 16, border: `1.5px solid ${"#E4E6EA"}`, backgroundColor: "white", padding: "13px 0", cursor: "pointer", fontSize: 16, fontFamily: LONDRINA, color: C.muted }}>← Back</button>
              <TactileButton bgColor={C.blue} shadowColor={C.blueDark} flex onClick={() => canNext2 && setStep(3)} disabled={!canNext2}>
                Preview →
              </TactileButton>
            </div>
          </div>
        )}

        {/* ── Step 3: Preview & Publish ── */}
        {step === 3 && (
          <div style={{ padding: "0 24px" }}>
            <p style={{ margin: "0 0 12px", fontSize: 13, color: C.muted, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: DM_SANS }}>Preview Card</p>
            <div style={{ backgroundColor: C.card,
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: 22, padding: "22px 22px 20px", position: "relative", overflow: "hidden", boxShadow: "3px 3px 0px rgba(0,0,0,0.10)", marginBottom: 24 }}>
              <TangramDecoration primaryColor={C.blue} />
              <div style={{ display: "inline-flex", gap: 6, marginBottom: 14 }}>
                <span style={{ backgroundColor: `${C.blue}18`, color: C.blue, borderRadius: 99, padding: "3px 12px", fontSize: 13, fontWeight: 700, fontFamily: DM_SANS }}>{category || "Activity"}</span>
                <span style={{ backgroundColor: "#F2F3F5", color: C.muted, borderRadius: 99, padding: "3px 12px", fontSize: 13, fontWeight: 600, fontFamily: DM_SANS }}>{cost}</span>
              </div>
              <h2 style={{ margin: "0 0 8px", fontSize: 24, fontFamily: LONDRINA, color: C.strong }}>{title || "Untitled Activity"}</h2>
              <p style={{ margin: "0 0 12px", fontSize: 14, color: C.muted, fontFamily: DM_SANS }}>{date} {time} · {venue || "TBD"} · Max {maxPeople} people</p>
              <p style={{ margin: 0, fontSize: 15, color: C.text, fontFamily: DM_SANS, lineHeight: 1.6 }}>{desc || "No description yet."}</p>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setStep(2)} style={{ flex: 1, borderRadius: 16, border: `1.5px solid ${"#E4E6EA"}`, backgroundColor: "white", padding: "13px 0", cursor: "pointer", fontSize: 16, fontFamily: LONDRINA, color: C.muted }}>← Edit</button>
              <TactileButton bgColor={C.blue} shadowColor={C.blueDark} flex onClick={() => setPublished(true)}>
                Publish Now ✦
              </TactileButton>
            </div>
          </div>
        )}
      </div>
      <BottomNav active={1} />
    </PageWrapper>
  );
}
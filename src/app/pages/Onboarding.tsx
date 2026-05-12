import React, { useState } from "react";
import { useNavigate } from "react-router";
import { C, LONDRINA, DM_SANS, TactileButton } from "../components/kitchen/Shared";

const BG = "#FEF9EF";

const AREAS = ["Block A", "Block B", "Block C", "Block D"];
const COUNTRIES = ["Sweden", "China", "Germany", "France", "Spain", "Italy", "UK", "USA", "Japan", "South Korea", "India", "Brazil", "Other"];

// shape: circle | square | triangle
const HOBBIES = [
  { label: "Music",       color: C.blue,   bg: "#D6E4F8", shape: "circle",   s: 84, rot: 0   },
  { label: "Cooking",     color: C.orange, bg: "#F9D5C8", shape: "triangle", s: 88, rot: 15  },
  { label: "Sports",      color: C.green,  bg: "#C8E8D4", shape: "square",   s: 80, rot: -8  },
  { label: "Art",         color: C.purple, bg: "#E2D9F3", shape: "triangle", s: 86, rot: -20 },
  { label: "Photography", color: C.blue,   bg: "#D6E4F8", shape: "circle",   s: 86, rot: 0   },
  { label: "Hiking",      color: C.green,  bg: "#C8E8D4", shape: "square",   s: 78, rot: 12  },
  { label: "Reading",     color: C.purple, bg: "#E2D9F3", shape: "circle",   s: 78, rot: 0   },
  { label: "Travel",      color: C.pink,   bg: "#F5C8D4", shape: "triangle", s: 86, rot: 10  },
  { label: "Gaming",      color: C.blue,   bg: "#D6E4F8", shape: "square",   s: 80, rot: -6  },
  { label: "Yoga",        color: C.green,  bg: "#C8E8D4", shape: "circle",   s: 80, rot: 0   },
  { label: "Film",        color: C.orange, bg: "#F9D5C8", shape: "square",   s: 78, rot: 14  },
  { label: "Dancing",     color: C.pink,   bg: "#F5C8D4", shape: "triangle", s: 86, rot: -12 },
  { label: "Fitness",     color: C.orange, bg: "#F9D5C8", shape: "circle",   s: 76, rot: 0   },
  { label: "Language",    color: C.purple, bg: "#E2D9F3", shape: "square",   s: 80, rot: -10 },
  { label: "Travel",      color: C.blue,   bg: "#D6E4F8", shape: "triangle", s: 84, rot: 18  },
  { label: "Gardening",   color: C.green,  bg: "#C8E8D4", shape: "circle",   s: 76, rot: 0   },
  { label: "Coding",      color: C.purple, bg: "#E2D9F3", shape: "triangle", s: 84, rot: -15 },
  { label: "Writing",     color: C.pink,   bg: "#F5C8D4", shape: "square",   s: 78, rot: 8   },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1 or 2
  const [name, setName] = useState("");
  const [area, setArea] = useState("");
  const [room, setRoom] = useState("");
  const [country, setCountry] = useState("");
  const [hobbies, setHobbies] = useState<string[]>([]);

  const toggleHobby = (label: string) => {
    setHobbies(prev =>
      prev.includes(label) ? prev.filter(h => h !== label) : [...prev, label]
    );
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "14px 16px", borderRadius: 16,
    border: "1.5px solid #E8E0D0", backgroundColor: "white",
    fontSize: 15, fontFamily: DM_SANS, color: C.text,
    outline: "none", boxSizing: "border-box",
    boxShadow: "3px 3px 0px rgba(0,0,0,0.08)",
  };

  const selectStyle: React.CSSProperties = {
    ...inputStyle,
    appearance: "none", cursor: "pointer",
  };

  return (
    <div style={{
      minHeight: "100dvh", backgroundColor: "#2A2520",
      display: "flex", justifyContent: "center", alignItems: "center",
      padding: "20px 0",
    }}>
      <div style={{
        width: 390, height: 844, flexShrink: 0,
        backgroundColor: BG,
        borderRadius: 50,
        boxShadow: "0 60px 120px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)",
        display: "flex", flexDirection: "column",
        overflow: "hidden", position: "relative",
      }}>

        {/* Progress bar */}
        <div style={{ height: 4, backgroundColor: "#E8E0D0", flexShrink: 0 }}>
          <div style={{
            height: "100%", width: step === 1 ? "50%" : "100%",
            backgroundColor: C.blue,
            transition: "width 0.4s ease",
          }} />
        </div>

        <div style={{ flex: 1, overflowY: "auto", scrollbarWidth: "none", padding: "40px 28px 32px" } as React.CSSProperties}>

          {step === 1 ? (
            <>
              <p style={{ margin: "0 0 6px", fontSize: 13, color: C.muted, fontFamily: DM_SANS, fontWeight: 600 }}>
                STEP 1 OF 2
              </p>
              <h1 style={{ margin: "0 0 28px", fontSize: 30, fontFamily: LONDRINA, color: C.strong, lineHeight: 1.2 }}>
                Tell us about yourself
              </h1>

              {/* Name */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 12, fontFamily: DM_SANS, fontWeight: 700, color: C.muted, letterSpacing: "0.06em", marginBottom: 8, textTransform: "uppercase" }}>
                  Your Name
                </label>
                <input
                  style={inputStyle}
                  placeholder="e.g. Jingqi"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>

              {/* Area */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 12, fontFamily: DM_SANS, fontWeight: 700, color: C.muted, letterSpacing: "0.06em", marginBottom: 8, textTransform: "uppercase" }}>
                  Residence Area
                </label>
                <select style={selectStyle} value={area} onChange={e => setArea(e.target.value)}>
                  <option value="">Select your block...</option>
                  {AREAS.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>

              {/* Room */}
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 12, fontFamily: DM_SANS, fontWeight: 700, color: C.muted, letterSpacing: "0.06em", marginBottom: 8, textTransform: "uppercase" }}>
                  Room Number
                </label>
                <input
                  style={inputStyle}
                  placeholder="e.g. 301"
                  value={room}
                  onChange={e => setRoom(e.target.value)}
                />
              </div>

              {/* Country */}
              <div style={{ marginBottom: 28 }}>
                <label style={{ display: "block", fontSize: 12, fontFamily: DM_SANS, fontWeight: 700, color: C.muted, letterSpacing: "0.06em", marginBottom: 8, textTransform: "uppercase" }}>
                  Where are you from?
                </label>
                <input
                  style={inputStyle}
                  placeholder="e.g. Sweden, China, Germany..."
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                />
              </div>

              <TactileButton
                bgColor={C.strong}
                shadowColor="#1a1a1a"
                fullWidth
                onClick={() => setStep(2)}
              >
                <span style={{ fontFamily: LONDRINA, fontSize: 20, color: "white" }}>Next →</span>
              </TactileButton>
            </>
          ) : (
            <>
              <div style={{ padding: "0 0 16px" }}>
              <p style={{ margin: "0 0 6px", fontSize: 13, color: C.muted, fontFamily: DM_SANS, fontWeight: 600 }}>
                STEP 2 OF 2
              </p>
              <h1 style={{ margin: "0 0 8px", fontSize: 30, fontFamily: LONDRINA, color: C.strong, lineHeight: 1.2 }}>
                What are your interests?
              </h1>
              <p style={{ margin: "0 0 16px", fontSize: 14, color: C.muted, fontFamily: DM_SANS }}>
                Pick as many as you like
              </p>

              {/* Hobby shapes grid */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16, justifyContent: "space-evenly", alignItems: "center", padding: "0 4px" }}>
                {HOBBIES.map(h => {
                  const selected = hobbies.includes(h.label);
                  const col = selected ? h.color : h.bg;
                  const textColor = selected ? "white" : h.color;
                  const TH = Math.round(h.s * Math.sqrt(3) / 2);
                  const pad = 12;
                  const x1 = h.s/2, y1 = pad, x2 = h.s-pad, y2 = TH-pad, x3 = pad, y3 = TH-pad;

                  if (h.shape === "circle") {
                    return (
                      <button key={h.label} onClick={() => toggleHobby(h.label)} style={{
                        width: h.s, height: h.s, borderRadius: "50%",
                        backgroundColor: col, border: "none", cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 11, fontFamily: DM_SANS, fontWeight: 700, color: textColor,
                        transition: "all 0.2s ease",
                        transform: selected ? `rotate(${h.rot}deg) scale(1.08)` : `rotate(${h.rot}deg)`,
                      }}>{h.label}</button>
                    );
                  }
                  if (h.shape === "square") {
                    return (
                      <button key={h.label} onClick={() => toggleHobby(h.label)} style={{
                        width: h.s, height: h.s, borderRadius: 10,
                        backgroundColor: col, border: "none", cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 11, fontFamily: DM_SANS, fontWeight: 700, color: textColor,
                        transition: "all 0.2s ease",
                        transform: selected ? `rotate(${h.rot}deg) scale(1.08)` : `rotate(${h.rot}deg)`,
                      }}>{h.label}</button>
                    );
                  }
                  // triangle
                  return (
                    <div key={h.label} onClick={() => toggleHobby(h.label)} style={{
                      position: "relative", width: h.s, height: TH, cursor: "pointer",
                      transition: "transform 0.2s ease",
                      transform: selected ? `rotate(${h.rot}deg) scale(1.08)` : `rotate(${h.rot}deg)`,
                    }}>
                      <svg width={h.s} height={TH} viewBox={`0 0 ${h.s} ${TH}`} style={{ display: "block" }}>
                        <polygon points={`${x1},${y1} ${x2},${y2} ${x3},${y3}`}
                          fill={col} stroke={col} strokeWidth="16" strokeLinejoin="round" />
                      </svg>
                      <div style={{
                        position: "absolute", inset: 0,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        paddingTop: Math.round(TH * 0.2),
                        fontSize: 11, fontFamily: DM_SANS, fontWeight: 700, color: textColor,
                      }}>{h.label}</div>
                    </div>
                  );
                })}
              </div>

              </div>
              <div style={{ 
                position: "sticky", bottom: 0, 
                backgroundColor: "#FEF9EF",
                paddingTop: 12, paddingBottom: 8,
                display: "flex", gap: 12 
              }}>
                <button
                  onClick={() => setStep(1)}
                  style={{
                    width: 52, height: 52, borderRadius: 10, flexShrink: 0,
                    backgroundColor: "white", border: "none",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer",
                    boxShadow: "2px 2px 0px rgba(0,0,0,0.10)",
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20">
                    <path d="M13 3.5L5.5 10L13 16.5L11 10Z" fill="#3A3A3A"/>
                  </svg>
                </button>
                <div style={{ flex: 2 }}>
                  <TactileButton
                    bgColor={C.strong}
                    shadowColor="#1a1a1a"
                    fullWidth
                    onClick={() => {
                      localStorage.setItem("bh_onboarded", "true");
                      navigate("/loading");
                    }}
                  >
                    <span style={{ fontFamily: LONDRINA, fontSize: 22, color: "white" }}>Let's Go!</span>
                  </TactileButton>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

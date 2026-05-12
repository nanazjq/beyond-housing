import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { C, LONDRINA, DM_SANS, TactileButton } from "../components/kitchen/Shared";

const BG = "#FEF9EF";
const FULL_TEXT = "Enhancing Student Living Experience and Coliving Collaboration in Shared Spaces.";

export default function IntroPage() {
  const navigate = useNavigate();
  const [displayed, setDisplayed] = useState("");
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (idx < FULL_TEXT.length) {
      const t = setTimeout(() => {
        setDisplayed(FULL_TEXT.slice(0, idx + 1));
        setIdx(i => i + 1);
      }, 38);
      return () => clearTimeout(t);
    }
  }, [idx]);

  return (
    <div style={{
      minHeight: "100dvh", backgroundColor: "#2A2520",
      display: "flex", justifyContent: "center", alignItems: "center",
      padding: "20px 0",
    }}>
      <div style={{
        width: 390, height: 844, flexShrink: 0,
        backgroundColor: BG, borderRadius: 50,
        boxShadow: "0 60px 120px rgba(0,0,0,0.5)",
        display: "flex", flexDirection: "column",
        overflow: "hidden", position: "relative",
      }}>

        {/* 标题 */}
        <div style={{ padding: "72px 36px 0", position: "relative", zIndex: 2 }}>
          <h1 style={{
            margin: 0, fontFamily: LONDRINA,
            fontSize: 38, lineHeight: 1.15,
            color: C.strong,
            minHeight: 240,
          }}>
            {displayed}
            {idx < FULL_TEXT.length && (
              <span style={{
                display: "inline-block", width: 3, height: "0.9em",
                backgroundColor: C.strong, marginLeft: 2,
                verticalAlign: "text-bottom",
                animation: "blink 0.7s step-end infinite",
              }} />
            )}
          </h1>
          <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
        </div>

        {/* 几何图形装饰 */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <div style={{
            position: "absolute", top: 320, left: -30,
            width: 170, height: 170, borderRadius: "50%",
            backgroundColor: `${C.blue}CC`,
          }} />
          <svg style={{ position: "absolute", top: 350, right: 20 }} width="140" height="122">
            <polygon points="70,8 132,114 8,114" fill={`${C.green}CC`} />
          </svg>
          <div style={{
            position: "absolute", top: 500, left: 20,
            width: 120, height: 120, borderRadius: 16,
            backgroundColor: `${C.purple}BB`,
            transform: "rotate(-8deg)",
          }} />
          <svg style={{ position: "absolute", bottom: 90, right: -20 }} width="170" height="150">
            <polygon points="85,8 162,142 8,142" fill={`${C.orange}CC`} />
          </svg>
          <div style={{
            position: "absolute", top: 240, right: 30,
            width: 55, height: 55, borderRadius: "50%",
            backgroundColor: `${C.pink}99`,
          }} />
        </div>

        {/* 底部按钮 */}
        <div style={{
          position: "absolute", bottom: 48, left: 28, right: 28,
          zIndex: 10,
        }}>
          <TactileButton
            bgColor={C.strong}
            shadowColor="#1a1a1a"
            fullWidth
            onClick={() => navigate("/onboarding")}
          >
            <span style={{ fontFamily: LONDRINA, fontSize: 22, color: "white" }}>
              I'm ready!
            </span>
          </TactileButton>
        </div>

      </div>
    </div>
  );
}

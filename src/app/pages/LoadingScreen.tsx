import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { C, LONDRINA, DM_SANS } from "../components/kitchen/Shared";

const BG = "#FEF9EF";

const MESSAGES = [
  "Setting up your space...",
  "Finding your neighbours...",
  "Loading your kitchen...",
  "Almost there...",
];

export default function LoadingScreen() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState(0); // 0-4 各部分逐渐出现
  const [msgIdx, setMsgIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Logo各部分依次出现
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 700),
      setTimeout(() => setPhase(3), 1100),
      setTimeout(() => setPhase(4), 1500),
    ];

    // 消息轮换
    const msgTimer = setInterval(() => {
      setMsgIdx(i => (i + 1) % MESSAGES.length);
    }, 900);

    // 进度条
    const progTimer = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(progTimer); return 100; }
        return p + 2.5;
      });
    }, 80);

    // 完成后跳转
    const doneTimer = setTimeout(() => {
      setDone(true);
      setTimeout(() => navigate("/kitchen"), 600);
    }, 3400);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(msgTimer);
      clearInterval(progTimer);
      clearTimeout(doneTimer);
    };
  }, [navigate]);

  const f = (show: boolean): React.CSSProperties => ({
    opacity: show ? 1 : 0,
    transform: show ? "scale(1) translateY(0)" : "scale(0.7) translateY(10px)",
    transition: "opacity 0.5s cubic-bezier(0.34,1.56,0.64,1), transform 0.5s cubic-bezier(0.34,1.56,0.64,1)",
  });

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
        alignItems: "center", justifyContent: "center",
        overflow: "hidden",
        opacity: done ? 0 : 1,
        transition: "opacity 0.5s ease",
      }}>

        {/* Logo 各部分弹入 */}
        <div style={{ position: "relative", width: 176, height: 131 }}>

          {/* 绿色两个同时 */}
          <div style={{ position: "absolute", inset: 0, ...f(phase >= 1) }}>
            <svg width="176" height="131" viewBox="0 0 161 120" fill="none">
              <g filter="url(#f0l)">
                <path d="M105.462 9.74891C108.671 8.6346 112.022 11.018 112.022 14.4155V48.8392C112.022 49.3969 111.56 49.844 111.003 49.8266L10.6908 46.6965C8.49941 46.6281 8.03318 43.5739 10.1044 42.8549L105.462 9.74891Z" fill="#559A6E"/>
              </g>
              <g filter="url(#f1l)">
                <path d="M122.07 94.3395C118.873 95.3979 115.577 93.0175 115.577 89.65V55.7674C115.577 54.9983 116.417 54.5242 117.076 54.9216L151.83 75.8991C155.442 78.0793 154.835 83.4917 150.83 84.8177L122.07 94.3395Z" fill="#559A6E"/>
              </g>
              <defs>
                <filter id="f0l" x="7" y="8" width="106" height="44" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                  <feTurbulence type="fractalNoise" baseFrequency="0.747" numOctaves={3} seed={1501}/>
                  <feDisplacementMap in="shape" scale={2.677} xChannelSelector="R" yChannelSelector="G" result="d" width="100%" height="100%"/>
                  <feMerge><feMergeNode in="d"/></feMerge>
                </filter>
                <filter id="f1l" x="114" y="53" width="42" height="43" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                  <feTurbulence type="fractalNoise" baseFrequency="0.747" numOctaves={3} seed={1501}/>
                  <feDisplacementMap in="shape" scale={2.677} xChannelSelector="R" yChannelSelector="G" result="d" width="100%" height="100%"/>
                  <feMerge><feMergeNode in="d"/></feMerge>
                </filter>
              </defs>
            </svg>
          </div>

          {/* 粉色 */}
          <div style={{ position: "absolute", inset: 0, ...f(phase >= 2) }}>
            <svg width="176" height="131" viewBox="0 0 161 120" fill="none">
              <path d="M115.445 14.3013C115.445 10.3416 119.87 7.99128 123.151 10.2087L154.321 31.2769C155.68 32.1956 156.494 33.729 156.494 35.3695V65.1235C156.494 68.9462 152.339 71.3202 149.046 69.379L115.931 49.8575C115.63 49.6798 115.445 49.3561 115.445 49.0064V14.3013Z" fill="#DB7790"/>
            </svg>
          </div>

          {/* 蓝色主体 */}
          <div style={{ position: "absolute", inset: 0, ...f(phase >= 3) }}>
            <svg width="176" height="131" viewBox="0 0 161 120" fill="none">
              <path d="M12.6436 49.7798L111.069 53.1499C111.601 53.1681 112.023 53.6049 112.023 54.1372V89.3345C112.023 92.1392 109.691 94.3808 106.889 94.27L87.7695 93.5142V65.3736L70.9766 67.7984V92.8501L12.2793 90.5318C9.6292 90.427 7.5344 88.2483 7.53418 85.5962V54.7163C7.53418 51.9219 9.85072 49.6842 12.6436 49.7798Z" fill="#5D89E0"/>
            </svg>
          </div>
        </div>

        {/* Beyond Housing 文字 */}
        <div style={{ marginTop: 12, ...f(phase >= 4) }}>
          <span style={{ fontFamily: LONDRINA, fontSize: 36, color: "#5D89E0" }}>
            Beyond Housing
          </span>
        </div>

        {/* 进度条 + 消息 */}
        <div style={{ marginTop: 48, width: 260, ...f(phase >= 1) }}>
          {/* 消息 */}
          <p style={{
            margin: "0 0 12px", textAlign: "center",
            fontSize: 14, fontFamily: DM_SANS, color: C.muted,
            fontWeight: 500, letterSpacing: "0.02em",
            minHeight: 20,
          }}>
            {MESSAGES[msgIdx]}
          </p>
          {/* 进度条 */}
          <div style={{ width: "100%", height: 4, backgroundColor: "#E8E0D0", borderRadius: 99 }}>
            <div style={{
              height: "100%", borderRadius: 99,
              backgroundColor: C.blue,
              width: `${progress}%`,
              transition: "width 0.08s linear",
            }} />
          </div>
        </div>

      </div>
    </div>
  );
}

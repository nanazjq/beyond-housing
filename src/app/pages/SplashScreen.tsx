import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const BG = "#FEF9EF";
const LONDRINA = "'Londrina Solid', cursive";

export default function SplashScreen() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 900);
    const t3 = setTimeout(() => setPhase(3), 1350);
    const t4 = setTimeout(() => setPhase(4), 1750);

    // 判断是否回访用户
    const isReturning = localStorage.getItem("bh_onboarded") === "true";
    const t5 = setTimeout(() => {
      if (isReturning) {
        navigate("/kitchen"); // 回访用户：直接进 Kitchen
      } else {
        navigate("/intro");   // 新用户：走完整流程
      }
    }, 3200);

    return () => [t1, t2, t3, t4, t5].forEach(clearTimeout);
  }, [navigate]);

  const f = (show: boolean): React.CSSProperties => ({
    opacity: show ? 1 : 0,
    transition: "opacity 0.65s cubic-bezier(0.4, 0, 0.2, 1)",
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
      }}>

        {/* Logo SVG — 原始文件，分层淡入 */}
        <div style={{ position: "relative", width: 220, height: 164 }}>

          {/* 绿色大三角（屋顶）+ 绿色小三角（右下）同时淡入 */}
          <div style={{ position: "absolute", inset: 0, ...f(phase >= 1) }}>
            <svg width="220" height="164" viewBox="0 0 161 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0)">
                <g filter="url(#filter0)">
                  <path d="M105.462 9.74891C108.671 8.6346 112.022 11.018 112.022 14.4155V48.8392C112.022 49.3969 111.56 49.844 111.003 49.8266L10.6908 46.6965C8.49941 46.6281 8.03318 43.5739 10.1044 42.8549L105.462 9.74891Z" fill="#559A6E"/>
                </g>
                <g filter="url(#filter1)">
                  <path d="M122.07 94.3395C118.873 95.3979 115.577 93.0175 115.577 89.65V55.7674C115.577 54.9983 116.417 54.5242 117.076 54.9216L151.83 75.8991C155.442 78.0793 154.835 83.4917 150.83 84.8177L122.07 94.3395Z" fill="#559A6E"/>
                </g>
              </g>
              <defs>
                <filter id="filter0" x="7.43626" y="8.13303" width="105.924" height="43.0328" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                  <feTurbulence type="fractalNoise" baseFrequency="0.747" numOctaves={3} seed={1501}/>
                  <feDisplacementMap in="shape" scale={2.677} xChannelSelector="R" yChannelSelector="G" result="displacedImage" width="100%" height="100%"/>
                  <feMerge><feMergeNode in="displacedImage"/></feMerge>
                </filter>
                <filter id="filter1" x="114.239" y="53.4392" width="41.3184" height="42.493" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                  <feTurbulence type="fractalNoise" baseFrequency="0.747" numOctaves={3} seed={1501}/>
                  <feDisplacementMap in="shape" scale={2.677} xChannelSelector="R" yChannelSelector="G" result="displacedImage" width="100%" height="100%"/>
                  <feMerge><feMergeNode in="displacedImage"/></feMerge>
                </filter>
                <clipPath id="clip0"><rect width="161" height="120" fill="white"/></clipPath>
              </defs>
            </svg>
          </div>

          {/* 粉色平行四边形 */}
          <div style={{ position: "absolute", inset: 0, ...f(phase >= 2) }}>
            <svg width="220" height="164" viewBox="0 0 161 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M115.445 14.3013C115.445 10.3416 119.87 7.99128 123.151 10.2087L154.321 31.2769C155.68 32.1956 156.494 33.729 156.494 35.3695V65.1235C156.494 68.9462 152.339 71.3202 149.046 69.379L115.931 49.8575C115.63 49.6798 115.445 49.3561 115.445 49.0064V14.3013Z" fill="#DB7790"/>
            </svg>
          </div>

          {/* 蓝色主体 */}
          <div style={{ position: "absolute", inset: 0, ...f(phase >= 3) }}>
            <svg width="220" height="164" viewBox="0 0 161 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.6436 49.7798L111.069 53.1499C111.601 53.1681 112.023 53.6049 112.023 54.1372V89.3345C112.023 92.1392 109.691 94.3808 106.889 94.27L87.7695 93.5142V65.3736L70.9766 67.7984V92.8501L12.2793 90.5318C9.6292 90.427 7.5344 88.2483 7.53418 85.5962V54.7163C7.53418 51.9219 9.85072 49.6842 12.6436 49.7798Z" fill="#5D89E0"/>
            </svg>
          </div>
        </div>

        {/* Beyond Housing 文字 */}
        <div style={{ marginTop: 12, ...f(phase >= 4) }}>
          <span style={{
            fontFamily: LONDRINA,
            fontSize: 38,
            color: "#5D89E0",
            letterSpacing: "0.02em",
          }}>
            Beyond Housing
          </span>
        </div>

      </div>
    </div>
  );
}

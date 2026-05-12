import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { C, LONDRINA, DM_SANS, PageWrapper } from "../../components/kitchen/Shared";

export default function EditProfile() {
  const navigate = useNavigate();
  const [name, setName]   = useState("Jingqi");
  const [origin, setOrigin] = useState("China");
  const [room, setRoom]   = useState("301");
  const [bio, setBio]     = useState("I love photography, yoga and exploring new cultures 🌍");

  function handleSave() {
    // In a real app, save to state/context. Here we just navigate back.
    navigate("/profile");
  }

  return (
    <PageWrapper bg="#F3F0FB">
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 120, scrollbarWidth: "none" } as React.CSSProperties}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "52px 24px 16px" }}>
          <button onClick={() => navigate(-1)} style={{
            width: 42, height: 42, borderRadius: 10,
            backgroundColor: "white", border: "none",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "3px 3px 0px rgba(0,0,0,0.10)",
            cursor: "pointer", flexShrink: 0,
          }}>
            <svg width="20" height="20" viewBox="0 0 20 20">
              <path d="M13 3.5L5.5 10L13 16.5L11 10Z" fill={C.text}/>
            </svg>
          </button>
          <h2 style={{ margin: 0, fontSize: 26, fontFamily: LONDRINA, color: C.strong }}>Edit Profile</h2>
        </div>

        {/* Avatar */}
        <div style={{ display: "flex", justifyContent: "center", padding: "28px 0 24px", position: "relative" }}>
          <div style={{ position: "relative", display: "inline-block" }}>
            <div style={{
              width: 96, height: 96, borderRadius: "50%",
              backgroundColor: C.orange,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 40, fontFamily: LONDRINA, color: "white",
              boxShadow: `0 6px 20px ${C.orange}40`
            }}>J</div>
            {/* Edit circle */}
            <div style={{
              position: "absolute", bottom: 2, right: 2,
              width: 30, height: 30, borderRadius: "50%",
              backgroundColor: C.purple,
              display: "flex", alignItems: "center", justifyContent: "center",
              border: `2.5px solid ${C.bg}`, cursor: "pointer",
              boxShadow: "3px 3px 0px rgba(0,0,0,0.10)"
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M15.8911 3.04825C17.2885 1.65064 19.5543 1.65058 20.9519 3.0481C22.3493 4.4455 22.3493 6.71112 20.952 8.10861L20.0602 9.00057L14.9995 3.93991L15.8911 3.04825ZM13.9389 5.00064L3.94103 14.9997C3.5347 15.4061 3.2491 15.9172 3.116 16.4762L2.02041 21.0777C1.96009 21.3311 2.03552 21.5976 2.21968 21.7817C2.40385 21.9659 2.67037 22.0413 2.92373 21.981L7.52498 20.8855C8.08418 20.7523 8.59546 20.4666 9.00191 20.0601L18.9996 10.0613L13.9389 5.00064Z" fill="white"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Form */}
        <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 14 }}>

          {/* Display Name */}
          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: C.muted, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: DM_SANS, display: "block", marginBottom: 6 }}>Display Name</label>
            <div style={{ position: "relative" }}>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                style={{
                  width: "100%", padding: "14px 44px 14px 16px",
                  borderRadius: 16, border: `1.5px solid ${C.divider}`,
                  backgroundColor: C.card, fontSize: 16,
                  fontFamily: DM_SANS, color: C.strong,
                  outline: "none", boxSizing: "border-box"
                }}
              />
              <div style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M15.8911 3.04825C17.2885 1.65064 19.5543 1.65058 20.9519 3.0481C22.3493 4.4455 22.3493 6.71112 20.952 8.10861L20.0602 9.00057L14.9995 3.93991L15.8911 3.04825ZM13.9389 5.00064L3.94103 14.9997C3.5347 15.4061 3.2491 15.9172 3.116 16.4762L2.02041 21.0777C1.96009 21.3311 2.03552 21.5976 2.21968 21.7817C2.40385 21.9659 2.67037 22.0413 2.92373 21.981L7.52498 20.8855C8.08418 20.7523 8.59546 20.4666 9.00191 20.0601L18.9996 10.0613L13.9389 5.00064Z" fill={C.muted}/>
                </svg>
              </div>
            </div>
          </div>

          {/* Origin */}
          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: C.muted, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: DM_SANS, display: "block", marginBottom: 6 }}>Origin</label>
            <div style={{ position: "relative" }}>
              <input
                value={origin}
                onChange={e => setOrigin(e.target.value)}
                style={{
                  width: "100%", padding: "14px 44px 14px 16px",
                  borderRadius: 16, border: `1.5px solid ${C.divider}`,
                  backgroundColor: C.card, fontSize: 16,
                  fontFamily: DM_SANS, color: C.strong,
                  outline: "none", boxSizing: "border-box"
                }}
              />
              <div style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M15.8911 3.04825C17.2885 1.65064 19.5543 1.65058 20.9519 3.0481C22.3493 4.4455 22.3493 6.71112 20.952 8.10861L20.0602 9.00057L14.9995 3.93991L15.8911 3.04825ZM13.9389 5.00064L3.94103 14.9997C3.5347 15.4061 3.2491 15.9172 3.116 16.4762L2.02041 21.0777C1.96009 21.3311 2.03552 21.5976 2.21968 21.7817C2.40385 21.9659 2.67037 22.0413 2.92373 21.981L7.52498 20.8855C8.08418 20.7523 8.59546 20.4666 9.00191 20.0601L18.9996 10.0613L13.9389 5.00064Z" fill={C.muted}/>
                </svg>
              </div>
            </div>
          </div>

          {/* Room */}
          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: C.muted, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: DM_SANS, display: "block", marginBottom: 6 }}>Room</label>
            <div style={{ position: "relative" }}>
              <input
                value={room}
                onChange={e => setRoom(e.target.value)}
                style={{
                  width: "100%", padding: "14px 44px 14px 16px",
                  borderRadius: 16, border: `1.5px solid ${C.divider}`,
                  backgroundColor: C.card, fontSize: 16,
                  fontFamily: DM_SANS, color: C.strong,
                  outline: "none", boxSizing: "border-box"
                }}
              />
              <div style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M15.8911 3.04825C17.2885 1.65064 19.5543 1.65058 20.9519 3.0481C22.3493 4.4455 22.3493 6.71112 20.952 8.10861L20.0602 9.00057L14.9995 3.93991L15.8911 3.04825ZM13.9389 5.00064L3.94103 14.9997C3.5347 15.4061 3.2491 15.9172 3.116 16.4762L2.02041 21.0777C1.96009 21.3311 2.03552 21.5976 2.21968 21.7817C2.40385 21.9659 2.67037 22.0413 2.92373 21.981L7.52498 20.8855C8.08418 20.7523 8.59546 20.4666 9.00191 20.0601L18.9996 10.0613L13.9389 5.00064Z" fill={C.muted}/>
                </svg>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: C.muted, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: DM_SANS, display: "block", marginBottom: 6 }}>Bio</label>
            <div style={{ position: "relative" }}>
              <textarea
                value={bio}
                onChange={e => setBio(e.target.value)}
                rows={3}
                style={{
                  width: "100%", padding: "14px 44px 14px 16px",
                  borderRadius: 16, border: `1.5px solid ${C.divider}`,
                  backgroundColor: C.card, fontSize: 16,
                  fontFamily: DM_SANS, color: C.strong,
                  outline: "none", resize: "none",
                  boxSizing: "border-box", lineHeight: 1.5
                }}
              />
              <div style={{ position: "absolute", right: 14, top: 16 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M15.8911 3.04825C17.2885 1.65064 19.5543 1.65058 20.9519 3.0481C22.3493 4.4455 22.3493 6.71112 20.952 8.10861L20.0602 9.00057L14.9995 3.93991L15.8911 3.04825ZM13.9389 5.00064L3.94103 14.9997C3.5347 15.4061 3.2491 15.9172 3.116 16.4762L2.02041 21.0777C1.96009 21.3311 2.03552 21.5976 2.21968 21.7817C2.40385 21.9659 2.67037 22.0413 2.92373 21.981L7.52498 20.8855C8.08418 20.7523 8.59546 20.4666 9.00191 20.0601L18.9996 10.0613L13.9389 5.00064Z" fill={C.muted}/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save button - fixed bottom */}
      <div style={{ padding: "16px 20px 36px", backgroundColor: "#F3F0FB", borderTop: `1px solid ${C.divider}`, flexShrink: 0 }}>
        <button
          onClick={handleSave}
          style={{
            width: "100%", border: "none",
            backgroundColor: C.purple, color: "white",
            borderRadius: 16, padding: "15px 0",
            fontSize: 17, fontFamily: LONDRINA,
            fontWeight: 400, cursor: "pointer",
            letterSpacing: "0.02em",
            boxShadow: `0 5px 0 ${C.purpleDark}`,
            transition: "transform 0.1s, box-shadow 0.1s"
          }}
          onPointerDown={e => {
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(4px)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 1px 0 ${C.purpleDark}`;
          }}
          onPointerUp={e => {
            (e.currentTarget as HTMLButtonElement).style.transform = "";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 5px 0 ${C.purpleDark}`;
          }}
          onPointerLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.transform = "";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 5px 0 ${C.purpleDark}`;
          }}
        >
          Save Changes
        </button>
      </div>
    </PageWrapper>
  );
}

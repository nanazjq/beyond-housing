import React from "react";
import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router";
import { C, LONDRINA, DM_SANS, PageWrapper, BackHeader, GeometricAvatar, BottomNav } from "../../components/kitchen/Shared";

/* ─── Chat data ──────────────────────────────────────────── */
type ChatMsg = { id: number; from: string; text: string; time: string; initial?: string; color?: string };
type ChatDef = { name: string; subtitle: string; initial?: string; color?: string; isGroup?: boolean; activityLabel: string; activityColor: string; messages: ChatMsg[] };

const CHAT_DATA: Record<string, ChatDef> = {
  "1": {
    name: "Marcus", subtitle: "Photography Walk buddy",
    initial: "M", color: C.pink,
    activityLabel: "Photography Walk · Sun 14:00", activityColor: C.blue,
    messages: [
      { id: 1, from: "Marcus",  initial: "M", color: C.pink,   text: "Hey! Are you joining the photography walk on Sunday?",              time: "13:45" },
      { id: 2, from: "me",      text: "Yes! So excited — first time exploring Gamla Stan properly",                                          time: "13:47" },
      { id: 3, from: "Marcus",  initial: "M", color: C.pink,   text: "Amazing! I'll bring my DSLR. What gear do you shoot with?",          time: "13:50" },
      { id: 4, from: "me",      text: "Just my phone 😄 but I really want to learn from everyone!",                                          time: "14:15" },
      { id: 5, from: "Marcus",  initial: "M", color: C.pink,   text: "Phone photos in golden hour at Gamla Stan are honestly incredible",   time: "14:28" },
      { id: 6, from: "Marcus",  initial: "M", color: C.pink,   text: "See you at Gamla Stan! 📷",                                           time: "14:30" },
    ],
  },
  "2": {
    name: "Photography Walk Group", subtitle: "6 members",
    isGroup: true, activityLabel: "Photography Walk · Sun 14:00", activityColor: C.blue,
    messages: [
      { id: 1, from: "system",  text: "Photography Walk Group was created",                                                                  time: "12:00" },
      { id: 2, from: "Lena",    initial: "L", color: C.green,  text: "Hey everyone! Weather looks amazing for Sunday 🌤",                   time: "12:00" },
      { id: 3, from: "Marcus",  initial: "M", color: C.pink,   text: "Yes! Let's meet at Gamla Stan Tunnelbana exit",                        time: "12:15" },
      { id: 4, from: "Yuki",    initial: "Y", color: C.orange, text: "What time exactly? The event says 14:00 but there's a walk to the starting point…", time: "12:45" },
      { id: 5, from: "Marcus",  initial: "M", color: C.pink,   text: "Let's aim for 13:45 so we can walk there together",                   time: "13:00" },
      { id: 6, from: "me",      text: "Let's meet at the metro exit! 📷",                                                                    time: "13:00" },
    ],
  },
  "3": {
    name: "Sarah K.", subtitle: "Yoga in the Park buddy",
    initial: "S", color: C.blue,
    activityLabel: "Yoga in the Park · Sat 10:00", activityColor: C.green,
    messages: [
      { id: 1, from: "Sarah",  initial: "S", color: C.blue,   text: "Hi! Are you going to the yoga session this Saturday?",               time: "08:30" },
      { id: 2, from: "me",     text: "Yes, looking forward to it! First time trying outdoor yoga",                                           time: "08:45" },
      { id: 3, from: "Sarah",  initial: "S", color: C.blue,   text: "You'll love it! Hagaparken is so peaceful in the morning 🌿",         time: "08:50" },
      { id: 4, from: "me",     text: "Do I need to book separately or just show up?",                                                        time: "09:00" },
      { id: 5, from: "Sarah",  initial: "S", color: C.blue,   text: "Just show up! The instructor is super welcoming to beginners",         time: "09:10" },
      { id: 6, from: "Sarah",  initial: "S", color: C.blue,   text: "Should we bring yoga mats?",                                          time: "09:15" },
    ],
  },
  "4": {
    name: "Lena", subtitle: "Floor 2 · Room 214",
    initial: "L", color: C.green,
    activityLabel: "Yoga in the Park · Sat 10:00", activityColor: C.green,
    messages: [
      { id: 1, from: "Lena",   initial: "L", color: C.green,  text: "That yoga class was SO good this morning 🧘",                        time: "11:30" },
      { id: 2, from: "me",     text: "Right?! I didn't expect it to be that intense haha",                                                   time: "11:32" },
      { id: 3, from: "Lena",   initial: "L", color: C.green,  text: "My legs are still shaking 😂 totally worth it though",               time: "11:35" },
      { id: 4, from: "me",     text: "We should go again next week!",                                                                        time: "11:38" },
      { id: 5, from: "Lena",   initial: "L", color: C.green,  text: "100%! I heard there's also a meditation session on Thursdays",         time: "11:40" },
      { id: 6, from: "Lena",   initial: "L", color: C.green,  text: "Haha yeah the yoga was so good 😄",                                   time: "Yesterday" },
    ],
  },
  "5": {
    name: "Floor 3 Residents", subtitle: "12 members",
    isGroup: true, activityLabel: "Floor 3 · Common Lounge", activityColor: C.purple,
    messages: [
      { id: 1, from: "system",  text: "Floor 3 Residents group was created",                                                                time: "09:00" },
      { id: 2, from: "Tom",     initial: "T", color: C.orange, text: "Hey neighbors! Quick question — is the common room booked this evening?", time: "16:20" },
      { id: 3, from: "Aiko",    initial: "A", color: C.blue,   text: "I don't think so! I checked the booking app and it's free",           time: "16:25" },
      { id: 4, from: "Nina",    initial: "N", color: C.pink,   text: "We're having a small movie night at 20:00 if anyone wants to join 🎬", time: "16:30" },
      { id: 5, from: "me",      text: "Sounds fun! What are you watching?",                                                                  time: "16:45" },
      { id: 6, from: "Nina",    initial: "N", color: C.pink,   text: "Anyone know where the extra chairs are?",                             time: "Yesterday" },
    ],
  },
  "6": {
    name: "Tom", subtitle: "Floor 3 · Room 308",
    initial: "T", color: C.orange,
    activityLabel: "Building Notice · Elevator A", activityColor: C.blue,
    messages: [
      { id: 1, from: "Tom",    initial: "T", color: C.orange,  text: "Did you see the notice about Elevator A being out next week?",        time: "Mon 10:00" },
      { id: 2, from: "me",     text: "Yeah just got the notification. A bit annoying with all my stuff on Floor 3 😅",                       time: "Mon 10:05" },
      { id: 3, from: "Tom",    initial: "T", color: C.orange,  text: "Haha yeah. Elevator B is pretty slow but at least it works",          time: "Mon 10:08" },
      { id: 4, from: "me",     text: "True. Good that they warned us in advance at least!",                                                  time: "Mon 10:10" },
      { id: 5, from: "Tom",    initial: "T", color: C.orange,  text: "Thanks for the heads up about the elevator!",                         time: "Mon" },
    ],
  },
  "7": {
    name: "Aiko", subtitle: "Floor 2 · Room 205",
    initial: "A", color: C.blue,
    activityLabel: "Winter Mixer Party · Dec 20", activityColor: C.orange,
    messages: [
      { id: 1, from: "Aiko",   initial: "A", color: C.blue,   text: "Hey! Have you heard about the Winter Mixer Party next week?",         time: "Mon 14:00" },
      { id: 2, from: "me",     text: "Yes! I'm on the waitlist actually 😬",                                                                time: "Mon 14:05" },
      { id: 3, from: "Aiko",   initial: "A", color: C.blue,   text: "Oh no! Fingers crossed a spot opens up, it looks so fun",             time: "Mon 14:08" },
      { id: 4, from: "me",     text: "I know right. Did you get a spot?",                                                                   time: "Mon 14:10" },
      { id: 5, from: "Aiko",   initial: "A", color: C.blue,   text: "Yes! Got mine last week. Hope you make it in!",                       time: "Mon 14:12" },
      { id: 6, from: "Aiko",   initial: "A", color: C.blue,   text: "Are you going to the Winter Mixer? 🎉",                               time: "Mon" },
    ],
  },
  "8": {
    name: "Winter Mixer Group", subtitle: "24 members",
    isGroup: true, activityLabel: "Winter Mixer Party · Dec 20 18:00", activityColor: C.orange,
    messages: [
      { id: 1, from: "system",  text: "Winter Mixer Group was created by the organiser",                                                    time: "Sun 10:00" },
      { id: 2, from: "Organiser", initial: "O", color: C.orange, text: "Welcome everyone! 🎉 Super excited to host the Winter Mixer",      time: "Sun 10:01" },
      { id: 3, from: "Organiser", initial: "O", color: C.orange, text: "Venue: Common Hall · Dress code: festive but casual · BYO snacks!", time: "Sun 10:02" },
      { id: 4, from: "Marcus",  initial: "M", color: C.pink,   text: "Can't wait! Should we bring something to share?",                     time: "Sun 11:00" },
      { id: 5, from: "Lena",    initial: "L", color: C.green,  text: "I'll bring some Swedish glögg 🍷",                                   time: "Sun 11:15" },
      { id: 6, from: "Organiser", initial: "O", color: C.orange, text: "Confirmed: 18:00 at Common Hall. See you all!",                    time: "Sun" },
    ],
  },
  "9": {
    name: "Nina", subtitle: "Floor 3 · Room 312",
    initial: "N", color: C.pink,
    activityLabel: "Swedish Language Café · Dec 19", activityColor: C.purple,
    messages: [
      { id: 1, from: "Nina",   initial: "N", color: C.pink,   text: "That fika yesterday was honestly the best afternoon I've had here",   time: "Sun 13:00" },
      { id: 2, from: "me",     text: "Same!! The cinnamon buns were insane 🥐",                                                             time: "Sun 13:05" },
      { id: 3, from: "Nina",   initial: "N", color: C.pink,   text: "And I actually learned some Swedish! 'Fika' officially means 'pause and enjoy life' to me now", time: "Sun 13:10" },
      { id: 4, from: "me",     text: "Haha yes! Are you going to the language café next week?",                                             time: "Sun 13:12" },
      { id: 5, from: "Nina",   initial: "N", color: C.pink,   text: "Definitely! Want to go together?",                                    time: "Sun 13:15" },
      { id: 6, from: "Nina",   initial: "N", color: C.pink,   text: "The Swedish fika yesterday was amazing ☕",                           time: "Sun" },
    ],
  },
};

/* ─── Icons ──────────────────────────────────────────────── */
function SendIcon() {
  return <svg width="17" height="17" viewBox="0 0 17 17" fill="white"><path d="M1.5 1.5L16 8.5L1.5 15.5V10.5L11 8.5L1.5 6.5Z"/></svg>;
}
function GroupChatIcon({ color, size = 36 }: { color: string; size?: number }) {
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", backgroundColor: color, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 20 20" fill="white">
        <circle cx="6" cy="7" r="3"/>
        <path d="M0 17C0 13.5 2.5 12 6 12C9.5 12 12 13.5 12 17H0Z"/>
        <circle cx="14" cy="8" r="2.5" opacity="0.7"/>
        <path d="M9 17C9 14.5 10.5 13 14 13C17.5 13 20 14.5 20 17H9Z" opacity="0.7"/>
      </svg>
    </div>
  );
}

/* ─── Bubble ─────────────────────────────────────────────── */
function Bubble({ msg, isGroup }: { msg: ChatMsg; isGroup?: boolean }) {
  const isMe     = msg.from === "me";
  const isSystem = msg.from === "system";

  if (isSystem) {
    return (
      <div style={{ textAlign: "center", margin: "8px 0" }}>
        <span style={{ fontSize: 13, color: C.muted, fontFamily: DM_SANS, backgroundColor: "#F2ECE2", borderRadius: 99, padding: "3px 12px" }}>{msg.text}</span>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: isMe ? "row-reverse" : "row", gap: 8, alignItems: "flex-end", marginBottom: 12 }}>
      {!isMe && (
        isGroup && msg.initial
          ? <GeometricAvatar initial={msg.initial} color={msg.color ?? C.muted} shape="circle" size={30} />
          : <div style={{ width: 30 }} />
      )}
      <div style={{ maxWidth: "72%" }}>
        {!isMe && isGroup && msg.initial && (
          <p style={{ margin: "0 0 3px 2px", fontSize: 12, color: msg.color ?? C.muted, fontFamily: DM_SANS, fontWeight: 700 }}>{msg.from}</p>
        )}
        <div style={{
          backgroundColor: isMe ? C.pink : C.card,
          borderRadius: isMe ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
          padding: "10px 14px",
          boxShadow: "3px 3px 0px rgba(0,0,0,0.10)",
        }}>
          <p style={{ margin: 0, fontSize: 16, color: isMe ? "white" : C.text, fontFamily: DM_SANS, lineHeight: 1.5 }}>{msg.text}</p>
        </div>
        <p style={{ margin: "3px 4px 0", fontSize: 12, color: C.muted, fontFamily: DM_SANS, textAlign: isMe ? "right" : "left" }}>{msg.time}</p>
      </div>
    </div>
  );
}

/* ─── Chat Window Page ───────────────────────────────────── */
export default function ChatWindow() {
  const { id } = useParams();
  const chat = CHAT_DATA[id ?? "1"] ?? CHAT_DATA["1"];

  const [messages, setMessages] = useState<ChatMsg[]>(chat.messages);
  const [input,    setInput]    = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    setMessages(m => [...m, { id: Date.now(), from: "me", text: input.trim(), time: new Date().toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" }) }]);
    setInput("");
  };

  return (
    <PageWrapper bg="#FCF2F5">
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* ── Header ── */}
        <div style={{ padding: "52px 24px 12px", display: "flex", alignItems: "center", gap: 14, flexShrink: 0 }}>
          <button onClick={() => history.back()} style={{ width: 42, height: 42, borderRadius: 10, backgroundColor: "white", border: "none", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "3px 3px 0px rgba(0,0,0,0.10)", cursor: "pointer", flexShrink: 0 }}>
            <svg width="20" height="20" viewBox="0 0 20 20"><path d="M13 3.5L5.5 10L13 16.5L11 10Z" fill={C.text}/></svg>
          </button>
          {chat.isGroup
            ? <GroupChatIcon color={chat.activityColor} size={44} />
            : <GeometricAvatar initial={chat.initial!} color={chat.color!} shape="circle" size={44} />}
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontSize: 17, fontFamily: LONDRINA, color: C.strong }}>{chat.name}</p>
            <p style={{ margin: "1px 0 0", fontSize: 14, color: C.muted, fontFamily: DM_SANS }}>{chat.subtitle}</p>
          </div>
        </div>

        {/* ── Activity context chip ── */}
        <div style={{ padding: "0 24px 10px", flexShrink: 0 }}>
          <div style={{ backgroundColor: `${chat.activityColor}12`, border: `1.5px solid ${chat.activityColor}25`, borderRadius: 10, padding: "8px 14px", display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: chat.activityColor, flexShrink: 0 }} />
            <span style={{ fontSize: 14, color: chat.activityColor, fontFamily: DM_SANS, fontWeight: 700 }}>{chat.activityLabel}</span>
          </div>
        </div>

        {/* ── Message list ── */}
        <div style={{ flex: 1, overflowY: "auto", padding: "8px 24px 12px", scrollbarWidth: "none" } as React.CSSProperties}>
          {messages.map(m => <Bubble key={m.id} msg={m} isGroup={chat.isGroup} />)}
          <div ref={bottomRef} />
        </div>

        {/* ── Input bar ── */}
        <div style={{ padding: "10px 24px", paddingBottom: "calc(12px + env(safe-area-inset-bottom, 0px))", flexShrink: 0, backgroundColor: "#FCF2F5" }}>
          <div style={{ backgroundColor: C.card,
            border: "1px solid rgba(0,0,0,0.06)", borderRadius: 22, padding: "10px 10px 10px 16px", display: "flex", gap: 10, alignItems: "center", boxShadow: "3px 3px 0px rgba(0,0,0,0.10)" }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") send(); }}
              placeholder="Write a message…"
              style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontSize: 16, fontFamily: DM_SANS, color: C.strong }}
            />
            <button onClick={send} style={{ width: 40, height: 40, borderRadius: 10, border: "none", backgroundColor: input.trim() ? C.pink : "#E8E4DC", display: "flex", alignItems: "center", justifyContent: "center", cursor: input.trim() ? "pointer" : "not-allowed", flexShrink: 0, transition: "background 0.2s" }}>
              <SendIcon />
            </button>
          </div>
        </div>
      </div>
      <BottomNav active={3} />
    </PageWrapper>
  );
}

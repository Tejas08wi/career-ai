"use client";
import { useState, useEffect, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,400&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap');

  :root {
    --bg: #f5f3ee;
    --surface: #ffffff;
    --surface2: #f9f8f5;
    --border: rgba(0,0,0,0.07);
    --border2: rgba(0,0,0,0.11);
    --accent: #5b47e0;
    --accent-light: #ede9ff;
    --accent2: #e05b8d;
    --accent3: #1aaa72;
    --text: #1c1a2e;
    --text2: #4a4760;
    --muted: #9896ad;
    --user-bg: #5b47e0;
    --shadow-sm: 0 1px 4px rgba(0,0,0,0.06), 0 2px 12px rgba(0,0,0,0.04);
    --shadow-md: 0 4px 20px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.05);
    --shadow-accent: 0 4px 20px rgba(91,71,224,0.28);
    --header-bg: rgba(245,243,238,0.88);
    --bottom-bg: rgba(245,243,238,0.92);
  }

  .dark {
    --bg: #0e0c15;
    --surface: #16132a;
    --surface2: #1b1830;
    --border: rgba(255,255,255,0.05);
    --border2: rgba(255,255,255,0.09);
    --accent: #7c6af7;
    --accent-light: rgba(124,106,247,0.12);
    --accent2: #f76af7;
    --accent3: #6af7c8;
    --text: #e8e6f5;
    --text2: #9e9bbf;
    --muted: #5a587a;
    --user-bg: #7c6af7;
    --shadow-sm: 0 1px 4px rgba(0,0,0,0.3), 0 2px 12px rgba(0,0,0,0.2);
    --shadow-md: 0 4px 20px rgba(0,0,0,0.4), 0 1px 4px rgba(0,0,0,0.3);
    --shadow-accent: 0 4px 20px rgba(124,106,247,0.35);
    --header-bg: rgba(14,12,21,0.88);
    --bottom-bg: rgba(14,12,21,0.92);
  }

  /* Theme toggle */
  .theme-btn {
    width: 38px; height: 38px;
    border-radius: 11px;
    border: 1.5px solid var(--border2);
    background: var(--surface);
    color: var(--text2);
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    font-size: 16px;
    box-shadow: var(--shadow-sm);
    transition: all 0.2s cubic-bezier(0.34,1.56,0.64,1);
    flex-shrink: 0;
  }
  .theme-btn:hover {
    transform: scale(1.1) rotate(12deg);
    border-color: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-light);
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: var(--bg);
    font-family: 'Plus Jakarta Sans', sans-serif;
    color: var(--text);
    overflow: hidden;
    -webkit-font-smoothing: antialiased;
  }

  .root {
    height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    background: var(--bg);
    color: var(--text);
    transition: background 0.3s ease, color 0.3s ease;
  }

  .bg-texture {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
  }

  .blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(100px);
    animation: floatblob 18s ease-in-out infinite alternate;
  }
  .blob1 { width: 600px; height: 600px; top: -200px; right: -100px; background: radial-gradient(circle, rgba(91,71,224,0.10), transparent 70%); animation-delay: 0s; }
  .blob2 { width: 500px; height: 500px; bottom: -150px; left: -100px; background: radial-gradient(circle, rgba(224,91,141,0.07), transparent 70%); animation-delay: -8s; }
  .blob3 { width: 350px; height: 350px; top: 45%; left: 35%; background: radial-gradient(circle, rgba(26,170,114,0.06), transparent 70%); animation-delay: -14s; }

  .dark .blob1 { background: radial-gradient(circle, rgba(124,106,247,0.18), transparent 70%); }
  .dark .blob2 { background: radial-gradient(circle, rgba(247,106,247,0.12), transparent 70%); }
  .dark .blob3 { background: radial-gradient(circle, rgba(106,247,200,0.09), transparent 70%); }

  .dark .dot-pattern {
    background-image: radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px);
  }

  @keyframes floatblob {
    0% { transform: translate(0,0) scale(1); }
    100% { transform: translate(22px,25px) scale(1.05); }
  }

  .dot-pattern {
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background-image: radial-gradient(circle, rgba(0,0,0,0.05) 1px, transparent 1px);
    background-size: 26px 26px;
  }

  /* Header */
  .header {
    position: relative;
    z-index: 10;
    padding: 16px 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--header-bg);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border2);
  }

  .logo-group { display: flex; align-items: center; gap: 13px; }

  .logo-mark {
    width: 42px; height: 42px;
    border-radius: 13px;
    background: var(--accent);
    display: flex; align-items: center; justify-content: center;
    font-size: 19px;
    box-shadow: var(--shadow-accent);
    flex-shrink: 0;
  }

  .logo-copy h1 {
    font-family: 'Playfair Display', serif;
    font-size: 20px;
    font-weight: 700;
    color: var(--text);
    letter-spacing: -0.3px;
    line-height: 1;
  }
  .logo-copy p {
    font-size: 11.5px;
    color: var(--muted);
    margin-top: 3px;
    font-style: italic;
  }

  .online-badge {
    display: flex;
    align-items: center;
    gap: 7px;
    background: #edfcf4;
    border: 1px solid #b8f0d3;
    border-radius: 999px;
    padding: 5px 14px;
    font-size: 12px;
    color: #1aaa72;
    font-weight: 600;
  }
  .pdot {
    width: 7px; height: 7px;
    background: #1aaa72;
    border-radius: 50%;
    animation: pdotpulse 2s ease-in-out infinite;
  }
  @keyframes pdotpulse {
    0%,100% { box-shadow: 0 0 0 0 rgba(26,170,114,0.5); }
    50% { box-shadow: 0 0 0 5px rgba(26,170,114,0); }
  }

  /* Chat */
  .chat-area {
    flex: 1;
    overflow-y: auto;
    padding: 30px 0;
    position: relative;
    z-index: 5;
    scrollbar-width: thin;
    scrollbar-color: rgba(91,71,224,0.14) transparent;
  }
  .chat-area::-webkit-scrollbar { width: 4px; }
  .chat-area::-webkit-scrollbar-thumb { background: rgba(91,71,224,0.14); border-radius: 4px; }

  .inner {
    max-width: 700px;
    margin: 0 auto;
    padding: 0 24px;
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Empty state */
  .empty-state { animation: fadeUp 0.5s ease both; }

  .welcome-head {
    font-family: 'Playfair Display', serif;
    font-size: 32px;
    font-weight: 700;
    color: var(--text);
    letter-spacing: -0.5px;
    line-height: 1.2;
    margin-bottom: 8px;
  }
  .welcome-head em { font-style: italic; color: var(--accent); }

  .welcome-sub {
    font-size: 14px;
    color: var(--text2);
    margin-bottom: 26px;
    line-height: 1.65;
  }

  .card-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .prompt-card {
    background: var(--surface);
    border: 1px solid var(--border2);
    border-radius: 16px;
    padding: 16px 18px;
    cursor: pointer;
    text-align: left;
    transition: all 0.22s cubic-bezier(0.34,1.56,0.64,1);
    box-shadow: var(--shadow-sm);
  }
  .prompt-card:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-md), 0 0 0 2px rgba(91,71,224,0.15);
    border-color: rgba(91,71,224,0.2);
  }
  .card-emoji { font-size: 20px; margin-bottom: 7px; }
  .card-title {
    font-family: 'Playfair Display', serif;
    font-size: 14px;
    font-weight: 600;
    color: var(--text);
  }
  .card-sub {
    font-size: 11.5px;
    color: var(--muted);
    margin-top: 3px;
    font-style: italic;
  }

  /* Messages */
  .msg-row {
    display: flex;
    animation: fadeUp 0.3s ease both;
  }
  .msg-row.user { justify-content: flex-end; }
  .msg-row.assistant { justify-content: flex-start; gap: 9px; align-items: flex-end; }

  .ai-avatar {
    width: 30px; height: 30px;
    border-radius: 10px;
    background: var(--accent);
    display: flex; align-items: center; justify-content: center;
    font-size: 14px;
    flex-shrink: 0;
    box-shadow: 0 2px 8px rgba(91,71,224,0.22);
    margin-bottom: 2px;
  }

  .bubble {
    max-width: 73%;
    border-radius: 20px;
    padding: 13px 17px;
    font-size: 14px;
    line-height: 1.72;
  }

  .msg-row.user .bubble {
    background: var(--user-bg);
    color: #fff;
    border-bottom-right-radius: 5px;
    box-shadow: var(--shadow-accent);
    font-weight: 500;
  }

  .msg-row.assistant .bubble {
    background: var(--surface);
    color: var(--text);
    border-bottom-left-radius: 5px;
    box-shadow: var(--shadow-sm);
    border: 1px solid var(--border2);
  }

  .bubble-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 7px;
    gap: 10px;
  }

  .btime {
    font-size: 10.5px;
    color: rgba(255,255,255,0.42);
    font-style: italic;
  }
  .msg-row.assistant .btime { color: var(--muted); }

  .copy-btn {
    background: rgba(91,71,224,0.07);
    border: none;
    font-size: 10.5px;
    color: var(--accent);
    cursor: pointer;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-weight: 600;
    padding: 3px 9px;
    border-radius: 6px;
    transition: background 0.15s;
  }
  .copy-btn:hover { background: rgba(91,71,224,0.13); }

  /* Typing */
  .typing-row {
    display: flex;
    gap: 9px;
    align-items: flex-end;
    animation: fadeUp 0.3s ease both;
  }
  .typing-bubble {
    background: var(--surface);
    border: 1px solid var(--border2);
    border-radius: 20px;
    border-bottom-left-radius: 5px;
    padding: 14px 18px;
    display: flex;
    gap: 5px;
    align-items: center;
    box-shadow: var(--shadow-sm);
  }
  .tdot {
    width: 7px; height: 7px;
    border-radius: 50%;
    animation: tdotbounce 1.3s ease-in-out infinite;
  }
  .tdot:nth-child(1) { background: var(--accent); animation-delay: 0s; }
  .tdot:nth-child(2) { background: var(--accent2); animation-delay: 0.16s; }
  .tdot:nth-child(3) { background: var(--accent3); animation-delay: 0.32s; }
  @keyframes tdotbounce {
    0%,80%,100% { transform: scale(0.7); opacity: 0.4; }
    40% { transform: scale(1.15); opacity: 1; }
  }

  /* Divider */
  .divider {
    display: flex; align-items: center; gap: 10px;
    font-size: 10.5px; color: var(--muted);
    font-style: italic; letter-spacing: 1px;
  }
  .divider::before, .divider::after {
    content: ''; flex: 1; height: 1px; background: var(--border2);
  }

  /* Bottom */
  .bottom-panel {
    position: relative;
    z-index: 10;
    background: var(--bottom-bg);
    backdrop-filter: blur(20px);
    border-top: 1px solid var(--border2);
    padding: 14px 24px 18px;
  }

  .suggestions {
    max-width: 700px;
    margin: 0 auto 12px;
    display: flex;
    gap: 7px;
    flex-wrap: wrap;
  }

  .pill {
    background: var(--surface);
    border: 1px solid var(--border2);
    color: var(--text2);
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 12px;
    font-weight: 500;
    padding: 6px 14px;
    border-radius: 999px;
    cursor: pointer;
    transition: all 0.18s;
    box-shadow: var(--shadow-sm);
  }
  .pill:hover {
    background: var(--accent-light);
    border-color: rgba(91,71,224,0.28);
    color: var(--accent);
    transform: translateY(-1px);
  }

  .input-row {
    max-width: 700px;
    margin: 0 auto;
    display: flex;
    gap: 9px;
    align-items: center;
  }

  .chat-input {
    flex: 1;
    background: var(--surface);
    border: 1.5px solid var(--border2);
    border-radius: 14px;
    padding: 13px 18px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 14px;
    color: var(--text);
    outline: none;
    box-shadow: var(--shadow-sm);
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .chat-input::placeholder { color: var(--muted); font-style: italic; }
  .chat-input:focus {
    border-color: rgba(91,71,224,0.45);
    box-shadow: 0 0 0 3px rgba(91,71,224,0.07), var(--shadow-sm);
  }

  .send-btn {
    width: 46px; height: 46px;
    background: var(--accent);
    border: none;
    border-radius: 13px;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px;
    color: white;
    box-shadow: var(--shadow-accent);
    transition: all 0.22s cubic-bezier(0.34,1.56,0.64,1);
    flex-shrink: 0;
  }
  .send-btn:hover { transform: scale(1.09); box-shadow: 0 6px 26px rgba(91,71,224,0.4); }
  .send-btn:active { transform: scale(0.94); }
  .send-btn:disabled { opacity: 0.33; cursor: not-allowed; transform: none; box-shadow: none; }

  .footer-row {
    max-width: 700px;
    margin: 10px auto 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .hint { font-size: 11px; color: var(--muted); font-style: italic; }
  .clear-btn {
    background: none; border: none;
    font-size: 11px;
    font-family: 'Plus Jakarta Sans', sans-serif;
    color: var(--muted);
    cursor: pointer;
    font-style: italic;
    transition: color 0.15s;
  }
  .clear-btn:hover { color: #d94f4f; }
`;

export default function Home() {
  const [dark, setDark] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem("nextstep_v3");
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("nextstep_v3", JSON.stringify(messages));
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text) => {
    const msg = text || input;
    if (!msg.trim()) return;

    const newMessages = [
      ...messages,
      { role: "user", content: msg, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
    ];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages([...newMessages, { role: "assistant", content: data.reply, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "Something went wrong. Please try again.", time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
    }
    setLoading(false);
  };

  const copyMsg = (content, i) => {
    navigator.clipboard.writeText(content);
    setCopied(i);
    setTimeout(() => setCopied(null), 1500);
  };

  const cards = [
    { emoji: "🗺️", title: "Backend Roadmap", sub: "Full path from basics to senior", q: "Give me a complete backend roadmap" },
    { emoji: "🛠️", title: "Project Ideas", sub: "Portfolio-worthy builds", q: "Give me backend project ideas" },
    { emoji: "🎯", title: "Interview Prep", sub: "Crack product company rounds", q: "How to crack backend interviews?" },
    { emoji: "📈", title: "Career Strategy", sub: "Tier-3 → Product Company", q: "Career strategy for tier-3 to product company" },
  ];

  return (
    <>
      <style>{styles}</style>
      <div className={`root${dark ? " dark" : ""}`}>
        <div className="bg-texture">
          <div className="blob blob1" />
          <div className="blob blob2" />
          <div className="blob blob3" />
        </div>
        <div className="dot-pattern" />

        <header className="header">
          <div className="logo-group">
            <div className="logo-mark">🚀</div>
            <div className="logo-copy">
              <h1>NextStep AI</h1>
              <p>Your Backend Career Mentor</p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button className="theme-btn" onClick={() => setDark(d => !d)} title="Toggle theme">
              {dark ? "☀️" : "🌙"}
            </button>
            <div className="online-badge">
              <div className="pdot" /> Online
            </div>
          </div>
        </header>

        <div className="chat-area">
          <div className="inner">
            {messages.length === 0 && (
              <div className="empty-state">
                <p className="welcome-head">Hello, <em>Developer.</em></p>
                <p className="welcome-sub">Ask me anything about backend careers, roadmaps, or interview prep.</p>
                <div className="card-grid">
                  {cards.map((c, i) => (
                    <button key={i} className="prompt-card" onClick={() => sendMessage(c.q)}>
                      <div className="card-emoji">{c.emoji}</div>
                      <div className="card-title">{c.title}</div>
                      <div className="card-sub">{c.sub}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.length > 0 && <div className="divider">Today</div>}

            {messages.map((msg, i) => (
              <div key={i} className={`msg-row ${msg.role}`}>
                {msg.role === "assistant" && <div className="ai-avatar">🚀</div>}
                <div className="bubble">
                  <p style={{ whiteSpace: "pre-wrap" }}>{msg.content}</p>
                  <div className="bubble-meta">
                    <span className="btime">{msg.time}</span>
                    {msg.role === "assistant" && (
                      <button className="copy-btn" onClick={() => copyMsg(msg.content, i)}>
                        {copied === i ? "✓ copied" : "copy"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="typing-row">
                <div className="ai-avatar">🚀</div>
                <div className="typing-bubble">
                  <div className="tdot" /><div className="tdot" /><div className="tdot" />
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        </div>

        <div className="bottom-panel">
          <div className="suggestions">
            {["Backend roadmap", "Project ideas", "Interview prep", "System design"].map((q, i) => (
              <button key={i} className="pill" onClick={() => setInput(q)}>{q}</button>
            ))}
          </div>
          <div className="input-row">
            <input
              className="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about roadmap, projects, interviews..."
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
            />
            <button className="send-btn" onClick={() => sendMessage()} disabled={loading || !input.trim()}>↑</button>
          </div>
          <div className="footer-row">
            <span className="hint">↵ Enter to send</span>
            {messages.length > 0 && (
              <button className="clear-btn" onClick={() => setMessages([])}>Clear chat</button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
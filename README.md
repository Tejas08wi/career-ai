# 🚀 NextStep AI – Career Mentor Chatbot

An AI-powered chatbot designed to guide students (especially from tier-3 colleges) towards backend development careers with structured, practical advice.

---

## 🌟 Why I Built This

As a student from a tier-3 college, I noticed that most career advice online is either too generic or overwhelming.

So I built **NextStep AI** — a focused career mentor that:
- Gives step-by-step backend roadmaps
- Suggests real projects
- Helps with interview preparation
- Keeps advice practical and actionable

---

## ✨ Features

- 💬 AI Chatbot focused on backend careers
- 🧠 Structured responses (roadmaps, steps, timelines)
- ⚡ Suggestion buttons for quick queries
- 📜 Chat history saved (localStorage)
- 📋 Copy response feature
- 🕒 Message timestamps
- 🎯 Clean and responsive UI

---

## 🛠️ Tech Stack

- **Frontend:** Next.js (App Router), React
- **Styling:** Tailwind CSS
- **Backend:** Next.js API Routes
- **AI:** Hugging Face (Mistral / Llama models)

---

## 🚀 How It Works

1. User asks a career-related question
2. Messages are sent to backend (`/api/chat`)
3. Backend formats prompt for career mentoring
4. Hugging Face model generates response
5. UI displays structured answer

---

## 🧪 Example Questions

- Give me backend roadmap
- Project ideas for backend
- How to crack backend interviews?

---

## ⚙️ Setup Instructions

```bash
git clone https://github.com/Tejas08wi/career-ai.git
cd career-ai
npm install
npm run dev

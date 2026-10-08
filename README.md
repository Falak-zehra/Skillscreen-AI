# SkillScreen AI (Prototype)

An AI-powered student skill screening platform prototype built with **React**, **Vite**, and **Tailwind CSS**.

---

## 🚀 Key Features

- **Interactive Landing Page**: Modern dark-mode UI with hero section, platform metric counters, and track previews.
- **5-Question Screening System**:
  1. *What is your current programming level?* (`Beginner` / `Basic` / `Intermediate` / `Advanced`)
  2. *Which area are you most interested in?* (`Web Development` / `AI/ML` / `Data Science` / `App Development`)
  3. *How comfortable are you with problem-solving?* (`Beginner` / `Somewhat comfortable` / `Comfortable` / `Very comfortable`)
  4. *How much time can you spend learning each week?* (`1–5 hours` / `5–10 hours` / `10–20 hours` / `20+ hours`)
  5. *What is your main career goal?* (`Get an internship` / `Get a job` / `Build projects` / `Prepare for higher studies`)
- **Live Progress & Navigation**: "Question 1 of 5" to "Question 5 of 5" progress indicators, answer storage, and "View My Results" transition.
- **Diagnostic Results Dashboard**:
  - **Skill Level**: Assessed maturity level with foundation & problem-solving readiness index.
  - **Target Career Direction**: Role profile matching their interest and career aspirations.
  - **Identified Skill Gaps**: 3–5 categorized gaps with severity tags, rationale, and recommended actions.
  - **Recommended Learning Path**: Logical 4-phase sequenced curriculum paced by weekly commitment.
  - **Recommended Projects**: 2–3 level-appropriate builds with tech stack tags and portfolio value.
  - **🎯 Job-Ready Gap Score**:
  - Dynamically calculated **0–100 Readiness Benchmark** tailored to the candidate's answers and target career path.
  - **Skills You Have**: Validated strengths inferred from screening choices.
  - **Skills to Improve**: Most important missing capabilities.
  - **Critical Skill Gaps**: Top 2–3 priority skills that must be learned first with timeframe targets.
  - **Why These Skills Matter**: Concrete industry explanations for why each skill is crucial for the selected career.
  - **Recommended Next Action**: One high-leverage immediate action with estimated score lift.
- **🤖 AI Career Advisor**:
  - Generates in-depth **Career Recommendations**, **Skill Maturity Assessments**, **Skill Gaps Diagnostic**, **30-Day Learning Roadmap** (daily milestones across 4 weeks), **3 Curated Projects** with resume bullet points, and **Recommended Technologies** categorized by stack.
  - Features loading states, error boundaries with retry mechanisms, and tabbed dashboard browsing.
  - **API Architecture**: Cleanly separated service (`src/services/aiAdvisorService.js`) with zero hardcoded API keys. Seamlessly falls back to an intelligent local generative synthesis engine when no external key is supplied.

---

## 🛠️ Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite 8
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
- **Icons**: Lucide React
- **Typography**: Plus Jakarta Sans

---

## 📂 Project Structure

```
skillscreen-ai/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Badge.jsx
│   │   │   ├── Button.jsx
│   │   │   └── Card.jsx
│   │   ├── assessment/
│   │   │   ├── AICareerAdvisor.jsx      <-- AI Advisor Dashboard
│   │   │   ├── AssessmentFlow.jsx       <-- 5-question coordinator
│   │   │   ├── ProgressBar.jsx          <-- Question X of Y
│   │   │   ├── StepQuestion.jsx         <-- Question runner
│   │   │   └── StepResults.jsx          <-- Diagnostic Results Dashboard
│   │   ├── Features.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   └── Navbar.jsx
│   ├── data/
│   │   └── assessmentData.js            <-- 5 screening questions
│   ├── services/
│   │   └── aiAdvisorService.js          <-- AI Advisor integration service
│   ├── utils/
│   │   └── recommendationEngine.js      <-- Deterministic logic
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

---

## 💻 Running the Project

```bash
# Navigate to the project directory
cd skillscreen-ai

# Install dependencies
npm install

# Start Vite development server
npm run dev

# Build for production
npm run build
```

---

## 🔑 Optional External AI API Configuration

The platform runs 100% out-of-the-box using the built-in local synthesis engine without any external keys or backend dependencies.

If you wish to connect an external AI model endpoint later, create a `.env.local` file in the project root:

```env
# Optional external AI endpoint & key
VITE_AI_API_KEY=your_api_key_here
VITE_AI_API_ENDPOINT=https://your-api-gateway.com/v1/chat/completions
```

> **Security Note**: Never commit `.env.local` or hardcode sensitive tokens in source control. The service is pre-configured to safely handle key absence.

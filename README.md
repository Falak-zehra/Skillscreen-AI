# SkillScreen AI (Prototype)

An AI-powered student skill screening platform prototype built with **React**, **Vite**, and **Tailwind CSS**.

---

## 🚀 Features

- **Interactive Landing Page**: Modern dark-mode UI with hero section, platform metric counters, and track previews.
- **"Start Screening" Flow**: Direct access into a multi-step student screening assessment.
- **Multi-Track Assessments**:
  - Frontend & UI Engineering (React lifecycle, modern CSS, Virtual DOM, Closures)
  - Python & Data Fundamentals (Data structures, list comprehensions, generators, Pandas)
  - Full-Stack & CS Foundations (HTTP status codes, SQL vs NoSQL, Git branching, CORS)
- **Live Assessment Engine**:
  - Candidate profile setup (Name input, track confirmation)
  - Timed question runner with live countdown
  - Single-choice interactive selection with progress bar
  - Instant score calculation and detailed breakdown with explanations
- **Responsive Design**: Tailored for mobile screens, tablets, and desktop displays.
- **Frontend-Only**: No external database, auth, or paid AI APIs required.

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
│   │   │   ├── AssessmentFlow.jsx
│   │   │   ├── ProgressBar.jsx
│   │   │   ├── StepQuestion.jsx
│   │   │   ├── StepResults.jsx
│   │   │   └── StepSetup.jsx
│   │   ├── Features.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   └── Navbar.jsx
│   ├── data/
│   │   └── assessmentData.js
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

# Install dependencies (if not already installed)
npm install

# Start Vite development server
npm run dev

# Build for production
npm run build
```

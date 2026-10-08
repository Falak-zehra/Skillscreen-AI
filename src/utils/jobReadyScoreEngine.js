/**
 * Job-Ready Gap Score Calculation Engine
 * Calculates a dynamic 0-100 score and personalized gap analysis
 * based on candidate screening inputs and target career path.
 */

import { SCREENING_QUESTIONS } from '../data/assessmentData';

export function calculateJobReadyScore(selectedAnswers, careerRecommendation) {
  const level = SCREENING_QUESTIONS[0].options[selectedAnswers[1]] || 'Beginner';
  const interest = SCREENING_QUESTIONS[1].options[selectedAnswers[2]] || 'Web Development';
  const problemSolving = SCREENING_QUESTIONS[2].options[selectedAnswers[3]] || 'Beginner';
  const weeklyHours = SCREENING_QUESTIONS[3].options[selectedAnswers[4]] || '5–10 hours';
  const goal = SCREENING_QUESTIONS[4].options[selectedAnswers[5]] || 'Get a job';

  // 1. Calculate Personalized Job-Ready Score (0–100)
  let baseScore = 32;

  // Level weight (45 points max)
  if (level === 'Advanced') baseScore += 45;
  else if (level === 'Intermediate') baseScore += 32;
  else if (level === 'Basic') baseScore += 18;
  else baseScore += 5; // Beginner

  // Problem-solving comfort (25 points max)
  if (problemSolving === 'Very comfortable') baseScore += 24;
  else if (problemSolving === 'Comfortable') baseScore += 18;
  else if (problemSolving === 'Somewhat comfortable') baseScore += 10;
  else baseScore += 2; // Beginner

  // Weekly hours commitment velocity (15 points max)
  if (weeklyHours === '20+ hours') baseScore += 14;
  else if (weeklyHours === '10–20 hours') baseScore += 10;
  else if (weeklyHours === '5–10 hours') baseScore += 6;
  else baseScore += 2; // 1-5 hours

  // Goal calibration
  if (goal === 'Get an internship') {
    // Internships have slightly lower barrier than senior jobs, calibrate index +5
    baseScore = Math.min(95, baseScore + 4);
  } else if (goal === 'Get a job') {
    // Full-time jobs require rigorous verification
    baseScore = Math.min(96, Math.max(20, baseScore - 2));
  } else if (goal === 'Build projects') {
    baseScore = Math.min(94, baseScore + 2);
  }

  // Ensure score stays strictly bounded between 15 and 96
  const score = Math.max(18, Math.min(96, Math.round(baseScore)));

  // Tier classification
  let tier = 'Foundational Candidate';
  let tierBadge = 'warning';
  let tierDescription = '';

  if (score >= 85) {
    tier = 'High Job-Readiness';
    tierBadge = 'success';
    tierDescription = `You possess high technical maturity and problem-solving readiness for entry-to-mid ${interest} roles. Closing final edge-case gaps will qualify you for top-bracket offers.`;
  } else if (score >= 68) {
    tier = 'Competitive Contender';
    tierBadge = 'cyan';
    tierDescription = `You have strong practical momentum and are within striking distance of interview readiness. Targeted remediation of your critical gaps will cross the hiring threshold.`;
  } else if (score >= 50) {
    tier = 'Emerging Developer';
    tierBadge = 'primary';
    tierDescription = `You demonstrate good foundational instincts and a clear focus on ${interest}. Bridging core system integration and problem-solving skills will accelerate your job prospects.`;
  } else {
    tier = 'Early Foundation Stage';
    tierBadge = 'warning';
    tierDescription = `You are at the onset of your engineering journey. Building consistent weekly coding habits and foundational syntax projects will steadily lift your score.`;
  }

  // 2. Skills You Have (Inferred from answers)
  const getSkillsYouHave = () => {
    const list = [];

    if (level === 'Advanced') {
      list.push('Independent Application Architecture', 'Clean Code Principles & Refactoring', 'Production Debugging & Environment Setup');
    } else if (level === 'Intermediate') {
      list.push('Core Language Syntax & Common Idioms', 'Independent Feature Implementation', 'Modular Component & File Organization');
    } else if (level === 'Basic') {
      list.push('Foundational Programming Syntax', 'Basic Variable Scopes & Control Loops', 'Familiarity with Development Tools');
    } else {
      list.push('High Learning Curiosity & Ambition', 'Basic Algorithmic Intuition', 'Foundational Computer Literacy');
    }

    // Problem-solving inferred skill
    if (problemSolving === 'Very comfortable' || problemSolving === 'Comfortable') {
      list.push('Structured Analytical Decomposition', 'Pattern Recognition Across Logic Problems');
    } else {
      list.push('Willingness to Tackle Unfamiliar Problems');
    }

    // Commitment inferred skill
    if (weeklyHours === '20+ hours' || weeklyHours === '10–20 hours') {
      list.push(`High Weekly Study Velocity (${weeklyHours}/week)`);
    } else {
      list.push(`Steady Paced Learning Routine (${weeklyHours}/week)`);
    }

    return list.slice(0, 4);
  };

  // 3. Skills to Improve
  const getSkillsToImprove = () => {
    const domainSkills = {
      'Web Development': [
        'Full-Stack Server & Database Architecture',
        'Asynchronous State & Optimistic UI Updates',
        'Automated Testing (Unit & End-to-End)',
        'Web Vitals & Performance Optimization',
        'TypeScript Strict Typing & Generics'
      ],
      'AI/ML': [
        'Vector Database Indexing & RAG Pipelines',
        'Containerized Model Microservices (FastAPI/Docker)',
        'Feature Pipeline Engineering & Preprocessing',
        'Evaluation Metrics & Hallucination Mitigation',
        'PyTorch Tensor Operations & Gradient Tuning'
      ],
      'Data Science': [
        'Advanced SQL Window Functions & Aggregations',
        'Statistical Experimentation & A/B Testing Design',
        'Automated ETL Pipeline Orchestration',
        'Interactive Analytics Dashboards (Streamlit/Plotly)',
        'Data Validation & Anomaly Detection'
      ],
      'App Development': [
        'Offline-First Data Sync & Local SQLite Caching',
        'Native Hardware APIs & Device Permissions',
        '60 FPS Gesture Animations (Reanimated)',
        'Cross-Platform State Management',
        'Automated Build & Store Deployment Pipelines'
      ]
    };

    return domainSkills[interest] || domainSkills['Web Development'];
  };

  // 4. Critical Skill Gaps (Top 2–3 that must be learned first)
  const getCriticalGaps = () => {
    const isBeginner = level === 'Beginner' || level === 'Basic';

    const criticalMap = {
      'Web Development': isBeginner ? [
        {
          name: 'Modern Component State & Async Fetching',
          priority: 'Urgent Priority #1',
          timeframe: 'Next 7–10 Days',
          badge: 'High Impact'
        },
        {
          name: 'Relational Database Integration (PostgreSQL/Prisma)',
          priority: 'High Priority #2',
          timeframe: 'Days 11–20',
          badge: 'Core Backend'
        },
        {
          name: 'Git Version Control & Branch Collaboration',
          priority: 'Priority #3',
          timeframe: 'Ongoing',
          badge: 'Workflow'
        }
      ] : [
        {
          name: 'Full-Stack Server Components & Database Schema Modeling',
          priority: 'Urgent Priority #1',
          timeframe: 'Next 7–12 Days',
          badge: 'Full-Stack'
        },
        {
          name: 'End-to-End Automated Testing & CI/CD Pipelines',
          priority: 'High Priority #2',
          timeframe: 'Days 13–22',
          badge: 'Code Quality'
        },
        {
          name: 'Production Performance Profiling & Caching Strategies',
          priority: 'Priority #3',
          timeframe: 'Days 23–30',
          badge: 'Optimization'
        }
      ],
      'AI/ML': isBeginner ? [
        {
          name: 'Vectorized Array Operations with NumPy & Pandas',
          priority: 'Urgent Priority #1',
          timeframe: 'Next 7–10 Days',
          badge: 'Foundations'
        },
        {
          name: 'FastAPI Microservice Endpoints for Model Predictions',
          priority: 'High Priority #2',
          timeframe: 'Days 11–20',
          badge: 'Engineering'
        },
        {
          name: 'Basic Supervised Learning Algorithms (Scikit-Learn)',
          priority: 'Priority #3',
          timeframe: 'Days 21–30',
          badge: 'Applied ML'
        }
      ] : [
        {
          name: 'Retrieval-Augmented Generation (RAG) & Vector Stores',
          priority: 'Urgent Priority #1',
          timeframe: 'Next 7–12 Days',
          badge: 'Generative AI'
        },
        {
          name: 'Docker Containerization & Latency Optimization',
          priority: 'High Priority #2',
          timeframe: 'Days 13–22',
          badge: 'Deployment'
        },
        {
          name: 'Evaluation Harnesses & Context Quality Metrics',
          priority: 'Priority #3',
          timeframe: 'Days 23–30',
          badge: 'MLOps'
        }
      ],
      'Data Science': isBeginner ? [
        {
          name: 'Complex SQL Queries (Window Functions & Multi-Table Joins)',
          priority: 'Urgent Priority #1',
          timeframe: 'Next 7–10 Days',
          badge: 'Data Core'
        },
        {
          name: 'Exploratory Data Analysis with Pandas & Seaborn',
          priority: 'High Priority #2',
          timeframe: 'Days 11–20',
          badge: 'Analytics'
        },
        {
          name: 'Statistical Hypothesis Testing & Distributions',
          priority: 'Priority #3',
          timeframe: 'Days 21–30',
          badge: 'Statistics'
        }
      ] : [
        {
          name: 'Production Feature Engineering & Scikit-Learn Pipelines',
          priority: 'Urgent Priority #1',
          timeframe: 'Next 7–12 Days',
          badge: 'ML Pipelines'
        },
        {
          name: 'A/B Testing Experimentation & Sample Ratio Mismatch',
          priority: 'High Priority #2',
          timeframe: 'Days 13–22',
          badge: 'Experimentation'
        },
        {
          name: 'Cloud Data Warehousing (BigQuery or Snowflake)',
          priority: 'Priority #3',
          timeframe: 'Days 23–30',
          badge: 'Cloud Scale'
        }
      ],
      'App Development': isBeginner ? [
        {
          name: 'Multi-Screen Navigation & Component State Flow',
          priority: 'Urgent Priority #1',
          timeframe: 'Next 7–10 Days',
          badge: 'Mobile Core'
        },
        {
          name: 'REST API Data Fetching & Offline Storage (AsyncStorage)',
          priority: 'High Priority #2',
          timeframe: 'Days 11–20',
          badge: 'Persistence'
        },
        {
          name: 'Touch Gestures & Responsive Screen Breakpoints',
          priority: 'Priority #3',
          timeframe: 'Days 21–30',
          badge: 'UI Craft'
        }
      ] : [
        {
          name: 'Offline-First SQLite Architecture & Mutation Sync',
          priority: 'Urgent Priority #1',
          timeframe: 'Next 7–12 Days',
          badge: 'Architecture'
        },
        {
          name: '60 FPS Gesture Worklets & Memory Leak Profiling',
          priority: 'High Priority #2',
          timeframe: 'Days 13–22',
          badge: 'Performance'
        },
        {
          name: 'Native Device Hardware Permissions & Background Tasks',
          priority: 'Priority #3',
          timeframe: 'Days 23–30',
          badge: 'Native APIs'
        }
      ]
    };

    return criticalMap[interest] || criticalMap['Web Development'];
  };

  // 5. Why These Skills Matter (Concrete relevance to selected career)
  const getWhyTheseSkillsMatter = () => {
    const roleTitle = careerRecommendation?.roleTitle || `${interest} Professional`;

    const reasonsMap = {
      'Web Development': [
        {
          skill: 'Component State & Server Data Flow',
          whyItMatters: `Modern web teams build applications where UI state must stay strictly in sync with database records. Without mastering state flow, web apps suffer from race conditions, flash of stale content, and brittle user experiences that fail technical screening bars.`
        },
        {
          skill: 'Relational Database Schema Modeling',
          whyItMatters: `Recruiters and hiring managers for ${roleTitle} positions expect candidates to demonstrate end-to-end autonomy. Designing clean PostgreSQL tables, migrations, and foreign key relations proves you can write software that handles real customer data safely.`
        },
        {
          skill: 'Testing & Continuous Integration',
          whyItMatters: `High-performing engineering departments do not hire developers who only test by manually clicking buttons in the browser. Automated unit and integration tests prove your code is maintainable and won't break production deployments.`
        }
      ],
      'AI/ML': [
        {
          skill: 'Vector Retrieval & RAG Architecture',
          whyItMatters: `The standard for ${roleTitle} has shifted from simple prompting to production context injection. Knowing how to embed documents, manage vector search latency, and eliminate hallucinations is the #1 tested capability in modern AI interviews.`
        },
        {
          skill: 'Containerized Microservices (FastAPI/Docker)',
          whyItMatters: `An AI model that exists only in a Jupyter Notebook provides zero commercial value. Packaging models into Dockerized REST endpoints with sub-100ms inference response times is mandatory for production engineering roles.`
        },
        {
          skill: 'Vectorized Processing & Preprocessing',
          whyItMatters: `Real-world data is noisy and massive. Efficient matrix transformations in NumPy and Pandas prevent memory overflow and guarantee that input tensors adhere to strict model shape requirements.`
        }
      ],
      'Data Science': [
        {
          skill: 'Advanced SQL (Window Functions & Joins)',
          whyItMatters: `SQL is tested in over 90% of technical interview rounds for ${roleTitle}. Companies expect instant fluency with analytical window functions (LEAD, LAG, DENSE_RANK) to query revenue cohorts and user funnels directly.`
        },
        {
          skill: 'Statistical Experimentation & A/B Testing',
          whyItMatters: `Data science exists to drive strategic decision-making. Grasping statistical power, p-values, and sample ratio mismatch prevents corporations from making costly multi-million-dollar product mistakes based on noise.`
        },
        {
          skill: 'Production ETL & Feature Engineering',
          whyItMatters: `Data analysts and scientists spend 70% of their time cleaning and shaping inputs. Writing robust, automated feature transformations separates senior contributors from junior report-runners.`
        }
      ],
      'App Development': [
        {
          skill: 'Offline-First Synchronization',
          whyItMatters: `Mobile devices constantly encounter flaky network connections. Applications that crash or show blank screens during subway or tunnel commutes receive immediate 1-star ratings. Offline queues demonstrate architectural maturity.`
        },
        {
          skill: '60 FPS Gesture & Animation Performance',
          whyItMatters: `Unlike web browsers, mobile users have zero tolerance for dropped frames or sluggish touch latency. Running smooth gesture responders on the native UI thread is a prime hiring signal for ${roleTitle} candidates.`
        },
        {
          skill: 'Native Device APIs & Permissions',
          whyItMatters: `Mobile products rely heavily on hardware integrations (camera, biometrics, geolocation, push tokens). Handling permission denials gracefully is tested in every mobile technical assessment.`
        }
      ]
    };

    return reasonsMap[interest] || reasonsMap['Web Development'];
  };

  // 6. Recommended Next Action (One clear high-leverage action)
  const getRecommendedNextAction = () => {
    const isBeginner = level === 'Beginner' || level === 'Basic';

    const actionMap = {
      'Web Development': isBeginner ? {
        title: 'Build a Full-Stack 2-Tier CRUD Web Application',
        action: 'Initialize a clean React + Tailwind frontend connected to a Supabase or PostgreSQL database. Implement full Create, Read, Update, and Delete operations with live deployment to Vercel within 14 days.',
        timeline: 'Next 14 Days',
        expectedScoreBoost: '+15 to +18 Points',
        targetSkill: 'State Management & Database Integration'
      } : {
        title: 'Architect a Next.js Full-Stack App with Server Actions & Automated Tests',
        action: 'Develop a production-grade multi-page application using Next.js 14 App Router, PostgreSQL (Prisma), Vitest integration tests, and GitHub Actions CI. Ensure zero console warnings and 100% responsive layout.',
        timeline: 'Next 10–14 Days',
        expectedScoreBoost: '+10 to +14 Points',
        targetSkill: 'Server Components & Automated CI/CD'
      },
      'AI/ML': isBeginner ? {
        title: 'Develop a Document Question-Answering API with FastAPI & ChromaDB',
        action: 'Build a standalone Python script that ingests 5 technical PDF papers, creates embeddings using sentence-transformers, stores them in ChromaDB, and serves contextual Q&A answers through a FastAPI endpoint.',
        timeline: 'Next 14 Days',
        expectedScoreBoost: '+16 to +20 Points',
        targetSkill: 'RAG Architecture & API Serving'
      } : {
        title: 'Deploy an End-to-End RAG Knowledge System in Docker with Evaluation Metrics',
        action: 'Containerize an advanced RAG pipeline with hybrid search (BM25 + Dense Vectors) and implement Ragas evaluation metrics measuring context precision and faithfulness.',
        timeline: 'Next 10–14 Days',
        expectedScoreBoost: '+10 to +15 Points',
        targetSkill: 'Production MLOps & RAG Optimization'
      },
      'Data Science': isBeginner ? {
        title: 'Complete 25 Intermediate SQL Queries & Publish an Interactive Dashboard',
        action: 'Solve 25 LeetCode/StrataScratch SQL problems focusing on Window Functions, then build and deploy a multi-page Streamlit analytics app exploring a real 50,000+ row dataset.',
        timeline: 'Next 14 Days',
        expectedScoreBoost: '+15 to +18 Points',
        targetSkill: 'SQL Window Functions & Streamlit'
      } : {
        title: 'Design an Automated Customer Churn Pipeline with Statistical A/B Simulation',
        action: 'Engineer an end-to-end Scikit-Learn pipeline with cross-validation and build an interactive Streamlit simulation testing A/B experiment sample sizing and p-value sensitivity.',
        timeline: 'Next 10–14 Days',
        expectedScoreBoost: '+11 to +15 Points',
        targetSkill: 'Feature Pipelines & Experimentation'
      },
      'App Development': isBeginner ? {
        title: 'Ship a Cross-Platform Habit Tracking App with Offline Storage to TestFlight / APK',
        action: 'Build a React Native / Expo application with multi-screen navigation, local persistent storage, and scheduled local notifications. Generate a testable standalone build link via EAS.',
        timeline: 'Next 14 Days',
        expectedScoreBoost: '+16 to +19 Points',
        targetSkill: 'Navigation & Device Storage'
      } : {
        title: 'Engineer an Offline-First Mobile App with SQLite Sync & 60 FPS Gesture Animations',
        action: 'Implement a mobile application using WatermelonDB / SQLite local caching and React Native Reanimated gesture cards that syncs gracefully upon internet reconnection.',
        timeline: 'Next 10–14 Days',
        expectedScoreBoost: '+12 to +16 Points',
        targetSkill: 'Offline Sync & Reanimated'
      }
    };

    return actionMap[interest] || actionMap['Web Development'];
  };

  return {
    score,
    tier,
    tierBadge,
    tierDescription,
    skillsYouHave: getSkillsYouHave(),
    skillsToImprove: getSkillsToImprove(),
    criticalGaps: getCriticalGaps(),
    whyTheseSkillsMatter: getWhyTheseSkillsMatter(),
    recommendedNextAction: getRecommendedNextAction()
  };
}

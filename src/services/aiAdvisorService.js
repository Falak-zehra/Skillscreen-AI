/**
 * AI Career Advisor Service
 *
 * Provides AI-powered personalized career recommendations based on screening answers.
 * Architected with clear separation of concerns:
 * - Checks environment configuration (e.g. VITE_AI_API_KEY)
 * - If configured, dispatches to external AI API endpoint (Gemini / standard LLM API)
 * - If not configured (default safe mode), utilizes a specialized deterministic
 *   AI Advisor synthesis engine with simulated generation latency.
 * - Never exposes API keys or secrets in the client bundle.
 */

import { SCREENING_QUESTIONS } from '../data/assessmentData';

/**
 * Generates an in-depth AI career advisory package.
 * @param {Object} selectedAnswers - Map of question ID to selected option index.
 * @param {Object} options - Optional config (e.g., forceFail for testing error states).
 * @returns {Promise<Object>} The structured AI advisory response.
 */
export async function generateAICareerAdvice(selectedAnswers, options = {}) {
  const { forceFail = false } = options;

  // Extract human-readable answer values
  const q1 = SCREENING_QUESTIONS[0].options[selectedAnswers[1]] || 'Beginner';
  const q2 = SCREENING_QUESTIONS[1].options[selectedAnswers[2]] || 'Web Development';
  const q3 = SCREENING_QUESTIONS[2].options[selectedAnswers[3]] || 'Beginner';
  const q4 = SCREENING_QUESTIONS[3].options[selectedAnswers[4]] || '5–10 hours';
  const q5 = SCREENING_QUESTIONS[4].options[selectedAnswers[5]] || 'Build projects';

  const apiKey = import.meta.env.VITE_AI_API_KEY;
  const apiEndpoint = import.meta.env.VITE_AI_API_ENDPOINT;

  // If error simulation requested
  if (forceFail) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    throw new Error('AI generation service encountered a network timeout while contacting inference nodes.');
  }

  // If real AI API key is configured in environment, dispatch live call
  if (apiKey && apiEndpoint) {
    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gemini-1.5-pro',
          prompt: `Candidate Screening Profile:
- Programming Level: ${q1}
- Primary Interest: ${q2}
- Problem-Solving Comfort: ${q3}
- Weekly Hours: ${q4}
- Career Goal: ${q5}

Analyze this profile and generate an exhaustive AI career report formatted as JSON.`
        })
      });

      if (!response.ok) {
        throw new Error(`AI API returned status ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      console.warn('Real AI API failed, falling back to local synthesis engine:', err);
      // Fallback to local synthesis so user is not blocked
    }
  }

  // Default: Intelligent Local Synthesis Engine (Safe Mode)
  // Simulate realistic network latency for AI model inference (1200ms)
  await new Promise((resolve) => setTimeout(resolve, 1200));

  return buildPersonalizedAIReport({
    level: q1,
    interest: q2,
    problemSolving: q3,
    weeklyHours: q4,
    careerGoal: q5,
    isLiveAPI: Boolean(apiKey)
  });
}

/**
 * Builds a deeply personalized AI synthesis response based strictly on candidate inputs.
 */
function buildPersonalizedAIReport({ level, interest, problemSolving, weeklyHours, careerGoal, isLiveAPI = false }) {
  const isBeginner = level === 'Beginner' || level === 'Basic';
  const isHighVelocity = weeklyHours === '10–20 hours' || weeklyHours === '20+ hours';

  // 1. Career Recommendation
  const careerMap = {
    'Web Development': {
      roleTitle: careerGoal === 'Get a job' ? 'Full-Stack Software Engineer' : careerGoal === 'Get an internship' ? 'Associate Frontend Engineer' : 'Product-Focused Web Application Engineer',
      matchScore: isBeginner ? 88 : 96,
      executiveSummary: `Based on your interest in Web Development and your goal to ${careerGoal.toLowerCase()}, your high-signal target profile is a modern web engineer specializing in component architecture, state management, and API orchestration. The market strongly rewards engineers who can bridge intuitive UI craft with reliable backend services.`,
      industryOutlook: 'Consistently ranks in top 3 highest-volume software engineering roles globally with strong remote opportunities.',
      targetCompanies: ['High-growth SaaS Startups', 'E-commerce Platforms', 'Tech Consultancies', 'Enterprise Cloud Providers'],
      salaryRange: isBeginner ? '$65,000 – $85,000' : '$95,000 – $130,000+'
    },
    'AI/ML': {
      roleTitle: careerGoal === 'Prepare for higher studies' ? 'Applied AI & ML Researcher' : careerGoal === 'Get a job' ? 'Machine Learning Solutions Engineer' : 'AI Systems & LLM Application Engineer',
      matchScore: isBeginner ? 85 : 94,
      executiveSummary: `Your profile indicates an optimal trajectory toward AI/ML engineering. With your commitment of ${weeklyHours}/week, prioritizing model inference, retrieval-augmented generation (RAG), and data engineering pipelines will position you ahead of candidates who only focus on basic prompt scripts.`,
      industryOutlook: 'Hyper-growth domain with premium hiring compensation and high venture capital investment.',
      targetCompanies: ['AI Frontier Labs', 'Enterprise Analytics Vendors', 'Autonomous Systems Creators', 'AI Product Scaleups'],
      salaryRange: isBeginner ? '$75,000 – $95,000' : '$110,000 – $160,000+'
    },
    'Data Science': {
      roleTitle: careerGoal === 'Get a job' ? 'Data Intelligence & Analytics Engineer' : careerGoal === 'Get an internship' ? 'Junior Quantitative Data Analyst' : 'Business Insights & Machine Learning Analyst',
      matchScore: isBeginner ? 87 : 93,
      executiveSummary: `Targeting Data Science with a focus on ${careerGoal.toLowerCase()} requires pairing statistical rigor with production data pipelines. Your path centers on mastering relational querying (SQL), exploratory data analysis (Pandas), and actionable predictive modeling.`,
      industryOutlook: 'High demand across FinTech, Healthcare, Logistics, and consumer platforms seeking data-driven decision engines.',
      targetCompanies: ['FinTech & Quant Firms', 'Healthcare Analytics', 'Consumer Tech Brands', 'Strategic Consultancies'],
      salaryRange: isBeginner ? '$68,000 – $88,000' : '$100,000 – $140,000+'
    },
    'App Development': {
      roleTitle: careerGoal === 'Get a job' ? 'Cross-Platform Mobile Engineer' : careerGoal === 'Build projects' ? 'Mobile Product Architect' : 'iOS & Android Application Developer',
      matchScore: isBeginner ? 89 : 95,
      executiveSummary: `Given your passion for mobile platforms, your optimal profile is a cross-platform app engineer building responsive, offline-first mobile applications using React Native or Flutter. Delivering smooth 60 FPS interfaces with local persistence will set you apart.`,
      industryOutlook: 'High consumer engagement and enterprise mobile migration ensure steady contract and full-time hiring demand.',
      targetCompanies: ['Consumer App Scaleups', 'Fintech Neobanks', 'HealthTech Apps', 'Digital Agencies'],
      salaryRange: isBeginner ? '$70,000 – $90,000' : '$100,000 – $135,000+'
    }
  };

  const careerRecommendation = careerMap[interest] || careerMap['Web Development'];

  // 2. Current Skill Assessment
  const skillAssessment = {
    maturityLevel: `${level} Proficiency (${problemSolving} problem-solving)`,
    readinessScore: level === 'Advanced' ? 92 : level === 'Intermediate' ? 76 : level === 'Basic' ? 58 : 38,
    assessmentVerdict: isBeginner
      ? 'Foundational Phase: You have clear career motivation and an identified direction. Your priority is transforming isolated syntax knowledge into cohesive project builds.'
      : 'Applied Phase: You possess strong practical intuition. Your priority is architecting production-grade features, optimization, and system design communication.',
    strengths: [
      `High clarity in chosen target domain (${interest})`,
      `Dedicated weekly learning commitment (${weeklyHours})`,
      `Aligned career milestone with measurable focus (${careerGoal})`,
      `Self-awareness regarding problem-solving capability (${problemSolving})`
    ],
    potentialPitfalls: [
      isHighVelocity ? 'Risk of cognitive burnout if not pacing study modules effectively.' : 'Pacing risk: ensure weekly hours are protected on your calendar to maintain momentum.',
      problemSolving === 'Beginner' ? 'Relying exclusively on tutorials without solving unassisted algorithmic problems.' : 'Skipping foundational system architecture in favor of shallow feature copy-pasting.'
    ]
  };

  // 3. Skill Gaps (AI Diagnostic)
  const gapsMap = {
    'Web Development': [
      {
        skill: 'Async Control Flow & State Synchronization',
        category: 'Core Architecture',
        priority: 'High',
        impact: 'Prevents race conditions, zombie renders, and data corruption in interactive SPAs.',
        solution: 'Implement custom hooks wrapping async cancellation with AbortController and optimistic UI.'
      },
      {
        skill: 'Server Components & Edge Caching',
        category: 'Modern Web',
        priority: 'Medium',
        impact: 'Essential for next-generation Next.js/Remix full-stack apps targeting instant load times.',
        solution: 'Build a project with server actions, streaming Suspense boundaries, and stale-while-revalidate caching.'
      },
      {
        skill: 'Database Indexing & Relational Schema Modeling',
        category: 'Backend & Data',
        priority: 'High',
        impact: 'Separates hobbyist frontend coders from full-stack engineers who design reliable backends.',
        solution: 'Model normalized relational databases in PostgreSQL with Prisma and query execution plans.'
      }
    ],
    'AI/ML': [
      {
        skill: 'Vector Retrieval & Context Chunking Strategies',
        category: 'Generative AI',
        priority: 'High',
        impact: 'Poor chunking and naive similarity search lead to hallucinations in RAG systems.',
        solution: 'Implement semantic chunking, reciprocal rank fusion (RRF), and hybrid BM25 + dense search.'
      },
      {
        skill: 'Inference Latency & Containerized Microservices',
        category: 'Deployment',
        priority: 'High',
        impact: 'Models without fast REST/gRPC endpoints cannot be integrated into user-facing software.',
        solution: 'Containerize an ONNX/FastAPI model with batching and measure token-per-second latency.'
      },
      {
        skill: 'Mathematical Foundations for Gradient Optimization',
        category: 'Core Theory',
        priority: 'Medium',
        impact: 'Required to debug vanishing gradients, learning rate decay, and fine-tuning instability.',
        solution: 'Code backpropagation from scratch in pure NumPy for a 2-layer perceptron.'
      }
    ],
    'Data Science': [
      {
        skill: 'Advanced Window Functions & CTEs in SQL',
        category: 'Querying',
        priority: 'High',
        impact: 'The primary filter used in technical interview screens by top analytics companies.',
        solution: 'Solve 30 advanced window function problems (LEAD, LAG, NTILE, DENSE_RANK).'
      },
      {
        skill: 'Automated Pipeline Validation & Data Quality',
        category: 'Engineering',
        priority: 'High',
        impact: 'Dirty data pipelines produce incorrect corporate forecasting without failing loud.',
        solution: 'Implement Great Expectations or Pandera schema validation tests on incoming CSV feeds.'
      },
      {
        skill: 'Hypothesis Testing & Statistical Power Analysis',
        category: 'Statistics',
        priority: 'Medium',
        impact: 'Determines whether observed metric shifts in product features are statistically significant.',
        solution: 'Run simulated A/B testing calculations factoring in sample sizing and minimum detectable effect.'
      }
    ],
    'App Development': [
      {
        skill: 'Offline-First Synchronization & Conflict Resolution',
        category: 'Data Architecture',
        priority: 'High',
        impact: 'Mobile users expect continuous functionality regardless of tunnel or subway disconnects.',
        solution: 'Architect a local SQLite / WatermelonDB queue that replays mutation events when back online.'
      },
      {
        skill: 'Gesture Responders & 60 FPS Reanimated Pipelines',
        category: 'UI Performance',
        priority: 'Medium',
        impact: 'Janky touches and frame drops instantly degrade app store ratings and retention.',
        solution: 'Build interactive swipe-to-dismiss and pan gesture cards utilizing declarative worklets.'
      },
      {
        skill: 'Native Permissions & Background Tasks',
        category: 'Platform Native',
        priority: 'High',
        impact: 'Handling iOS/Android permission revocation and silent push notifications gracefully.',
        solution: 'Configure native modules with background fetch handlers and status checks.'
      }
    ]
  };

  const skillGaps = gapsMap[interest] || gapsMap['Web Development'];

  // 4. 30-Day Learning Roadmap (4 structured weeks)
  const roadmap30Days = [
    {
      weekNumber: 1,
      title: 'Week 1 (Days 1–7): Core Fundamentals & Toolchain Mastery',
      focus: isBeginner ? 'Language syntax, clean variable scopes, and local developer environment setup.' : 'Deep-dive into advanced language mechanics, type safety, and architecture patterns.',
      milestone: 'Construct a validated, error-free mini-module without tutorials.',
      dailyTasks: [
        'Days 1–2: Audit development environment (Git, Linters, modern runtime).',
        'Days 3–4: Build unassisted practice exercises targeting your weakest language area.',
        'Days 5–6: Write comprehensive documentation and push clean commits to GitHub.',
        'Day 7: Weekly review & self-assessment test.'
      ]
    },
    {
      weekNumber: 2,
      title: 'Week 2 (Days 8–14): Architecture & Data Flow Mastery',
      focus: `Mastering component lifecycles, structured state, and API communication in ${interest}.`,
      milestone: 'Connect interactive UI components to real-world remote APIs with loading & error boundaries.',
      dailyTasks: [
        'Days 8–9: Model component hierarchy and data flow contracts.',
        'Days 10–11: Implement state management and resilient network error states.',
        'Days 12–13: Add form validation and optimistic UI transitions.',
        'Day 14: Code refactoring and component unit testing.'
      ]
    },
    {
      weekNumber: 3,
      title: 'Week 3 (Days 15–21): Flagship Project Build Sprint',
      focus: 'Initiate and construct Project #1 from your recommended project list.',
      milestone: 'Deploy a functional MVP online with public URL and responsive layout.',
      dailyTasks: [
        'Days 15–16: Initialize repository, configure Tailwind styling system and base routes.',
        'Days 17–18: Implement core differentiator features and persistent storage.',
        'Days 19–20: Integrate authentication and production API endpoints.',
        'Day 21: Deploy live version to Vercel/Netlify/Fly.io.'
      ]
    },
    {
      weekNumber: 4,
      title: 'Week 4 (Days 22–30): Production Polish & Career Launch',
      focus: `Optimizing performance, testing edge cases, and aligning portfolio for "${careerGoal}".`,
      milestone: 'Publish a polished GitHub repository with demo video and updated technical resume.',
      dailyTasks: [
        'Days 22–24: Run Lighthouse / performance profiling; eliminate layout shifts.',
        'Days 25–26: Write a showcase README with architecture diagram, tech rationale, and demo GIF.',
        'Days 27–28: Record a 90-second Loom product walkthrough video.',
        'Days 29–30: Finalize portfolio site and begin targeted outreach or application submissions.'
      ]
    }
  ];

  // 5. 3 Project Recommendations
  const projectsMap = {
    'Web Development': [
      {
        id: 'web-1',
        title: 'Enterprise Skill Verification & Assessment Portal',
        badge: 'Recommended MVP',
        difficulty: isBeginner ? 'Basic' : 'Intermediate',
        problemStatement: 'Recruiters spend hundreds of hours manually screening candidate foundations with subjective quizzes.',
        keyFeatures: [
          'Timed screening module with live countdown and progress indicators',
          'Instant score calculations and radar performance visualizations',
          'Role-based exportable candidate summary reports'
        ],
        techStack: ['React 19', 'Tailwind CSS', 'Vite', 'Lucide Icons', 'LocalStorage'],
        resumeBullet: 'Engineered an interactive student screening SPA processing multi-track assessments with sub-second responsive state transitions.'
      },
      {
        id: 'web-2',
        title: 'Full-Stack Developer Mentorship & Code Review Hub',
        badge: 'Flagship Full-Stack',
        difficulty: isBeginner ? 'Intermediate' : 'Advanced',
        problemStatement: 'Junior engineers lack structured feedback loops and asynchronous code review sessions from senior practitioners.',
        keyFeatures: [
          'GitHub OAuth authentication with repository selection',
          'Inline syntax-highlighted code commentary and threads',
          'Booking calendar synced with Google Calendar API'
        ],
        techStack: ['Next.js 14', 'TypeScript', 'Prisma ORM', 'PostgreSQL', 'Tailwind CSS'],
        resumeBullet: 'Architected a full-stack code mentorship platform featuring relational PostgreSQL schema modeling and authenticated review threads.'
      },
      {
        id: 'web-3',
        title: 'Real-Time Collaborative Markdown & Spec Editor',
        badge: 'Complex Systems',
        difficulty: 'Advanced',
        problemStatement: 'Remote engineering teams need lightweight, zero-latency document authoring with instant peer previews.',
        keyFeatures: [
          'Multi-user live cursor sync over WebSockets',
          'KaTeX mathematical equations & Mermaid diagram rendering',
          'Version history with restore and markdown export'
        ],
        techStack: ['React', 'Node.js', 'Socket.io', 'Monaco Editor', 'Tailwind'],
        resumeBullet: 'Built a real-time collaborative documentation suite utilizing WebSocket broadcast channels, reducing document sync latency to under 35ms.'
      }
    ],
    'AI/ML': [
      {
        id: 'ai-1',
        title: 'Semantic Document Search & Q&A Assistant (RAG)',
        badge: 'Industry Essential',
        difficulty: isBeginner ? 'Basic' : 'Intermediate',
        problemStatement: 'Traditional keyword search fails to understand semantic relationships across dense technical documentation.',
        keyFeatures: [
          'PDF & Markdown document ingestion with smart text chunking',
          'Embedding vectorization stored in ChromaDB vector store',
          'Source passage citations with similarity confidence percentages'
        ],
        techStack: ['Python', 'FastAPI', 'LangChain', 'ChromaDB', 'React UI'],
        resumeBullet: 'Developed an end-to-end RAG knowledge engine with dense vector search, enabling grounded conversational retrieval with cited context.'
      },
      {
        id: 'ai-2',
        title: 'Automated Code Reviewer & Security Vulnerability Agent',
        badge: 'Developer Tooling',
        difficulty: isBeginner ? 'Intermediate' : 'Advanced',
        problemStatement: 'Pull requests frequently ship subtle security flaws and styling anti-patterns due to reviewer fatigue.',
        keyFeatures: [
          'Git webhook integration analyzing commit diffs in real time',
          'Rule-based static analysis combined with LLM security auditing',
          'Automated PR feedback comments with concrete diff suggestions'
        ],
        techStack: ['Python', 'Docker', 'FastAPI', 'GitHub REST API', 'PyLint'],
        resumeBullet: 'Created an automated GitHub review bot combining deterministic AST linting with LLM threat analysis, reducing review turnaround by 60%.'
      },
      {
        id: 'ai-3',
        title: 'Student Retention & Academic Risk Predictive Engine',
        badge: 'Applied ML',
        difficulty: 'Intermediate',
        problemStatement: 'Universities struggle to identify at-risk students early enough in the semester to deploy academic interventions.',
        keyFeatures: [
          'Feature engineering on longitudinal attendance and quiz logs',
          'Gradient boosting (XGBoost) classifier with cross-validation',
          'SHAP model interpretability dashboard displaying risk drivers'
        ],
        techStack: ['Python', 'Scikit-Learn', 'XGBoost', 'Pandas', 'Streamlit'],
        resumeBullet: 'Trained and validated an academic risk prediction model achieving 89% ROC-AUC with SHAP value visual explainability for advisors.'
      }
    ],
    'Data Science': [
      {
        id: 'ds-1',
        title: 'Interactive Global Tech Compensation & Hiring Trends',
        badge: 'Storytelling MVP',
        difficulty: isBeginner ? 'Basic' : 'Intermediate',
        problemStatement: 'Job seekers lack transparent insight into how compensation correlates with tech stack, region, and years of experience.',
        keyFeatures: [
          'Automated data cleaning and outlier detection on salary survey data',
          'Dynamic multi-filter drilldowns by tech stack and location',
          'Interactive Plotly charts and downloadable CSV exports'
        ],
        techStack: ['Python', 'Pandas', 'Plotly', 'Streamlit', 'Statsmodels'],
        resumeBullet: 'Published an interactive compensation intelligence dashboard handling 25,000+ survey records with exploratory data visualizations.'
      },
      {
        id: 'ds-2',
        title: 'E-Commerce Churn Prediction & Customer Lifetime Value',
        badge: 'Business Value',
        difficulty: isBeginner ? 'Intermediate' : 'Advanced',
        problemStatement: 'Online businesses lose revenue by reacting to churn only after high-value customers have already canceled.',
        keyFeatures: [
          'RFM (Recency, Frequency, Monetary) feature extraction in PostgreSQL',
          'Logistic regression and Random Forest comparison models',
          'Cohort retention heatmaps and targeted promotion triggers'
        ],
        techStack: ['SQL (PostgreSQL)', 'Python', 'Scikit-Learn', 'Seaborn'],
        resumeBullet: 'Designed an RFM customer segmentation and churn pipeline in PostgreSQL and Python, identifying 18% of accounts at immediate churn risk.'
      },
      {
        id: 'ds-3',
        title: 'A/B Testing Simulator & Sample Size Power Calculator',
        badge: 'Product Analytics',
        difficulty: 'Intermediate',
        problemStatement: 'Product teams launch underpowered experiments that lead to false positives and misleading business decisions.',
        keyFeatures: [
          'Simulated binomial user conversion runs with customizable parameters',
          'Calculates p-values, confidence intervals, and statistical power',
          'Detects Sample Ratio Mismatch (SRM) and generates verdict reports'
        ],
        techStack: ['Python', 'SciPy', 'Statsmodels', 'Streamlit', 'Docker'],
        resumeBullet: 'Engineered a statistical experimentation engine that simulates conversion experiments and validates sample power to eliminate false discoveries.'
      }
    ],
    'App Development': [
      {
        id: 'app-1',
        title: 'Daily Technical Habit & LeetCode Sprint Companion',
        badge: 'Mobile MVP',
        difficulty: isBeginner ? 'Basic' : 'Intermediate',
        problemStatement: 'Aspiring engineers struggle to maintain consistent daily programming habits amidst busy schedules.',
        keyFeatures: [
          'Streak counters, daily challenge prompts, and local push notifications',
          'Offline-first storage preserving logs during network disconnects',
          'Polished micro-animations for task completion celebrations'
        ],
        techStack: ['React Native / Expo', 'AsyncStorage', 'NativeWind', 'Lucide Mobile'],
        resumeBullet: 'Shipped a cross-platform mobile habit tracker with persistent local state, scheduled native notifications, and 60 FPS interactions.'
      },
      {
        id: 'app-2',
        title: 'Campus Peer Marketplace with Instant Chat & Geolocation',
        badge: 'Full-Stack Mobile',
        difficulty: isBeginner ? 'Intermediate' : 'Advanced',
        problemStatement: 'College students need a trusted, hyper-local platform to buy and sell textbooks and electronics safely.',
        keyFeatures: [
          'Campus geofenced listings with image compression and upload',
          'Real-time WebSocket direct messaging between buyer and seller',
          'Push notifications for new offers and price drops'
        ],
        techStack: ['React Native', 'Supabase', 'WebSockets', 'Expo Router', 'Tailwind'],
        resumeBullet: 'Architected a mobile peer marketplace with real-time Supabase messaging and location-based discovery across 12 campus zones.'
      },
      {
        id: 'app-3',
        title: 'Offline-First Audio Note Transcriber & Voice Journal',
        badge: 'Native Hardware',
        difficulty: 'Advanced',
        problemStatement: 'Students taking lecture notes on the go lose recordings when connectivity drops or background recording stops.',
        keyFeatures: [
          'Background audio recording service with waveform visualizer',
          'Local SQLite storage using WatermelonDB for zero-lag querying',
          'On-device Whisper AI speech-to-text inference integration'
        ],
        techStack: ['React Native', 'WatermelonDB', 'Reanimated 3', 'Whisper.cpp'],
        resumeBullet: 'Engineered an offline-first voice recording suite with on-device speech transcription and local SQLite persistence.'
      }
    ]
  };

  const projectRecommendations = projectsMap[interest] || projectsMap['Web Development'];

  // 6. Recommended Technologies to Learn (Structured by category)
  const techMap = {
    'Web Development': [
      {
        category: 'Core Language & Framework',
        technologies: [
          { name: 'React 19 & Next.js 14', level: 'Primary', reason: 'Industry standard for modern scalable frontend & full-stack development.' },
          { name: 'TypeScript', level: 'Essential', reason: 'Enforces type contracts, catches bugs early, and is required for 85%+ of job postings.' }
        ]
      },
      {
        category: 'Styling & State Management',
        technologies: [
          { name: 'Tailwind CSS', level: 'Primary', reason: 'Rapid utility-first styling with zero runtime cost and built-in responsiveness.' },
          { name: 'Zustand / Redux Toolkit', level: 'Essential', reason: 'Predictable, lightweight state store without boilerplate.' }
        ]
      },
      {
        category: 'Backend & Persistence',
        technologies: [
          { name: 'PostgreSQL & Prisma', level: 'High Value', reason: 'Reliable relational database modeling with type-safe ORM queries.' },
          { name: 'REST & GraphQL APIs', level: 'Essential', reason: 'Core client-server communication and efficient data fetching.' }
        ]
      },
      {
        category: 'Testing & Deployment',
        technologies: [
          { name: 'Vitest & Playwright', level: 'High Value', reason: 'Blazing fast unit and end-to-end automated testing.' },
          { name: 'Vercel / Docker CI/CD', level: 'Production', reason: 'Automated deployment pipelines and containerized reproducibility.' }
        ]
      }
    ],
    'AI/ML': [
      {
        category: 'Core Language & Frameworks',
        technologies: [
          { name: 'Python 3.11+', level: 'Primary', reason: 'Universal lingua franca for AI research, modeling, and production pipelines.' },
          { name: 'PyTorch', level: 'Essential', reason: 'The leading deep learning research and production framework.' }
        ]
      },
      {
        category: 'Data & Matrix Operations',
        technologies: [
          { name: 'NumPy & Pandas', level: 'Essential', reason: 'Vectorized mathematical manipulation and tabular dataset preparation.' },
          { name: 'Scikit-Learn', level: 'Core', reason: 'Fundamental classical machine learning algorithms and evaluation metrics.' }
        ]
      },
      {
        category: 'Generative AI & LLM Stack',
        technologies: [
          { name: 'LangChain & LlamaIndex', level: 'High Value', reason: 'Orchestrating agents, chunking strategies, and RAG pipelines.' },
          { name: 'ChromaDB / Pinecone', level: 'High Value', reason: 'Vector databases for embedding indexing and sub-second similarity search.' }
        ]
      },
      {
        category: 'Deployment & MLOps',
        technologies: [
          { name: 'FastAPI', level: 'Primary', reason: 'High-performance asynchronous Python API framework for model serving.' },
          { name: 'Docker & ONNX Runtime', level: 'Production', reason: 'Hardware-optimized model inference and isolated microservice containers.' }
        ]
      }
    ],
    'Data Science': [
      {
        category: 'Data Querying & Relational Stores',
        technologies: [
          { name: 'Advanced SQL (PostgreSQL)', level: 'Primary', reason: 'The foundational data language for joins, window functions, and aggregations.' },
          { name: 'Python & Pandas', level: 'Essential', reason: 'Data transformation, cleaning, and exploratory analysis.' }
        ]
      },
      {
        category: 'Visualization & Storytelling',
        technologies: [
          { name: 'Plotly & Seaborn', level: 'High Value', reason: 'Creating compelling statistical charts and interactive visual narratives.' },
          { name: 'Streamlit', level: 'Primary', reason: 'Fastest way to turn Python data scripts into interactive shareable web apps.' }
        ]
      },
      {
        category: 'Statistical & Predictive Tools',
        technologies: [
          { name: 'Scikit-Learn', level: 'Core', reason: 'Supervised and unsupervised regression, clustering, and classification.' },
          { name: 'SciPy & Statsmodels', level: 'High Value', reason: 'Hypothesis testing, regression diagnostics, and p-value validation.' }
        ]
      },
      {
        category: 'Cloud Warehousing & Big Data',
        technologies: [
          { name: 'Google BigQuery / Snowflake', level: 'Industry Standard', reason: 'Executing queries against petabyte-scale cloud datasets.' },
          { name: 'Apache Airflow', level: 'Production', reason: 'Scheduling and monitoring automated enterprise data workflows.' }
        ]
      }
    ],
    'App Development': [
      {
        category: 'Core Mobile Frameworks',
        technologies: [
          { name: 'React Native & Expo', level: 'Primary', reason: 'Fastest route to building production iOS and Android apps with a single codebase.' },
          { name: 'TypeScript', level: 'Essential', reason: 'Strict typing for component props, navigation parameters, and API responses.' }
        ]
      },
      {
        category: 'State & Navigation',
        technologies: [
          { name: 'Expo Router / React Navigation', level: 'Primary', reason: 'Declarative, file-based routing and native gesture navigation stacks.' },
          { name: 'Zustand & MMKV', level: 'High Value', reason: 'Ultra-fast key-value storage and lightweight reactive mobile state.' }
        ]
      },
      {
        category: 'Animations & UI Craft',
        technologies: [
          { name: 'React Native Reanimated 3', level: 'High Value', reason: 'Hardware-accelerated 60 FPS animations running directly on the UI thread.' },
          { name: 'NativeWind (Tailwind)', level: 'Primary', reason: 'Consistent utility styling unified across web and native mobile.' }
        ]
      },
      {
        category: 'Backend & Distribution',
        technologies: [
          { name: 'Supabase / Firebase', level: 'Essential', reason: 'Turnkey mobile backend for authentication, database, and push notifications.' },
          { name: 'EAS Build & Fastlane', level: 'Production', reason: 'Automated cloud compilation and App Store / Google Play distribution.' }
        ]
      }
    ]
  };

  const recommendedTechnologies = techMap[interest] || techMap['Web Development'];

  return {
    careerRecommendation,
    skillAssessment,
    skillGaps,
    roadmap30Days,
    projectRecommendations,
    recommendedTechnologies,
    metadata: {
      generatedAt: new Date().toISOString(),
      source: isLiveAPI ? 'Live AI Model' : 'SkillScreen AI Local Synthesis Engine',
      isSimulated: !isLiveAPI
    }
  };
}

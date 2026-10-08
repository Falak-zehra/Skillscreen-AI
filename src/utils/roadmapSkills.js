/**
 * Roadmap Skills Catalog
 * Sequenced 10-step personalized skills list per track
 * connected to the candidate's learning roadmap and job-ready benchmarks.
 */

import { SCREENING_QUESTIONS } from '../data/assessmentData';

export function getRoadmapSkills(selectedAnswers) {
  const level = SCREENING_QUESTIONS[0].options[selectedAnswers[1]] || 'Beginner';
  const interest = SCREENING_QUESTIONS[1].options[selectedAnswers[2]] || 'Web Development';
  const isBeginner = level === 'Beginner' || level === 'Basic';

  const trackSkills = {
    'Web Development': [
      {
        id: 'web-1',
        name: isBeginner ? 'Modern JavaScript (ES6+), Closures & Async/Await' : 'Advanced TypeScript Strict Typing, Generics & Utility Types',
        phase: 'Phase 1: Foundations',
        category: 'Core Language',
        estimatedHours: '12 hrs',
        description: 'Master lexical scoping, promise execution order, and asynchronous error boundaries without framework abstractions.'
      },
      {
        id: 'web-2',
        name: 'Component State Flow, Hooks & Derived State Architecture',
        phase: 'Phase 1: Foundations',
        category: 'Frontend Core',
        estimatedHours: '14 hrs',
        description: 'Structure clean unidirectional data flow, lift state without unnecessary re-renders, and build reusable custom hooks.'
      },
      {
        id: 'web-3',
        name: 'Responsive Layout Systems with Tailwind CSS & CSS Grid',
        phase: 'Phase 2: UI & Styling',
        category: 'UI Engineering',
        estimatedHours: '10 hrs',
        description: 'Construct multi-breakpoint responsive interfaces with zero layout shift and fluid typography.'
      },
      {
        id: 'web-4',
        name: 'Client-Side State Stores & Optimistic UI Updates (Zustand)',
        phase: 'Phase 2: Architecture',
        category: 'State Management',
        estimatedHours: '12 hrs',
        description: 'Manage complex global UI states with lightweight stores and instantaneous optimistic user feedback.'
      },
      {
        id: 'web-5',
        name: 'RESTful API & GraphQL Data Fetching with Resilient Error States',
        phase: 'Phase 2: Networking',
        category: 'Data Layer',
        estimatedHours: '10 hrs',
        description: 'Implement automated retries, request cancellation via AbortController, and loading skeletons.'
      },
      {
        id: 'web-6',
        name: 'Relational Database Schema Modeling (PostgreSQL & Prisma ORM)',
        phase: 'Phase 3: Backend Systems',
        category: 'Databases',
        estimatedHours: '16 hrs',
        description: 'Design normalized tables, foreign key relations, indexing strategies, and type-safe database queries.'
      },
      {
        id: 'web-7',
        name: 'Full-Stack Server Components & Server Actions (Next.js 14)',
        phase: 'Phase 3: Full-Stack',
        category: 'Modern Web',
        estimatedHours: '18 hrs',
        description: 'Build hybrid server-client rendered web applications with streaming SSR and secure server mutations.'
      },
      {
        id: 'web-8',
        name: 'Automated Unit & Integration Testing (Vitest & React Testing Library)',
        phase: 'Phase 4: Code Quality',
        category: 'Testing',
        estimatedHours: '12 hrs',
        description: 'Write maintainable test suites for critical user journeys and component interactions.'
      },
      {
        id: 'web-9',
        name: 'Web Performance Optimization & Core Web Vitals',
        phase: 'Phase 4: Production',
        category: 'Optimization',
        estimatedHours: '10 hrs',
        description: 'Profile bundle sizes, code-split dynamic imports, and eliminate Cumulative Layout Shift (CLS).'
      },
      {
        id: 'web-10',
        name: 'CI/CD Automated Deployment Pipelines & Flagship Portfolio',
        phase: 'Phase 4: Launch',
        category: 'DevOps & Career',
        estimatedHours: '14 hrs',
        description: 'Configure GitHub Actions automated check runs and deploy 2 production-ready showcase builds.'
      }
    ],
    'AI/ML': [
      {
        id: 'ai-1',
        name: 'Python Object-Oriented Programming & Matrix Mechanics',
        phase: 'Phase 1: Foundations',
        category: 'Core Language',
        estimatedHours: '12 hrs',
        description: 'Write idiomatic Python classes, generators, and vector math routines cleanly without slow loops.'
      },
      {
        id: 'ai-2',
        name: 'Vectorized Array Operations with NumPy & Tabular Wrangling with Pandas',
        phase: 'Phase 1: Foundations',
        category: 'Data Foundations',
        estimatedHours: '14 hrs',
        description: 'Clean raw datasets, handle missing indicators, and perform multidimensional tensor reshaping.'
      },
      {
        id: 'ai-3',
        name: 'Supervised Learning Algorithms & Cross-Validation (Scikit-Learn)',
        phase: 'Phase 2: Core ML',
        category: 'Classical ML',
        estimatedHours: '16 hrs',
        description: 'Train classification and regression models with robust k-fold validation and hyperparameter tuning.'
      },
      {
        id: 'ai-4',
        name: 'Linear Algebra, Probability Distributions & Gradient Optimization Math',
        phase: 'Phase 2: Theory',
        category: 'Mathematical Core',
        estimatedHours: '14 hrs',
        description: 'Build intuition for matrix dot products, eigenvalues, cross-entropy loss, and stochastic gradient descent.'
      },
      {
        id: 'ai-5',
        name: 'Neural Network Architecture & Tensor Operations (PyTorch)',
        phase: 'Phase 3: Deep Learning',
        category: 'Deep Learning',
        estimatedHours: '18 hrs',
        description: 'Implement multi-layer perceptrons and convolutional layers with backpropagation and GPU compute.'
      },
      {
        id: 'ai-6',
        name: 'Vector Embeddings & Semantic Indexing (ChromaDB / Pinecone)',
        phase: 'Phase 3: Generative AI',
        category: 'Vector Stores',
        estimatedHours: '12 hrs',
        description: 'Generate high-dimensional document embeddings and query vector databases with cosine similarity.'
      },
      {
        id: 'ai-7',
        name: 'Retrieval-Augmented Generation (RAG) Architecture & LangChain',
        phase: 'Phase 3: Generative AI',
        category: 'RAG Systems',
        estimatedHours: '16 hrs',
        description: 'Implement context chunking, document retrieval pipelines, and hallucination guardrails.'
      },
      {
        id: 'ai-8',
        name: 'FastAPI High-Performance Microservices for Model Inference',
        phase: 'Phase 4: Production',
        category: 'Model Serving',
        estimatedHours: '12 hrs',
        description: 'Wrap machine learning models in asynchronous REST endpoints with batching and request schemas.'
      },
      {
        id: 'ai-9',
        name: 'Docker Containerization & Latency Profiling (ONNX Runtime)',
        phase: 'Phase 4: Deployment',
        category: 'MLOps',
        estimatedHours: '14 hrs',
        description: 'Containerize model services and quantize weights for sub-100ms inference on production CPUs.'
      },
      {
        id: 'ai-10',
        name: 'Ragas Evaluation Metrics, Observability & Project Capstone',
        phase: 'Phase 4: Launch',
        category: 'Evaluation',
        estimatedHours: '12 hrs',
        description: 'Benchmark faithfulness and answer relevance scores, deploying a live AI showcase project.'
      }
    ],
    'Data Science': [
      {
        id: 'ds-1',
        name: 'Advanced SQL Querying (Window Functions, CTEs & Multi-Table Joins)',
        phase: 'Phase 1: Foundations',
        category: 'Relational Data',
        estimatedHours: '14 hrs',
        description: 'Execute analytical window calculations (LEAD, LAG, DENSE_RANK) and complex multi-join queries.'
      },
      {
        id: 'ds-2',
        name: 'Exploratory Data Analysis (EDA) & Data Cleaning with Pandas',
        phase: 'Phase 1: Foundations',
        category: 'Data Wrangling',
        estimatedHours: '14 hrs',
        description: 'Isolate anomalies, impute missing values, and transform unstructured tabular columns.'
      },
      {
        id: 'ds-3',
        name: 'Statistical Storytelling & Visualizations with Plotly & Seaborn',
        phase: 'Phase 2: Visualizations',
        category: 'Storytelling',
        estimatedHours: '10 hrs',
        description: 'Construct clear multivariate charts, correlation matrices, and distribution histograms.'
      },
      {
        id: 'ds-4',
        name: 'Applied Probability, Hypothesis Testing & P-Value Confidence Intervals',
        phase: 'Phase 2: Statistics',
        category: 'Statistical Rigor',
        estimatedHours: '14 hrs',
        description: 'Formulate null hypotheses, calculate test statistics, and interpret statistical significance.'
      },
      {
        id: 'ds-5',
        name: 'Predictive Feature Engineering & ColumnTransformer Pipelines',
        phase: 'Phase 3: Modeling',
        category: 'Feature Engineering',
        estimatedHours: '14 hrs',
        description: 'Prevent data leakage with Scikit-Learn pipelines combining scaling, one-hot encoding, and imputers.'
      },
      {
        id: 'ds-6',
        name: 'Supervised Regression & Classification Modeling with Scikit-Learn',
        phase: 'Phase 3: Machine Learning',
        category: 'Predictive Models',
        estimatedHours: '16 hrs',
        description: 'Train Random Forests and Logistic Regressions, comparing ROC-AUC, Precision, and Recall.'
      },
      {
        id: 'ds-7',
        name: 'A/B Testing Experimentation Design & Sample Ratio Mismatch Detection',
        phase: 'Phase 3: Business Analytics',
        category: 'Experimentation',
        estimatedHours: '12 hrs',
        description: 'Simulate conversion rate experiments and verify statistical sample power for product launches.'
      },
      {
        id: 'ds-8',
        name: 'Interactive Analytics Applications & Dashboards with Streamlit',
        phase: 'Phase 4: Applications',
        category: 'App Delivery',
        estimatedHours: '12 hrs',
        description: 'Deploy interactive web apps allowing non-technical stakeholders to filter and explore datasets.'
      },
      {
        id: 'ds-9',
        name: 'Cloud Data Warehousing & BigQuery Analytics',
        phase: 'Phase 4: Cloud Scale',
        category: 'Data Warehousing',
        estimatedHours: '12 hrs',
        description: 'Query partitioned cloud tables on Google BigQuery and optimize query billing costs.'
      },
      {
        id: 'ds-10',
        name: 'End-to-End Data Science Capstone & Published Case Study',
        phase: 'Phase 4: Launch',
        category: 'Portfolio',
        estimatedHours: '14 hrs',
        description: 'Publish a reproducible Jupyter notebook and executive summary report on GitHub and LinkedIn.'
      }
    ],
    'App Development': [
      {
        id: 'app-1',
        name: 'Cross-Platform UI Hierarchies & Layout with React Native / Expo',
        phase: 'Phase 1: Foundations',
        category: 'Mobile Core',
        estimatedHours: '12 hrs',
        description: 'Build native iOS and Android screens with core platform components and safe area constraints.'
      },
      {
        id: 'app-2',
        name: 'Multi-Screen Navigation & Stack Routing (Expo Router)',
        phase: 'Phase 1: Navigation',
        category: 'Routing',
        estimatedHours: '12 hrs',
        description: 'Implement tab bars, stack push/pop transitions, dynamic route parameters, and modal sheets.'
      },
      {
        id: 'app-3',
        name: 'Consistent Mobile Utility Styling with NativeWind (Tailwind CSS)',
        phase: 'Phase 2: UI Craft',
        category: 'Styling',
        estimatedHours: '10 hrs',
        description: 'Apply unified utility classes across web and mobile screen breakpoints.'
      },
      {
        id: 'app-4',
        name: 'Asynchronous API Consumption, Skeletons & Network Error Handling',
        phase: 'Phase 2: Networking',
        category: 'Data Flow',
        estimatedHours: '12 hrs',
        description: 'Manage remote API data fetching with offline fallback states and retry buttons.'
      },
      {
        id: 'app-5',
        name: 'Client-Side Key-Value Persistence with MMKV & AsyncStorage',
        phase: 'Phase 2: Persistence',
        category: 'Local Storage',
        estimatedHours: '10 hrs',
        description: 'Save user preferences, auth tokens, and offline form drafts persistently across app reboots.'
      },
      {
        id: 'app-6',
        name: 'Offline-First SQLite Database Architecture (WatermelonDB)',
        phase: 'Phase 3: Architecture',
        category: 'Offline Sync',
        estimatedHours: '16 hrs',
        description: 'Implement a local SQLite database that replays mutations to the backend when online.'
      },
      {
        id: 'app-7',
        name: 'Native Hardware APIs: Camera, Geolocation & Push Notifications',
        phase: 'Phase 3: Native Integration',
        category: 'Hardware APIs',
        estimatedHours: '14 hrs',
        description: 'Request device permissions gracefully, capture camera photos, and schedule local push alerts.'
      },
      {
        id: 'app-8',
        name: '60 FPS Gesture Responders & Animations (Reanimated 3)',
        phase: 'Phase 4: Optimization',
        category: 'Animations',
        estimatedHours: '14 hrs',
        description: 'Run smooth pan gestures and dismiss cards on the native UI thread without JS frame drops.'
      },
      {
        id: 'app-9',
        name: 'Automated Cloud Builds & Distribution (EAS Build / Fastlane)',
        phase: 'Phase 4: Release',
        category: 'CI/CD & Builds',
        estimatedHours: '12 hrs',
        description: 'Compile iOS .ipa and Android .apk bundles automatically using cloud build agents.'
      },
      {
        id: 'app-10',
        name: 'Production Store Polish, App Store / Play Store Deployment',
        phase: 'Phase 4: Launch',
        category: 'Store Delivery',
        estimatedHours: '14 hrs',
        description: 'Configure app icons, splash screens, privacy manifests, and share a testable installation link.'
      }
    ]
  };

  return trackSkills[interest] || trackSkills['Web Development'];
}

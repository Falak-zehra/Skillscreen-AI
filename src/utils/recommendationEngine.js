/**
 * SkillScreen AI Recommendation Engine
 * Deterministic rules-based logic mapping 5 screening questions
 * to a tailored technical skill profile, gaps, roadmap, projects, and next steps.
 */

export function generateRecommendations(answers) {
  // answers: { 1: optionIndex, 2: optionIndex, 3: optionIndex, 4: optionIndex, 5: optionIndex }
  const levelOptions = ['Beginner', 'Basic', 'Intermediate', 'Advanced'];
  const interestOptions = ['Web Development', 'AI/ML', 'Data Science', 'App Development'];
  const problemOptions = ['Beginner', 'Somewhat comfortable', 'Comfortable', 'Very comfortable'];
  const timeOptions = ['1–5 hours', '5–10 hours', '10–20 hours', '20+ hours'];
  const goalOptions = ['Get an internship', 'Get a job', 'Build projects', 'Prepare for higher studies'];

  const level = levelOptions[answers[1]] || 'Beginner';
  const interest = interestOptions[answers[2]] || 'Web Development';
  const problemSolving = problemOptions[answers[3]] || 'Beginner';
  const timeCommitment = timeOptions[answers[4]] || '5–10 hours';
  const goal = goalOptions[answers[5]] || 'Build projects';

  // 1. Skill Level Assessment
  const levelProfiles = {
    Beginner: {
      title: 'Beginner',
      badge: 'warning',
      tagline: 'Early Foundation Stage',
      description: 'You are taking your first steps in software engineering. Focus on building rock-solid syntax intuition, core programming habits, and fundamental problem-solving.',
      readinessScore: 35
    },
    Basic: {
      title: 'Basic',
      badge: 'purple',
      tagline: 'Developing Competence',
      description: 'You understand fundamental concepts and syntax. The next milestone is transitioning from isolated exercises to interconnected application building.',
      readinessScore: 55
    },
    Intermediate: {
      title: 'Intermediate',
      badge: 'cyan',
      tagline: 'Practical Builder',
      description: 'You can build functional applications independently. Your key opportunity is mastering architectural patterns, performance, and clean code standards.',
      readinessScore: 75
    },
    Advanced: {
      title: 'Advanced',
      badge: 'success',
      tagline: 'Production-Ready Practitioner',
      description: 'You possess strong technical autonomy. Focus on system scalability, advanced architectural decisions, and high-impact engineering execution.',
      readinessScore: 92
    }
  };

  const skillLevelData = levelProfiles[level];

  // 2. Career Direction
  const careerDirections = {
    'Web Development': {
      title: goal === 'Get a job' ? 'Full-Stack Software Engineer' : goal === 'Get an internship' ? 'Junior Frontend / Web Developer' : 'Modern Web Application Developer',
      track: 'Web Development',
      badge: 'primary',
      demand: 'High Industry Demand',
      description: 'Building responsive user interfaces, scalable server-side APIs, and interactive web software utilizing modern frameworks and cloud platforms.',
      primarySkills: ['React / Next.js', 'TypeScript', 'Node.js / Express', 'Tailwind CSS', 'REST & GraphQL APIs', 'PostgreSQL / MongoDB']
    },
    'AI/ML': {
      title: goal === 'Prepare for higher studies' ? 'Applied AI & ML Researcher' : goal === 'Get a job' ? 'Machine Learning Engineer' : 'AI Systems & Agent Developer',
      track: 'AI & Machine Learning',
      badge: 'purple',
      demand: 'Rapidly Growing Domain',
      description: 'Designing intelligent models, building generative AI pipelines, prompt systems, and deploying machine learning models into production.',
      primarySkills: ['Python & PyTorch', 'Transformers & HuggingFace', 'Vector Databases (Chroma/Pinecone)', 'RAG Pipelines', 'FastAPI', 'NumPy & Scikit-Learn']
    },
    'Data Science': {
      title: goal === 'Get a job' ? 'Data Analyst / Scientist' : goal === 'Get an internship' ? 'Associate Data Analyst' : 'Data Intelligence Specialist',
      track: 'Data Science & Analytics',
      badge: 'cyan',
      demand: 'High Corporate Value',
      description: 'Transforming complex datasets into actionable statistical insights, predictive forecasting models, and interactive dashboard analytics.',
      primarySkills: ['Python & Pandas', 'Advanced SQL', 'Exploratory Data Analysis', 'Tableau / PowerBI', 'Statistical Modeling', 'Machine Learning Basics']
    },
    'App Development': {
      title: goal === 'Get a job' ? 'Mobile Application Engineer' : goal === 'Build projects' ? 'Cross-Platform Product Creator' : 'Mobile Software Developer',
      track: 'Mobile App Engineering',
      badge: 'success',
      demand: 'High Consumer & Enterprise Need',
      description: 'Architecting high-performance, responsive native and hybrid mobile applications for iOS and Android ecosystems.',
      primarySkills: ['React Native / Flutter', 'Mobile State Management', 'Offline Storage (SQLite/Watermelon)', 'Native Device APIs', 'App Store / Play Store CI/CD']
    }
  };

  const careerDirectionData = careerDirections[interest];

  // 3. Skill Gaps (3–5 skills based on level + interest + problemSolving)
  const getSkillGaps = () => {
    const gaps = [];

    // Problem solving gap if weak
    if (problemSolving === 'Beginner' || problemSolving === 'Somewhat comfortable') {
      gaps.push({
        name: 'Data Structures & Algorithmic Problem Solving',
        severity: 'Critical Priority',
        type: 'Foundational',
        whyItMatters: 'Essential for technical interview screens and writing optimal, memory-conscious logic.',
        action: 'Practice basic data structures (Arrays, Hash Maps, Two Pointers) on LeetCode/HackerRank 3x weekly.'
      });
    }

    if (interest === 'Web Development') {
      if (level === 'Beginner' || level === 'Basic') {
        gaps.push(
          {
            name: 'Modern JavaScript (ES6+) & Asynchronous Flow',
            severity: 'High Priority',
            type: 'Core Language',
            whyItMatters: 'Frameworks like React heavily depend on Promises, async/await, closures, and array methods.',
            action: 'Build interactive vanilla JavaScript mini-projects before diving deep into complex framework ecosystems.'
          },
          {
            name: 'Component State & Props Architecture',
            severity: 'High Priority',
            type: 'Framework Architecture',
            whyItMatters: 'Understanding unidirectional data flow prevents state desynchronization and re-render bugs.',
            action: 'Implement small multi-component apps managing state, lifted handlers, and derived values.'
          },
          {
            name: 'Responsive CSS Grid & Flexbox Layouts',
            severity: 'Medium Priority',
            type: 'Styling & UI',
            whyItMatters: 'Hiring managers test mobile responsiveness immediately when reviewing portfolios.',
            action: 'Recreate popular landing pages using Tailwind CSS focusing on breakpoint consistency.'
          }
        );
      } else {
        gaps.push(
          {
            name: 'Server-Side Rendering & Full-Stack Next.js',
            severity: 'High Priority',
            type: 'Architecture',
            whyItMatters: 'Modern production web apps rely on server components, streaming, and edge caching for SEO & speed.',
            action: 'Migrate a standard client-side React app to Next.js App Router with Server Actions.'
          },
          {
            name: 'Database Modeling & ORM Integration',
            severity: 'Medium Priority',
            type: 'Backend & Data',
            whyItMatters: 'Real-world positions require schema design, relational migrations, and query efficiency.',
            action: 'Design a PostgreSQL database using Prisma or Drizzle ORM with foreign keys and indexes.'
          },
          {
            name: 'Automated Testing (Unit & Integration)',
            severity: 'Medium Priority',
            type: 'Code Quality',
            whyItMatters: 'Separates junior tinkerers from engineers who write maintainable, reliable code.',
            action: 'Add Vitest and React Testing Library tests covering core user interactions.'
          }
        );
      }
    } else if (interest === 'AI/ML') {
      if (level === 'Beginner' || level === 'Basic') {
        gaps.push(
          {
            name: 'Vectorized Data Processing with NumPy & Pandas',
            severity: 'High Priority',
            type: 'Data Foundation',
            whyItMatters: 'Model inputs and matrices require proficient array manipulation without slow Python loops.',
            action: 'Complete practical exercises transforming messy CSV datasets using Pandas.'
          },
          {
            name: 'Foundational Machine Learning Mathematics',
            severity: 'High Priority',
            type: 'Theory & Core',
            whyItMatters: 'Intuition for gradient descent, matrix multiplication, and loss functions is vital for debugging models.',
            action: 'Study 3Blue1Brown’s Essence of Linear Algebra and implement basic linear regression from scratch.'
          },
          {
            name: 'API Development with FastAPI',
            severity: 'Medium Priority',
            type: 'Engineering Deployment',
            whyItMatters: 'AI models provide no real value unless wrapped in accessible microservices.',
            action: 'Build a lightweight REST endpoint that serves predictions from a Scikit-Learn pipeline.'
          }
        );
      } else {
        gaps.push(
          {
            name: 'Retrieval-Augmented Generation (RAG) Architecture',
            severity: 'High Priority',
            type: 'Generative AI',
            whyItMatters: 'Industry demands custom context injection, chunking strategies, and vector indexing.',
            action: 'Build a document Q&A system using LangChain/LlamaIndex, embeddings, and vector stores.'
          },
          {
            name: 'Model Fine-Tuning & Quantization Techniques',
            severity: 'Medium Priority',
            type: 'Deep Learning',
            whyItMatters: 'Adapting open-source LLMs (Llama, Mistral) with LoRA/QLoRA is a high-demand skill.',
            action: 'Fine-tune a small open model on a specific text classification task using Hugging Face PEFT.'
          },
          {
            name: 'MLOps & Inference Optimization',
            severity: 'Medium Priority',
            type: 'Production Systems',
            whyItMatters: 'High latency and unmonitored model drift break production deployments.',
            action: 'Set up Docker containers, model caching, and batch prediction pipelines.'
          }
        );
      }
    } else if (interest === 'Data Science') {
      if (level === 'Beginner' || level === 'Basic') {
        gaps.push(
          {
            name: 'Relational Database Queries & Complex SQL Joins',
            severity: 'High Priority',
            type: 'Data Retrieval',
            whyItMatters: 'SQL is the single most tested skill in data analyst and data science interviews.',
            action: 'Practice window functions, GROUP BY HAVING, and subqueries on LeetCode SQL 50.'
          },
          {
            name: 'Exploratory Data Analysis (EDA) Techniques',
            severity: 'High Priority',
            type: 'Analytics',
            whyItMatters: 'Uncovering anomalies, distributions, and correlations drives every business decision.',
            action: 'Conduct end-to-end analysis on an open Kaggle dataset with Seaborn or Plotly visualizations.'
          },
          {
            name: 'Applied Probability & Statistical Inference',
            severity: 'Medium Priority',
            type: 'Mathematical Core',
            whyItMatters: 'Prevent drawing misleading conclusions from noisy datasets.',
            action: 'Review p-values, confidence intervals, A/B testing methodologies, and hypothesis tests.'
          }
        );
      } else {
        gaps.push(
          {
            name: 'End-to-End Feature Engineering Pipelines',
            severity: 'High Priority',
            type: 'Machine Learning',
            whyItMatters: 'Clean tabular pipelines prevent data leakage during model training and evaluation.',
            action: 'Implement Scikit-Learn Pipelines with ColumnTransformers and custom encoders.'
          },
          {
            name: 'A/B Testing & Experimentation Design',
            severity: 'High Priority',
            type: 'Business Impact',
            whyItMatters: 'Companies evaluate feature rollouts through rigorous statistical experimentation.',
            action: 'Simulate power calculations, sample sizing, and statistical significance on user engagement logs.'
          },
          {
            name: 'Cloud Data Warehousing (BigQuery / Snowflake)',
            severity: 'Medium Priority',
            type: 'Infrastructure',
            whyItMatters: 'Modern analytics teams work with petabyte-scale cloud datasets rather than local CSVs.',
            action: 'Query public datasets on Google BigQuery using partitioned and clustered tables.'
          }
        );
      }
    } else {
      // App Development
      if (level === 'Beginner' || level === 'Basic') {
        gaps.push(
          {
            name: 'Mobile Layout & Navigation Hierarchy',
            severity: 'High Priority',
            type: 'UI Architecture',
            whyItMatters: 'Stack, tab, and drawer navigators are the bedrock of intuitive mobile experiences.',
            action: 'Build a multi-screen prototype using React Navigation or Flutter Navigator.'
          },
          {
            name: 'Async Network Requests & Error Handling',
            severity: 'High Priority',
            type: 'Data Flow',
            whyItMatters: 'Mobile devices frequently lose connectivity; apps must handle network drops gracefully.',
            action: 'Add loading skeletons, retry buttons, and offline caching to an API-connected app.'
          },
          {
            name: 'Local Storage & Persistence',
            severity: 'Medium Priority',
            type: 'Storage',
            whyItMatters: 'User sessions, preferences, and offline drafts must survive app restarts.',
            action: 'Implement MMKV or Async Storage for client-side persistence.'
          }
        );
      } else {
        gaps.push(
          {
            name: 'Native Device Hardware APIs & Permissions',
            severity: 'High Priority',
            type: 'Native Integration',
            whyItMatters: 'Camera, geolocation, biometric auth, and push notifications require proper permission handling.',
            action: 'Implement biometric authentication and push notifications in a React Native app.'
          },
          {
            name: 'Mobile Performance & Memory Leak Prevention',
            severity: 'High Priority',
            type: 'Optimization',
            whyItMatters: 'Jank, heavy list rendering, and excessive battery usage cause high app uninstall rates.',
            action: 'Profile a large FlatList/FlashList with FlashList/memoization to maintain steady 60 FPS.'
          },
          {
            name: 'Automated CI/CD & Store Deployment',
            severity: 'Medium Priority',
            type: 'Release Engineering',
            whyItMatters: 'Automated Fastlane or EAS workflows save dozens of hours per release.',
            action: 'Set up an automated build pipeline using GitHub Actions and EAS Build.'
          }
        );
      }
    }

    // Ensure 3 to 5 gaps
    return gaps.slice(0, 4);
  };

  const skillGaps = getSkillGaps();

  // 4. Recommended Learning Path (logical sequence in 4 milestones)
  const getLearningPath = () => {
    const isBeginnerTrack = level === 'Beginner' || level === 'Basic';

    const paths = {
      'Web Development': [
        {
          step: 1,
          phase: 'Phase 1: Foundations & Core Logic',
          skills: isBeginnerTrack ? 'Semantic HTML5, Modern CSS, ES6+ JS Fundamentals (Arrays, Objects, Functions)' : 'Advanced TypeScript, Functional Patterns, Complex Data Structures',
          duration: timeCommitment === '20+ hours' ? '1–2 weeks' : '3–4 weeks',
          milestone: 'Solid conceptual command of language mechanics without relying on blind copy-paste.'
        },
        {
          step: 2,
          phase: 'Phase 2: Modern Frontend Architecture',
          skills: 'React Component Hierarchy, Custom Hooks, State Management (Zustand), Tailwind CSS Design Systems',
          duration: timeCommitment === '20+ hours' ? '2–3 weeks' : '4–5 weeks',
          milestone: 'Ability to construct modular, responsive, and reactive web applications independently.'
        },
        {
          step: 3,
          phase: 'Phase 3: Full-Stack & API Integrations',
          skills: 'Next.js App Router, Server Actions, PostgreSQL / Supabase, Authentication, RESTful APIs',
          duration: timeCommitment === '20+ hours' ? '2–3 weeks' : '4–6 weeks',
          milestone: 'Connecting database-backed business logic with clean frontend user experiences.'
        },
        {
          step: 4,
          phase: 'Phase 4: Production Readiness & Portfolio',
          skills: 'Performance Profiling, Automated Testing (Vitest/Playwright), CI/CD Deployment, Portfolio Polish',
          duration: timeCommitment === '20+ hours' ? '1–2 weeks' : '2–3 weeks',
          milestone: '2 production-grade deployed flagship projects ready for technical employer review.'
        }
      ],
      'AI/ML': [
        {
          step: 1,
          phase: 'Phase 1: Python & Mathematical Foundations',
          skills: isBeginnerTrack ? 'Python OOP, NumPy Array Operations, Essential Linear Algebra & Probability' : 'Vectorized Optimization, PyTorch Tensors, GPU Compute Basics',
          duration: timeCommitment === '20+ hours' ? '1–2 weeks' : '3–4 weeks',
          milestone: 'Confidence manipulating multi-dimensional matrices and writing clean Python pipelines.'
        },
        {
          step: 2,
          phase: 'Phase 2: Applied Machine Learning & Data Flow',
          skills: 'Data Preprocessing with Pandas, Scikit-Learn Pipelines, Loss Functions & Evaluation Metrics',
          duration: timeCommitment === '20+ hours' ? '2–3 weeks' : '4–5 weeks',
          milestone: 'Trained and validated baseline predictive models with robust cross-validation.'
        },
        {
          step: 3,
          phase: 'Phase 3: Deep Learning & Generative AI',
          skills: 'Transformers, Embeddings, LangChain/LlamaIndex, Vector Search (ChromaDB), FastAPI Endpoints',
          duration: timeCommitment === '20+ hours' ? '2–3 weeks' : '4–6 weeks',
          milestone: 'Functional AI-powered application delivering semantic search or generative reasoning.'
        },
        {
          step: 4,
          phase: 'Phase 4: Model Deployment & Portfolio',
          skills: 'Docker Containerization, Cloud Model Hosting, Latency Benchmarking, Technical Case Study Writeup',
          duration: timeCommitment === '20+ hours' ? '1–2 weeks' : '2–3 weeks',
          milestone: 'Production AI service deployed with live demo and open-source GitHub documentation.'
        }
      ],
      'Data Science': [
        {
          step: 1,
          phase: 'Phase 1: Relational Data & Python Fundamentals',
          skills: 'SQL Queries, Joins & Aggregations, Python Data Types, Jupyter Notebook Workflows',
          duration: timeCommitment === '20+ hours' ? '1–2 weeks' : '3–4 weeks',
          milestone: 'Extracting and querying structured business data with error-free SQL logic.'
        },
        {
          step: 2,
          phase: 'Phase 2: Exploratory Data Analysis & Visualization',
          skills: 'Pandas Data Wrangling, Outlier Detection, Seaborn/Plotly Storytelling, Statistical Distributions',
          duration: timeCommitment === '20+ hours' ? '2–3 weeks' : '4–5 weeks',
          milestone: 'Turning raw messy tables into executive-level statistical dashboards and insight summaries.'
        },
        {
          step: 3,
          phase: 'Phase 3: Predictive Modeling & Experimentation',
          skills: 'Feature Engineering, Regression & Classification Models, A/B Testing, Hypothesis Testing',
          duration: timeCommitment === '20+ hours' ? '2–3 weeks' : '4–6 weeks',
          milestone: 'Building models that predict business metrics with measured confidence intervals.'
        },
        {
          step: 4,
          phase: 'Phase 4: Production Pipelines & Case Studies',
          skills: 'Automated ETL Pipelines, Streamlit / Dash Interactive Apps, BigQuery Analytics, Portfolio Polish',
          duration: timeCommitment === '20+ hours' ? '1–2 weeks' : '2–3 weeks',
          milestone: 'End-to-end data story published with live interactive dashboard and reproducible code.'
        }
      ],
      'App Development': [
        {
          step: 1,
          phase: 'Phase 1: Core Framework & Layout',
          skills: isBeginnerTrack ? 'JavaScript/Dart Fundamentals, Mobile UI Layouts, Flexbox Grid, Platform Components' : 'Cross-Platform Architecture, Native Bridge Concepts, TypeScript Typing',
          duration: timeCommitment === '20+ hours' ? '1–2 weeks' : '3–4 weeks',
          milestone: 'Constructing multi-screen mobile interfaces that adhere to iOS and Android design guidelines.'
        },
        {
          step: 2,
          phase: 'Phase 2: State, Navigation & Data Fetching',
          skills: 'React Navigation, State Management (Zustand/Redux), REST API Client, Offline Caching',
          duration: timeCommitment === '20+ hours' ? '2–3 weeks' : '4–5 weeks',
          milestone: 'Building reactive mobile screens that sync data smoothly with external cloud backends.'
        },
        {
          step: 3,
          phase: 'Phase 3: Device Hardware & Native Integrations',
          skills: 'Camera, Push Notifications, Geolocation, Biometrics, SQLite Database Persistence',
          duration: timeCommitment === '20+ hours' ? '2–3 weeks' : '4–6 weeks',
          milestone: 'Utilizing native device capabilities to deliver a responsive, immersive app experience.'
        },
        {
          step: 4,
          phase: 'Phase 4: Release Engineering & Store Polish',
          skills: 'Performance Profiling, Bundle Size Optimization, EAS Build / Fastlane, TestFlight / APK Testing',
          duration: timeCommitment === '20+ hours' ? '1–2 weeks' : '2–3 weeks',
          milestone: 'Production app published or testable via direct install link with polished animations.'
        }
      ]
    };

    return paths[interest] || paths['Web Development'];
  };

  const learningPath = getLearningPath();

  // 5. Recommended Projects (2–3 projects suitable for level + interest)
  const getProjects = () => {
    const isBeginner = level === 'Beginner' || level === 'Basic';

    const projectsMap = {
      'Web Development': isBeginner ? [
        {
          title: 'Interactive Skill Assessment & Quiz Dashboard',
          difficulty: 'Beginner / Basic',
          stack: ['React', 'Tailwind CSS', 'Vite', 'LocalStorage'],
          description: 'A responsive quiz platform with category selection, animated timers, question progress tracking, and instant score breakdowns with persistent local history.',
          outcome: 'Demonstrates component modularity, state lifting, and responsive UI craft.'
        },
        {
          title: 'Student Course & Assignment Tracker',
          difficulty: 'Basic / Intermediate',
          stack: ['React', 'TypeScript', 'Tailwind CSS', 'Context API'],
          description: 'A productivity application allowing students to track course milestones, filter assignments by deadline, calculate grade averages, and persist data across visits.',
          outcome: 'Proves structured state management, form validation, and complex data filtering.'
        },
        {
          title: 'Developer Portfolio with Interactive Project Showcase',
          difficulty: 'Basic',
          stack: ['HTML5', 'Tailwind CSS', 'JavaScript', 'Vercel / GitHub Pages'],
          description: 'A fast, high-performance personal portfolio showcasing your background, responsive project cards with live demo links, and an accessible contact workflow.',
          outcome: 'Essential for sharing with hiring managers, recruiters, and peers.'
        }
      ] : [
        {
          title: 'Full-Stack Developer Mentorship & Collaboration Hub',
          difficulty: 'Intermediate / Advanced',
          stack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Prisma', 'NextAuth'],
          description: 'A platform connecting student developers with mentors. Includes session scheduling, real-time feedback notes, role-based access, and secure authentication.',
          outcome: 'Shows full-stack capabilities, server-side data fetching, and relational database modeling.'
        },
        {
          title: 'Real-Time Collaborative Code Snippet Workspace',
          difficulty: 'Advanced',
          stack: ['React', 'Node.js', 'Socket.io', 'Monaco Editor', 'Docker'],
          description: 'An interactive browser IDE where students can share code snippets, see live multi-cursor updates from peers, and test code execution outputs in a sandboxed container.',
          outcome: 'Highlights asynchronous communication, WebSockets, and complex frontend UI state.'
        },
        {
          title: 'High-Performance E-Commerce API & Storefront',
          difficulty: 'Intermediate',
          stack: ['Next.js', 'Stripe API', 'Zustand', 'Tailwind CSS', 'Supabase'],
          description: 'A fully functional storefront with server-rendered product catalog, dynamic cart management, optimistic UI updates, and test Stripe checkout integration.',
          outcome: 'Demonstrates production commerce flow, secure payments, and caching strategies.'
        }
      ],
      'AI/ML': isBeginner ? [
        {
          title: 'AI Study Assistant & Flashcard Generator',
          difficulty: 'Beginner / Basic',
          stack: ['Python', 'FastAPI', 'OpenAI API / Groq', 'Streamlit'],
          description: 'Upload lecture notes or textbook chapters to automatically generate categorized study flashcards, summary bullet points, and quick self-test quizzes.',
          outcome: 'Demonstrates prompt structuring, API orchestration, and rapid Python prototyping.'
        },
        {
          title: 'Student Grade & Dropout Risk Predictor',
          difficulty: 'Basic / Intermediate',
          stack: ['Python', 'Pandas', 'Scikit-Learn', 'Matplotlib'],
          description: 'Analyze historical student academic metrics (attendance, study hours, past marks) to predict course completion risks using supervised classification.',
          outcome: 'Shows data cleaning, feature correlation, and model evaluation techniques.'
        }
      ] : [
        {
          title: 'Multi-Document RAG Knowledge Base with Semantic Search',
          difficulty: 'Intermediate / Advanced',
          stack: ['Python', 'LangChain', 'ChromaDB', 'FastAPI', 'React UI'],
          description: 'An intelligent retrieval system that ingests PDF documentation, indexes chunks into a vector database, and answers user queries with cited source passages.',
          outcome: 'Proves modern Generative AI engineering, vector indexing, and low-latency API delivery.'
        },
        {
          title: 'Real-Time Edge Computer Vision Object Tracker',
          difficulty: 'Advanced',
          stack: ['PyTorch', 'YOLOv8', 'OpenCV', 'ONNX Runtime'],
          description: 'Real-time webcam video stream analyzer detecting classroom engagement or objects with optimized ONNX inference running on consumer CPU hardware.',
          outcome: 'Highlights computer vision, tensor pipelines, and inference optimization.'
        }
      ],
      'Data Science': isBeginner ? [
        {
          title: 'Global Tech Salaries & Hiring Trends Dashboard',
          difficulty: 'Beginner / Basic',
          stack: ['Python', 'Pandas', 'Plotly', 'Streamlit'],
          description: 'An interactive dashboard exploring software developer compensation by location, remote status, and years of experience using real industry survey data.',
          outcome: 'Demonstrates data storytelling, outlier filtering, and interactive visualization.'
        },
        {
          title: 'E-Commerce Customer Churn Analysis',
          difficulty: 'Basic / Intermediate',
          stack: ['SQL (PostgreSQL)', 'Python', 'Seaborn', 'Scikit-Learn'],
          description: 'Extract customer order history using SQL joins, compute retention metrics, and train a logistic regression model to identify churn indicators.',
          outcome: 'Proves relational SQL querying alongside predictive statistical modeling.'
        }
      ] : [
        {
          title: 'Automated End-to-End Stock Market ETL & Analytics Pipeline',
          difficulty: 'Intermediate / Advanced',
          stack: ['Python', 'DuckDB / BigQuery', 'Apache Airflow', 'Metabase'],
          description: 'A scheduled data pipeline pulling daily market metrics, performing automated anomaly checks, and loading structured aggregates into a data warehouse.',
          outcome: 'Highlights enterprise ETL patterns, pipeline orchestration, and data warehousing.'
        },
        {
          title: 'A/B Testing Simulation & Statistical Experimentation Engine',
          difficulty: 'Intermediate',
          stack: ['Python', 'SciPy', 'Statsmodels', 'Streamlit'],
          description: 'Simulates conversion rate experiments, calculates p-values, detects sample ratio mismatches, and advises whether product features should launch.',
          outcome: 'Validates deep grasp of hypothesis testing, power analysis, and business impact.'
        }
      ],
      'App Development': isBeginner ? [
        {
          title: 'Daily Habit & Focus Sprint Companion',
          difficulty: 'Beginner / Basic',
          stack: ['React Native / Expo', 'AsyncStorage', 'Tailwind (NativeWind)'],
          description: 'A mobile app helping students track daily learning goals with countdown timers, streak counters, and motivational push notifications.',
          outcome: 'Shows mobile UX comprehension, component state, and device persistence.'
        },
        {
          title: 'Campus Food & Event Discovery App',
          difficulty: 'Basic / Intermediate',
          stack: ['React Native', 'Expo Router', 'Mapbox / Google Maps API'],
          description: 'A mobile guide displaying campus dining menus, event schedules, interactive map pins, and bookmarking for favorite student activities.',
          outcome: 'Proves multi-screen routing, device map integration, and external API consumption.'
        }
      ] : [
        {
          title: 'Offline-First Fitness & Workout Tracker',
          difficulty: 'Intermediate / Advanced',
          stack: ['React Native', 'WatermelonDB', 'Zustand', 'Reanimated 3'],
          description: 'A mobile tracking application featuring butter-smooth 60 FPS gesture animations, local SQLite storage, and background sync when connection is restored.',
          outcome: 'Demonstrates high-performance mobile UI, offline data sync, and database design.'
        },
        {
          title: 'Peer-to-Peer Campus Marketplace with Chat',
          difficulty: 'Advanced',
          stack: ['React Native', 'Supabase', 'WebSockets', 'Expo Notifications'],
          description: 'A student marketplace for textbooks and tech gear with real-time messaging, photo upload, and instant push notifications.',
          outcome: 'Proves full-stack mobile engineering, realtime messaging, and production auth.'
        }
      ]
    };

    return projectsMap[interest] || projectsMap['Web Development'];
  };

  const projects = getProjects();

  // 6. Next Steps (clear actionable list tailored to goal & weekly hours)
  const getNextSteps = () => {
    const steps = [];

    // Step 1: Schedule alignment based on weekly time
    steps.push({
      number: '01',
      title: `Block Your ${timeCommitment} Weekly Study Cadence`,
      description: `Consistency outperforms cramming. Break your ${timeCommitment} into recurring 90-minute focused sessions (e.g. 4 days/week) protected on your calendar.`
    });

    // Step 2: Immediate skill gap tackle
    const topGap = skillGaps[0]?.name || 'Core Language Mechanics';
    steps.push({
      number: '02',
      title: `Target Your Top Gap: ${topGap}`,
      description: `Spend the first 2 weeks deliberately working through ${topGap}. ${skillGaps[0]?.action || 'Focus on practical code exercises.'}`
    });

    // Step 3: Project execution
    const firstProject = projects[0]?.title || 'Flagship Portfolio Project';
    steps.push({
      number: '03',
      title: `Build Project: "${firstProject}"`,
      description: `Do not get stuck in tutorial loops. Initialize the repository today, design the wireframe, and commit code daily until the MVP is live.`
    });

    // Step 4: Career milestone specific action
    if (goal === 'Get an internship' || goal === 'Get a job') {
      steps.push({
        number: '04',
        title: 'Craft a GitHub Portfolio & Polish Resume',
        description: 'Pin your top 2 completed projects on GitHub with clear READMEs, architecture diagrams, and live deployment links. Begin tracking target company openings.'
      });
    } else if (goal === 'Build projects') {
      steps.push({
        number: '04',
        title: 'Launch on Product Hunt & Gather Feedback',
        description: 'Deploy your project publicly, share a demo video on LinkedIn/Twitter/Reddit, and collect feedback from 5 real student or developer users.'
      });
    } else {
      steps.push({
        number: '04',
        title: 'Deepen CS Theory & Academic Fundamentals',
        description: 'Review formal algorithms, system architecture papers, and prepare statements of purpose highlighting your project experiences.'
      });
    }

    return steps;
  };

  const nextSteps = getNextSteps();

  return {
    rawAnswers: { level, interest, problemSolving, timeCommitment, goal },
    skillLevelData,
    careerDirectionData,
    skillGaps,
    learningPath,
    projects,
    nextSteps
  };
}

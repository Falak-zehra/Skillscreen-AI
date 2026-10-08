export const SCREENING_QUESTIONS = [
  {
    id: 1,
    question: 'What is your current programming level?',
    category: 'Experience Level',
    options: [
      'Beginner',
      'Basic',
      'Intermediate',
      'Advanced'
    ]
  },
  {
    id: 2,
    question: 'Which area are you most interested in?',
    category: 'Domain Focus',
    options: [
      'Web Development',
      'AI/ML',
      'Data Science',
      'App Development'
    ]
  },
  {
    id: 3,
    question: 'How comfortable are you with problem-solving?',
    category: 'Problem-Solving',
    options: [
      'Beginner',
      'Somewhat comfortable',
      'Comfortable',
      'Very comfortable'
    ]
  },
  {
    id: 4,
    question: 'How much time can you spend learning each week?',
    category: 'Weekly Commitment',
    options: [
      '1–5 hours',
      '5–10 hours',
      '10–20 hours',
      '20+ hours'
    ]
  },
  {
    id: 5,
    question: 'What is your main career goal?',
    category: 'Career Goal',
    options: [
      'Get an internship',
      'Get a job',
      'Build projects',
      'Prepare for higher studies'
    ]
  }
];

export const DOMAINS = [
  {
    id: 'web-dev',
    title: 'Web Development',
    description: 'Modern frontends, backend APIs, responsive layout design, and full-stack ecosystems.',
    icon: 'Layout',
    difficulty: 'All Levels',
    duration: '5 Questions',
    totalQuestions: 5
  },
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning',
    description: 'Python algorithms, model integration, intelligent agents, and data engineering.',
    icon: 'Cpu',
    difficulty: 'All Levels',
    duration: '5 Questions',
    totalQuestions: 5
  },
  {
    id: 'data-science',
    title: 'Data Science & Analytics',
    description: 'Statistical reasoning, tabular data processing, visualization, and actionable insights.',
    icon: 'Database',
    difficulty: 'All Levels',
    duration: '5 Questions',
    totalQuestions: 5
  }
];

export const PLATFORM_STATS = [
  { label: 'Screened Candidates', value: '15,000+' },
  { label: 'Assessment Accuracy', value: '98.4%' },
  { label: 'Avg. Screening Time', value: '2-3 min' },
  { label: 'Target Tracks', value: 'Custom AI Pathways' }
];

export const KEY_FEATURES = [
  {
    icon: 'Sparkles',
    title: 'Adaptive Skill Diagnostics',
    description: 'Dynamic question flow evaluates candidate competency and career readiness in minutes.'
  },
  {
    icon: 'ShieldCheck',
    title: 'Instant Objective Scoring',
    description: 'Automated evaluation instantly stores candidate responses and delivers a tailored technical profile.'
  },
  {
    icon: 'BarChart3',
    title: 'Student Skill Radar',
    description: 'Visual feedback highlighting experience tier, domain interest, and recommended curriculum.'
  },
  {
    icon: 'Cpu',
    title: 'Tailored Learning Roadmaps',
    description: 'From Web Development and AI/ML to App Engineering, tailor next steps to exact student ambitions.'
  }
];

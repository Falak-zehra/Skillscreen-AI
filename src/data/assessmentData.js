export const DOMAINS = [
  {
    id: 'frontend',
    title: 'Frontend & UI Engineering',
    description: 'HTML5, CSS3, modern JavaScript (ES6+), React hooks, state management, and responsive layouts.',
    icon: 'Layout',
    difficulty: 'Intermediate',
    duration: '5 mins',
    totalQuestions: 4,
    questions: [
      {
        id: 1,
        question: 'Which React Hook is primarily used for managing side effects like data fetching or DOM subscriptions?',
        type: 'multiple-choice',
        options: [
          'useState',
          'useEffect',
          'useMemo',
          'useReducer'
        ],
        correctAnswer: 1,
        explanation: 'useEffect is designed specifically for side effects that occur outside the standard component render lifecycle.',
        skillCategory: 'React Lifecycle'
      },
      {
        id: 2,
        question: 'In Tailwind CSS, which class combination best centers a child element both vertically and horizontally within a flex container?',
        type: 'multiple-choice',
        options: [
          'flex justify-between items-start',
          'flex items-center justify-center',
          'grid grid-cols-2 place-content-between',
          'block m-auto text-center'
        ],
        correctAnswer: 1,
        explanation: '"flex items-center justify-center" aligns items along both the cross axis and main axis in flexbox.',
        skillCategory: 'Modern CSS'
      },
      {
        id: 3,
        question: 'What is the primary benefit of the Virtual DOM in modern frontend frameworks like React?',
        type: 'multiple-choice',
        options: [
          'It directly updates server-side databases without network latency',
          'It minimises direct, costly updates to the real browser DOM through batch diffing',
          'It replaces the browser JavaScript runtime with WebAssembly',
          'It eliminates the need to bundle static CSS and images'
        ],
        correctAnswer: 1,
        explanation: 'Virtual DOM computes the minimal reconciliation diff before patching the browser DOM tree, avoiding expensive real-DOM reflows.',
        skillCategory: 'Frontend Architecture'
      },
      {
        id: 4,
        question: 'Which of the following is true regarding JavaScript closures?',
        type: 'multiple-choice',
        options: [
          'They allow an inner function to access its outer enclosing lexical scope even after the outer function has executed',
          'They are only available in TypeScript classes',
          'They prevent any garbage collection across the entire application lifecycle',
          'They can only be declared inside global window objects'
        ],
        correctAnswer: 0,
        explanation: 'A closure is the combination of a function bundled together with references to its surrounding state (lexical environment).',
        skillCategory: 'JavaScript Core'
      }
    ]
  },
  {
    id: 'python-data',
    title: 'Python & Data Fundamentals',
    description: 'Python syntax, data structures, algorithm efficiency, list comprehensions, and data processing basics.',
    icon: 'Database',
    difficulty: 'Beginner - Intermediate',
    duration: '5 mins',
    totalQuestions: 4,
    questions: [
      {
        id: 1,
        question: 'What is the time complexity of searching for a key in a Python dictionary on average?',
        type: 'multiple-choice',
        options: [
          'O(n)',
          'O(log n)',
          'O(1)',
          'O(n^2)'
        ],
        correctAnswer: 2,
        explanation: 'Python dictionaries are implemented as hash tables, offering O(1) average lookup time.',
        skillCategory: 'Data Structures'
      },
      {
        id: 2,
        question: 'Which Python expression produces a list of squares of even numbers from 0 to 9?',
        type: 'multiple-choice',
        options: [
          '[x**2 for x in range(10) if x % 2 == 0]',
          '{x: x**2 for x in range(10) if x % 2 == 0}',
          'list(filter(x**2, range(10)))',
          '[x * 2 for x in range(10)]'
        ],
        correctAnswer: 0,
        explanation: 'The list comprehension syntax [x**2 for x in range(10) if x % 2 == 0] generates the squares filtered by the modulo condition.',
        skillCategory: 'Python Idioms'
      },
      {
        id: 3,
        question: 'What is the purpose of the `yield` keyword in a Python function?',
        type: 'multiple-choice',
        options: [
          'Terminates execution and exits the program immediately',
          'Turns the function into a generator, producing values lazily on demand',
          'Imports external modules dynamically at runtime',
          'Forces asynchronous event loop execution'
        ],
        correctAnswer: 1,
        explanation: '`yield` suspends function execution and yields a value, returning a generator iterator for memory-efficient iteration.',
        skillCategory: 'Core Python'
      },
      {
        id: 4,
        question: 'Which library is standard in Python for handling tabular datasets with DataFrames?',
        type: 'multiple-choice',
        options: [
          'Matplotlib',
          'Pandas',
          'Requests',
          'PyTorch'
        ],
        correctAnswer: 1,
        explanation: 'Pandas is the de facto Python library for data manipulation and analysis using DataFrames.',
        skillCategory: 'Data Tools'
      }
    ]
  },
  {
    id: 'general-cs',
    title: 'Full-Stack & CS Foundations',
    description: 'RESTful API principles, HTTP protocols, version control (Git), and database basics.',
    icon: 'Code',
    difficulty: 'General Screening',
    duration: '5 mins',
    totalQuestions: 4,
    questions: [
      {
        id: 1,
        question: 'Which HTTP status code signifies that a resource was successfully created on the server?',
        type: 'multiple-choice',
        options: [
          '200 OK',
          '201 Created',
          '204 No Content',
          '304 Not Modified'
        ],
        correctAnswer: 1,
        explanation: 'HTTP 201 Created indicates the request succeeded and resulted in the creation of one or more new resources.',
        skillCategory: 'Web APIs'
      },
      {
        id: 2,
        question: 'What is the primary difference between SQL and NoSQL databases?',
        type: 'multiple-choice',
        options: [
          'SQL databases cannot store text strings',
          'SQL databases use structured schema and relational tables; NoSQL often uses flexible documents or key-value stores',
          'NoSQL databases do not support network queries',
          'SQL databases are only used on mobile devices'
        ],
        correctAnswer: 1,
        explanation: 'Relational SQL databases use predefined tables and relational schemas, while NoSQL databases provide flexible schema designs.',
        skillCategory: 'Databases'
      },
      {
        id: 3,
        question: 'In Git, which command creates and switches to a new branch in one step?',
        type: 'multiple-choice',
        options: [
          'git merge -b <name>',
          'git checkout -b <name>',
          'git init <name>',
          'git commit --branch <name>'
        ],
        correctAnswer: 1,
        explanation: '`git checkout -b <branch-name>` (or `git switch -c <branch-name>`) creates a new branch and checks it out immediately.',
        skillCategory: 'Version Control'
      },
      {
        id: 4,
        question: 'What does CORS (Cross-Origin Resource Sharing) protect against in browser security?',
        type: 'multiple-choice',
        options: [
          'Unauthorized scripts from one origin requesting resources from a different origin unless permitted',
          'Computer overheating during heavy loops',
          'Malicious USB hardware drives',
          'Network packet packet loss on Wi-Fi'
        ],
        correctAnswer: 0,
        explanation: 'CORS is a browser mechanism that restricts scripts from loading resources on an origin different from their own unless the server explicitly allows it.',
        skillCategory: 'Web Security'
      }
    ]
  }
];

export const PLATFORM_STATS = [
  { label: 'Screened Candidates', value: '15,000+' },
  { label: 'Assessment Accuracy', value: '98.4%' },
  { label: 'Avg. Screening Time', value: '4.5 min' },
  { label: 'Skill Domains', value: '25+ Tracks' }
];

export const KEY_FEATURES = [
  {
    icon: 'Sparkles',
    title: 'Adaptive Skill Diagnostics',
    description: 'Dynamic problem selection evaluates real candidate competency without lengthy, tedious multiple-hour tests.'
  },
  {
    icon: 'ShieldCheck',
    title: 'Instant Objective Scoring',
    description: 'Automated evaluation instantly scores answers, provides reasoning, and generates clear actionable skill insights.'
  },
  {
    icon: 'BarChart3',
    title: 'Student Skill Radar',
    description: 'Visual feedback highlighting strong areas, core concepts mastered, and recommended study directions.'
  },
  {
    icon: 'Cpu',
    title: 'Domain-Specific Modules',
    description: 'From modern Frontend and React to Python and Full-Stack systems, tailor tests to exact hiring or course requirements.'
  }
];

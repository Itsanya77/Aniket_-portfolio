import { 
  ProjectItem, 
  SkillItem, 
  ActivityItem, 
  ExperienceItem, 
  MessageItem, 
  EducationItem, 
  CertificationItem, 
  ServiceItem, 
  AchievementItem, 
  ServiceHealthItem 
} from '../types';

export const PROFILE_IMAGE = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';

export const HERO_FLOATING_TECHS = [
  'Python',
  'Pandas',
  'NumPy',
  'Matplotlib',
  'Seaborn',
  'SQL',
  'Flask',
  'Django',
  'Scikit-learn',
  'Tableau'
];

export const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'Customer Segmentation & RFM Analytics',
    description: 'K-Means clustering algorithm paired with Recency-Frequency-Monetary (RFM) analysis to segment 50,000+ retail customer profiles.',
    problemStatement: 'Retail business struggled to identify high-value customer clusters and tailor retention marketing campaigns effectively.',
    category: 'Data Science',
    status: 'Live',
    featured: true,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    tags: ['Python', 'Pandas', 'Scikit-learn', 'Matplotlib', 'RFM Analysis'],
    keyFeatures: [
      'Automated RFM score calculation engine',
      'Unsupervised K-Means clustering model',
      'Interactive PCA visualizer for cluster separation',
      'Exportable CSV cohort reports'
    ],
    demoUrl: 'https://github.com/aniketbadhe',
    codeUrl: 'https://github.com/aniketbadhe/customer-segmentation-rfm',
    createdAt: '2026-01-15',
    metrics: [
      { label: 'Dataset Size', value: '50K+ Records' },
      { label: 'Cluster Accuracy', value: 'Silhouette Score 0.72' }
    ]
  },
  {
    id: 'proj-2',
    title: 'Sales Revenue Prediction Engine',
    description: 'Scikit-Learn Random Forest regression model integrated into a Flask REST API to forecast monthly retail revenue trends.',
    problemStatement: 'Store managers required an accurate automated forecasting model to optimize inventory stock and prevent shortages.',
    category: 'Machine Learning',
    status: 'Live',
    featured: true,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    tags: ['Python', 'Scikit-learn', 'Flask', 'NumPy', 'REST API'],
    keyFeatures: [
      'Random Forest & Ridge Regression models comparison',
      'Flask backend microservice REST API endpoint',
      'Feature importance ranking with Seaborn plots',
      'Cross-validated R² score of 0.91'
    ],
    demoUrl: 'https://github.com/aniketbadhe',
    codeUrl: 'https://github.com/aniketbadhe/sales-prediction-flask',
    createdAt: '2026-02-01',
    metrics: [
      { label: 'Model R²', value: '0.91' },
      { label: 'API Response', value: '12 ms' }
    ]
  },
  {
    id: 'proj-3',
    title: 'COVID-19 Global Trends Analytics & Dashboard',
    description: 'Comprehensive Exploratory Data Analysis (EDA) on global pandemic datasets coupled with interactive Tableau visual dashboards.',
    problemStatement: 'Analyzing massive time-series global health metrics to discover infection trajectories and recovery metrics.',
    category: 'Data Analytics',
    status: 'Live',
    featured: true,
    image: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=800&q=80',
    tags: ['Data Analytics', 'Python', 'Pandas', 'Tableau', 'Seaborn'],
    keyFeatures: [
      'Time-series data cleaning & missing value imputations',
      'Correlation heatmaps of regional health factors',
      'Interactive Tableau dashboard embedded visualizers',
      'Automated daily data update pipeline'
    ],
    demoUrl: 'https://github.com/aniketbadhe',
    codeUrl: 'https://github.com/aniketbadhe/covid19-data-analytics',
    createdAt: '2025-11-20',
    metrics: [
      { label: 'Data Points', value: '1.2M+' },
      { label: 'Visual Views', value: '8 Dynamic Charts' }
    ]
  },
  {
    id: 'proj-4',
    title: 'Automated Python Market Scraper & Pipeline',
    description: 'Asynchronous Python web automation tool utilizing BeautifulSoup, Selenium, and SQLite to monitor ecommerce pricing signals.',
    problemStatement: 'Manual price tracking across competitors was time-consuming and prone to missing flash discounts.',
    category: 'Python',
    status: 'Live',
    featured: false,
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    tags: ['Python', 'BeautifulSoup', 'SQLite', 'Automation', 'Schedule'],
    keyFeatures: [
      'Multi-threaded HTML parsing & data extraction',
      'SQLite database storing historic price changes',
      'Automated email notification triggers for price drops',
      'Robust error handling and proxy rotations'
    ],
    demoUrl: 'https://github.com/aniketbadhe',
    codeUrl: 'https://github.com/aniketbadhe/python-market-scraper',
    createdAt: '2025-12-10',
    metrics: [
      { label: 'Scrape Speed', value: '250 pages/min' },
      { label: 'Storage', value: 'SQLite DB' }
    ]
  },
  {
    id: 'proj-5',
    title: 'Django Student Performance Management Portal',
    description: 'Full-stack Django web application with SQLite database providing student grade tracking, attendance metrics, and analytics.',
    problemStatement: 'Educational institute needed a lightweight portal for faculty to log grades and view student performance analytics.',
    category: 'Web Development',
    status: 'Live',
    featured: false,
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    tags: ['Django', 'Python', 'SQLite', 'HTML/CSS', 'Chart.js'],
    keyFeatures: [
      'Role-based access (Faculty / Student / Admin)',
      'SQLite database ORM schema with relationships',
      'Student performance trend visualization',
      'Report card PDF generation export'
    ],
    demoUrl: 'https://github.com/aniketbadhe',
    codeUrl: 'https://github.com/aniketbadhe/django-student-portal',
    createdAt: '2025-10-05',
    metrics: [
      { label: 'Active Users', value: '500+ Students' },
      { label: 'Stack', value: 'Django + SQLite' }
    ]
  },
  {
    id: 'proj-6',
    title: 'Retail Store Sales Analytics Dashboard',
    description: 'Interactive data analytics platform using Pandas, SQL, and Matplotlib to analyze store product sales and profit margins.',
    problemStatement: 'Store executives required a consolidated dashboard to inspect top-selling SKUs, regional profit margins, and monthly growth.',
    category: 'Data Analytics',
    status: 'Sample',
    featured: false,
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
    tags: ['SQL', 'Python', 'Pandas', 'Matplotlib', 'Dashboard'],
    keyFeatures: [
      'Complex SQL aggregation queries & window functions',
      'Monthly revenue & profit margin breakdown',
      'Interactive filtering by region and product line',
      'Sample demo dataset for testing analytics functions'
    ],
    demoUrl: 'https://github.com/aniketbadhe',
    codeUrl: 'https://github.com/aniketbadhe/retail-sales-analytics',
    createdAt: '2026-01-28',
    metrics: [
      { label: 'Queries', value: 'Optimized SQL' },
      { label: 'Type', value: 'Sample Analytics Demo' }
    ]
  }
];

export const INITIAL_SKILLS: SkillItem[] = [
  // Programming
  {
    id: 'sk-1',
    name: 'Python',
    category: 'Programming',
    level: 'Expert',
    percentage: 95,
    iconName: 'code-2',
    description: 'Core language for Data Science, Automation, Scripting, and Web Frameworks (Flask/Django).'
  },
  {
    id: 'sk-2',
    name: 'Java',
    category: 'Programming',
    level: 'Intermediate',
    percentage: 80,
    iconName: 'coffee',
    description: 'Object-Oriented Programming, Data Structures, and Core Algorithm design.'
  },
  {
    id: 'sk-3',
    name: 'JavaScript',
    category: 'Programming',
    level: 'Advanced',
    percentage: 85,
    iconName: 'file-json',
    description: 'ES6+, DOM manipulation, RESTful API integration, and front-end interactive UI scripting.'
  },

  // Data Science
  {
    id: 'sk-4',
    name: 'Pandas',
    category: 'Data Science',
    level: 'Expert',
    percentage: 95,
    iconName: 'table',
    description: 'Data manipulation, DataFrame transformation, cleaning, merging, and time-series aggregation.'
  },
  {
    id: 'sk-5',
    name: 'NumPy',
    category: 'Data Science',
    level: 'Expert',
    percentage: 92,
    iconName: 'binary',
    description: 'Multidimensional array processing, linear algebra operations, and numerical computations.'
  },
  {
    id: 'sk-6',
    name: 'Matplotlib',
    category: 'Data Science',
    level: 'Advanced',
    percentage: 88,
    iconName: 'bar-chart-3',
    description: 'Custom plotting, bar graphs, scatter plots, histogram styling, and figure layout customization.'
  },
  {
    id: 'sk-7',
    name: 'Seaborn',
    category: 'Data Science',
    level: 'Advanced',
    percentage: 90,
    iconName: 'pie-chart',
    description: 'Statistical data visualization, heatmaps, distribution plots, and correlation matrices.'
  },
  {
    id: 'sk-8',
    name: 'Scikit-learn',
    category: 'Data Science',
    level: 'Advanced',
    percentage: 86,
    iconName: 'brain',
    description: 'Supervised & Unsupervised Machine Learning algorithms: Regression, Classification, Clustering (K-Means), and PCA.'
  },

  // Data Analytics
  {
    id: 'sk-9',
    name: 'Excel',
    category: 'Data Analytics',
    level: 'Expert',
    percentage: 90,
    iconName: 'sheet',
    description: 'Pivot Tables, VLOOKUP/XLOOKUP, advanced formulas, conditional formatting, and data modeling.'
  },
  {
    id: 'sk-10',
    name: 'SQL',
    category: 'Data Analytics',
    level: 'Expert',
    percentage: 92,
    iconName: 'database',
    description: 'Relational query design, JOINs, Group By aggregations, Subqueries, Indexing, and Window Functions.'
  },
  {
    id: 'sk-11',
    name: 'Tableau',
    category: 'Data Analytics',
    level: 'Advanced',
    percentage: 88,
    iconName: 'layout',
    description: 'Interactive dashboard creation, calculated fields, story points, and visual data storytelling.'
  },
  {
    id: 'sk-12',
    name: 'Data Cleaning',
    category: 'Data Analytics',
    level: 'Expert',
    percentage: 94,
    iconName: 'sparkles',
    description: 'Handling missing data, outlier detection, string parsing, duplicate removal, and type normalization.'
  },
  {
    id: 'sk-13',
    name: 'Data Visualization',
    category: 'Data Analytics',
    level: 'Expert',
    percentage: 92,
    iconName: 'activity',
    description: 'Translating complex numerical insights into clear, decision-ready charts and executive dashboards.'
  },
  {
    id: 'sk-14',
    name: 'Exploratory Data Analysis',
    category: 'Data Analytics',
    level: 'Expert',
    percentage: 94,
    iconName: 'search-code',
    description: 'Discovering patterns, hypothesis testing, correlation analysis, and statistical summary distributions.'
  },

  // Web Development
  {
    id: 'sk-15',
    name: 'Flask',
    category: 'Web Development',
    level: 'Advanced',
    percentage: 88,
    iconName: 'server',
    description: 'Lightweight Python web framework, REST API development, routing, Jinja templating, and CORS setup.'
  },
  {
    id: 'sk-16',
    name: 'Django',
    category: 'Web Development',
    level: 'Advanced',
    percentage: 85,
    iconName: 'layers',
    description: 'Full-stack Python framework, ORM database models, authentication, admin dashboard, and REST framework.'
  },
  {
    id: 'sk-17',
    name: 'REST API',
    category: 'Web Development',
    level: 'Advanced',
    percentage: 90,
    iconName: 'webhook',
    description: 'Designing JSON API endpoints, HTTP status handling, request validation, and backend service integration.'
  },
  {
    id: 'sk-18',
    name: 'HTML & CSS',
    category: 'Web Development',
    level: 'Advanced',
    percentage: 88,
    iconName: 'layout-grid',
    description: 'Semantic markup, responsive grid/flexbox layouts, Tailwind CSS, and custom styling.'
  },

  // Database
  {
    id: 'sk-19',
    name: 'SQLite',
    category: 'Database',
    level: 'Expert',
    percentage: 92,
    iconName: 'hard-drive',
    description: 'Embedded relational database engine, schema design, transactions, and Python sqlite3 integration.'
  },
  {
    id: 'sk-20',
    name: 'MySQL',
    category: 'Database',
    level: 'Advanced',
    percentage: 88,
    iconName: 'server-cog',
    description: 'Relational database management, foreign key constraints, index optimization, and stored procedures.'
  },

  // Tools
  {
    id: 'sk-21',
    name: 'Git & GitHub',
    category: 'Tools',
    level: 'Advanced',
    percentage: 90,
    iconName: 'git-branch',
    description: 'Version control, branching workflows, pull requests, commit management, and GitHub repository hosting.'
  },
  {
    id: 'sk-22',
    name: 'Jupyter Notebook',
    category: 'Tools',
    level: 'Expert',
    percentage: 95,
    iconName: 'file-text',
    description: 'Interactive Python development, EDA prototyping, markdown documentation, and inline visualizations.'
  },
  {
    id: 'sk-23',
    name: 'VS Code',
    category: 'Tools',
    level: 'Expert',
    percentage: 95,
    iconName: 'terminal',
    description: 'Primary IDE, debugging, Python virtual environment management, extensions, and integrated terminal.'
  }
];

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'srv-1',
    title: 'Python Application Development',
    description: 'Custom Python scripts, automation bots, CLI tools, and robust backend logic tailored for high reliability.',
    iconName: 'code',
    tags: ['Python 3', 'OOP', 'Automation', 'Scripting']
  },
  {
    id: 'srv-2',
    title: 'Flask Web Development',
    description: 'Lightweight RESTful API endpoints, microservice backends, and responsive web applications.',
    iconName: 'server',
    tags: ['Flask', 'REST API', 'Jinja2', 'Python']
  },
  {
    id: 'srv-3',
    title: 'Django Web Development',
    description: 'Scalable full-stack web platforms with secure built-in authentication, ORM schemas, and admin panels.',
    iconName: 'layers',
    tags: ['Django', 'ORM', 'SQLite', 'REST API']
  },
  {
    id: 'srv-4',
    title: 'Data Analysis & Mining',
    description: 'In-depth exploratory data analysis (EDA), pattern recognition, statistical summaries, and hypothesis testing.',
    iconName: 'search-code',
    tags: ['Pandas', 'NumPy', 'EDA', 'Statistics']
  },
  {
    id: 'srv-5',
    title: 'Data Cleaning & Wrangling',
    description: 'Transforming messy, incomplete raw datasets into pristine, structured formats ready for analysis.',
    iconName: 'sparkles',
    tags: ['Data Cleaning', 'ETL', 'Missing Values', 'Parsing']
  },
  {
    id: 'srv-6',
    title: 'Data Visualization',
    description: 'Crafting visually compelling charts, heatmaps, and publication-ready graphs using Matplotlib & Seaborn.',
    iconName: 'bar-chart-2',
    tags: ['Matplotlib', 'Seaborn', 'Plotting', 'Charts']
  },
  {
    id: 'srv-7',
    title: 'Dashboard Development',
    description: 'Interactive Tableau & Web-based visual analytics dashboards for dynamic KPI tracking.',
    iconName: 'layout font-bold',
    tags: ['Tableau', 'Dashboards', 'KPIs', 'BI']
  },
  {
    id: 'srv-8',
    title: 'SQL Database Development',
    description: 'Designing relational database schemas, complex SQL queries, JOIN aggregations, and performance tuning.',
    iconName: 'database',
    tags: ['SQL', 'SQLite', 'MySQL', 'Schema Design']
  },
  {
    id: 'srv-9',
    title: 'REST API Development',
    description: 'Designing and deploying clean, documented JSON REST APIs with Python Flask/Django.',
    iconName: 'webhook',
    tags: ['REST API', 'JSON', 'Endpoints', 'Backend']
  }
];

export const INITIAL_EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-1',
    company: 'Tech Analytics Solutions',
    role: 'Python & Data Analytics Developer Intern',
    period: '2025 - Present',
    current: true,
    points: [
      'Developed automated Python ETL scripts using Pandas & SQLAlchemy to process and clean 100K+ daily customer data entries.',
      'Created interactive Tableau dashboards and Matplotlib visual graphs for executive weekly performance reviews.',
      'Built Flask REST API endpoints to serve data insights directly to front-end client web interfaces.'
    ],
    tags: ['Python', 'Pandas', 'SQL', 'Flask', 'Tableau']
  },
  {
    id: 'exp-2',
    company: 'DataMetrics Labs',
    role: 'Data Science & Web Development Apprentice',
    period: '2024 - 2025',
    current: false,
    points: [
      'Implemented Scikit-learn Machine Learning regression models for sales forecasting with an R² accuracy of 0.91.',
      'Designed and optimized SQLite database schemas for Django web applications tracking student & employee records.',
      'Performed Exploratory Data Analysis (EDA) on time-series datasets to identify seasonal revenue trends.'
    ],
    tags: ['Scikit-learn', 'Django', 'SQLite', 'EDA', 'NumPy']
  },
  {
    id: 'exp-3',
    company: 'Academic Projects & Hackathons',
    role: 'Lead Python Developer & Data Analyst',
    period: '2022 - 2024',
    current: false,
    points: [
      'Led a 4-member team to construct a Customer Segmentation web application using K-Means clustering and RFM analysis.',
      'Built multi-threaded web scraper scripts with BeautifulSoup & Selenium to automate market competitor monitoring.',
      'Won 1st Place in Regional Python Data Pipeline Hackathon out of 35 competing university teams.'
    ],
    tags: ['Python', 'K-Means', 'BeautifulSoup', 'Git', 'Data Mining']
  }
];

export const INITIAL_EDUCATION: EducationItem[] = [
  {
    id: 'edu-1',
    degree: 'MCA (Master of Computer Applications)',
    institution: 'Savitribai Phule Pune University (SPPU)',
    period: '2023 - 2025',
    location: 'Pune, India',
    details: 'Specialization in Data Science, Machine Learning, Python Web Frameworks, Database Systems, and Software Engineering.'
  },
  {
    id: 'edu-2',
    degree: 'BCA (Bachelor of Computer Applications)',
    institution: 'Savitribai Phule Pune University (SPPU)',
    period: '2020 - 2023',
    location: 'Pune, India',
    details: 'Graduated with First Class Distinction. Coursework included Object-Oriented Programming in C++/Java, SQL, Data Structures, Web Design.'
  }
];

export const INITIAL_CERTIFICATIONS: CertificationItem[] = [
  {
    id: 'cert-1',
    title: 'Python for Data Science & Machine Learning Masterclass',
    issuer: 'DataCamp / Udemy Certified',
    issueDate: '2025',
    credentialId: 'CERT-PYDS-99420',
    status: 'Active'
  },
  {
    id: 'cert-2',
    title: 'Google Data Analytics Professional Certificate',
    issuer: 'Google Cloud / Coursera',
    issueDate: '2024',
    credentialId: 'GCP-DA-88312',
    status: 'Verified'
  },
  {
    id: 'cert-3',
    title: 'Relational Database Design & Advanced SQL',
    issuer: 'Oracle / HackerRank SQL Gold',
    issueDate: '2024',
    credentialId: 'SQL-GOLD-4109',
    status: 'Verified'
  },
  {
    id: 'cert-4',
    title: 'Tableau Business Intelligence & Data Visualization',
    issuer: 'Tableau Desktop Specialist',
    issueDate: '2023',
    credentialId: 'TAB-BI-12093',
    status: 'Completed'
  }
];

export const INITIAL_ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'ach-1',
    title: '1st Place – Regional Python Data Pipeline Hackathon',
    issuer: 'University Tech Innovation Summit',
    date: '2025',
    description: 'Designed and deployed an end-to-end automated Python ETL pipeline that cleaned and structured messy municipal traffic datasets in real time.',
    category: 'Hackathon'
  },
  {
    id: 'ach-2',
    title: 'Kaggle Customer Churn Challenge – Top 5% Rank',
    issuer: 'Kaggle Data Science Community',
    date: '2024',
    description: 'Achieved 94.2% prediction accuracy utilizing ensemble gradient boosting and feature engineering techniques in Python.',
    category: 'Data Science'
  },
  {
    id: 'ach-3',
    title: 'Published Open Source Python Helper Library',
    issuer: 'PyPI Community',
    date: '2024',
    description: 'Created `py-clean-data`, a lightweight Python utility package for rapid null value imputation and dataset formatting.',
    category: 'Coding'
  },
  {
    id: 'ach-4',
    title: 'Academic Merit Award in Database Systems & Algorithms',
    issuer: 'SPPU Computer Science Department',
    date: '2023',
    description: 'Awarded highest grade mark in Advanced Relational Database Design, SQL Query Tuning, and Python Data Structures.',
    category: 'Academic'
  }
];

export const INITIAL_ACTIVITIES: ActivityItem[] = [
  {
    id: 'act-1',
    title: 'Trained Customer Segmentation Model',
    timestamp: '2 hours ago',
    type: 'project',
    tag: 'MODEL_TRAINED',
    details: 'Executed K-Means algorithm on 50,000 retail records with 0.72 Silhouette score.'
  },
  {
    id: 'act-2',
    title: 'Deployed Flask REST API Endpoint',
    timestamp: 'Yesterday',
    type: 'deployment',
    tag: 'API_DEPLOY',
    details: 'Live endpoint /api/predict/sales returning model inference in 12ms.'
  },
  {
    id: 'act-3',
    title: 'Added Tableau COVID-19 Visual Dashboard',
    timestamp: '3 days ago',
    type: 'skill',
    tag: 'DASHBOARD_ADDED',
    details: 'Embedded dynamic time-series charts for country-wide recovery rates.'
  }
];

export const INITIAL_MESSAGES: MessageItem[] = [
  {
    id: 'msg-1',
    sender: 'Sarah Jenkins',
    email: 'sarah.j@analyticsfirm.com',
    subject: 'Python Developer / Data Analyst Opportunity',
    preview: 'Hi Aniket, we were very impressed by your Customer Segmentation project and would love to connect...',
    body: `Hello Aniket,\n\nI reviewed your portfolio and was thoroughly impressed by your Customer Segmentation & Sales Prediction projects. We have an opening for a Python Developer / Data Analyst on our team in San Francisco / Hybrid.\n\nYour expertise in Python, Pandas, SQL, and Flask aligns perfectly with our stack. Are you available for a brief introductory call this week?\n\nBest regards,\nSarah Jenkins\nTalent Acquisition Lead`,
    timestamp: 'Today at 10:15 AM',
    read: false,
    starred: true
  },
  {
    id: 'msg-2',
    sender: 'David Miller',
    email: 'david@techinnovations.io',
    subject: 'Data Science & Dashboard Consultancy Query',
    preview: 'Hi Aniket, I saw your Tableau and Python data visualization portfolio and wanted to inquire about a project...',
    body: `Hi Aniket,\n\nWe are looking for a Python & Data Analytics specialist to assist us in cleaning our retail database and building interactive Tableau dashboards for our executives.\n\nCould you share your rates or availability for a short term contract?\n\nThanks,\nDavid Miller`,
    timestamp: 'Yesterday at 3:45 PM',
    read: true,
    starred: false
  }
];

export const INITIAL_SERVICES_HEALTH: ServiceHealthItem[] = [
  {
    id: 'sh-1',
    name: 'Gemini AI Data Assistant Proxy',
    endpoint: '/api/terminal/ai',
    status: 'Healthy',
    latency: '15 ms',
    uptime: '99.99%',
    type: 'AI Proxy'
  },
  {
    id: 'sh-2',
    name: '3D Python WebGL Shader Pipeline',
    endpoint: 'Canvas Fragment Matrix',
    status: 'Healthy',
    latency: '16.6 ms (60 FPS)',
    uptime: '100%',
    type: 'Analytics Pipeline'
  },
  {
    id: 'sh-3',
    name: 'SQLite Local & Database ORM',
    endpoint: 'Internal Database Store',
    status: 'Healthy',
    latency: '4 ms',
    uptime: '99.98%',
    type: 'Database'
  },
  {
    id: 'sh-4',
    name: 'Flask / Express Contact API Router',
    endpoint: '/api/contact',
    status: 'Healthy',
    latency: '8 ms',
    uptime: '100%',
    type: 'Web Service'
  }
];

export const DATA_SCIENCE_WORKFLOW_STEPS = [
  {
    step: 1,
    title: 'Data Collection',
    icon: 'database',
    description: 'Gathering raw datasets from web scrapers, REST APIs, SQL relational databases, and CSV/JSON sources.',
    techs: ['Python', 'Requests', 'BeautifulSoup', 'SQL', 'APIs']
  },
  {
    step: 2,
    title: 'Data Cleaning',
    icon: 'sparkles',
    description: 'Handling null missing values, parsing datatypes, removing duplicates, and detecting statistical outliers.',
    techs: ['Pandas', 'NumPy', 'Regex', 'Data Wrangling']
  },
  {
    step: 3,
    title: 'Exploratory Data Analysis (EDA)',
    icon: 'search-code',
    description: 'Discovering statistical distributions, correlations, group aggregations, and hypothesis testing.',
    techs: ['Pandas', 'Summary Stats', 'Groupby', 'Hypothesis']
  },
  {
    step: 4,
    title: 'Data Visualization',
    icon: 'bar-chart-2',
    description: 'Creating informative graphs, scatter plots, correlation heatmaps, and interactive visual dashboards.',
    techs: ['Matplotlib', 'Seaborn', 'Tableau', 'Plotly']
  },
  {
    step: 5,
    title: 'Feature Engineering',
    icon: 'sliders',
    description: 'Scaling features, one-hot encoding categorical variables, RFM metrics generation, and dimensionality reduction.',
    techs: ['StandardScaler', 'OneHotEncoder', 'PCA', 'RFM']
  },
  {
    step: 6,
    title: 'Model Building',
    icon: 'brain',
    description: 'Training Machine Learning algorithms: Linear/Logistic Regression, Random Forest, K-Means Clustering.',
    techs: ['Scikit-learn', 'Supervised ML', 'Unsupervised ML']
  },
  {
    step: 7,
    title: 'Model Evaluation',
    icon: 'check-circle-2',
    description: 'Evaluating model metrics: R² Score, RMSE, Accuracy, Precision, Recall, Confusion Matrix & Silhouette Scores.',
    techs: ['Cross-Validation', 'Metrics', 'Confusion Matrix']
  },
  {
    step: 8,
    title: 'Insights & Deployment',
    icon: 'rocket',
    description: 'Packaging findings into actionable executive reports or serving real-time model REST API predictions.',
    techs: ['Flask', 'Django', 'REST API', 'Executive Reports']
  }
];

export const SAMPLE_VISUALIZATIONS_DATA = {
  monthlySales: [
    { month: 'Jan', sales: 4200, profit: 1200, customers: 310 },
    { month: 'Feb', sales: 5100, profit: 1600, customers: 390 },
    { month: 'Mar', sales: 6800, profit: 2300, customers: 480 },
    { month: 'Apr', sales: 7400, profit: 2800, customers: 560 },
    { month: 'May', sales: 8900, profit: 3400, customers: 670 },
    { month: 'Jun', sales: 9600, profit: 3900, customers: 740 },
    { month: 'Jul', sales: 11200, profit: 4600, customers: 820 }
  ],
  categoryBreakdown: [
    { name: 'Python Solutions', value: 38, color: '#38bdf8' },
    { name: 'Data Science Models', value: 27, color: '#818cf8' },
    { name: 'Data Analytics', value: 20, color: '#34d399' },
    { name: 'Web Dev (Flask/Django)', value: 15, color: '#f43f5e' }
  ],
  modelPerformance: [
    { epoch: 'E1', trainAcc: 0.62, valAcc: 0.58 },
    { epoch: 'E2', trainAcc: 0.74, valAcc: 0.71 },
    { epoch: 'E3', trainAcc: 0.83, valAcc: 0.80 },
    { epoch: 'E4', trainAcc: 0.89, valAcc: 0.86 },
    { epoch: 'E5', trainAcc: 0.94, valAcc: 0.91 }
  ]
};

export const PROFILE = {
  name: 'Satvik Singh',
  role: 'AI Engineer & Researcher',
  email: 'satviksingh1000@gmail.com',
  github: 'https://github.com/sa7vik',
  linkedin: 'https://www.linkedin.com/in/sa7vik/',
  medium: 'https://medium.com/@sa7vik',
  resume: 'https://drive.google.com/file/d/1gSwhAMhyevVlYe8QRe-DzlR3UCvpuFGV/view?usp=sharing',
}

export interface Experience {
  role: string
  company: string
  location: string
  summary: string
  highlights?: string[]
  current?: boolean
}

export const EXPERIENCE: Experience[] = [
  {
    role: 'Software Engineer',
    company: 'Symbian Health (Rikton Inc)',
    location: 'Boston, US · Remote',
    current: true,
    summary:
      'Back at Symbian Health after my time at DRDO, building on the healthcare products I first shipped here as a Software Development Engineer.',
  },
  {
    role: 'Junior Research Fellow',
    company: 'DRDO — Centre for Airborne Systems',
    location: 'Bengaluru, India',
    summary:
      'Optimized next-generation airborne radar for 360° surveillance coverage. High-performance signal processing in C with Intel MKL / BLAS.',
    highlights: [
      '200+ GB/hour of real-time signal data processed',
      '30% efficiency improvement in the processing chain',
      'Quantum ML research for 6G error correction & bit prediction',
    ],
  },
  {
    role: 'Software Development Engineer',
    company: 'Symbian Health (Rikton Inc)',
    location: 'Boston, US · Remote',
    summary:
      'Designed, built and shipped four healthcare products end to end — from problem definition and model work to backend, frontend and production deployment.',
    highlights: [
      'Radiology platform, Scribe Notes, Fall Guard & Credero',
      'Production APIs cutting operational time by 40%',
      'Backend work improving system response time by 60%',
    ],
  },
  {
    role: 'Data Scientist',
    company: 'Ai.Tennis',
    location: 'Boston, US · Remote',
    summary:
      'Architected ML systems for tennis analytics, including computer-vision pipelines for automated play analysis on real-time video.',
    highlights: ['Match prediction model with 90% accuracy'],
  },
  {
    role: 'Python Mentor',
    company: 'Codeyoung',
    location: 'United States · Remote',
    summary:
      'Taught Python, machine learning and deep learning to everyone from 5th graders to industry engineers. Guided hundreds of projects.',
  },
  {
    role: 'Back End Developer',
    company: 'Sameep',
    location: 'Jabalpur, India',
    summary:
      'Designed a Django backend inspired by ONGC’s framework, with seller, buyer and delivery modules, APIs and data model.',
  },
  {
    role: 'Machine Learning Lead',
    company: 'GDSC JEC Jabalpur',
    location: 'Jabalpur, India',
    summary:
      'Ran events on ML, data science, Hacktoberfest, Git & GitHub and Google Cloud for the campus developer community.',
  },
  {
    role: 'Machine Learning Intern',
    company: 'IIT Jodhpur',
    location: 'Rajasthan, India',
    summary:
      'Research on convolutional neural networks with PhD scholars under Asst. Prof. Jayant Kumar Mohanta.',
  },
]

export interface Project {
  title: string
  description: string
  tags: string[]
  githubUrl?: string
  liveUrl?: string
}

export const PROJECTS: Project[] = [
  {
    title: 'DermCare Solutions',
    description:
      'Skin-condition diagnosis across 30+ conditions at 98% accuracy, with a patient portal, diagnostic reports and HIPAA-compliant teleconsults.',
    tags: ['Computer Vision', 'TensorFlow', 'OpenCV'],
    githubUrl: 'https://github.com/SA7VIK/DermCareSolutions',
    liveUrl: 'https://6572f7c7bb457577f1524ca2--golden-liger-f4b46a.netlify.app',
  },
  {
    title: 'Email Marketing Agent',
    description:
      'Agentic campaign automation that reads product specs, picks audiences, writes personalised templates and runs A/B tests. +23% open rates.',
    tags: ['LangGraph', 'LangChain', 'Agents'],
    githubUrl: 'https://github.com/sa7vik/email-marketing-agent',
    liveUrl: 'https://www.rovlin.com',
  },
  {
    title: 'MoneyInsight',
    description:
      'Investment allocation advisor: time-series forecasts plus your age, income and goals produce a personalised asset split.',
    tags: ['Time Series', 'FastAPI', 'React'],
    githubUrl: 'https://github.com/sa7vik/money-insight',
    liveUrl: 'https://moneyinsight.onrender.com',
  },
  {
    title: 'Portfolio Chatbot',
    description:
      'A personal AI assistant that answers questions about my background using retrieval-augmented generation, served from FastAPI with a FAISS index.',
    tags: ['RAG', 'FAISS', 'FastAPI'],
    githubUrl: 'https://github.com/sa7vik/portfolio-chatbot',
  },
]

export const SKILLS: { group: string; items: string[] }[] = [
  {
    group: 'AI systems',
    items: ['Agentic AI', 'LangGraph', 'LangChain', 'RAG', 'MCP', 'Guardrails', 'FAISS', 'Pinecone'],
  },
  {
    group: 'Machine learning',
    items: ['PyTorch', 'TensorFlow', 'Transformers', 'CNNs', 'YOLO', 'LSTM / RNN', 'NLP', 'Computer Vision'],
  },
  {
    group: 'High-performance',
    items: ['C', 'C++', 'Intel MKL', 'BLAS', 'Signal Processing', 'GPU Programming', 'Socket Programming'],
  },
  {
    group: 'Product engineering',
    items: ['Python', 'FastAPI', 'Django REST', 'React', 'Docker', 'AWS CDK', 'Google Cloud', 'Git'],
  },
]

export const ACHIEVEMENTS: { title: string; detail: string }[] = [
  { title: 'GATE DA 2024', detail: 'Qualified in Data Science & Artificial Intelligence' },
  { title: 'Smart India Hackathon 2023', detail: 'National finalist among 100,000+ participants' },
  { title: 'Rajasthan IT Day Hackathon', detail: 'Certificate of achievement, state level' },
  { title: 'IIT Jodhpur', detail: 'Research internship in machine learning' },
]

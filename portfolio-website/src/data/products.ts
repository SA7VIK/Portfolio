export type ProductVisual = 'radiology' | 'scribe' | 'fallguard' | 'credero'

export interface Product {
  id: ProductVisual
  name: string
  category: string
  tagline: string
  description: string
  scope: string[]
  stack: string[]
}

// Products built end to end at Symbian Health.
// Copy is intentionally free of numbers that haven't been confirmed — edit freely.
export const SYMBIAN_PRODUCTS: Product[] = [
  {
    id: 'radiology',
    name: 'Symbian Health Radiology',
    category: 'Imaging · Clinical AI',
    tagline: 'AI-assisted radiology, from scan to signed report.',
    description:
      'A radiology platform where studies are ingested, triaged and pre-read by models, and radiologists review AI findings and draft reports in one workspace.',
    scope: ['Product design', 'Imaging models', 'Reporting workflow', 'Cloud infra'],
    stack: ['PyTorch', 'FastAPI', 'React', 'AWS'],
  },
  {
    id: 'scribe',
    name: 'Scribe Notes',
    category: 'Ambient documentation',
    tagline: 'Conversations in, structured clinical notes out.',
    description:
      'An ambient medical scribe that listens to the patient visit, transcribes it and produces structured SOAP notes the clinician can review and sign.',
    scope: ['Speech pipeline', 'LLM note generation', 'Clinician UX', 'APIs'],
    stack: ['ASR', 'LLMs', 'AWS', 'Python'],
  },
  {
    id: 'fallguard',
    name: 'Fall Guard',
    category: 'Patient safety',
    tagline: 'Detects falls and escalates in seconds.',
    description:
      'Fall detection and alerting for patients and elderly care: motion signals are monitored continuously and caregivers are notified the moment risk is detected.',
    scope: ['Detection model', 'Real-time alerts', 'Caregiver dashboard', 'Deployment'],
    stack: ['Computer Vision', 'Time series', 'WebSockets', 'Docker'],
  },
  {
    id: 'credero',
    name: 'Credero',
    category: 'Provider credentialing',
    tagline: 'Provider credentialing without the paperwork.',
    description:
      'Automates provider credentialing: documents are parsed, verified against primary sources and moved through approval in one tracked workflow instead of spreadsheets and email chains.',
    scope: ['Document AI', 'Verification workflow', 'Admin console', 'Backend'],
    stack: ['NLP', 'OCR', 'Django REST', 'React'],
  },
]

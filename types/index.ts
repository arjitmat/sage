// Sage Application Types

export interface QuizQuestion {
  id: number;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface Slide {
  id: number;
  title: string;
  bullets: string[];
  type: 'title' | 'content' | 'chart' | 'stats';
  visual_type?: 'none' | 'bar_chart' | 'pie_chart' | 'stats_grid' | 'icon_grid';
  visual_data?: any;
  ai_image?: string;
}

export interface DebatePoint {
  point: string;
  explanation: string;
}

export interface MindMapNode {
  id: string;
  label: string;
  level: 0 | 1 | 2;
  children?: MindMapNode[];
  color?: string;
  x?: number;
  y?: number;
}

export interface Summary {
  key_findings: string[];
  main_arguments: string;
  conclusions: string;
}

export interface DebateAnalysis {
  topic: string;
  pros: DebatePoint[];
  cons: DebatePoint[];
  balanced_perspective: string;
}

export interface VisualData {
  header: string;
  stats: Array<{ label: string; value: string }>;
  content_blocks: Array<{ title: string; content: string }>;
  distribution?: Array<{ category: string; percentage: number }>;
  timeline?: Array<{ period: string; value: number }>;
  highlights?: string[];
}

export interface DocumentResults {
  summary?: Summary;
  faqs?: FAQItem[];
  quiz?: QuizQuestion[];
  debate?: DebateAnalysis;
  mindmap?: MindMapNode[];
  slides?: Slide[];
  visual?: VisualData;
}

export interface ProcessRequest {
  document_id: string;
  selected_outputs: string[];
}

export interface ProcessResponse {
  document_id: string;
  status: 'processing' | 'complete' | 'error';
  results?: DocumentResults;
  error?: string;
}

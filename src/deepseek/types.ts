export interface SearchQuery {
  query: string;
  context?: string;
}

export interface SearchResult {
  text: string;
  score: number;
  metadata?: {
    file?: string;
    line?: number;
  };
}

export interface SearchResponse {
  results: SearchResult[];
  message?: string;
}

export interface AnalysisResult {
  analysis: string;
  suggestions?: string[];
  complexity?: {
    cognitive: number;
    cyclomatic: number;
    halstead: number;
  };
}

export interface GenerateCodeResponse {
  code: string;
  explanation?: string;
}

export interface DeepSeekError extends Error {
  status?: number;
  statusText?: string;
} 
import { env } from '../config/env';
import { logger } from '../utils/logger';
import {
  SearchQuery,
  SearchResponse,
  AnalysisResult,
  GenerateCodeResponse,
  DeepSeekError
} from './types';

const API_TIMEOUT = 10000; // 10 seconds timeout

class DeepSeekService {
  private readonly apiUrl: string;
  private readonly apiKey: string;
  private readonly isConfigured: boolean;

  constructor() {
    this.apiUrl = env.DEEPSEEK_API_URL;
    this.apiKey = env.DEEPSEEK_API_KEY;
    this.isConfigured = Boolean(this.apiUrl && this.apiKey);

    if (!this.isConfigured) {
      logger.warn('DeepSeek service is not properly configured. Features will be limited.');
    }
  }

  private async makeRequest<T>(endpoint: string, body: any): Promise<T> {
    if (!this.isConfigured) {
      throw new Error('DeepSeek service is not configured');
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), API_TIMEOUT);

    try {
      const response = await fetch(`${this.apiUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify(body),
        signal: controller.signal
      });

      if (!response.ok) {
        const error = new Error(`DeepSeek API error: ${response.statusText}`) as DeepSeekError;
        error.status = response.status;
        error.statusText = response.statusText;
        throw error;
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('DeepSeek API request timed out');
        }
        throw error;
      }
      throw new Error('Unknown error occurred');
    } finally {
      clearTimeout(timeout);
    }
  }

  async search({ query, context }: SearchQuery): Promise<SearchResponse> {
    try {
      if (!this.isConfigured) {
        return {
          results: [],
          message: 'DeepSeek search is not available - missing configuration'
        };
      }

      return await this.makeRequest<SearchResponse>('/search', { query, context });
    } catch (error) {
      logger.error('Search error:', error);
      return {
        results: [],
        message: error instanceof Error ? error.message : 'Search failed'
      };
    }
  }

  async analyzeCode(code: string, context?: string): Promise<AnalysisResult> {
    try {
      if (!this.isConfigured) {
        return {
          analysis: 'DeepSeek analysis is not available - missing configuration',
          suggestions: [],
          complexity: {
            cognitive: 0,
            cyclomatic: 0,
            halstead: 0
          }
        };
      }

      return await this.makeRequest<AnalysisResult>('/analyze', { code, context });
    } catch (error) {
      logger.error('Analysis error:', error);
      return {
        analysis: error instanceof Error ? error.message : 'Analysis failed',
        suggestions: [],
        complexity: {
          cognitive: 0,
          cyclomatic: 0,
          halstead: 0
        }
      };
    }
  }

  async generateCode(prompt: string, context?: string): Promise<GenerateCodeResponse> {
    try {
      if (!this.isConfigured) {
        return {
          code: '// DeepSeek code generation is not available - missing configuration',
          explanation: 'Service not configured'
        };
      }

      return await this.makeRequest<GenerateCodeResponse>('/generate', { prompt, context });
    } catch (error) {
      logger.error('Code generation error:', error);
      return {
        code: '// Code generation failed',
        explanation: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async quickAnalysis(code: string): Promise<string> {
    try {
      if (!this.isConfigured) {
        return 'DeepSeek quick analysis is not available - missing configuration';
      }

      const result = await this.analyzeCode(code, 'General analysis');
      return result.analysis;
    } catch (error) {
      logger.error('Quick analysis error:', error);
      return error instanceof Error ? error.message : 'Quick analysis failed';
    }
  }
}

export const deepseekService = new DeepSeekService(); 
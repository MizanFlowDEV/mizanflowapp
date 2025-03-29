import { useState, useCallback } from 'react';
import { deepseekService } from './service';
import { SearchQuery, SearchResponse, AnalysisResult, GenerateCodeResponse } from './types';

export function useDeepSeek() {
  const [isSearching, setIsSearching] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const search = useCallback(async (params: SearchQuery): Promise<SearchResponse | null> => {
    setIsSearching(true);
    setError(null);
    try {
      return await deepseekService.search(params);
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setIsSearching(false);
    }
  }, []);

  const analyzeCode = useCallback(async (code: string, context?: string): Promise<AnalysisResult | null> => {
    setIsAnalyzing(true);
    setError(null);
    try {
      return await deepseekService.analyzeCode(code, context);
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const generateCode = useCallback(async (prompt: string, context?: string): Promise<GenerateCodeResponse | null> => {
    setIsGenerating(true);
    setError(null);
    try {
      return await deepseekService.generateCode(prompt, context);
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const quickAnalysis = useCallback(async (code: string): Promise<string> => {
    setIsAnalyzing(true);
    setError(null);
    try {
      return await deepseekService.quickAnalysis(code);
    } catch (err) {
      setError(err as Error);
      return 'Unable to analyze code at this time.';
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  return {
    search,
    analyzeCode,
    generateCode,
    quickAnalysis,
    isSearching,
    isAnalyzing,
    isGenerating,
    error
  };
} 
import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, useTheme, HelperText } from 'react-native-paper';
import { useDeepSeek } from '../deepseek';
import { useLanguage } from '../contexts/LanguageContext';
import { logger } from '../utils/logger';

export function AISearch() {
  const theme = useTheme();
  const { t } = useLanguage();
  const { search, analyzeCode, isSearching, isAnalyzing, error } = useDeepSeek();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [analysis, setAnalysis] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const clearState = useCallback(() => {
    setResults([]);
    setAnalysis('');
    setMessage('');
  }, []);

  const handleSearch = async () => {
    if (!query.trim()) return;

    clearState();
    try {
      const response = await search({ query });
      if (response.results.length > 0) {
        setResults(response.results.map(r => r.text));
      }
      if (response.message) {
        setMessage(response.message);
      }
    } catch (err) {
      logger.error('Search error:', err);
      setMessage(err instanceof Error ? err.message : 'Search failed');
    }
  };

  const handleAnalyze = async () => {
    if (!query.trim()) return;

    clearState();
    try {
      const result = await analyzeCode(query);
      if (result) {
        setAnalysis(result.analysis);
        if (result.suggestions?.length) {
          setMessage(`Suggestions available: ${result.suggestions.length}`);
        }
      }
    } catch (err) {
      logger.error('Analysis error:', err);
      setMessage(err instanceof Error ? err.message : 'Analysis failed');
    }
  };

  const renderMessage = () => {
    if (!message) return null;

    const isError = error || message.toLowerCase().includes('error') || message.toLowerCase().includes('failed');
    return (
      <HelperText type={isError ? "error" : "info"} visible={true}>
        {message}
      </HelperText>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        label={t('search')}
        value={query}
        onChangeText={text => {
          setQuery(text);
          if (message) clearState();
        }}
        style={styles.input}
        error={!!error}
      />

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleSearch}
          loading={isSearching}
          disabled={isSearching || !query.trim()}
          style={styles.button}
        >
          {t('search')}
        </Button>

        <Button
          mode="contained"
          onPress={handleAnalyze}
          loading={isAnalyzing}
          disabled={isAnalyzing || !query.trim()}
          style={styles.button}
        >
          {t('analyze')}
        </Button>
      </View>

      {renderMessage()}

      {results.length > 0 && (
        <View style={styles.results}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            {t('searchResults')}
          </Text>
          {results.map((result, index) => (
            <Text key={index} style={styles.result}>{result}</Text>
          ))}
        </View>
      )}

      {analysis && (
        <View style={styles.results}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            {t('analysis')}
          </Text>
          <Text style={styles.result}>{analysis}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  button: {
    flex: 1,
  },
  results: {
    marginTop: 16,
  },
  sectionTitle: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  result: {
    marginBottom: 8,
  },
}); 
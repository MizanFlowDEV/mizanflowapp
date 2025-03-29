import { Platform } from 'react-native';
import { logger } from '../utils/logger';

interface EnvConfig {
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
  APP_VERSION: string;
  DEEPSEEK_API_URL: string;
  DEEPSEEK_API_KEY: string;
}

const getEnvVar = (name: string): string => {
  const value = process.env[`EXPO_PUBLIC_${name}`];
  if (!value) {
    // Only log warning in development
    if (__DEV__) {
      logger.warn(`Missing environment variable: ${name}`);
    }
    return '';
  }
  return value;
};

export const env: EnvConfig = {
  SUPABASE_URL: getEnvVar('SUPABASE_URL'),
  SUPABASE_ANON_KEY: getEnvVar('SUPABASE_ANON_KEY'),
  APP_VERSION: getEnvVar('APP_VERSION') || '1.0.0',
  DEEPSEEK_API_URL: getEnvVar('DEEPSEEK_API_URL'),
  DEEPSEEK_API_KEY: getEnvVar('DEEPSEEK_API_KEY'),
};

// Log configuration (with partial key hiding for security)
if (__DEV__) {
  logger.info('Environment Configuration:', {
    url: env.SUPABASE_URL,
    key: env.SUPABASE_ANON_KEY ? `${env.SUPABASE_ANON_KEY.substring(0, 8)}...` : 'missing',
    version: env.APP_VERSION,
    platform: Platform.OS,
    deepseekUrl: env.DEEPSEEK_API_URL || 'missing',
    deepseekKey: env.DEEPSEEK_API_KEY ? `${env.DEEPSEEK_API_KEY.substring(0, 8)}...` : 'missing',
  });
} 
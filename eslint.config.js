import eslint from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactNativePlugin from 'eslint-plugin-react-native';
import prettierConfig from 'eslint-config-prettier';

const commonGlobals = {
  module: 'writable',
  require: 'writable',
  process: 'writable',
  global: 'writable',
  console: 'writable',
  setTimeout: 'writable',
  clearTimeout: 'writable',
  setInterval: 'writable',
  clearInterval: 'writable',
  __DEV__: 'writable',
  $$require_external: 'writable',
  React: 'writable',
  exports: 'writable',
  jest: 'writable',
  describe: 'writable',
  it: 'writable',
  expect: 'writable',
  test: 'writable',
  beforeEach: 'writable',
  afterEach: 'writable',
  beforeAll: 'writable',
  afterAll: 'writable',
  window: 'writable',
  document: 'writable',
  navigator: 'writable',
  location: 'writable',
  history: 'writable',
  localStorage: 'writable',
  sessionStorage: 'writable',
};

export default [
  eslint.configs.recommended,
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/coverage/**',
      '**/.expo/**',
      '**/*.config.js',
      '**/*.config.ts',
      '**/*.config.json',
      '**/.cache/**',
      '**/.eslintcache',
      '**/*.log',
      '**/__tests__/**',
      '**/*.test.*',
      '**/*.spec.*',
      '**/*.min.js',
      '**/*.bundle.js',
      '**/metro.config.js',
      '**/babel.config.js',
      '**/app.config.js',
      '**/.expo/metro/**',
      '**/.expo/metro/externals/**',
      '**/.expo/metro/shims/**',
    ],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: commonGlobals,
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'react': reactPlugin,
      'react-hooks': reactHooksPlugin,
      'react-native': reactNativePlugin,
    },
    rules: {
      // Basic ESLint rules
      'no-unused-vars': 'off',
      'no-undef': 'error',
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'no-redeclare': 'error',
      'no-import-assign': 'error',

      // TypeScript rules
      '@typescript-eslint/no-unused-vars': ['warn', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      }],
      '@typescript-eslint/no-explicit-any': 'warn',

      // React rules
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // React Native rules
      'react-native/no-inline-styles': 'warn',
      'react-native/no-color-literals': 'warn',
      'react-native/no-raw-text': ['warn', { skip: ['Text', 'Button'] }],

      // Prettier compatibility
      ...prettierConfig.rules,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['**/.expo/**/*', '**/babel.config.js', '**/metro.config.js', '**/app.config.js'],
    languageOptions: {
      globals: {
        ...commonGlobals,
        process: 'writable',
        module: 'writable',
        require: 'writable',
        exports: 'writable',
        __dirname: 'writable',
        __filename: 'writable',
      },
    },
    rules: {
      'no-undef': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-console': 'off',
    },
  },
  {
    files: ['**/src/config/**/*'],
    languageOptions: {
      globals: {
        ...commonGlobals,
        process: 'writable',
        __DEV__: 'writable',
      },
    },
  },
]; 
/** @type {import('eslint').Linter.Config} */
/* eslint-disable no-undef */
module.exports = {
  root: true,
  extends: [
    'universe/native',
    'universe/shared/typescript-analysis',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react', 'react-native', 'react-hooks'],
  env: {
    browser: true,
    es2021: true,
    node: true,
    'react-native/react-native': true,
    jest: true,
  },
  globals: {
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
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'no-console': ['error', { allow: ['warn', 'error'] }],
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'warn',
    'react-native/no-color-literals': 'warn',
    'react-native/no-inline-styles': 'warn',
    'react-native/no-raw-text': ['warn', {
      skip: ['Text', 'Button']
    }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-redeclare': 'error',
    'no-import-assign': 'error',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc' },
      },
    ],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.d.ts'],
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    {
      files: [
        '.expo/**/*',
        'babel.config.js',
        'metro.config.js',
        'app.config.js',
        '*.config.js',
        '*.config.ts',
      ],
      rules: {
        'no-undef': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'no-console': 'off',
      },
    },
    {
      files: ['**/*.test.*', '**/*.spec.*', '**/__tests__/**/*'],
      env: {
        jest: true,
      },
      rules: {
        'no-console': 'off',
      },
    },
  ],
  ignorePatterns: [
    '**/node_modules/**',
    '**/dist/**',
    '**/*.config.js',
    '**/*.log',
    '.expo/metro/**/*',
    'babel.config.js',
    'metro.config.js',
    'jest.config.js',
  ],
}; 
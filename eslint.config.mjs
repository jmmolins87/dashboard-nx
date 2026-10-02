import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import angularPlugin from '@angular-eslint/eslint-plugin';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.ts'],
    plugins: {
      '@angular-eslint': angularPlugin,
    },
    rules: {
      '@angular-eslint/component-selector': [
        'error',
        { type: 'component', prefix: 'app', style: 'kebab-case' },
      ],
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'directive', prefix: 'app', style: 'camelCase' },
      ],
      '@angular-eslint/prefer-standalone': 'error',
      '@angular-eslint/use-lifecycle-interface': 'off',
      '@angular-eslint/no-empty-lifecycle-method': 'error',
      '@angular-eslint/use-component-view-encapsulation': 'error',
      '@angular-eslint/prefer-inject': 'error',
    },
  },
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      '.angular/**',
      'coverage/**',
      '*.config.*',
      'eslint.config.mjs',
    ],
  },
);
import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import prettier from 'eslint-config-prettier';

export default defineConfig(
  js.configs.recommended,
  tseslint.configs.recommended,
  astro.configs.recommended,
  prettier,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['../*'],
              message: 'Use the "@/" path alias instead of relative parent imports (e.g. "@/lib/foo").',
            },
          ],
        },
      ],
    },
  },
  {
    ignores: ['dist/**', '.astro/**', 'node_modules/**'],
  },
);

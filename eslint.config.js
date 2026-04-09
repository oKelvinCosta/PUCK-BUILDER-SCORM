import importPlugin from 'eslint-plugin-import'
import reactHooks from 'eslint-plugin-react-hooks'
import { globalIgnores } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config([
  globalIgnores(['dist']),
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      import: importPlugin,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        console: 'readonly',
        process: 'readonly',
      },
    },
    rules: {
      'import/no-unresolved': 'error',
      'import/named': 'error',
      'no-unused-vars': 'error',
      'no-undef': 'error',
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.mjs', '.ts', '.tsx'],
        },
      },
    },
  },
  // Override específico para backend
  {
    files: ['backend/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
        console: 'writable',
        process: 'readonly',
      },
    },
    rules: {
      'no-console': 'off', // Permite console no backend
      'no-unused-vars': 'error',
    },
  },
  // Override específico para frontend
  {
    files: ['frontend/**/*.{ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        console: 'readonly',
      },
    },
    rules: {
      'no-console': 'warn', // Avisa sobre console no frontend
      '@typescript-eslint/no-unused-vars': 'error',
    },
  },
])
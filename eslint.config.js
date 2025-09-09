import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import next from 'eslint-config-next';

export default defineConfig([
  { ignores: ['.next', 'dist', 'coverage'] },
  ...next(['core-web-vitals']),
  js.configs.recommended,
  ...tseslint.configs.recommended,
  reactHooks.configs['recommended-latest'],
  {
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      globals: globals.browser,
    },
  },
  eslintConfigPrettier,
]);

// export default tseslint.config([
//   globalIgnores(['dist']),
//   {
//     files: ['**/*.{ts,tsx}'],
//     extends: [
//       ...next(['core-web-vitals']),
//       js.configs.recommended,
//       tseslint.configs.recommended,
//       reactHooks.configs['recommended-latest'],
//       eslintConfigPrettier,
//     ],
//     languageOptions: {
//       ecmaVersion: 2020,
//       globals: globals.browser,
//     },
//   },
// ]);

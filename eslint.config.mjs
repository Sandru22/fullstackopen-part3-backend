import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import js from '@eslint/js'
import stylisticJs from '@stylistic/eslint-plugin-js'

export default defineConfig([
  js.configs.recommended,
  {
    plugins: {
      '@stylistic/js': stylisticJs,
    },
    rules: {
      '@stylistic/js/indent': ['error', 2],
      '@stylistic/js/linebreak-style': ['error', 'unix'],
      '@stylistic/js/quotes': ['error', 'single'],
      '@stylistic/js/semi': ['error', 'never'],
      '@typescript-eslint/no-require-imports': 'off',
      'no-undef': 'off',
      eqeqeq: 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-console': 'off',
    },
    files: ["**/*.js"], languageOptions: { sourceType: "commonjs" }
  },
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], languageOptions: { globals: globals.browser } },
  tseslint.configs.recommended,
  {
    ignores: ['dist/**'],
  },
]);

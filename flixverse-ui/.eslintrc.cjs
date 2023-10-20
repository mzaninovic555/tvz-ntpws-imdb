module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'google',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', 'target', '.eslintrc.cjs', 'vite.config.ts'],
  plugins: ['react-refresh'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'max-len': ['error', {'code': 150}],
    'linebreak-style': 'off',
    'comma-dangle': 'off',
    'indent': ['error', 2, {'SwitchCase': 1}],
    'require-jsdoc': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/ban-ts-comment': "off"
  }
}

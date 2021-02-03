module.exports = {
  extends: ['prettier/@typescript-eslint', 'plugin:prettier/recommended', 'airbnb-typescript/base', 'prettier'],
  env: {
    node: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {},
    },
  },
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    ecmaVersion: 2019,
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    'max-len': 0,
    'no-console': 0
  },
};
module.exports = {
  root: true,
  extends: ['../.eslintrc.cjs'],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true
  },
  plugins: ['@typescript-eslint'],
  rules: {}
};

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    '../.eslintrc.cjs',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true
  },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ],
    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_'
      }
    ],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: ['parameter', 'variable'],
        leadingUnderscore: 'forbid',
        filter: {
          regex: '_*',
          match: false
        },
        format: null
      },
      {
        selector: 'parameter',
        leadingUnderscore: 'require',
        format: null,
        modifiers: ['unused']
      }
    ]
  }
};

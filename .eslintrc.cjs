module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb',
    'airbnb-typescript',
    'prettier'
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 2,
    'linebreak-style': 0
  }
};

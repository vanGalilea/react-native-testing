module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'jest'],
  rules: {
    semi: [2, 'never'],
    'react-native/no-inline-styles': 0,
  },
  env: {
    'jest/globals': true,
  },
}

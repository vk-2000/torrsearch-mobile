module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: '@react-native',
  plugins: ['react-native', 'react-hooks', 'prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};

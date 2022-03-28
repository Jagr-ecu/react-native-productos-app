module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'prettier/prettier': 0,
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        '@typescript-eslint/no-unused-vars': 'warn',
        'react-native/no-inline-styles':'off',
        'no-shadow': 'off',
        'no-undef': 'off',
        'curly': 'off',
        'no-trailing-spaces': 'off',
        'semi': 'off',
      },
    },
  ],
};

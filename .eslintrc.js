module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: [
    'standard-with-typescript'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    project: './tsconfig.json'
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    'no-tabs': 'off',
    'object-shorthand': 'off',
    '@typescript-eslint/restrict-template-expressions' : 'off'
  },
  ignorePatterns: [".eslintrc.js"]
}

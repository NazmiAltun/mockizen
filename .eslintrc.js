module.exports = {
  root: true,
  plugins: ['@typescript-eslint', 'prettier'],
  extends: ['plugin:@typescript-eslint/eslint-recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  rules: {
    'max-len': ['error', { code: 140 }],
  },
};

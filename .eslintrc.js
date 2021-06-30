module.exports = {
  extends: [require.resolve('amper-scripts/config/eslint')],
  parserOptions: {
    project: './tsconfig-eslint.json'
  }
};

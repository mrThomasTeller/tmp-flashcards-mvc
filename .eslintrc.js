module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'comma-dangle': 0,
    'no-use-before-define': 0,
    'implicit-arrow-linebreak': 0,
    'function-paren-newline': 0,
    'no-param-reassign': 0,
    'no-confusing-arrow': 0,
    'object-curly-newline': 0,
    'no-nested-ternary': 0,
    'class-methods-use-this': 0,
    'no-console': 0,
    'operator-linebreak': 0,
    'lines-between-class-members': 0,
  },
};

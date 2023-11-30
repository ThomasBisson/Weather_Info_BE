module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'plugin:prettier/recommended',
    'prettier',
    'eslint:recommended'
  ],
  plugins: ['@typescript-eslint', '@stylistic/js'],
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    project: 'tsconfig.json',
  },
  env: {
    es6: true,
    node: true,
  },
  rules: {
    // Possible problems
    'no-await-in-loop': 'error',
    'no-duplicate-imports': 'error',
    'no-promise-executor-return': 'error',
    'no-self-compare': 'error',
    'no-unreachable-loop': 'error',
    'no-unused-private-class-members': 'error',
    'no-use-before-define': 'error',

    // Suggestions
    'arrow-body-style': ['error', 'as-needed', { 'requireReturnForObjectLiteral': true }],
    'block-scoped-var': 'error',
    'camelcase': ['error'],
    'capitalized-comments': ['error', 'always'],
    'dot-notation': 'error',
    'eqeqeq': ['error', 'smart'],
    'func-style': ['error', 'expression', { 'allowArrowFunctions': true }],
    'no-else-return': 'error',
    'no-empty-function': 'error',
    'no-inline-comments': 'error',
    'no-lonely-if': 'error',
    'no-param-reassign': 'error',
    'no-return-assign': 'error',
    'no-unneeded-ternary': 'error',
    'no-var': 'error',
    'prefer-arrow-callback': 'error',
    'prefer-const': 'error',
    'prefer-object-spread': 'error',
    'require-await': 'error',
    'sort-imports': 'error',

    // Stylistic
    '@stylistic/js/array-bracket-newline': ['error', { 'multiline': true }],
    '@stylistic/js/array-bracket-spacing': ['error', 'always'],
    '@stylistic/js/arrow-parens': ['error', 'always'],
    '@stylistic/js/arrow-spacing': 'error',
    '@stylistic/js/block-spacing': 'error',
    '@stylistic/js/brace-style': 'error',
    '@stylistic/js/comma-dangle': ['error', { // TODO : If it stays always-multiline then just always-multiline as second param
        'arrays': 'always-multiline',
        'objects': 'always-multiline',
        'imports': 'always-multiline',
        'exports': 'always-multiline',
        'functions': 'always-multiline'
    }],
    '@stylistic/js/eol-last': ['error', 'always'],
    '@stylistic/js/implicit-arrow-linebreak': ['error', 'beside'],
    '@stylistic/js/indent': ['error', 'tab'],
    '@stylistic/js/key-spacing': ['error', { 'afterColon': true }],
    '@stylistic/js/multiline-ternary': ['error', 'always-multiline'],
    '@stylistic/js/no-extra-parens': 'error',
    '@stylistic/js/no-extra-semi': 'error',
    '@stylistic/js/no-multi-spaces': 'error',
    '@stylistic/js/no-trailing-spaces': 'error',
    '@stylistic/js/semi': ['error', 'always'],
    '@stylistic/js/space-in-parens': ['error', 'never'],

    'prettier/prettier': [
      'error',
      {
        'endOfLine': 'auto'
      },
    ],
  },
};
module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    }
  },
  env: {
    browser: true,
    node: true
  },
  extends: 'standard',
  plugins: [
    'html'
  ],
  'rules': {
    'no-cond-assign': 'error',
    'no-constant-condition': 'error',
    'no-control-regex': 'error',
    //产品模式下不开启debugger 开发环境下允许使用
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-dupe-args': 'error',
    'no-dupe-keys': 'error',
    'no-duplicate-case': 'error',
    'no-empty-character-class': 'error',
    'no-empty': 'error',
    'no-ex-assign': 'error',
    'no-extra-boolean-cast': 'error',
    'no-extra-parens': 'error',
    'no-extra-semi': 'error',
    'no-func-assign': 'error',
    'no-inner-declarations': 'error',
    'no-invalid-regexp': 'error',
    'no-irregular-whitespace': 'error',
    'no-obj-calls': 'error',
    'no-regex-spaces': 'error',
    'no-sparse-arrays': 'error',
    'no-unexpected-multiline': 'error',
    'no-unreachable': 'error',
    'no-unsafe-finally': 'error',
    'use-isnan': 'error',
    'valid-typeof': 'error',
    'consistent-return': 'error',
    'curly': 'error',
    'default-case': 'error',
    'dot-location': ['error', 'object'],//
    'eqeqeq': 'error',
    'no-case-declarations': 'error',
    'no-else-return': 'error',
    'no-empty-function': 'error',
    'no-empty-pattern': 'error',
    'no-eq-null': 'error',
    'no-extra-label': 'error',
    'no-fallthrough': 'error',
    'no-floating-decimal': 'error',
    'no-magic-numbers': 0,
    'no-multi-spaces': 'error',
    'no-multi-str': 'error',
    'no-new-func': 'error',
    'no-new-wrappers': 'error',
    'no-octal': 'error',
    'no-redeclare': 'error',
    'no-return-assign': 'error',
    'no-self-assign': 'error',
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-throw-literal': 'error',
    'no-unused-expressions': 'error',
    'no-unused-labels': 'error',
    'no-useless-concat': 'error',

    'no-delete-var': 'error',
    'no-label-var': 'error',
    'no-restricted-globals': ['error', 'event'],
    'no-shadow-restricted-names': 'error',
    'no-undef-init': 'error',
    'no-undefined': 'error',
    'no-unused-vars': 'error',
    'no-use-before-define': 'error',
    'camelcase': 'error',
    'comma-spacing': ['error', { 'before': false, 'after': true }],
    'newline-after-var': ['error', 'always'],
    'newline-per-chained-call': ['error', { 'ignoreChainWithDepth': 4 }],
    'no-inline-comments': 'error',
    'no-lonely-if': 'error',
    'no-multiple-empty-lines': ['error', { "max": 2, "maxEOF": 2 }],
    'no-whitespace-before-property': 'error',
    'semi-spacing': ['error', {'before': false, 'after': false}],
    'semi': ['error', 'always'],
    'space-before-function-paren': ['error', 'always'],
    'space-infix-ops': 'error',
    'spaced-comment': ['error', 'always'],

    'arrow-body-style': ['error', 'always'],
    'arrow-parens': ['error', 'as-needed'],
    'arrow-spacing': ['error', { 'before': true, 'after': true }],
    'constructor-super': 'error',
    'no-const-assign': 'error',
    'no-dupe-class-members': 'error',
    'no-this-before-super': 'error',
    'no-path-concat': 0,
    'no-trailing-spaces': 0,
    'padded-blocks': 0,
    //开启严格模式编码es6
    // 'strict': ['error', 'global'],

    'no-console': ["error", { allow: ["warn", "error","log"] }],
    // allow async-await
    // 'generator-star-spacing': 0,
  }
}
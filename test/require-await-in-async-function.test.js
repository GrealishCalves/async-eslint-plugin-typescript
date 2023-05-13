const path = require('path');
const { RuleTester } = require('eslint');
const rule = require('../rules/require-await-in-async');

const ruleTester = new RuleTester({
  parser: path.resolve(__dirname, '..', 'node_modules', '@typescript-eslint', 'parser'), // Update this line
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
});

ruleTester.run('require-await-in-async-function', rule, {
  valid: [
    // Async functions with await
    'async function validFunction() { await someFunction(); }',
    'const validFunction = async function() { await someFunction(); };',
    'const validFunction = async () => { await someFunction(); };',

    // Non-async functions
    'function validFunction() { console.log("Hello, World!"); }',
    'const validFunction = function() { console.log("Hello, World!"); };',
    'const validFunction = () => { console.log("Hello, World!"); };',
  ],

  invalid: [
    {
      code: 'async function invalidFunction() { someFunction(); }',
      errors: [{ messageId: 'missingAwait', type: 'FunctionDeclaration' }],
    },
    {
      code: 'const invalidFunction = async function() { someFunction(); };',
      errors: [{ messageId: 'missingAwait', type: 'FunctionExpression' }],
    },
    {
      code: 'const invalidFunction = async () => { someFunction(); };',
      errors: [{ messageId: 'missingAwait', type: 'ArrowFunctionExpression' }],
    },
  ],
});

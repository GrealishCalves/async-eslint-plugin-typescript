const path = require('path');
const { RuleTester } = require('eslint');
const rule = require('../rules/async-name');

const ruleTester = new RuleTester({
  parser: path.resolve(__dirname, '..', 'node_modules', '@typescript-eslint', 'parser'),
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
});

ruleTester.run('enforce-async-function-name-ends-with-async', rule, {
  valid: [
    'async function validFunctionAsync() { await someFunction(); }',
    'const validFunctionAsync = async () => { await someFunction(); };',

    // Non-async functions
    'function validFunction() { console.log("Hello, World!"); }',
    'const validFunction = function() { console.log("Hello, World!"); };',
    'const validFunction = () => { console.log("Hello, World!"); };',
  ],

  invalid: [
    {
      code: 'async function invalidFunction() { await someFunction(); }',
      errors: [{ message: 'Async function name should end with "Async"', type: 'FunctionDeclaration' }],
    },
    {
      code: 'const invalidFunction = async function() { await someFunction(); };',
      errors: [{ message: 'Async function name should end with "Async"', type: 'FunctionExpression' }],
    },
    {
      code: 'const invalidFunction = async () => { await someFunction(); };',
      errors: [{ message: 'Async function name should end with "Async"', type: 'ArrowFunctionExpression' }],
    },
  ],
});

# ESLint TypeScript Custom Rules

This repository contains custom ESLint rules for TypeScript projects to enforce best practices when working with asynchronous functions in JavaScript/TypeScript.

## Rules

There are two custom rules included in this repository:

1. **Async Function Naming:** Enforce async function names to end with "Async"
2. **Require Await Statement:** Require an await statement in async functions

### 1. Async Function Naming

This rule enforces that the names of async functions should end with "Async". By following this naming convention, it's easier to understand that a function is asynchronous just by looking at its name.

**Rule Details:**

- The rule checks for three types of functions: `FunctionDeclaration`, `FunctionExpression`, and `ArrowFunctionExpression`.
- If a function is async and its name doesn't end with 'Async', it reports an issue with the message "Async function name should end with 'Async'".

**Examples of incorrect code:**

```ts
async function fetchData() {
  // ...
}

const fetchData = async function() {
  // ...
}

const fetchData = async () => {
  // ...
}
```
**Examples of correct code:**

```ts
async function fetchDataAsync() {
  // ...
}

const fetchData = async function fetchDataAsync() {
  // ...
}

const fetchDataAsync = async () => {
  // ...
}
```

### 2. Require Await Statement

This rule helps prevent possible errors caused by forgetting to use 'await' inside an async function, which could lead to unexpected behavior.

**Rule Details:**

- The rule checks for three types of functions: `FunctionDeclaration`, `FunctionExpression`, and `ArrowFunctionExpression`.
- If a function is async and doesn't have an await statement, it reports an issue with the message "Async function must include an await statement."

**Examples of incorrect code:**

```ts
async function fetchDataAsync() {
  const data = fetch('https://api.example.com/data');
  // ...
}

const fetchDataAsync = async function() {
  const data = fetch('https://api.example.com/data');
  // ...
}

const fetchDataAsync = async () => {
  const data = fetch('https://api.example.com/data');
  // ...
}
```

**Example of correct code:**

```ts
async function fetchDataAsync() {
  const data = await fetch('https://api.example.com/data');
  // ...
}

const fetchDataAsync = async function() {
  const data = await fetch('https://api.example.com/data');
  // ...
}

const fetchDataAsync = async () => {
  const data = await fetch('https://api.example.com/data');
  // ...
}

```



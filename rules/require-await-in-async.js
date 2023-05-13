module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Require await statement in async functions',
      category: 'Possible Errors',
      recommended: true,
    },
    schema: [],
    messages: {
      missingAwait: 'Async function must include an await statement.',
    },
  },

  create(context) {
    function checkForAwaitStatement(node) {
      if (node.async && !context.getSourceCode().getFirstToken(node, { filter: token => token.value === 'await' })) {
        context.report({ node, messageId: 'missingAwait' });
      }
    }

    return {
      FunctionDeclaration: checkForAwaitStatement,
      FunctionExpression: checkForAwaitStatement,
      ArrowFunctionExpression: checkForAwaitStatement,
    };
  },
};

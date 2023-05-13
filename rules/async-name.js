module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce async function names to end with "Async"',
      category: 'Best Practices',
      recommended: true,
    },
    fixable: null,
    schema: [],
  },

  create(context) {
    return {
      FunctionDeclaration(node) {
        if (node.async && !node.id.name.endsWith('Async')) {
          context.report({
            node,
            message: 'Async function name should end with "Async"',
          });
        }
      },
      
      FunctionExpression(node) {
        if (node.async && !node.id?.name?.endsWith('Async')) {
          context.report({
            node,
            message: 'Async function name should end with "Async"',
          });
        }
      },
      
      ArrowFunctionExpression(node) {
        if (node.async) {
          let variableDeclarator = node.parent;
          while (variableDeclarator && variableDeclarator.type !== 'VariableDeclarator') {
            variableDeclarator = variableDeclarator.parent;
          }
          if (variableDeclarator && !variableDeclarator.id.name.endsWith('Async')) {
            context.report({
              node,
              message: 'Async function name should end with "Async"',
            });
          }
        }
      },
    };
  },
};

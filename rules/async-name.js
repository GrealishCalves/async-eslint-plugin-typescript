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
          let parentFunction = node.parent;
          while (parentFunction && parentFunction.type !== 'FunctionDeclaration' && parentFunction.type !== 'FunctionExpression') {
            parentFunction = parentFunction.parent;
          }
          if (parentFunction && !parentFunction.id?.name?.endsWith('Async')) {
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

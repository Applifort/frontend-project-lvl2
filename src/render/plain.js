#!/usr/bin/env node

const flatten = (value) => {
  if (typeof value === 'object') return '[complex value]';
  return typeof value === 'boolean' ? value : `'${value}'`;
};

const mapper = {
  group: ({ key, children }, path, fn) => fn(children, [], path === '' ? key : path.concat(`.${key}`)),
  added: ({ key, after }, path) => [`Property '${path === '' ? key : path.concat(`.${key}`)}' was added with value: ${flatten(after)}`],
  removed: ({ key }, path) => [`Property '${path === '' ? key : path.concat(`.${key}`)}' was removed`],
  changed: ({ key, before, after }, path) => [`Property '${path === '' ? key : path.concat(`.${key}`)}' was updated. From ${flatten(before)} to ${flatten(after)}`],
  unchanged: () => [],
};


export default (ast) => {
  const iter = (tree, iAcc, path) => tree
    .reduce((acc, node) => [...acc, ...mapper[node.type](node, path, iter)], iAcc);
  return iter(ast, [], '').join('\n');
};

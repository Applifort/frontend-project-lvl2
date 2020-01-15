#!/usr/bin/env node

const flatten = (value) => {
  if (typeof value === 'object') return '[complex value]';
  return typeof value === 'boolean' ? value : `'${value}'`;
};

const fullPath = (path, current) => (path === '' ? current : path.concat(`.${current}`));

const mapper = {
  group: ({ name, value }, path, fn) => fn(value, [], fullPath(path, name)),
  added: ({ name, value }, path) => [`Property '${fullPath(path, name)}' was added with value: ${flatten(value)}`],
  removed: ({ name }, path) => [`Property '${fullPath(path, name)}' was removed`],
  changed: ({ name, value }, path) => [`Property '${path === ''
    ? name : path.concat(`.${name}`)}' was updated. From ${flatten(value.oldValue)} to ${flatten(value.newValue)}`],
  unchanged: () => [],
};


export default (ast) => {
  const iter = (tree, iAcc, path) => tree
    .reduce((acc, node) => [...acc, ...mapper[node.type](node, path, iter)], iAcc);
  return iter(ast, [], '').join('\n');
};

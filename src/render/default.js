#!/usr/bin/env node

const seporator = '    ';
const plus = '  + ';
const minus = '  - ';
const empty = '    ';

const stringify = (lastElement, data, depth) => {
  if (typeof data !== 'object') return [`${lastElement}${data}`];
  const prefix = seporator.repeat(depth + 1);
  const strings = Object.entries(data).reduce((acc, [key, value]) => [...acc, `${prefix}${empty}${key}: ${value}`], []);
  const changedLastElement = `${lastElement}{`;
  return [changedLastElement, ...strings, `${prefix}}`];
};

const mapper = {
  group: ({ name, value }, prefix, depth, fn) => [`${prefix}${empty}${name}: {`, ...fn(value, [], depth + 1), `${prefix}${empty}}`],
  added: ({ name, value }, prefix, depth) => stringify(`${prefix}${plus}${name}: `, value, depth),
  removed: ({ name, value }, prefix, depth) => stringify(`${prefix}${minus}${name}: `, value, depth),
  changed: ({ name, value }, prefix, depth) => [
    ...stringify(`${prefix}${minus}${name}: `, value.oldValue, depth),
    ...stringify(`${prefix}${plus}${name}: `, value.newValue, depth),
  ],
  unchanged: ({ name, value }, prefix) => [`${prefix}${empty}${name}: ${value}`],
};

export default (ast) => {
  const iter = (tree, iAcc, depth) => {
    const prefix = seporator.repeat(depth);
    return tree
      .reduce((acc, node) => [...acc, ...mapper[node.type](node, prefix, depth, iter)], iAcc);
  };
  return ['{', ...iter(ast, [], 0), '}'].join('\n');
};

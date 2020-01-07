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
  group: ({ key, children }, prefix, depth, fn) => [`${prefix}${empty}${key}: {`, ...fn(children, [], depth + 1), `${prefix}${empty}}`],
  added: ({ key, after }, prefix, depth) => stringify(`${prefix}${plus}${key}: `, after, depth),
  removed: ({ key, before }, prefix, depth) => stringify(`${prefix}${minus}${key}: `, before, depth),
  changed: ({ key, before, after }, prefix, depth) => [
    ...stringify(`${prefix}${minus}${key}: `, before, depth),
    ...stringify(`${prefix}${plus}${key}: `, after, depth),
  ],
  unchanged: ({ key, after }, prefix) => [`${prefix}${empty}${key}: ${after}`],
};

export default (ast) => {
  const iter = (tree, iAcc, depth) => {
    const prefix = seporator.repeat(depth);
    return tree
      .reduce((acc, node) => [...acc, ...mapper[node.type](node, prefix, depth, iter)], iAcc);
  };
  return ['{', ...iter(ast, [], 0), '}'].join('\n');
};

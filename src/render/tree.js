
const seporator = '    ';
const plus = '  + ';
const minus = '  - ';
const empty = '    ';

const getPrefix = (depth) => seporator.repeat(depth);

const stringify = (lastElement, data, depth) => {
  if (typeof data !== 'object') return [`${lastElement}${data}`];
  const prefix = getPrefix(depth + 1);
  const strings = Object.entries(data).reduce((acc, [key, value]) => [...acc, `${prefix}${empty}${key}: ${value}`], []);
  const changedLastElement = `${lastElement}{`;
  return [changedLastElement, ...strings, `${prefix}}`];
};

const mapper = {
  group: ({ name, value }, depth, fn) => [`${getPrefix(depth)}${empty}${name}: {`, ...fn(value, [], depth + 1), `${getPrefix(depth)}${empty}}`],
  added: ({ name, value }, depth) => stringify(`${getPrefix(depth)}${plus}${name}: `, value, depth),
  removed: ({ name, value }, depth) => stringify(`${getPrefix(depth)}${minus}${name}: `, value, depth),
  changed: ({ name, value }, depth) => [
    ...stringify(`${getPrefix(depth)}${minus}${name}: `, value.oldValue, depth),
    ...stringify(`${getPrefix(depth)}${plus}${name}: `, value.newValue, depth),
  ],
  unchanged: ({ name, value }, depth) => [`${getPrefix(depth)}${empty}${name}: ${value}`],
};

export default (ast) => {
  const iter = (tree, iAcc, depth) => tree
    .reduce((acc, node) => [...acc, ...mapper[node.type](node, depth, iter)], iAcc);
  return ['{', ...iter(ast, [], 0), '}'].join('\n');
};

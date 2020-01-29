
const seporator = '    ';
const plus = '  + ';
const minus = '  - ';
const empty = '    ';

const getPrefix = (depth) => seporator.repeat(depth);

const stringify = (lastElement, data, depth) => {
  if (typeof data !== 'object') return `${lastElement}${data}`;
  const prefix = getPrefix(depth + 1);
  const strings = Object.entries(data).map(([key, value]) => `${prefix}${empty}${key}: ${value}`).join('\n');
  const changedLastElement = `${lastElement}{`;
  return `${changedLastElement}\n${strings}\n${prefix}}`;
};

const mapper = {
  group: ({ name, children }, depth, fn) => `${getPrefix(depth)}${empty}${name}: {\n${fn(children, depth + 1)}\n${getPrefix(depth)}${empty}}`,
  added: ({ name, value }, depth) => stringify(`${getPrefix(depth)}${plus}${name}: `, value, depth),
  removed: ({ name, value }, depth) => stringify(`${getPrefix(depth)}${minus}${name}: `, value, depth),
  changed: ({ name, value }, depth) => {
    const prefixOld = `${getPrefix(depth)}${minus}${name}: `;
    const prefixNew = `${getPrefix(depth)}${plus}${name}: `;
    return `${stringify(prefixOld, value.oldValue, depth)}\n${stringify(prefixNew, value.newValue, depth)}`;
  },
  unchanged: ({ name, value }, depth) => `${getPrefix(depth)}${empty}${name}: ${value}`,
};

export default (ast) => {
  const iter = (tree, depth) => tree
    .map((node) => mapper[node.type](node, depth, iter)).join('\n');
  return `{\n${iter(ast, 0)}\n}`;
};

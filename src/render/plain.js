
const getFullPath = (path, current) => (path === '' ? current : path.concat(`.${current}`));

const format = (value) => {
  switch (typeof value) {
    case 'object': return '[complex value]';
    case 'boolean': return value;
    default: return `'${value}'`;
  }
};

const mapper = {
  group: ({ name, children }, path, fn) => fn(children, getFullPath(path, name)),
  added: ({ name, value }, path) => `Property '${getFullPath(path, name)}' was added with value: ${format(value)}`,
  removed: ({ name }, path) => `Property '${getFullPath(path, name)}' was removed`,
  changed: ({ name, value }, path) => `Property '${getFullPath(path, name)}' was updated. From ${format(value.oldValue)} to ${format(value.newValue)}`,
};


export default (ast) => {
  const iter = (tree, path) => tree
    .filter((node) => node.type !== 'unchanged')
    .map((node) => mapper[node.type](node, path, iter))
    .join('\n');
  return iter(ast, '');
};

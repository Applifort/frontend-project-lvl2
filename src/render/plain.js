import { identity } from 'lodash';

const getFullPath = (path, current) => (path === '' ? current : path.concat(`.${current}`));

const valueTypeProcess = [
  {
    check: (value) => typeof value === 'object',
    process: () => '[complex value]',
  },
  {
    check: (value) => typeof value === 'boolean',
    process: identity,
  },
  {
    check: () => true,
    process: (value) => `'${value}'`,
  },
];

const getValueTypeProcess = (value) => valueTypeProcess.find(({ check }) => check(value));

const flatten = (value) => {
  const { process } = getValueTypeProcess(value);
  return process(value);
};

const mapper = {
  group: ({ name, children }, path, fn) => fn(children, getFullPath(path, name)),
  added: ({ name, value }, path) => `Property '${getFullPath(path, name)}' was added with value: ${flatten(value)}`,
  removed: ({ name }, path) => `Property '${getFullPath(path, name)}' was removed`,
  changed: ({ name, value }, path) => `Property '${getFullPath(path, name)}' was updated. From ${flatten(value.oldValue)} to ${flatten(value.newValue)}`,
};


export default (ast) => {
  const iter = (tree, path) => tree
    .filter((node) => node.type !== 'unchanged')
    .map((node) => mapper[node.type](node, path, iter)).join('\n');
  return iter(ast, '');
};

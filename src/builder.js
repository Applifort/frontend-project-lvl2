import { has, keys, union } from 'lodash';

const typeMapper = [
  {
    type: 'group',
    check: (first, second, key) => typeof first[key] === 'object' && typeof second[key] === 'object',
    process: ({
      firstConfig, secondConfig, key, parse,
    }) => ({ children: parse(firstConfig[key], secondConfig[key]) }),
  },
  {
    type: 'unchanged',
    check: (first, second, key) => has(first, key)
      && has(second, key) && first[key] === second[key],
    process: ({ firstConfig, key }) => ({ value: firstConfig[key] }),
  },
  {
    type: 'changed',
    check: (first, second, key) => has(first, key) && has(second, key),
    process: ({ firstConfig, secondConfig, key }) => (
      { value: { oldValue: firstConfig[key], newValue: secondConfig[key] } }),
  },
  {
    type: 'added',
    check: (first, second, key) => !has(first, key) && has(second, key),
    process: ({ secondConfig, key }) => ({ value: secondConfig[key] }),
  },
  {
    type: 'removed',
    check: (first, second, key) => has(first, key) && !has(second, key),
    process: ({ firstConfig, key }) => ({ value: firstConfig[key] }),
  },
];

const getTypeMapper = (firstConfig, secondConfig, key) => typeMapper.find(
  ({ check }) => check(firstConfig, secondConfig, key),
);

const parse = (firstConfig, secondConfig) => {
  const configsKeys = union(keys(firstConfig), keys(secondConfig)).sort();
  const ast = configsKeys
    .map((key) => {
      const { type, process } = getTypeMapper(firstConfig, secondConfig, key);
      const data = process({
        firstConfig, secondConfig, key, parse,
      });
      return { name: key, type, ...data };
    });
  return ast;
};

export default parse;

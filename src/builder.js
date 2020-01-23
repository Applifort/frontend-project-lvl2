import { has, keys } from 'lodash';

const typeMapper = [
  {
    type: 'group',
    contain: 'children',
    check: (first, second, key) => typeof first[key] === 'object' && typeof second[key] === 'object',
    process: ({
      firstConfig, secondConfig, key, parse,
    }) => parse(firstConfig[key], secondConfig[key]),
  },
  {
    type: 'unchanged',
    contain: 'value',
    check: (first, second, key) => has(first, key)
      && has(second, key) && first[key] === second[key],
    process: ({ firstConfig, key }) => firstConfig[key],
  },
  {
    type: 'changed',
    contain: 'value',
    check: (first, second, key) => has(first, key) && has(second, key),
    process: ({ firstConfig, secondConfig, key }) => (
      { oldValue: firstConfig[key], newValue: secondConfig[key] }),
  },
  {
    type: 'added',
    contain: 'value',
    check: (first, second, key) => !has(first, key) && has(second, key),
    process: ({ secondConfig, key }) => secondConfig[key],
  },
  {
    type: 'removed',
    contain: 'value',
    check: (first, second, key) => has(first, key) && !has(second, key),
    process: ({ firstConfig, key }) => firstConfig[key],
  },
];

const getTypeMapper = (firstConfig, secondConfig, key) => typeMapper.find(
  ({ check }) => check(firstConfig, secondConfig, key),
);

const union = (firstConfigKeys, secondConfigKeys) => {
  const filteredSecondConfigKeys = secondConfigKeys.filter(
    (el) => firstConfigKeys.indexOf(el) === -1,
  );
  return firstConfigKeys.concat(filteredSecondConfigKeys);
};

const parse = (firstConfig, secondConfig) => {
  const configsKeys = union(keys(firstConfig), keys(secondConfig)).sort();
  const ast = configsKeys.map((key) => {
    const { type, process, contain } = getTypeMapper(firstConfig, secondConfig, key);
    const value = process({
      firstConfig, secondConfig, key, parse,
    });
    return { name: key, type, [contain]: value };
  });
  return ast;
};

export default parse;

import { has, keys } from 'lodash';

const typeMapper = [
  {
    type: 'group',
    check: (first, second, key) => typeof first[key] === 'object' && typeof second[key] === 'object',
    process: ({
      firstConfig, secondConfig, key, parse,
    }) => parse(firstConfig[key], secondConfig[key]),
  },
  {
    type: 'unchanged',
    check: (first, second, key) => has(first, key)
      && has(second, key) && first[key] === second[key],
    process: ({ firstConfig, key }) => firstConfig[key],
  },
  {
    type: 'changed',
    check: (first, second, key) => has(first, key) && has(second, key),
    process: ({ firstConfig, secondConfig, key }) => (
      { oldValue: firstConfig[key], newValue: secondConfig[key] }),
  },
  {
    type: 'added',
    check: (first, second, key) => !has(first, key) && has(second, key),
    process: ({ secondConfig, key }) => secondConfig[key],
  },
  {
    type: 'removed',
    check: (first, second, key) => has(first, key) && !has(second, key),
    process: ({ firstConfig, key }) => firstConfig[key],
  },
];

const getTypeMapper = (firstConfig, secondConfig, key) => typeMapper.find(
  ({ check }) => check(firstConfig, secondConfig, key),
);

const parse = (firstConfig = {}, secondConfig = {}) => {
  const firstConfigKeys = keys(firstConfig);
  const filteredSecondConfigKeys = keys(secondConfig).filter(
    (el) => firstConfigKeys.indexOf(el) === -1,
  );
  const configsKeys = firstConfigKeys.concat(filteredSecondConfigKeys).sort();
  const ast = configsKeys.reduce((acc, key) => {
    const { type, process } = getTypeMapper(firstConfig, secondConfig, key);
    const value = process({
      firstConfig, secondConfig, key, parse,
    });
    return [...acc, { name: key, type, value }];
  }, []);
  return ast;
};

export default parse;

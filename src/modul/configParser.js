#!/usr/bin/env node

import { has, keys, identity } from 'lodash';

const singleBuild = (type, key, firstConfigValue, secondConfigValue) => ({
  key, type, before: firstConfigValue, after: secondConfigValue,
});

const groupBuild = (...rest) => ({
  key: rest[1], type: rest[0], children: rest[4],
});

const typeMapper = [
  {
    type: 'group',
    check: (first, second) => typeof first === 'object' && typeof second === 'object',
    process: (fn, firstValue, secondValue) => fn(firstValue, secondValue),
    build: groupBuild,
  },
  {
    type: 'unchanged',
    check: (first, second) => first === second,
    process: identity,
    build: singleBuild,
  },
  {
    type: 'changed',
    check: (first, second) => first !== 'ABSENT_' && second !== 'ABSENT_',
    process: identity,
    build: singleBuild,
  },
  {
    type: 'added',
    check: (...values) => values[0] === 'ABSENT_',
    process: identity,
    build: singleBuild,
  },
  {
    type: 'removed',
    check: (...values) => values[1] === 'ABSENT_',
    process: identity,
    build: singleBuild,
  },
];

const getTypeMapper = (first, second) => typeMapper.find(({ check }) => check(first, second));

const parse = (firstConfig, secondConfig) => {
  const firstConfigKeys = keys(firstConfig);
  const filteredSecondConfigKeys = keys(secondConfig).filter(
    (el) => firstConfigKeys.indexOf(el) === -1,
  );
  const configsKeys = firstConfigKeys.concat(filteredSecondConfigKeys).sort();
  const ast = configsKeys.reduce((acc, key) => {
    const firstConfigValue = has(firstConfig, key) ? firstConfig[key] : 'ABSENT_';
    const secondConfigValue = has(secondConfig, key) ? secondConfig[key] : 'ABSENT_';
    const { type, process, build } = getTypeMapper(firstConfigValue, secondConfigValue);
    const children = process(parse, firstConfigValue, secondConfigValue);
    return [...acc, build(type, key, firstConfigValue, secondConfigValue, children)];
  }, []);
  return ast;
};

export default parse;

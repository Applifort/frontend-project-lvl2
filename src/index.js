#!/usr/bin/env node
const _ = require('lodash');

export default (firstConfig, secondConfig) => {
  const firstConfigcheck = Object.entries(firstConfig).reduce((acc, [key, value]) => {
    if (_.has(secondConfig, key)) {
      if (firstConfig[key] === secondConfig[key]) return [...acc, `  ${key}: ${value}`];
      const changedLineDiff = [`+ ${key}: ${firstConfig[key]}`, `- ${key}: ${secondConfig[key]}`];
      return [...acc, ...changedLineDiff];
    }
    return [...acc, `- ${key}: ${value}`];
  }, []);
  const diff = Object.entries(secondConfig).reduce((acc, [key, value]) => {
    if (_.has(firstConfig, key)) return acc;
    return [...acc, `+ ${key}: ${value}`];
  }, firstConfigcheck);
  return ['{', ...diff, '}'].join('\n');
};

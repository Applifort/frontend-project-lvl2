import { has } from 'lodash';
import ini from 'ini';
import yaml from 'js-yaml';

const format = (content) => Object.entries(content).reduce((acc, [key, value]) => {
  if (typeof value === 'object') return { ...acc, [key]: format(value) };
  const newValue = !Number.isNaN(Number(value)) && typeof value === 'string' ? Number(value) : value;
  return { ...acc, [key]: newValue };
}, {});

const parsers = {
  json: JSON.parse,
  yaml: yaml.safeLoad,
  ini: (content) => format(ini.parse(content)),
};

export default (content, type) => {
  if (!has(parsers, type)) {
    throw new Error(`Format - ${type} is NOT supporting;
    Supporting formats: JSON, yaml, ini`);
  }
  const parse = parsers[type];
  return parse(content);
};

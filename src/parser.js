import { has } from 'lodash';
import ini from 'ini';

const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

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

export default (filePath) => {
  const type = path.extname(filePath).slice(1);
  if (!has(parsers, type)) {
    throw new Error(`Неподдерживаемый формат ${type};
    Поддерживаемые форматы: JSON, yaml, ini`);
  }
  const content = fs.readFileSync(filePath, 'UTF-8');
  return parsers[type](content);
};

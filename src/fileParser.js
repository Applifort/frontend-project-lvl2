#!/usr/bin/env node

import { has } from 'lodash';
import ini from 'ini';

const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

const formatIni = (content) => Object.entries(content).reduce((acc, [key, value]) => {
  if (typeof value === 'object') return { ...acc, [key]: formatIni(value) };
  const newValue = !Number.isNaN(Number(value)) && typeof value === 'string' ? Number(value) : value;
  return { ...acc, [key]: newValue };
}, {});

const typeMapper = {
  '.json': (file) => JSON.parse(file),
  '.yaml': (file) => yaml.safeLoad(file),
  '.ini': (file) => formatIni(ini.parse(file)),
};

export default (filePath) => {
  const type = path.extname(filePath);
  if (!has(typeMapper, type)) {
    throw new Error(`Неподдерживаемый формат ${type}
    Поддерживаемые форматы: JSON, yaml, ini`);
  }
  const content = fs.readFileSync(filePath, 'UTF-8');
  return typeMapper[type](content);
};

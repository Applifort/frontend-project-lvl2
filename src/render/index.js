#!/usr/bin/env node
import { has } from 'lodash';

import defaultRender from './default';
import plainRender from './plain';
import jsonRender from './json';

const formatSelect = {
  default: defaultRender,
  plain: plainRender,
  json: jsonRender,
};

export default (format, ast) => {
  if (!has(formatSelect, format)) {
    throw new Error(`Неподдерживаемый формат вывода - ${format}
    Поддерживаемые форматы вывода: JSON, plain, default`);
  }
  return formatSelect[format](ast);
};

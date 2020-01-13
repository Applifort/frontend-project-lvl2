#!/usr/bin/env node
import { has } from 'lodash';

import defaultRender from './default';
import plainRender from './plain';
import jsonRender from './json';

const renders = {
  default: defaultRender,
  plain: plainRender,
  json: jsonRender,
};

export default (format, ast) => {
  if (!has(renders, format)) {
    throw new Error(`Неподдерживаемый формат вывода - ${format}
    Поддерживаемые форматы вывода: json, plain, default`);
  }
  const render = renders[format];
  return render(ast);
};

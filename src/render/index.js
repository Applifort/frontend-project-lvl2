import { has } from 'lodash';
import treeRender from './tree';
import plainRender from './plain';
import jsonRender from './json';

const renders = {
  tree: treeRender,
  plain: plainRender,
  json: jsonRender,
};

export default (format, ast) => {
  if (!has(renders, format)) {
    throw new Error(`Неподдерживаемый формат вывода - ${format}
    Поддерживаемые форматы вывода: json, plain, tree`);
  }
  const render = renders[format];
  return render(ast);
};

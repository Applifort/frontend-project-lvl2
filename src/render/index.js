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
    throw new Error(`Unsupporting output format - ${format}
    Supporting output formats: json, plain, tree`);
  }
  const render = renders[format];
  return render(ast);
};

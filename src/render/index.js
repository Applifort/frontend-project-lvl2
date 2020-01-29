import { has } from 'lodash';
import treeRender from './tree';
import plainRender from './plain';

const renders = {
  tree: treeRender,
  plain: plainRender,
  json: JSON.stringify,
};

export default (format, ast) => {
  if (!has(renders, format)) {
    throw new Error(`Unsupporting output format - ${format}
    Supporting output formats: json, plain, tree`);
  }
  const render = renders[format];
  return render(ast);
};

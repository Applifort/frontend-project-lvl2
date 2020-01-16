import parseContent from './parser';
import build from './builder';
import render from './render';

export default (firstConfigPath, secondConfigPath, format = 'default') => {
  const firstConfig = parseContent(firstConfigPath);
  const secondConfig = parseContent(secondConfigPath);
  const ast = build(firstConfig, secondConfig);
  const diff = render(format, ast);
  return diff;
};

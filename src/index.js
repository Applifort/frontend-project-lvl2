import fs from 'fs';
import path from 'path';
import parse from './parser';
import build from './builder';
import render from './render';

export default (firstConfigPath, secondConfigPath, format = 'tree') => {
  const firstFileContent = fs.readFileSync(firstConfigPath, 'UTF-8');
  const firstConfigType = path.extname(firstConfigPath).slice(1);
  const firstConfig = parse(firstFileContent, firstConfigType);
  const secondFileContent = fs.readFileSync(secondConfigPath, 'UTF-8');
  const secondConfigType = path.extname(secondConfigPath).slice(1);
  const secondConfig = parse(secondFileContent, secondConfigType);
  const ast = build(firstConfig, secondConfig);
  return render(format, ast);
};

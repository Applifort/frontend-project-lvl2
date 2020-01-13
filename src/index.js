#!/usr/bin/env node
import fileParse from './modul/parser';
import build from './modul/builder';
import render from './render';

export default (firstFilePath, secondFilePath, format = 'default') => {
  const firstFileContent = fileParse(firstFilePath);
  const secondFileContent = fileParse(secondFilePath);
  const ast = build(firstFileContent, secondFileContent);
  const diff = render(format, ast);
  console.log(diff);
  return diff;
};

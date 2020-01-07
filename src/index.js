#!/usr/bin/env node
import fileParse from './fileParser';
import configParse from './modul/configParser';
import render from './render';

export default (firstFilePath, secondFilePath, format = 'default') => {
  const firstFileContent = fileParse(firstFilePath);
  const secondFileContent = fileParse(secondFilePath);
  const ast = configParse(firstFileContent, secondFileContent);
  const diff = render(format, ast);
  return diff;
};

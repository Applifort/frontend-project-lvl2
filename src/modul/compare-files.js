#!/usr/bin/env node
import genDiff from '..';

const fs = require('fs');

const openFiles = (firstFilePath, secondFilePath) => {
  const firstJSONConfig = fs.readFileSync(firstFilePath, 'utf8');
  const secondSJONconfig = fs.readFileSync(secondFilePath, 'utf8');
  const result = genDiff(JSON.parse(firstJSONConfig), JSON.parse(secondSJONconfig));
  console.log(result);
};

export default openFiles;

import getObjectsDiff from '../src';
import genDiff from '../src/modul/compare-files';
import bin from '../src/bin/gendiff';
import data from './__fixtures__/testData';

const fs = require('fs');

test('getObjectsDiff', () => {
  const firstConfig = data[0];
  const secondConfig = data[1];
  const emptyConfig = data[2];
  const result = data[3];
  const result2 = data[4];

  expect(getObjectsDiff(firstConfig, secondConfig)).toEqual(result);
  expect(getObjectsDiff(emptyConfig, secondConfig)).toEqual(result2);
  expect(typeof (getObjectsDiff(firstConfig, secondConfig))).toBe('string');
});

test('getDiff', () => {
  const firstConfigPath = '__test__/__fixtures__/before.json';
  const secondConfigPath = '__test__/__fixtures__/after.json';


  const result = data[3];


  expect(genDiff(firstConfigPath, secondConfigPath)).toEqual(result);
  expect(typeof (genDiff(firstConfigPath, secondConfigPath))).toBe('string');
});

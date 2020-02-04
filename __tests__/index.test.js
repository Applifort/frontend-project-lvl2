import fs from 'fs';
import genDiff from '../src';
import path from 'path';

const dir = '__tests__/__fixtures__/';
const makePath = (fileName) => path.join(dir, fileName);

const results = {};

beforeEach(() => {
  results.tree = fs.readFileSync(`${dir}tree_result.txt`, 'UTF-8');
  results.plain = fs.readFileSync(`${dir}plain_result.txt`, 'UTF-8');
  results.json = fs.readFileSync(`${dir}json_result.txt`, 'UTF-8');
});

test.each([
  ['before.json', 'after.json', 'tree'],
  ['before.yaml', 'after.yaml', 'tree'],
  ['before.ini', 'after.ini', 'tree'],
  ['before.json', 'after.json', 'plain'],
  ['before.yaml', 'after.yaml', 'plain'],
  ['before.ini', 'after.ini', 'plain'],
  ['before.json', 'after.json', 'json'],
  ['before.yaml', 'after.yaml', 'json'],
  ['before.ini', 'after.ini', 'json'],
])('get difference between %s and %s in %s format', (before, after, format) => {
  const firstConfig = makePath(before);
  const secondConfig = makePath(after);
  const received = genDiff(firstConfig, secondConfig, format);
  const expected = results[format];
  expect(received).toEqual(expected);
});

test('get difference without giving format', () => {
  const firstConfig = makePath('before.json');
  const secondConfig = makePath('after.json');
  const received = genDiff(firstConfig, secondConfig);
  const expected = results.tree;
  expect(received).toEqual(expected);
});

test('Error - incorrect config format', () => {
  expect(() => genDiff('before.JSON', 'after.json')).toThrow();
});

test('Error - incorrect output format', () => {
  const firstConfig = makePath('before.json');
  const secondConfig = makePath('after.json');
  expect(() => genDiff(firstConfig, secondConfig, 'JSON')).toThrow();
  expect(() => genDiff(firstConfig, secondConfig, 'Json')).toThrow();
  expect(() => genDiff(firstConfig, secondConfig, 'unexistformat')).toThrow();
});

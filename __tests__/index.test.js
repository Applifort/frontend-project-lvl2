import fs from 'fs';
import genDiff from '../src';

const dir = '__tests__/__fixtures__/';
const makePath = (fileName) => dir + fileName;

const results = {
  default: fs.readFileSync(`${dir}default_result.txt`, 'UTF-8'),
  plain: fs.readFileSync(`${dir}plain_result.txt`, 'UTF-8'),
  json: fs.readFileSync(`${dir}json_result.txt`, 'UTF-8'),
};

test.each([
  ['before.json', 'after.json', 'default'],
  ['before.yaml', 'after.yaml', 'default'],
  ['before.ini', 'after.ini', 'default'],
  ['before.json', 'after.json', 'plain'],
  ['before.yaml', 'after.yaml', 'plain'],
  ['before.ini', 'after.ini', 'plain'],
  ['before.json', 'after.json', 'json'],
  ['before.yaml', 'after.yaml', 'json'],
  ['before.ini', 'after.ini', 'json'],
])('get difference between %s and %s in %s format', (before, after, format) => {
  const firstConfig = makePath(before);
  const secondConfig = makePath(after);
  const reseived = genDiff(firstConfig, secondConfig, format);
  const expected = results[format];
  expect(reseived).toEqual(expected);
});

test('get difference without giving format', () => {
  const firstConfig = makePath('before.json');
  const secondConfig = makePath('after.json');
  const reseived = genDiff(firstConfig, secondConfig);
  const expected = results.default;
  expect(reseived).toEqual(expected);
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

import genDiff from '../src';
import data from './__fixtures__/testData';

test('getDiff', () => {
  const firstJSON = '__test__/__fixtures__/json/before.json';
  const secondJSON = '__test__/__fixtures__/json/after.json';
  expect(genDiff(firstJSON, secondJSON)).toEqual(data.diff3);
  const firstYaml = '__test__/__fixtures__/yaml/before.yaml';
  const secondYaml = '__test__/__fixtures__/yaml/after.yaml';
  expect(genDiff(firstYaml, secondYaml)).toEqual(data.diff1);
  const firstIni = '__test__/__fixtures__/ini/before.ini';
  const secondIni = '__test__/__fixtures__/ini/after.ini';
  expect(genDiff(firstIni, secondIni)).toEqual(data.diff1);
  expect(typeof (genDiff(firstJSON, secondJSON))).toBe('string');
  expect(() => genDiff('wrong.jso', 'wrong2.js')).toThrow();
});

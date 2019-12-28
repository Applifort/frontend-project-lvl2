import getObjectsDiff from '../src';
import data from './__fixtures__/testData';

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

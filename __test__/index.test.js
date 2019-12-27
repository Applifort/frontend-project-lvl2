import getDiff from '../src';

test('getDiff', () => {
  const firstConfig = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  };
  const secondConfig = {
    timeout: 20,
    verbose: true,
    host: 'hexlet.io',
  };
  const result = {
    '  host': 'hexlet.io',
    '+ timeout': 50,
    '- timeout': 20,
    '- proxy': '123.234.53.22',
    '- follow': false,
    '+ verbose': true,
  };
  expect(getDiff(firstConfig, secondConfig)).toEqual(result);
});

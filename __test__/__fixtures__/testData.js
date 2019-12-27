
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

const empty = {};

const result = `{
  host: hexlet.io
+ timeout: 50
- timeout: 20
- proxy: 123.234.53.22
- follow: false
+ verbose: true
}`;

const result2 = `{
+ timeout: 20
+ verbose: true
+ host: hexlet.io
}`;


const data = [firstConfig, secondConfig, empty, result, result2];

export default data;

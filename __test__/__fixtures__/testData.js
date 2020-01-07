const diff1 = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 20
  + timeout: 50
  + verbose: true
}`;

const diff2 = `{
  + timeout: 20
  + verbose: true
  + host: hexlet.io
}`;

const diff3 = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: {
            key: value
        }
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
    }
  + group3: {
        fee: 100500
    }
}`;

const data = {
  firstConfig: {
    host: 'hexlet.io',
    timeout: 20,
    proxy: '123.234.53.22',
    follow: false,
  },

  secondConfig: {
    timeout: 20,
    verbose: true,
    host: 'hexlet.io',
  },

  jsonConfig: {
    common: {
      setting1: 'Value 1',
      setting2: 200,
      setting3: true,
      setting6: { key: 'value' },
    },
    group1: { baz: 'bas', foo: 'bar', nest: { key: 'value' } },
    group2: { abc: 12345 },
  },

  jsonConfig2: {
    common: {
      follow: false,
      setting1: 'Value 1',
      setting3: { key: 'value' },
      setting4: 'blah blah',
      setting5: { key5: 'value5' },
      setting6: { key: 'value', ops: 'vops' },
    },
    group1: { foo: 'bar', baz: 'bars', nest: 'str' },
    group3: { fee: 100500 },
  },

  empty: {},
  diff1,
  diff2,
  diff3,
};

export default data;

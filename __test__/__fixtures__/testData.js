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

const diffPlain = `
Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to [complex value]
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]
`;

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
  diffPlain,
  diffJson,
};

export default data;

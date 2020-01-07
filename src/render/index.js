#!/usr/bin/env node
import defaultRender from './default';
import plainRender from './plain';

const formatSelect = {
  default: defaultRender,
  plain: plainRender,
};

export default (format = 'default', ast) => formatSelect[format](ast);

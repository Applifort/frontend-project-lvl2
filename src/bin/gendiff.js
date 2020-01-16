#!/usr/bin/env node
import compare from '..';

const program = require('commander');

program
  .version('0.0.1', '-v, --version', 'output the current version')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format <type>', 'output format')
  .action((firstConfig, secondConfig) => {
    const diff = compare(firstConfig, secondConfig, program.format);
    console.log(diff);
  });

program.parse(process.argv);

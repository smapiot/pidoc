#!/usr/bin/env node

const { apps } = require('piral-cli');
const { loadPlugins } = require('piral-cli/lib/plugin');
const { relative } = require('path');
const { outputPath } = require('../src/tools/meta');

const baseDir = process.cwd();

process.env.PIRAL_DOCS_BASE_DIR = baseDir;

loadPlugins();

const entry = `${relative(baseDir, __dirname)}/../src/index.pug`;
const target = `${outputPath}/index.html`;
const bundlerName = 'parcel';

switch (process.argv.pop()) {
  case 'watch':
    return apps
      .debugPiral(baseDir, {
        entry,
        target,
        bundlerName,
      })
      .then(
        () => process.exit(0),
        () => process.exit(1),
      );
  case 'sdk':
    return apps
      .buildPiral(baseDir, {
        entry,
        target,
        bundlerName,
        type: 'emulator',
      })
      .then(
        () => process.exit(0),
        () => process.exit(1),
      );
  case 'build':
  default:
    return apps
      .buildPiral(baseDir, {
        entry,
        target,
        bundlerName,
        type: 'release',
      })
      .then(
        () => process.exit(0),
        () => process.exit(1),
      );
}

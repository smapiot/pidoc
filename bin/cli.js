#!/usr/bin/env node

const { apps } = require('piral-cli');
const { loadPlugins } = require('piral-cli/lib/plugin');
const { relative } = require('path');
const { outputPath } = require('../src/tools/meta');

const baseDir = process.cwd();

loadPlugins();

apps.buildPiral(baseDir, {
  entry: `${relative(baseDir, __dirname)}/../src/index.pug`,
  target: `${outputPath}/index.html`,
  type: 'release',
  bundlerName: 'parcel',
});

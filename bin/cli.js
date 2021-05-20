#!/usr/bin/env node

const { apps } = require('piral-cli');
const { loadPlugins } = require('piral-cli/lib/plugin');
const { relative } = require('path');
const { outputPath } = require('../src/tools/meta');

const baseDir = process.cwd();

process.env.PIRAL_DOCS_BASE_DIR = baseDir;

loadPlugins();

apps.buildPiral(baseDir, {
  entry: `${relative(baseDir, __dirname)}/../src/index.pug`,
  target: `${outputPath}/index.html`,
  type: 'release',
  bundlerName: 'parcel',
}).then(() => process.exit(0), () => process.exit(1));

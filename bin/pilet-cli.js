#!/usr/bin/env node

const { apps } = require('piral-cli');
const { loadPlugins } = require('piral-cli/lib/plugin');
const { outputPath, sitemap, bundlerName } = require('../src/tools/meta');
const { makeContent } = require('../src/tools/content');

const baseDir = process.cwd();

process.env.PIRAL_DOCS_BASE_DIR = baseDir;

loadPlugins();

const entry = `./src/index.tsx`;
const target = `${outputPath}/index.js`;

makeContent(sitemap);

switch (process.argv.pop()) {
  case 'run':
  case 'debug':
  case 'watch':
    return apps
      .debugPilet(baseDir, {
        entry,
        target,
        bundlerName,
      })
      .then(
        () => process.exit(0),
        (err) => {
          console.error(err);
          process.exit(1);
        },
      );
  case 'bundle':
  case 'build':
  default:
    return apps
      .buildPilet(baseDir, {
        entry,
        target,
        bundlerName,
      })
      .then(
        () => process.exit(0),
        (err) => {
          console.error(err);
          process.exit(1);
        },
      );
}

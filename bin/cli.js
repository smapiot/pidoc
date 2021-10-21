#!/usr/bin/env node

const { apps } = require('piral-cli');
const { packageEmulator, updateExistingJson, readText, updateExistingFile } = require('piral-cli/lib/common');
const { loadPlugins } = require('piral-cli/lib/plugin');
const { relative } = require('path');
const { outputPath, package, sitemap, publicUrl } = require('../src/tools/meta');
const { makeContent } = require('../src/tools/content');
const { name, version } = require('../package.json');

const baseDir = process.cwd();

process.env.PIRAL_DOCS_BASE_DIR = baseDir;

loadPlugins();

const entry = `${relative(baseDir, __dirname)}/../src/index.pug`;
const emulator = `${outputPath}/emulator`;
const emulatorApp = `${emulator}/app`;
const target = `${outputPath}/index.html`;
const bundlerName = 'parcel';

makeContent(sitemap);

switch (process.argv.pop()) {
  case 'watch':
    return apps
      .debugPiral(baseDir, {
        entry,
        target,
        bundlerName,
        publicUrl,
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
        type: 'emulator-sources',
        publicUrl,
      })
      .then(() =>
        updateExistingJson(emulator, 'package.json', {
          name: package.name,
          version: package.version,
          license: package.license,
          author: package.author,
          description: package.description,
          repository: package.repository,
          bugs: package.bugs,
          homepage: package.homepage,
          keywords: package.keywords,
          dependencies: {
            [name]: version,
          },
        }),
      )
      .then(() => readText(emulatorApp, 'index.d.ts'))
      .then((content) => updateExistingFile(emulatorApp, 'index.d.ts', content.replace(name, package.name)))
      .then(() => packageEmulator(emulator))
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
        publicUrl,
      })
      .then(
        () => process.exit(0),
        () => process.exit(1),
      );
}

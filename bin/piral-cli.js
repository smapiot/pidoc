#!/usr/bin/env node

const { apps } = require('piral-cli');
const { packageEmulator, updateExistingJson, readText, updateExistingFile } = require('piral-cli/lib/common');
const { loadPlugins } = require('piral-cli/lib/plugin');
const { readFileSync, writeFileSync } = require('fs');
const { relative, resolve } = require('path');
const { outputPath, package, sitemap, publicUrl, title } = require('../src/tools/meta');
const { makeContent } = require('../src/tools/content');
const { name, version } = require('../package.json');

const baseDir = process.cwd();

process.env.PIRAL_DOCS_BASE_DIR = baseDir;

loadPlugins();

const entry = `${relative(baseDir, __dirname)}/../src/index.html`;
const emulator = `${outputPath}/emulator`;
const release = `${outputPath}/release`;
const emulatorApp = `${emulator}/app`;
const target = `${outputPath}/index.html`;

makeContent(sitemap);

function processHtml(outDir) {
  const file = resolve(outDir, 'index.html');
  const content = readFileSync(file, 'utf8');
  const newContent = content.replace('${title}', title);
  writeFileSync(file, newContent, 'utf8');
}

switch (process.argv.pop()) {
  case 'watch':
    return apps
      .debugPiral(baseDir, {
        entry,
        target,
        publicUrl,
      })
      .then(
        () => process.exit(0),
        (err) => {
          console.error(err);
          process.exit(1);
        },
      );
  case 'sdk':
    return apps
      .buildPiral(baseDir, {
        entry,
        target,
        type: 'emulator-sources',
        publicUrl,
      })
      .then(() => processHtml(emulatorApp))
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
        (err) => {
          console.error(err);
          process.exit(1);
        },
      );
  case 'build':
  default:
    return apps
      .buildPiral(baseDir, {
        entry,
        target,
        type: 'release',
        publicUrl,
      })
      .then(() => processHtml(release))
      .then(
        () => process.exit(0),
        (err) => {
          console.error(err);
          process.exit(1);
        },
      );
}

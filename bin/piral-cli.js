#!/usr/bin/env node

process.on('uncaughtException', (err) => {
  console.error('Critical runtime error:', err.message);
  process.exit(1);
});

const yargs = require('yargs');
const { apps } = require('piral-cli');
const { packageEmulator, updateExistingJson, readText, updateExistingFile } = require('piral-cli/lib/common');
const { loadPlugins } = require('piral-cli/lib/plugin');
const { readFileSync, writeFileSync } = require('fs');
const { relative, resolve } = require('path');
const { outputPath, package, sitemap, publicUrl, title, bundlerName } = require('../src/tools/meta');
const { makeContent } = require('../src/tools/content');
const { name, version } = require('../package.json');

const baseDir = process.cwd();
const entry = `${relative(baseDir, __dirname)}/../src/index.html`;
const emulator = `${outputPath}/emulator`;
const release = `${outputPath}/release`;
const emulatorApp = `${emulator}/app`;
const target = `${outputPath}/index.html`;

function prepare() {
  process.env.PIRAL_DOCS_BASE_DIR = baseDir;
  loadPlugins();
  makeContent(sitemap);
}

function processHtml(outDir) {
  const file = resolve(outDir, 'index.html');
  const content = readFileSync(file, 'utf8');
  const newContent = content.replace('${title}', title);
  writeFileSync(file, newContent, 'utf8');
}

yargs
  .command(
    ['run', 'debug', 'watch'],
    'Starts a debug session of your documentation website.',
    (argv) => {
      return argv
        .number('port')
        .describe('port', 'The port to use for the webserver.')
        .default('port', 1234)
        .boolean('open')
        .describe('open', 'Opens the URL in your webbrowser.')
        .default('open', true)
        .number('log-level')
        .describe('log-level', 'The log level to use (0-5).')
        .default('log-level', 3);
    },
    (args) => {
      prepare();
      return apps
        .debugPiral(baseDir, {
          entry,
          target,
          open: args.open,
          port: args.port,
          bundlerName,
          logLevel: args['log-level'],
          publicUrl,
          hooks: {
            afterBuild({ bundler }) {
              const { dir } = bundler.bundle;
              processHtml(dir);
            },
          },
        })
        .then(
          () => process.exit(0),
          (err) => {
            console.error(err);
            process.exit(1);
          },
        );
    },
  )
  .command(
    ['emulator', 'sdk'],
    'Builds the emulator package for your documentation website.',
    (argv) => {
      return argv.number('log-level').describe('log-level', 'The log level to use (0-5).').default('log-level', 3);
    },
    (args) => {
      prepare();
      return apps
        .buildPiral(baseDir, {
          entry,
          target,
          bundlerName,
          logLevel: args['log-level'],
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
    },
  )
  .command(
    ['$0', 'bundle', 'build'],
    'Builds the release assets for your documentation website.',
    (argv) => {
      return argv.number('log-level').describe('log-level', 'The log level to use (0-5).').default('log-level', 3)
      .boolean('source-maps')
      .describe('source-maps', 'Includes the source maps with the pilet.')
      .default('source-maps', true);
    },
    (args) => {
      prepare();
      return apps
        .buildPiral(baseDir, {
          entry,
          target,
          bundlerName,
          sourceMaps: args['source-maps'],
          logLevel: args['log-level'],
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
    },
  )
  .help().argv;

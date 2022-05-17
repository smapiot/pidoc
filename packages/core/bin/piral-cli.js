#!/usr/bin/env node

const yargs = require('yargs');
const { apps } = require('piral-cli');
const { packageEmulator, updateExistingJson, readText, updateExistingFile } = require('piral-cli/lib/common');
const { readFileSync, writeFileSync, renameSync, mkdirSync } = require('fs');
const { resolve } = require('path');
const { prepare, copyStatic, getEntryFile, installWatchers } = require('../src/tools/cli');
const { getChangelogVersion, getVersionPath } = require('../src/tools/version');
const {
  outputPath,
  package,
  publicUrl,
  title,
  author,
  description,
  bundlerName,
  changelogPath,
} = require('../src/tools/meta');

const { name, version } = require('../package.json');

const baseDir = process.cwd();
const entry = getEntryFile(baseDir);
const emulator = `${outputPath}/emulator`;
const release = `${outputPath}/release`;
const temp = `${outputPath}/temp`;
const emulatorApp = `${emulator}/app`;
const target = `${outputPath}/index.html`;

function replaceAll(content, variables) {
  Object.keys(variables).forEach((name) => {
    content = content.split(`{{${name}}}`).join(variables[name] || '');
  });

  return content;
}

function processHtml(outDir) {
  const file = resolve(outDir, 'index.html');
  const content = readFileSync(file, 'utf8');
  const newContent = replaceAll(content, {
    title,
    author,
    description,
  });
  writeFileSync(file, newContent, 'utf8');
}

function buildEmulatorSources(args) {
  return apps
    .buildPiral(baseDir, {
      entry,
      target,
      bundlerName,
      logLevel: args['log-level'],
      type: 'emulator-sources',
      publicUrl,
      hooks: {
        afterBuild() {
          processHtml(emulatorApp);
          copyStatic(emulatorApp);
        },
      },
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
    .then((content) => updateExistingFile(emulatorApp, 'index.d.ts', content.replace(name, package.name)));
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
      prepare(baseDir);
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
            beforeBuild() {
              installWatchers('sitemap');
            },
            afterBuild({ bundler }) {
              const { dir } = bundler.bundle;
              processHtml(dir);
              copyStatic(dir);
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
    ['emulator-sources', 'sdk-raw'],
    'Builds the emulator sources for your documentation website.',
    (argv) => {
      return argv.number('log-level').describe('log-level', 'The log level to use (0-5).').default('log-level', 3);
    },
    (args) => {
      prepare(baseDir);
      return buildEmulatorSources(args).then(
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
      prepare(baseDir);
      return buildEmulatorSources(args)
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
      return argv
        .number('log-level')
        .describe('log-level', 'The log level to use (0-5).')
        .default('log-level', 3)
        .boolean('versioned')
        .describe('versioned', 'Puts the artifacts in a version folder and creates a soft-redirect.')
        .default('versioned', true)
        .boolean('source-maps')
        .describe('source-maps', 'Includes the source maps with the pilet.')
        .default('source-maps', true);
    },
    (args) => {
      prepare(baseDir);
      const version = changelogPath ? getChangelogVersion(changelogPath) : package.version;
      const url = args.versioned ? getVersionPath(publicUrl, version) : publicUrl;
      return apps
        .buildPiral(baseDir, {
          entry,
          target,
          bundlerName,
          sourceMaps: args['source-maps'],
          logLevel: args['log-level'],
          type: 'release',
          publicUrl: url,
          hooks: {
            afterBuild() {
              processHtml(release);
              copyStatic(release);

              if (args.versioned) {
                const redirect = `<meta http-equiv="refresh" content="1; url='${url}/'"><script>location.href = location.path.replace("${publicUrl}", "${url}");</script>`;
                renameSync(release, temp);
                mkdirSync(release);
                renameSync(temp, `${release}/${version}`);
                writeFileSync(`${release}/index.html`, redirect, 'utf8');
              }
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
  .help().argv;

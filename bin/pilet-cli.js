#!/usr/bin/env node

process.on('uncaughtException', (err) => {
  console.error('Critical runtime error:', err.message);
  process.exit(1);
});

const yargs = require('yargs');
const { apps } = require('piral-cli');
const { loadPlugins } = require('piral-cli/lib/plugin');
const { outputPath, sitemap, bundlerName } = require('../src/tools/meta');
const { makeContent } = require('../src/tools/content');

const baseDir = process.cwd();
const entry = `./src/index.tsx`;
const target = `${outputPath}/index.js`;

function prepare() {
  process.env.PIRAL_DOCS_BASE_DIR = baseDir;
  loadPlugins();
  makeContent(sitemap);
}

yargs
  .command(
    ['run', 'debug', 'watch'],
    'Starts a debug session of your documentation pilet.',
    (argv) => {
      return argv
        .number('port')
        .describe('port', 'The port to use for the webserver.')
        .default('port', 1234)
        .string('feed')
        .describe('feed', 'A potential feed to mix in for development.')
        .default('feed', undefined)
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
        .debugPilet(baseDir, {
          entry,
          target,
          bundlerName,
          feed: args.feed,
          logLevel: args['log-level'],
          open: args.open,
          port: args.port,
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
    ['$0', 'bundle', 'build'],
    'Builds the release assets for your documentation pilet.',
    (argv) => {
      return argv
        .string('schema')
        .describe('schema', 'The schema to use when building the pilet.')
        .default('schema', 'v2')
        .boolean('source-maps')
        .describe('source-maps', 'Includes the source maps with the pilet.')
        .default('source-maps', true)
        .number('log-level')
        .describe('log-level', 'The log level to use (0-5).')
        .default('log-level', 3);
    },
    (args) => {
      prepare();
      return apps
        .buildPilet(baseDir, {
          entry,
          schemaVersion: args.schema,
          sourceMaps: args['source-maps'],
          target,
          bundlerName,
          logLevel: args['log-level'],
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

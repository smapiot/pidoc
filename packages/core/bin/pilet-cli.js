#!/usr/bin/env node

const yargs = require('yargs');
const bundler = require('piral-cli/lib/bundler');
const { apps } = require('piral-cli');
const { prepare, copyStatic, getDoclet, getEntryFile, installWatchers } = require('../src/tools/cli');
const { outputPath, bundlerName, package } = require('../src/tools/meta-core');

const baseDir = process.cwd();
const entry = getDoclet(baseDir, package);
const target = `${outputPath}/index.js`;
const defaultApp = package.piral ? package.piral.name : undefined;
const debugDocumentation = bundler.callDebugPiralFromMonoRepo;

bundler.callDebugPiralFromMonoRepo = (args) => {
  const { makeExternals } = require('piral-cli/utils');
  const data = require('../package.json');
  args.entryFiles = getEntryFile(baseDir);
  args.externals = makeExternals(baseDir, { ...data.dependencies, ...data.devDependencies }, data.pilets.externals);
  return debugDocumentation(args);
};

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
        .string('app')
        .describe('app', 'The name of the documentation page emulator to debug in.')
        .default('app', defaultApp)
        .number('log-level')
        .describe('log-level', 'The log level to use (0-5).')
        .default('log-level', 3);
    },
    (args) => {
      prepare(baseDir);
      return apps
        .debugPilet(baseDir, {
          entry,
          target,
          bundlerName,
          feed: args.feed,
          logLevel: args['log-level'],
          app: args.app,
          open: args.open,
          port: args.port,
          hooks: {
            beforeBuild() {
              installWatchers('pilet');
            },
            afterBuild() {
              copyStatic(outputPath);
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
        .string('app')
        .describe('app', 'The name of the documentation page to build for.')
        .default('app', defaultApp)
        .number('log-level')
        .describe('log-level', 'The log level to use (0-5).')
        .default('log-level', 3);
    },
    (args) => {
      prepare(baseDir);
      return apps
        .buildPilet(baseDir, {
          entry,
          schemaVersion: args.schema,
          sourceMaps: args['source-maps'],
          app: args.app,
          target,
          bundlerName,
          logLevel: args['log-level'],
          hooks: {
            afterBuild() {
              copyStatic(outputPath);
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

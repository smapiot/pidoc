const { resolve } = require('path');
const { existsSync } = require('fs');

const baseDir = process.env.PIRAL_DOCS_BASE_DIR || process.cwd();
const configFileName = 'docs.config.json';
const configPath = resolve(baseDir, configFileName);

if (!existsSync(configPath)) {
  throw new Error(`Missing file "${configFileName}". This file should be located in "${baseDir}".`);
}

const config = require(configPath);
const packageRoot = config.packageRoot || baseDir;
const package = require(resolve(baseDir, packageRoot, 'package.json'));
const author = config.author || 'smapiot';
const branch = config.branch || 'master';
const docsFolder = config.docsDirName || 'docs';
const skipEditLabel = config.skipEditLabel || false;
const sitemap = config.sitemap || {};
const rootPath = resolve(baseDir, config.rootDir || '.');
const staticPath = config.staticDir && resolve(baseDir, config.staticDir);
const outputPath = resolve(baseDir, config.outputDir || 'dist');

module.exports = {
  config,
  package,
  author,
  branch,
  repository: config.repositoryUrl,
  bundlerName: config.bundlerName,
  rootPath,
  skipEditLabel,
  outputPath,
  fragment: config.fragment || package.piral !== undefined,
  staticPath,
  sitemap,
  baseDir,
  docsFolder,
  docsPath: resolve(rootPath, docsFolder),
};

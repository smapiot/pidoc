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
const bundlerName = config.bundlerName || getDefaultBundlerName();

function getLanguage(cfg) {
  if (!cfg || typeof cfg !== 'object') {
    return {
      default: 'en',
      selection: {},
    };
  }

  if (!cfg.default) {
    const [defaultLanguage = 'en'] = Object.keys(cfg.selection || {});
    cfg.default = defaultLanguage;
  }

  if (!cfg.selection || typeof cfg.selection !== 'object') {
    cfg.selection = {};
  }
}

function getDefaultBundlerName() {
  try {
    require.resolve('piral-cli-webpack5');
    return 'webpack5';
  } catch {
    return undefined;
  }
}

module.exports = {
  config,
  package,
  author,
  branch,
  repository: config.repositoryUrl,
  bundlerName,
  rootPath,
  skipEditLabel,
  language: getLanguage(config.language),
  outputPath,
  fragment: config.fragment || package.piral !== undefined,
  staticPath,
  sitemap,
  baseDir,
  docsFolder,
  docsPath: resolve(rootPath, docsFolder),
};

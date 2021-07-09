const { resolve } = require('path');

const baseDir = process.env.PIRAL_DOCS_BASE_DIR || process.cwd();
const config = require(resolve(baseDir, 'docs.config.json'));
const packageRoot = config.packageRoot || baseDir;
const package = require(resolve(baseDir, packageRoot, 'package.json'));
const author = config.author || 'smapiot';
const branch = config.branch || 'master';
const docsFolder = config.docsDirName || 'docs';
const skipEditLabel = config.skipEditLabel || false;
const sitemap = config.sitemap;
const rootPath = resolve(baseDir, config.rootDir);
const outputPath = resolve(baseDir, config.outputDir);

module.exports = {
  config,
  package,
  author,
  branch,
  repository: config.repositoryUrl,
  rootPath,
  skipEditLabel,
  outputPath,
  sitemap,
  baseDir,
  docsFolder,
  docsPath: resolve(rootPath, docsFolder),
};

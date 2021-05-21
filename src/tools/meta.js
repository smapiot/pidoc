const { resolve } = require('path');
const { getChangelogVersion } = require('./version');

const baseDir = process.env.PIRAL_DOCS_BASE_DIR || process.cwd();
const config = require(resolve(baseDir, 'docs.config.json'));
const repo = config.repositoryUrl;
const author = config.author || 'smapiot';
const branch = config.branch || 'master';
const docsFolder = config.docsDirName || 'docs';
const redirects = config.redirects || {};
const rootPath = resolve(baseDir, config.rootDir);
const changelogPath = resolve(baseDir, config.changelogFile);
const assetsPath = resolve(baseDir, config.assetsDir);
const outputPath = resolve(baseDir, config.outputDir);
const layout = resolve(baseDir, config.layoutFile);
const notFoundPage = resolve(baseDir, config.notFoundPageFile);
const generatedName = '__generated__';


module.exports = {
  version: getChangelogVersion(changelogPath),
  title: config.title,
  author,
  description: config.description,
  docsUrl: `${repo}/tree/${branch}/${docsFolder}`,
  rootPath,
  outputPath,
  assetsPath,
  generatedName,
  generated: resolve(__dirname, generatedName),
  layout,
  redirects,
  notFoundPage,
  docsPath: resolve(rootPath, docsFolder),
};

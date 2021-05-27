const { resolve } = require('path');

const baseDir = process.env.PIRAL_DOCS_BASE_DIR || process.cwd();
const config = require(resolve(baseDir, 'docs.config.json'));
const defaultsDir = resolve(__dirname, '../scripts/defaults');
const generatedName = '__generated__';
const repo = config.repositoryUrl;
const author = config.author || 'smapiot';
const branch = config.branch || 'master';
const docsFolder = config.docsDirName || 'docs';
const redirects = config.redirects || {};
const rootPath = resolve(baseDir, config.rootDir);
const changelogPath = resolve(baseDir, config.changelogFile);
const filterPath = resolve(baseDir, config.filterFile || resolve(defaultsDir, 'filter.ts'));
const outputPath = resolve(baseDir, config.outputDir);
const footer = resolve(baseDir, config.footerFile || resolve(defaultsDir, 'Footer.tsx'));
const logo = resolve(baseDir, config.logoFile || resolve(defaultsDir, 'Logo.tsx'));
const router = resolve(baseDir, config.routerFile || resolve(defaultsDir, 'Router.tsx'));
const notFoundPage = resolve(baseDir, config.notFoundPageFile || resolve(defaultsDir, 'NotFound.tsx'));
const sitemap = config.sitemap;

module.exports = {
  title: config.title || config.name,
  author,
  name: config.name,
  description: config.description,
  docsUrl: `${repo}/tree/${branch}/${docsFolder}`,
  rootPath,
  outputPath,
  changelogPath,
  generatedName,
  generated: resolve(__dirname, generatedName),
  filterPath,
  logo,
  footer,
  router,
  sitemap,
  redirects,
  notFoundPage,
  baseDir,
  docsPath: resolve(rootPath, docsFolder),
};

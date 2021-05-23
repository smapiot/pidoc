const { resolve } = require('path');

function normalize(obj) {
  const result = {};

  Object.keys(obj).forEach(key => {
    const path = obj[key];

    if (path && typeof path === 'string') {
      result[key] = resolve(baseDir, path);
    }
  });

  return result;
}

const baseDir = process.env.PIRAL_DOCS_BASE_DIR || process.cwd();
const config = require(resolve(baseDir, 'docs.config.json'));
const defaultsDir = resolve(__dirname, '../defaults');
const generatedName = '__generated__';
const repo = config.repositoryUrl;
const author = config.author || 'smapiot';
const branch = config.branch || 'master';
const docsFolder = config.docsDirName || 'docs';
const sitemap = config.sitemap;
const redirects = config.redirects || {};
const rootPath = resolve(baseDir, config.rootDir);
const changelogPath = resolve(baseDir, config.changelogFile);
const filterPath = resolve(baseDir, config.filterFile || );
const outputPath = resolve(baseDir, config.outputDir);
const components = {
  footer: resolve(defaultsDir, 'Footer.tsx'),
  logo: resolve(defaultsDir, 'Logo.tsx'),
  router: resolve(defaultsDir, 'Router.tsx'),
  notFoundPage: resolve(defaultsDir, 'NotFoundPage.tsx'),
  ...normalize(config.components),
};
const helpers = {
  filter: resolve(defaultsDir, 'filter.ts'),
  ...normalize(config.helpers),
};

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
  components,
  helpers,
  sitemap,
  redirects,
  baseDir,
  docsPath: resolve(rootPath, docsFolder),
};

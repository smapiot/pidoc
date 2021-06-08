const { resolve } = require('path');

function normalizeObj(obj) {
  const result = {};

  if (obj) {
    Object.keys(obj).forEach(key => {
      const path = obj[key];
  
      if (path && typeof path === 'string') {
        result[key] = resolve(baseDir, path);
      }
    });
  }

  return result;
}

function normalizeArr(obj) {
  const result = [];

  if (Array.isArray(obj)) {
    obj.forEach(path => {
      if (path && typeof path === 'string') {
        result.push(resolve(baseDir, path));
      }
    });
  }

  return result;
}

const baseDir = process.env.PIRAL_DOCS_BASE_DIR || process.cwd();
const config = require(resolve(baseDir, 'docs.config.json'));
const packageRoot = config.packageRoot || baseDir;
const package = require(resolve(baseDir, packageRoot, 'package.json'));
const defaultsDir = resolve(__dirname, '../defaults');
const generatedName = '__generated__';
const author = config.author || 'smapiot';
const branch = config.branch || 'master';
const docsFolder = config.docsDirName || 'docs';
const sitemap = config.sitemap;
const redirects = config.redirects || {};
const rootPath = resolve(baseDir, config.rootDir);
const changelogPath = resolve(baseDir, config.changelogFile);
const outputPath = resolve(baseDir, config.outputDir);
const styles = [
  ...normalizeArr(config.styles),
];
const pages = {
  ...normalizeObj(config.pages),
};
const components = {
  footer: resolve(defaultsDir, 'Footer.tsx'),
  logo: resolve(defaultsDir, 'Logo.tsx'),
  router: resolve(defaultsDir, 'Router.tsx'),
  notFoundPage: resolve(defaultsDir, 'NotFoundPage.tsx'),
  ...normalizeObj(config.components),
};
const helpers = {
  setup: resolve(defaultsDir, 'setup.ts'),
  filter: resolve(defaultsDir, 'filter.ts'),
  plugins: resolve(defaultsDir, 'plugins.ts'),
  requestPilets: resolve(defaultsDir, 'requestPilets.ts'),
  ...normalizeObj(config.helpers),
};
const layouts = {
  default: resolve(defaultsDir, 'Layout.tsx'),
  ...normalizeObj(config.layouts),
};

module.exports = {
  package,
  title: config.title || config.name,
  author,
  branch,
  repository: config.repositoryUrl,
  name: config.name,
  description: config.description,
  rootPath,
  outputPath,
  changelogPath,
  generatedName,
  generated: resolve(__dirname, generatedName),
  components,
  styles,
  pages,
  helpers,
  layouts,
  sitemap,
  redirects,
  baseDir,
  docsFolder,
  docsPath: resolve(rootPath, docsFolder),
};

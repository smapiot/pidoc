const { resolve } = require('path');
const { normalizeArr, normalizeObj } = require('./helpers');
const meta = require('./meta-core');

const baseDir = meta.baseDir;
const config = meta.config;
const defaultsDir = resolve(__dirname, '../defaults');
const redirects = config.redirects || {};
const changelogPath = resolve(baseDir, config.changelogFile);
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
  ...meta,
  title: config.title || config.name,
  name: config.name,
  description: config.description,
  changelogPath,
  components,
  styles,
  pages,
  helpers,
  layouts,
  redirects,
};

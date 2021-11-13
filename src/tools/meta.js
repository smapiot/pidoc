const { resolve } = require('path');
const { normalizeArr, normalizeObj } = require('./helpers');
const meta = require('./meta-core');

const baseDir = meta.baseDir;
const config = meta.config;
const defaultsDir = resolve(__dirname, '../defaults');
const redirects = config.redirects || {};
const publicUrl = config.publicPath || '/';
const name = config.name || 'Project';
const changelogPath = config.changelogFile && resolve(baseDir, config.changelogFile);
const sass = {
  variables: resolve(defaultsDir, 'variables.scss'),
  ...normalizeObj(baseDir, config.sass),
};
const styles = [...normalizeArr(baseDir, config.styles)];
const pages = {
  ...normalizeObj(baseDir, config.pages),
};
const components = {
  footer: resolve(defaultsDir, 'Footer.tsx'),
  header: resolve(defaultsDir, 'Header.tsx'),
  logo: resolve(defaultsDir, 'Logo.tsx'),
  infoBar: resolve(defaultsDir, 'InfoBar.tsx'),
  breadcrumbs: resolve(defaultsDir, 'Breadcrumbs.tsx'),
  sectionNav: resolve(defaultsDir, 'SectionNav.tsx'),
  router: resolve(defaultsDir, 'Router.tsx'),
  notFoundPage: resolve(defaultsDir, 'NotFoundPage.tsx'),
  ...normalizeObj(baseDir, config.components),
};
const helpers = {
  setup: resolve(defaultsDir, 'setup.ts'),
  filter: resolve(defaultsDir, 'filter.ts'),
  plugins: resolve(defaultsDir, 'plugins.ts'),
  requestPilets: resolve(defaultsDir, 'requestPilets.ts'),
  ...normalizeObj(baseDir, config.helpers),
};
const layouts = {
  default: resolve(defaultsDir, 'Layout.tsx'),
  ...normalizeObj(baseDir, config.layouts),
};

module.exports = {
  ...meta,
  title: config.title || name,
  name,
  description: config.description || '',
  changelogPath,
  components,
  styles,
  sass,
  pages,
  helpers,
  layouts,
  redirects,
  publicUrl,
};

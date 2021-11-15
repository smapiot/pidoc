const { resolve } = require('path');
const { normalizeArr, normalizeObj, getTemplate } = require('./helpers');
const meta = require('./meta-core');

const baseDir = meta.baseDir;
const config = meta.config;
const defaultsDir = resolve(__dirname, '../defaults');
const redirects = config.redirects || {};
const publicUrl = config.publicPath || '/';
const name = config.name || 'Project';
const changelogPath = config.changelogFile && resolve(baseDir, config.changelogFile);
const template = getTemplate(config.template);
const sass = {
  variables: resolve(defaultsDir, 'variables.scss'),
  ...normalizeObj(baseDir, template.sass),
  ...normalizeObj(baseDir, config.sass),
};
const styles = [
  ...normalizeArr(baseDir, template.styles),
  ...normalizeArr(baseDir, config.styles)
];
const pages = {
  ...normalizeArr(baseDir, template.pages),
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
  ...normalizeObj(baseDir, template.components),
  ...normalizeObj(baseDir, config.components),
};
const helpers = {
  setup: resolve(defaultsDir, 'setup.ts'),
  filter: resolve(defaultsDir, 'filter.ts'),
  plugins: resolve(defaultsDir, 'plugins.ts'),
  requestPilets: resolve(defaultsDir, 'requestPilets.ts'),
  ...normalizeObj(baseDir, template.helpers),
  ...normalizeObj(baseDir, config.helpers),
};
const layouts = {
  default: resolve(defaultsDir, 'Layout.tsx'),
  ...normalizeObj(baseDir, template.layouts),
  ...normalizeObj(baseDir, config.layouts),
};

if (redirects['/'] === undefined && pages['/'] === undefined) {
  const [mainSection] = Object.keys(config.sitemap);

  if (mainSection) {
    redirects['/'] = `/${mainSection}`;
  }
}

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

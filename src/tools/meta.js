const { resolve } = require('path');

const branch = 'documentation';
const repo = 'smapiot/piral';
const docsFolder = 'docs';
const baseDir = process.env.PIRAL_DOCS_BASE_DIR || process.cwd();
const config = require(resolve(baseDir, 'docs.config.json'));
const rootPath = resolve(baseDir, config.rootDir);
const assetsPath = resolve(baseDir, config.assetsDir);
const outputPath = resolve(baseDir, config.outputDir);
const layout = resolve(baseDir, config.layoutFile);
const generatedName = '__generated__';
const generated = resolve(__dirname, generatedName);

module.exports = {
  version: '0.13.0',
  title: 'Piral - Documentation',
  author: 'smapiot',
  description:
    'The documentation and guidelines for using Piral - the React-based framework for building microfrontends.',
  docsUrl: `https://github.com/${repo}/tree/${branch}/${docsFolder}`,
  rootPath,
  outputPath,
  assetsPath,
  generatedName,
  generated,
  layout,
  docsPath: resolve(rootPath, docsFolder),
};

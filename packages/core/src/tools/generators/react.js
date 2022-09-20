const { readFileSync } = require('fs');
const { resolve, relative } = require('path');
const { codegen } = require('../constants');
const { generatePage } = require('../pages');
const { getDocsFrom, getName, getTitle, makeFileFilter } = require('../utils');

const rx = /^\/\*\*\n(.*?)\n\*\*\//s;

function getRoute(basePath, name) {
  return (name && `${basePath}/${name}`) || '';
}

exports.find = function (basePath, docsFolder, options) {
  const { segment, dir, fileNames, exclude, include, sorting = 'asc', locale = 'en' } = options;
  const folder = resolve(docsFolder, dir);
  const files = getDocsFrom(folder, locale, /\.(ts|js|tsx|jsx)$/, sorting);
  const filter = makeFileFilter(fileNames, include, exclude);
  const path = segment ? `${basePath}/${segment}` : basePath;
  return files
    .map((file) => {
      const name = getName(file);
      return [name, file];
    })
    .filter(([name]) => filter(name))
    .map(([name, file]) => {
      const route = getRoute(path, name);
      return {
        name,
        file,
        route,
      };
    });
};

exports.build = function (entry, options) {
  const { name, file, route } = entry;
  const { segment, dir, locale, layout = 'default' } = options;
  const prefix = (segment || dir).replace(/\./g, '') || 'docs';
  const title = getTitle(file);
  const jsx = readFileSync(file, 'utf8');
  const fm = rx.exec(jsx);
  const meta = (fm && parseMeta(fm)) || {};
  const pageMeta = {
    title,
    ...meta,
    link: route,
    source: file,
  };
  const head = `
    import { PageContent, PageLayout } from '@pidoc/components';
    import Page from ${JSON.stringify(relative(codegen, file))};

    const meta = ${JSON.stringify(meta)};
  `;
  const body = `
    <PageLayout name={${JSON.stringify(layout)}} meta={meta}>
      <PageContent meta={meta}>
        <Page />
      </PageContent>
    </PageLayout>
  `;

  return generatePage(name, pageMeta, `${prefix}-${name}.${locale}`, head, body, route, pageMeta.title, pageMeta.section, meta);
};

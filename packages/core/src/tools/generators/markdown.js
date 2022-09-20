const { resolve } = require('path');
const { generated } = require('../constants');
const { skipEditLabel } = require('../meta-core');
const { render } = require('../markdown');
const { generatePage } = require('../pages');
const { getDocsFrom, getName, docRef, getTitle, getEditPlatform, makeFileFilter } = require('../utils');

function getRoute(basePath, name) {
  return (name && `${basePath}/${name}`) || '';
}

exports.find = function (basePath, docsFolder, options) {
  const { segment, dir, fileNames, exclude, include, sorting = 'asc', locale = 'en' } = options;
  const folder = resolve(docsFolder, dir);
  const files = getDocsFrom(folder, locale, /\.md$/, sorting);
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
  const { segment, dir, locale, resolveLink, layout = 'default' } = options;
  const prefix = (segment || dir).replace(/\./g, '') || 'docs';

  const title = getTitle(file);
  const { mdValue, meta = {} } = render(file, generated, resolveLink);
  const pageMeta = {
    title,
    ...meta,
    link: route,
    source: file,
  };
  const editLabel = skipEditLabel ? '' : `Edit on ${getEditPlatform()}`;
  const head = `
    import { PageContent, Markdown, PageLayout } from '@pidoc/components';

    const link = ${JSON.stringify(skipEditLabel ? '' : docRef(file))};
    const html = ${mdValue};
    const meta = ${JSON.stringify(meta)};
  `;
  const body = `
    <PageLayout name={${JSON.stringify(layout)}} meta={meta}>
      <PageContent meta={meta}>
        <Markdown content={html} link={link} editLabel={${JSON.stringify(editLabel)}} />
      </PageContent>
    </PageLayout>
  `;

  return generatePage(
    name,
    pageMeta,
    `${prefix}-${name}.${locale}`,
    head,
    body,
    route,
    pageMeta.title,
    pageMeta.section,
    undefined,
    meta,
  );
};

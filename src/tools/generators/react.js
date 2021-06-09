const { resolve, relative } = require('path');
const { codegen } = require('../constants');
const { generatePage } = require('../pages');
const { getDocsFrom, getName, getTitle, makeFileFilter } = require('../utils');

function getRoute(basePath, name) {
  return (name && `${basePath}/${name}`) || '';
}

module.exports = function (basePath, docsFolder, options) {
  const { segment, dir, fileNames, exclude, include, sorting = "asc", layout = "default" } = options;
  const folder = resolve(docsFolder, dir);
  const files = getDocsFrom(folder, /\.(ts|js|tsx|jsx)$/, sorting);
  const prefix = segment || dir;
  const filter = makeFileFilter(fileNames, include, exclude);
  const path = segment ? `${basePath}/${segment}` : basePath;

  const imports = files.map((file) => {
    const name = getName(file);

    if (!filter(name)) {
      return undefined;
    }

    const title = getTitle(file);
    const route = getRoute(path, name);
    const pageMeta = {
      title,
      link: route,
      source: file,
    };
    const head = `
      import { PageContent, getPageLayout } from 'piral-docs-tools/components';
      import Page from ${JSON.stringify(relative(codegen, file))};

      const PageLayout = getPageLayout(${JSON.stringify(layout)});
      const meta = {};
    `;
    const body = `
      <PageContent meta={meta}>
        <PageLayout meta={meta}>
          <Page />
        </PageLayout>
      </PageContent>
    `;

    this.addDependency(file, { includedInParent: true });
    return generatePage(name, pageMeta, `${prefix}-${name}`, head, body, route, pageMeta.title, pageMeta.section, undefined);
  });

  return imports.filter(Boolean);
};

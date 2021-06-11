const { readFileSync } = require('fs');
const { resolve } = require('path');
const { parseMeta } = require('../markdown');
const { generatePage } = require('../pages');
const { getDocsFrom, getName, getTitle, makeFileFilter } = require('../utils');

const rx = /^<!--\n(.*?)\n-->/s;

function getRoute(basePath, name) {
  return (name && `${basePath}/${name}`) || '';
}

module.exports = function (basePath, docsFolder, options) {
  const { segment, dir, fileNames, exclude, include, sorting = "asc", layout = "default" } = options;
  const folder = resolve(docsFolder, dir);
  const files = getDocsFrom(folder, /\.(html|htm)$/, sorting);
  const prefix = segment || dir;
  const filter = makeFileFilter(fileNames, include, exclude);
  const path = segment ? `${basePath}/${segment}` : basePath;

  const imports = files.map((file) => {
    const name = getName(file);

    if (!filter(name)) {
      return undefined;
    }

    const title = getTitle(file);
    const html = readFileSync(file, 'utf8');
    const fm = rx.exec(html);
    const meta = (fm && parseMeta(fm)) || {};
    const route = getRoute(path, name);
    const pageMeta = {
      title,
      ...meta,
      link: route,
      source: file,
    };
    const head = `
      import { PageContent, getPageLayout } from 'piral-docs-tools/components';

      const markup = {
        __html: ${JSON.stringify(html)},
      };
      const PageLayout = getPageLayout(${JSON.stringify(layout)});
      const meta = ${JSON.stringify(meta)};
    `;
    const body = `
      <PageLayout meta={meta}>
        <PageContent meta={meta}>
          <div dangerouslySetInnerHTML={markup} />
        </PageContent>
      </PageLayout>
    `;

    this.addDependency(file, { includedInParent: true });
    return generatePage(name, pageMeta, `${prefix}-${name}`, head, body, route, pageMeta.title, pageMeta.section, meta);
  });

  return imports.filter(Boolean);
};

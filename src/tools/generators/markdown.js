const { resolve } = require('path');
const { generated } = require('../meta');
const { render } = require('../markdown');
const { generatePage } = require('../pages');
const { getDocsFrom, getName, docRef, getTitle } = require('../utils');

function getRoute(basePath, name) {
  return (name && `${basePath}/${name}`) || '';
}

module.exports = function (basePath, docsFolder, options) {
  const { segment, dir } = options;
  const folder = resolve(docsFolder, dir);
  const files = getDocsFrom(folder);
  const prefix = segment || dir;
  const path = segment ? `${basePath}/${segment}` : basePath;

  const imports = files.map((file) => {
    const name = getName(file);
    const title = getTitle(file);
    const route = getRoute(path, name);
    const { mdValue, meta = {} } = render(file, generated);
    const pageMeta = {
      title,
      ...meta,
      link: route,
      source: file,
    };
    const head = `
      import { PageContent, Markdown } from '../../scripts/components';

      const link = "${docRef(file)}";
      const html = ${mdValue};
    `;
    const body = `
      <PageContent meta={${JSON.stringify(meta)}}>
        <Markdown content={html} link={link} />
      </PageContent>
    `;

    this.addDependency(file, { includedInParent: true });
    return generatePage(name, pageMeta, `${prefix}-${name}`, head, body, route, pageMeta.title, pageMeta.section);
  });

  return imports;
};

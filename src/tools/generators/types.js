const { readFileSync } = require('fs');
const { resolve } = require('path');
const { getDocsFrom, makeFileFilter } = require('../utils');
const { generateCustomPage } = require('../pages');

function getRoute(basePath, name) {
  return (name && `${basePath}/${name}`) || '';
}

module.exports = function (basePath, docsFolder, options) {
  const { segment, dir, fileNames, exclude, include, sorting = "asc" } = options;
  const folder = resolve(docsFolder, dir);
  const files = getDocsFrom(folder, /\.json$/, sorting);
  const path = segment ? `${basePath}/${segment}` : basePath;
  const prefix = segment || dir;
  const filter = makeFileFilter(fileNames, include, exclude);

  const imports = files.map((file) => {
    const name = file.split('\\').join('/').split('/').pop().replace('.json', '');

    if (!filter(name)) {
      return undefined;
    }

    const body = readFileSync(file, 'utf8');
    const route = getRoute(path, name);
    const pageMeta = {
      link: route,
      source: file,
      title: name,
    };
    const imports = `
      import { TypeInfo } from 'piral-docs-tools/components';
    `;
    const content = `
      <TypeInfo key="${name}">{${body}}</TypeInfo>
    `;

    this.addDependency(file, { includedInParent: true });
    return generateCustomPage(name, pageMeta, `${prefix}-${name}`, imports, '', content, route, name);
  });

  return imports.filter(Boolean);
};

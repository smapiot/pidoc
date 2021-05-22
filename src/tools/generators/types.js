const { readFileSync } = require('fs');
const { resolve } = require('path');
const { getDocsFrom } = require('../utils');
const { generateCustomPage } = require('../pages');

function getRoute(basePath, name) {
  return (name && `${basePath}/${name}`) || '';
}

module.exports = function (basePath, docsFolder, options) {
  const { segment, dir, exclude, include } = options;
  const folder = resolve(docsFolder, dir);
  const files = getDocsFrom(folder, /\.json$/);
  const path = segment ? `${basePath}/${segment}` : basePath;
  const prefix = segment || dir;

  const imports = files.map((file) => {
    const name = file.split('\\').join('/').split('/').pop().replace('.json', '');

    if (include) {
      const rx = new RegExp(include);

      if (!rx.test(name)) {
        return undefined;
      }
    }

    if (exclude) {
      const rx = new RegExp(exclude);

      if (rx.test(name)) {
        return undefined;
      }
    }

    const body = readFileSync(file, 'utf8');
    const route = getRoute(path, name);
    const pageMeta = {
      link: route,
      source: file,
      title: name,
    };
    const imports = `
      import { TypeInfo } from '../../scripts/components';
    `;
    const content = `
      <TypeInfo key="${name}">{${body}}</TypeInfo>
    `;

    this.addDependency(file, { includedInParent: true });
    return generateCustomPage(name, pageMeta, `${prefix}-${name}`, imports, '', content, route, name);
  });

  return imports.filter(Boolean);
};

const { readFileSync } = require('fs');
const { resolve } = require('path');
const { getDocsFrom, makeFileFilter } = require('../utils');
const { generateCustomPage } = require('../pages');

function getRoute(basePath, name) {
  return (name && `${basePath}/${name}`) || '';
}

exports.find = function (basePath, docsFolder, options) {
  const { segment, dir, fileNames, exclude, include, sorting = 'asc' } = options;
  const folder = resolve(docsFolder, dir);
  const files = getDocsFrom(folder, /\.json$/, sorting);
  const filter = makeFileFilter(fileNames, include, exclude);
  const path = segment ? `${basePath}/${segment}` : basePath;
  return files
    .map((file) => {
      const name = file.split('\\').join('/').split('/').pop().replace('.json', '');
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
  const { segment, dir } = options;
  const prefix = segment || dir;
  const body = readFileSync(file, 'utf8');
  const pageMeta = {
    link: route,
    source: file,
    title: name,
  };
  const imports = `
    import { TypeInfo } from '@pidoc/components';
  `;
  const content = `
    <TypeInfo key="${name}">{${body}}</TypeInfo>
  `;

  return generateCustomPage(name, pageMeta, `${prefix}-${name}`, imports, '', content, route, name);
};

const { resolve } = require('path');
const { docRef } = require('./utils');
const { docsPath, baseDir } = require('./meta-core');

function getGeneratorPath(genPath, options) {
  if (genPath === 'custom') {
    return resolve(baseDir, options.path);
  } else {
    return resolve(__dirname, './generators', genPath);
  }
}

function makeLinks(items, basePath, resolveLink, bundler) {
  const links = [];
  const flat = !Array.isArray(items);

  if (flat) {

    items = [items];
  }

  for (const item of items) {
    if (typeof item.generator === 'string') {
      const { generator, ...options } = item;
      const genPath = getGeneratorPath(generator, options);
      const { find, build } = require(genPath);
      const entries = find(basePath, docsPath, options);
      const content = entries.map((entry) => build(entry, { ...options, resolveLink })).join(', ');

      if (flat) {
        links.push(content);
      } else {
        links.push(`...populate([${content}])`);
      }
    } else {
      links.push(`{
        "title": ${JSON.stringify(item.title)},
        "links": [${makeLinks(item.links, basePath, resolveLink, bundler)}],
      }`);
    }
  }

  return links.join(', ');
}

function fillPageMap(items, basePath, pageMap, bundler) {
  const flat = !Array.isArray(items);

  if (flat) {
    items = [items];
  }

  for (const item of items) {
    if (typeof item.generator === 'string') {
      const { generator, ...options } = item;
      const genPath = getGeneratorPath(generator, options);
      const { find } = require(genPath);
      const entries = find(basePath, docsPath, options);

      for (const entry of entries) {
        if (entry.file) {
          pageMap[docRef(entry.file)] = entry.route;
          bundler.addDependency(entry.file, { includedInParent: true });
        } else if (Array.isArray(entry.dependencies)) {
          for (const dependency of entry.dependencies) {
            bundler.addDependency(dependency, { includedInParent: true });
          }
        }
      }
    } else {
      fillPageMap(item.links, basePath, pageMap, bundler);
    }
  }
}

exports.makeContent = function makeContent(bundler, sitemap) {
  const pageMap = {};

  Object.keys(sitemap).forEach((key) => {
    const { sections } = sitemap[key];
    fillPageMap(sections, '/' + key, pageMap, bundler);
  });

  const resolveLink = (link) => pageMap[link] || link;
  const content = Object.keys(sitemap)
    .map(
      (key) => `${JSON.stringify(key)}: {
      "title": ${JSON.stringify(sitemap[key].title)},
      "sections": [${makeLinks(sitemap[key].sections, '/' + key, resolveLink, bundler)}],
    }`,
    )
    .join(',');

  return `{
    ${content}
  }`;
}

exports.populateCode = `
const { lazy } = require('react');

function populate(source) {
  const results = [];

  source.forEach(item => {
    const title = item.section;
    const [result] = results.filter(m => m.title === title);

    if (result) {
      result.links.push(item);
    } else {
      results.push({
        title,
        links: [item],
      });
    }
  });

  return results;
}
`;

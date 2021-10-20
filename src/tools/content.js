const { resolve } = require('path');
const { docRef, generateFile, readGeneratedFile } = require('./utils');
const { docsPath, baseDir } = require('./meta-core');

function getGeneratorPath(genPath, options) {
  if (genPath === 'custom') {
    return resolve(baseDir, options.path);
  } else {
    return resolve(__dirname, './generators', genPath);
  }
}

function makeLinks(items, basePath, resolveLink) {
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
        "links": [${makeLinks(item.links, basePath, resolveLink)}],
      }`);
    }
  }

  return links.join(', ');
}

function fillPageMap(items, basePath, pageMap) {
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
          pageMap.links[docRef(entry.file)] = entry.route;
          pageMap.dependencies.push(entry.file);
        } else if (Array.isArray(entry.dependencies)) {
          pageMap.dependencies.push(...entry.dependencies);
        }
      }
    } else {
      fillPageMap(item.links, basePath, pageMap);
    }
  }
}

exports.makeContent = function makeContent(sitemap) {
  const pageMap = {
    links: {},
    dependencies: [],
  };

  Object.keys(sitemap).forEach((key) => {
    const { sections } = sitemap[key];
    fillPageMap(sections, '/' + key, pageMap);
  });

  const resolveLink = (link) => pageMap.links[link] || link;
  const content = Object.keys(sitemap)
    .map(
      (key) => `${JSON.stringify(key)}: {
      "title": ${JSON.stringify(sitemap[key].title)},
      "sections": [${makeLinks(sitemap[key].sections, '/' + key, resolveLink)}],
    }`,
    )
    .join(',');

  generateFile(
    'sitemap',
    JSON.stringify(
      {
        dependencies: pageMap.dependencies,
        content: `{
        ${content}
      }`,
      },
      undefined,
      2,
    ),
    'json',
  );
};

exports.readContent = function readContent(bundler) {
  const sitemap = JSON.parse(readGeneratedFile('sitemap', 'json'));

  for (const dependency of sitemap.dependencies) {
    bundler.addDependency(dependency, { includedInParent: true });
  }

  return sitemap.content;
};

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

const { resolve } = require('path');
const { docRef, generateFile, flushWriteQueue } = require('./utils');
const { docsPath, baseDir, language } = require('./meta-core');

function getGeneratorPath(genPath, options) {
  if (genPath === 'custom') {
    return resolve(baseDir, options.path);
  } else {
    return resolve(__dirname, './generators', genPath);
  }
}

function makeLinks(items, basePath, resolveLink, locale) {
  const links = [];
  const flat = !Array.isArray(items);
  let id = 0;

  if (flat) {
    items = [items];
  }

  for (const item of items) {
    if (typeof item.generator === 'string') {
      const { generator, ...options } = item;
      const genPath = getGeneratorPath(generator, options);
      const { find, build } = require(genPath);
      const entries = find(basePath, docsPath, { ...options, locale });
      const content = entries.map((entry) => build(entry, { ...options, locale, resolveLink })).join(', ');

      if (flat) {
        links.push(content);
      } else {
        links.push(`...populate([${content}])`);
      }
    } else {
      links.push(`{
        "id": ${JSON.stringify((id++).toString() + item.title)},
        "title": ${JSON.stringify(item.title)},
        "links": [${makeLinks(item.links, basePath, resolveLink, locale)}],
      }`);
    }
  }

  return links.join(', ');
}

function fillPageMap(items, basePath, pageMap, locale) {
  const flat = !Array.isArray(items);

  if (flat) {
    items = [items];
  }

  for (const item of items) {
    if (typeof item.generator === 'string') {
      const { generator, ...options } = item;
      const genPath = getGeneratorPath(generator, options);
      const { find } = require(genPath);
      const entries = find(basePath, docsPath, { ...options, locale });

      for (const entry of entries) {
        if (entry.file) {
          pageMap.links[docRef(entry.file)] = entry.route;
          pageMap.dependencies.push(entry.file);
        } else if (Array.isArray(entry.dependencies)) {
          pageMap.dependencies.push(...entry.dependencies);
        }
      }
    } else {
      fillPageMap(item.links, basePath, pageMap, locale);
    }
  }
}

function getString(title, key, locale) {
  if (typeof title === 'string') {
    return JSON.stringify(title);
  } else if (!title || typeof title !== 'object') {
    return JSON.stringify(key);
  } else {
    return JSON.stringify(title[locale] || title[language.default] || key);
  }
}

function makeTranslatedContent(sitemap, locale, basePath) {
  const pageMap = {
    links: {},
    dependencies: [],
  };

  Object.keys(sitemap).forEach((key) => {
    const { sections } = sitemap[key];
    fillPageMap(sections, `/${key}`, pageMap, locale);
  });

  const resolveLink = (link) => pageMap.links[link] || link;
  const content = Object.keys(sitemap)
    .map(
      (key) => `${JSON.stringify(key)}: {
      "title": ${getString(sitemap[key].title, key, locale)},
      "sections": [${makeLinks(sitemap[key].sections, `${basePath}/${key}`, resolveLink, locale)}],
    }`,
    )
    .join(',');

  generateFile(`sitemap.${locale}`, `{ ${content} }`, 'js');

  return pageMap.dependencies;
}

exports.makeContent = function makeContent(sitemap) {
  const hasSelection = Object.keys(language.selection).length > 1;
  const basePath = hasSelection ? `/${language.default}` : '';
  const dependencies = makeTranslatedContent(sitemap, language.default, basePath);
  flushWriteQueue();
  return dependencies;
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

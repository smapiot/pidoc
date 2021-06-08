const FlexSearch = require('flexsearch');
const { resolve } = require('path');
const { readFileSync, readdirSync } = require('fs');
const { generated } = require('./constants');
const { getTopKeywords } = require('./keywords');

function createSearch() {
  const index = new FlexSearch({
    doc: {
      id: 'id',
      field: ['content', 'keywords', 'title'],
    },
  });

  const allDocs = readdirSync(generated)
    .map((name) => readFileSync(resolve(generated, name), 'utf8'))
    .map((raw) => {
      const { source, link, ...meta } = JSON.parse(raw.split('\n').shift().substr(3));
      if (source) {
        const content = readFileSync(source, 'utf8');

        return {
          ...meta,
          id: link,
          keywords: getTopKeywords(content),
          link,
          content,
        };
      }

      return {};
    });

  index.add(allDocs);

  return index.export({ serialize: false });
}

module.exports = {
  createSearch,
};

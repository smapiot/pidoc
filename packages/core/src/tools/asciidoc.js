const AsciiDoctor = require('@asciidoctor/core');
const { getMdValue, parseMeta, defaultLinkResolver } = require('./markdown');
const { readFileSync } = require('fs');
const { dirname } = require('path');

function render(file, baseDir = __dirname, resolveLink = defaultLinkResolver) {
  const content = readFileSync(file, 'utf8');
  const result = {
    meta: {},
    content: '',
    mdValue: '',
    images: {},
  };
  const adoc = AsciiDoctor();

  const doc = adoc.load(content, {
    attributes: {
      showtitle: true,
      'skip-front-matter': true,
      'source-highlighter': 'highlight.js',
      highlightjsdir: require.resolve('highlight.js'),
    },
    safe: 'unsafe',
    base_dir: dirname(file),
    to_dir: baseDir,
  });
  result.content = doc.convert();
  result.meta = parseMeta(doc.getAttribute('front-matter') || '');
  result.mdValue = ['`', getMdValue(result), '`'].join('');
  return result;
}

module.exports = {
  render,
};

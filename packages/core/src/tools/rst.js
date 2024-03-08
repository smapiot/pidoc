const { rst2mdown } = require('./rst2md');
const { renderContent, defaultLinkResolver } = require('./markdown');
const { readFileSync } = require('fs');

function convert(content) {
  const start = content.indexOf('---', 0);
  const end = content.indexOf('---', 3);

  if (start === 0 && end !== -1) {
    const front = content.substring(0, end + 3);
    const main = rst2mdown(content.substring(end + 3));
    return front + main;
  }

  return rst2mdown(content);
}

function render(file, baseDir = __dirname, resolveLink = defaultLinkResolver) {
  const content = readFileSync(file, 'utf8');
  const md = convert(content);
  return renderContent(md, file, baseDir, resolveLink);
}

module.exports = {
  render,
};

require('./highlight');
const YAML = require('yaml');
const MarkdownIt = require('markdown-it');
const markdownItAbbr = require('markdown-it-abbr');
const markdownItAnchor = require('markdown-it-anchor').default;
const markdownItAttrs = require('markdown-it-attrs');
const markdownItDiv = require('markdown-it-div');
const markdownItEmoji = require('markdown-it-emoji');
const markdownItFootnote = require('markdown-it-footnote');
const markdownItFrontMatter = require('markdown-it-front-matter');
const markdownItHljs = require('markdown-it-highlightjs');
const markdownItInclude = require('markdown-it-include');
const markdownItContainer = require('markdown-it-container');
const markdownItMark = require('markdown-it-mark');
const markdownItTaskCheckbox = require('markdown-it-task-checkbox');
const markdownItReplaceLink = require('markdown-it-replace-link');
const markdownItSmartArrows = require('markdown-it-smartarrows');
const markdownItSub = require('markdown-it-sub');
const markdownItSup = require('markdown-it-sup');
const markdownItVideo = require('markdown-it-video');
const { readFileSync } = require('fs');
const { dirname } = require('path');
const { normalizeLink } = require('./links');

function getMdValue(result) {
  let content = result.content
    .split('`')
    .join('\\`')
    .split('$')
    .join('\\$')
    .split('<table>')
    .join('<div class="responsive-table"><table>')
    .split('</table>')
    .join('</table></div>');
  Object.keys(result.images).forEach((id) => {
    const path = result.images[id];
    content = content.split(id).join(`\${require("${path}")}`);
  });
  return content;
}

function wrapContainer(containerName, utils) {
  const prefix = `${containerName}:`;
  return {
    validate(params) {
      return params.trim().startsWith(prefix);
    },
    render(tokens, idx) {
      if (tokens[idx].nesting === 1) {
        const titleHtml = tokens[idx].info.trim().substring(prefix.length).trim();
        const title = utils.escapeHtml(titleHtml);
        return `<div class="box ${containerName}"><p class="box-title">${title}</p>\n`;
      } else {
        return '</div>\n';
      }
    },
  };
}

function wrapCollapsed(containerName, utils) {
  const prefix = `${containerName}:`;
  return {
    validate(params) {
      return params.trim().startsWith(prefix);
    },
    render(tokens, idx) {
      if (tokens[idx].nesting === 1) {
        const titleHtml = tokens[idx].info.trim().substring(prefix.length).trim();
        const title = utils.escapeHtml(titleHtml);
        return `<details class="${containerName}"><summary>${title}</summary>\n`;
      } else {
        return '</details>\n';
      }
    },
  };
}

function parseMeta(content) {
  return YAML.parse(content);
}

function defaultLinkResolver(link) {
  return link;
}

function renderContent(content, file, baseDir, resolveLink) {
  const result = {
    meta: {},
    content: '',
    mdValue: '',
    images: {},
  };
  const md = new MarkdownIt({
    html: true,
    replaceLink(link) {
      return normalizeLink(link, file, baseDir, resolveLink, result.images);
    },
  });

  md.use(markdownItAbbr)
    .use(markdownItAnchor, { level: [1, 2, 3, 4, 5, 6] })
    .use(markdownItAttrs)
    .use(markdownItEmoji.full)
    .use(markdownItFootnote)
    .use(markdownItInclude, {
      includeRe: /#include(.+)/,
      bracesAreOptional: true,
      root: dirname(file),
    })
    .use(markdownItTaskCheckbox)
    .use(markdownItFrontMatter, (fm) => (result.meta = parseMeta(fm)))
    .use(markdownItHljs)
    .use(markdownItContainer, 'warning', wrapContainer('warning', md.utils))
    .use(markdownItContainer, 'tip', wrapContainer('tip', md.utils))
    .use(markdownItContainer, 'failure', wrapContainer('failure', md.utils))
    .use(markdownItContainer, 'question', wrapContainer('question', md.utils))
    .use(markdownItContainer, 'success', wrapContainer('success', md.utils))
    .use(markdownItContainer, 'summary', wrapCollapsed('summary', md.utils))
    .use(markdownItDiv)
    .use(markdownItMark)
    .use(markdownItReplaceLink)
    .use(markdownItSmartArrows)
    .use(markdownItSub)
    .use(markdownItSup)
    .use(markdownItVideo);

  result.content = md.render(content);
  result.mdValue = ['`', getMdValue(result), '`'].join('');
  return result;
}

function render(file, baseDir = __dirname, resolveLink = defaultLinkResolver) {
  const content = readFileSync(file, 'utf8');
  return renderContent(content, file, baseDir, resolveLink);
}

module.exports = {
  render,
  renderContent,
  parseMeta,
  getMdValue,
  defaultLinkResolver,
};

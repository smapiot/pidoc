const { generatedName } = require('./constants');
const { skipEditLabel } = require('./meta-core');
const { docRef, generateFile, getEditPlatform } = require('./utils');

function generatePage(name, pageMeta, targetFile, head, body, route, title, section = '', link = '', meta = {}) {
  generateFile(
    targetFile,
    `// ${JSON.stringify(pageMeta)}
import * as React from 'react';
import { ContentPage } from '@pidoc/components';
${head}

export default () => (
  <ContentPage>
    ${body}
  </ContentPage>
);`,
    'tsx',
  );

  return `
  {
    id: ${JSON.stringify(name)},
    route: ${JSON.stringify(route)},
    title: ${JSON.stringify(title)},
    link: ${JSON.stringify(link || route)},
    section: ${JSON.stringify(section)},
    meta: ${JSON.stringify(meta)},
    page: lazy(() => import('../tools/${generatedName}/${targetFile}.tsx')),
  }`;
}

function generateCustomPage(
  name,
  pageMeta,
  targetFile,
  imports,
  declarations,
  content,
  route,
  title,
  section = '',
  link = '',
  meta = {},
) {
  const head = `
    import { PageContent } from '@pidoc/components';
    ${imports}

    ${declarations}
  `;
  const body = `
    <PageContent>
      ${content}
    </PageContent>
  `;
  return generatePage(name, pageMeta, targetFile, head, body, route, title, section, link, meta);
}

function generateStandardPage(
  name,
  pageMeta,
  targetFile,
  sourceFile,
  mdValue,
  route,
  title,
  section = '',
  link = '',
  meta = {},
) {
  const editLabel = skipEditLabel ? '' : `Edit on ${getEditPlatform()}`;
  const imports = `
    import { Markdown } from '@pidoc/components';
  `;
  const declarations = `
    const link = ${JSON.stringify(skipEditLabel ? '' : docRef(sourceFile))};
    const html = ${mdValue};
  `;
  const content = `
    <Markdown content={html} link={link} editLabel={${JSON.stringify(editLabel)}} />
  `;
  return generateCustomPage(
    name,
    pageMeta,
    targetFile,
    imports,
    declarations,
    content,
    route,
    title,
    section,
    link,
    meta,
  );
}

module.exports = {
  generatePage,
  generateCustomPage,
  generateStandardPage,
};

const { writeFileSync, mkdirSync, existsSync, readdirSync } = require('fs');
const { basename, extname, relative, resolve, dirname } = require('path');
const { generated } = require('./constants');
const { repository, branch, docsPath, docsFolder } = require('./meta-core');

const readme = 'README.md';

function getEditPlatform() {
  const link = repository || '';

  if (link.includes('github.com')) {
    return 'GitHub';
  } else if (link.includes('visualstudio.com') || link.includes('dev.azure.com')) {
    return 'Azure DevOps';
  } else if (link.includes('bitbucket.org')) {
    return 'Bitbucket';
  } else if (link.includes('gitlab.com')) {
    return 'GitLab';
  } else {
    const m = /^https?\:\/\/(.*?)\//.exec(link);
    return m ? m[1] : link;
  }
}

function sorter(sorting) {
  switch (sorting) {
    case 'desc':
      return (a, b) => -a.localeCompare(b);
    case 'asc':
    default:
      return (a, b) => a.localeCompare(b);
  }
}

function getDocsFrom(dir, tester = /\.md$/, sorting = 'asc') {
  return readdirSync(dir)
    .sort(sorter(sorting))
    .filter((name) => tester.test(name) && name !== readme)
    .map((name) => resolve(dir, name));
}

function getName(file) {
  return (file && basename(file).replace(extname(file), '')) || '';
}

function makeRelativePath(baseDir, target) {
  return relative(baseDir, target).split('\\').join('/');
}

function getAbsolutePath(path, basePath = docsPath) {
  return resolve(dirname(basePath), path);
}

function getRelativePath(path, basePath = docsPath) {
  return makeRelativePath(basePath, getAbsolutePath(path, basePath));
}

function imgRef(path, basePath) {
  return getAbsolutePath(path, basePath);
}

function docRef(path, basePath) {
  const link = repository || '';
  const relPath = getRelativePath(path, basePath);

  if (link.includes('github.com')) {
    return `${repository}/tree/${branch}/${docsFolder}/${relPath}`;
  } else if (link.includes('visualstudio.com') || link.includes('dev.azure.com')) {
    return `${repository}?path=${encodeURIComponent(`/${docsFolder}/${relPath}`)}&version=GB${branch}`;
  } else if (link.includes('bitbucket.org')) {
    return `${repository}/src/${branch}/${docsFolder}/${relPath}`;
  } else if (link.includes('gitlab.com')) {
    return `${repository}/-/tree/${branch}/${docsFolder}/${relPath}`;
  } else {
    return `${repository}?path=${encodeURIComponent(`/${docsFolder}/${relPath}`)}&branch=${branch}`;
  }
}

function capitalize(str) {
  switch (str) {
    case 'api':
      return 'API';
    case 'cli':
      return 'CLI';
    case 'json':
      return 'JSON';
    case 'xml':
      return 'XML';
    case 'html':
      return 'HTML';
    default:
      return str[0].toUpperCase() + str.substr(1);
  }
}

function getTitle(file) {
  const parts = niceName(file).split('-');
  return parts.map((m) => capitalize(m)).join(' ');
}

function niceName(path) {
  const ext = extname(path);
  return basename(path).replace(ext, '');
}

function generateFile(name, content, type = 'codegen') {
  if (!existsSync(generated)) {
    mkdirSync(generated);
  }

  writeFileSync(resolve(generated, `${name}.${type}`), content, 'utf8');
}

module.exports = {
  readme,
  imgRef,
  docRef,
  capitalize,
  niceName,
  makeRelativePath,
  getRelativePath,
  getAbsolutePath,
  generateFile,
  getTitle,
  getDocsFrom,
  getName,
  getEditPlatform,
};

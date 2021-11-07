const { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } = require('fs');
const { basename, extname, relative, resolve, dirname, sep, posix } = require('path');
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
  return relative(baseDir, target).split(sep).join(posix.sep);
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
  const relPath = getRelativePath(getAbsolutePath(path, basePath), docsPath);

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

function getGeneratedFilePath(name, type) {
  return resolve(generated, `${name}.${type}`);
}

function readGeneratedFile(name, type) {
  if (existsSync(generated)) {
    return readFileSync(resolve(generated, `${name}.${type}`), 'utf8');
  }

  return undefined;
}

const writeFileQueue = {};

function flushWriteQueue() {
  Object.keys(writeFileQueue).forEach(path => {
    const content = writeFileQueue[path];
    writeFileSync(path, content, 'utf8');
    delete writeFileQueue[path];
  });
}

function generateFile(name, content, type = 'codegen') {
  const path = getGeneratedFilePath(name, type);

  if (!existsSync(generated)) {
    mkdirSync(generated);
    writeFileQueue[path] = content;
  } else if (!existsSync(path)) {
    writeFileQueue[path] = content;
  } else if (readGeneratedFile(name, type) !== content) {
    writeFileQueue[path] = content;
  }
}

function makeFileFilter(fileNames, include, exclude) {
  if (fileNames && Array.isArray(fileNames)) {
    return name => fileNames.includes(name);
  } else if (include || exclude) {
    const irx = include ? new RegExp(include) : new RegExp('.*');
    const erx = exclude ? new RegExp(exclude) : new RegExp('.*');
    return name => irx.test(name) || !erx.test(name);
  } else {
    return _ => true;
  }
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
  getGeneratedFilePath,
  generateFile,
  flushWriteQueue,
  readGeneratedFile,
  getTitle,
  getDocsFrom,
  getName,
  getEditPlatform,
  makeFileFilter,
};

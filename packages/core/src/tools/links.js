const { readFileSync } = require('fs');
const { extname, basename } = require('path');
const { createHash } = require('crypto');
const { docRef, imgRef, makeRelativePath } = require('./utils');
const { rootPath } = require('./meta-core');

function computeHash(content) {
  return createHash('sha1')
    .update(content || '')
    .digest('hex');
}

function normalizeLink(link, file, baseDir, resolveLink, images = {}) {
  const [path, hash] = link.split('#');
  const mr = (front) => (hash ? `${front}#${hash}` : front);

  if (path.startsWith('http://') || path.startsWith('https://')) {
    return mr(resolveLink(path));
  } else if (/\.md$/i.test(path)) {
    return mr(resolveLink(docRef(path, file)));
  } else if (/\.(png|jpg|jpeg|gif|svg)$/i.test(path)) {
    const ext = extname(path);
    const name = basename(path, ext);
    const target = imgRef(path, file);
    const content = readFileSync(target);
    const hash = computeHash(content);
    const id = `${name}_${hash}${ext}`;
    images[id] = makeRelativePath(baseDir, target);
    return id;
  } else if (/LICENSE$/i.test(path)) {
    return mr(docRef(path, rootPath));
  }

  return link;
}

module.exports = {
  normalizeLink,
};

process.on('uncaughtException', (err) => {
  console.error('Critical runtime error:', err.message);
  process.exit(1);
});

const rimraf = require('rimraf');
const { loadPlugins } = require('piral-cli/lib/plugin');
const { basename, join } = require('path');
const { readFileSync, writeFileSync, existsSync, lstatSync, mkdirSync, readdirSync } = require('fs');
const { generated } = require('./constants');
const { makeContent } = require('./content');
const { sitemap, staticPath } = require('./meta-core');

function copyFileSync(source, target) {
  let targetFile = target;

  // If target is a directory, a new file with the same name will be created
  if (existsSync(target) && lstatSync(target).isDirectory()) {
    targetFile = join(target, basename(source));
  }

  writeFileSync(targetFile, readFileSync(source));
}

function copyFolderRecursiveSync(source, target) {
  if (lstatSync(source).isDirectory()) {
    const files = readdirSync(source);

    files.forEach(file => {
      const curSource = join(source, file);

      if (lstatSync(curSource).isDirectory()) {
        const targetFolder = join(target, basename(curSource));

        if (!existsSync(targetFolder)) {
          mkdirSync(targetFolder);
        }

        copyFolderRecursiveSync(curSource, targetFolder);
      } else {
        copyFileSync(curSource, target);
      }
    });
  }
}

function prepare(baseDir) {
  process.env.PIRAL_DOCS_BASE_DIR = baseDir;
  rimraf.sync(generated);
  loadPlugins();
  makeContent(sitemap);
}

function copyStatic(outputPath) {
  if (staticPath && existsSync(staticPath)) {
    copyFolderRecursiveSync(staticPath, outputPath);
  }
}

module.exports = {
  prepare,
  copyStatic,
};

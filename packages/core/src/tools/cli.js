process.on('uncaughtException', (err) => {
  console.error('Critical runtime error:', err.message);
  process.exit(1);
});

const rimraf = require('rimraf');
const { loadPlugins } = require('piral-cli/lib/plugin');
const { basename, join, resolve, relative } = require('path');
const { watch } = require('chokidar');
const {
  readFileSync,
  writeFileSync,
  existsSync,
  lstatSync,
  mkdirSync,
  readdirSync,
  utimesSync,
  openSync,
  closeSync,
} = require('fs');

const { generated } = require('./constants');
const { makeContent } = require('./content');
const { sitemap, staticPath, fragment, docsPath } = require('./meta-core');

function getEntryFile(baseDir) {
  const srcDir = resolve(__dirname, '..');
  return `${relative(baseDir, srcDir)}/index.html`;
}

function getDoclet(baseDir, package) {
  if (package.doclet) {
    return getDefault(baseDir, package.doclet);
  } else if (package.source) {
    return package.source;
  } else {
    return getDefault(baseDir, './src/index.tsx');
  }
}

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

    files.forEach((file) => {
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

async function prepare(baseDir) {
  process.env.PIRAL_DOCS_BASE_DIR = baseDir;
  rimraf.sync(generated);
  await loadPlugins();
  makeContent(sitemap);
}

function copyStatic(outputPath) {
  if (staticPath && existsSync(staticPath)) {
    copyFolderRecursiveSync(staticPath, outputPath);
  }
}

function isFragment() {
  return fragment;
}

function getDefault(dir, file) {
  if (dir && file) {
    const path = resolve(dir, file);

    if (existsSync(path)) {
      return file;
    }
  }

  return resolve(__dirname, '..', 'doclet.ts');
}

function touchFile(filename) {
  const time = new Date();

  try {
    utimesSync(filename, time, time);
  } catch (err) {
    closeSync(openSync(filename, 'w'));
  }
}

function installWatchers(type) {
  const cwd = process.cwd();

  watch(docsPath, {
    recursive: true,
    persistent: true,
    ignoreInitial: true,
    cwd,
  }).on('all', (ev, path) => {
    console.log('Processing [%s] in "%s" ...', ev, path);
    makeContent(sitemap);
    touchFile(resolve(__dirname, '..', 'codegen', `${type}.codegen`));
  });
}

module.exports = {
  prepare,
  getEntryFile,
  getDoclet,
  copyStatic,
  installWatchers,
  isFragment,
  getDefault,
};

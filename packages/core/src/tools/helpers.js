const { resolve } = require('path');

function normalizeObj(baseDir, obj) {
  const result = {};

  if (obj) {
    Object.keys(obj).forEach(key => {
      const path = obj[key];

      if (path && typeof path === 'string') {
        result[key] = resolve(baseDir, path);
      }
    });
  }

  return result;
}

function normalizeArr(baseDir, obj) {
  const result = [];

  if (Array.isArray(obj)) {
    obj.forEach(path => {
      if (path && typeof path === 'string') {
        result.push(resolve(baseDir, path));
      }
    });
  }

  return result;
}

function getTemplate(template) {
  if (template && typeof template === 'string') {
    const templateApp = require(template);

    if (templateApp && typeof templateApp === 'object') {
      return templateApp;
    }
  }

  return {};
}

module.exports = {
  normalizeArr,
  normalizeObj,
  getTemplate,
};

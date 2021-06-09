const { resolve } = require('path');

function normalizeObj(obj) {
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

function normalizeArr(obj) {
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

module.exports = {
  normalizeArr,
  normalizeObj,
};

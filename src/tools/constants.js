const { resolve } = require('path');

const generatedName = '__generated__';

module.exports = {
  generatedName,
  generated: resolve(__dirname, generatedName),
};

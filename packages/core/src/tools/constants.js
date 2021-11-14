const { resolve } = require('path');

const generatedName = '__generated__';

module.exports = {
  generatedName,
  codegen: resolve(__dirname, '../codegen'),
  generated: resolve(__dirname, generatedName),
};

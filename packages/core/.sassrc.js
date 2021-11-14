const { sass } = require('./src/tools/meta');

module.exports = {
  data: `@import ${JSON.stringify(sass.variables)};`,
};

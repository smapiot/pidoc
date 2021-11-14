const extendWebpack = getExtender('piral-cli-webpack5') || getExtender('piral-cli-webpack') || ((cfg) => cfg);
const { data } = require('./.sassrc');

function getExtender(packageName) {
  try {
    return require(`${packageName}/extend-config`);
  } catch (_) {
    return undefined;
  }
}

module.exports = extendWebpack({
  sassLoaderOptions: {
    additionalData: data,
  },
});

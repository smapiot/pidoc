const extendWebpack = getExtender('piral-cli-webpack5') || getExtender('piral-cli-webpack') || ((cfg) => cfg);
const { data } = require('./.sassrc');

function getExtender(packageName) {
  try {
    return require(`${packageName}/extend-config`);
  } catch (_) {
    return undefined;
  }
}

const getConfig = extendWebpack({
  sassLoaderOptions: {
    additionalData: data,
  },
});

module.exports = (config) => {
  const newConfig = getConfig(config);
  newConfig.resolve.alias = {
    // For backwards compatibility
    'piral-docs-tools/components': require.resolve('@pidoc/components'),
  };
  return newConfig;
};

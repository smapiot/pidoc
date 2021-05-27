const { readFileSync } = require('fs');

function getChangelogVersion(changelogPath) {
  const CHANGELOG = readFileSync(changelogPath, 'utf8');
  const matches = /^\#\# (\d+\.\d+\.\d+).*/gm.exec(CHANGELOG);

  if (!matches) {
    throw new Error('Invalid CHANGELOG format found. Need to fine line starting with "## x.y.z" to get the latest version.');
  }

  const version = matches[1];
  return version;
}

module.exports = {
  getChangelogVersion,
};

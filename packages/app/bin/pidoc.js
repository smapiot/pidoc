#!/usr/bin/env node

const { isFragment } = require('@pidoc/core/src/tools/cli');

if (isFragment()) {
  require('@pidoc/core/bin/pilet-cli');
} else {
  require('@pidoc/core/bin/piral-cli');
}

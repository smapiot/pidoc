#!/usr/bin/env node

const { spawnSync } = require('child_process');
const { outputPath } = require('../src/tools/meta');

spawnSync(`piral build ${__dirname}/../src/index.pug --type release --target ${outputPath}/index.html`);

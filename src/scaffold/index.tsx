import type { PiletApi } from '<%- sourceName %>';

const createDoclet = require('piral-docs-tools/doclet');

export function setup(api: PiletApi) {
  createDoclet(api);
}

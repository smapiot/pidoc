import type { PiletApi } from '<%- sourceName %>';

const createDoclet = require('@pidoc/core/doclet');

export function setup(api: PiletApi) {
  createDoclet(api);
}

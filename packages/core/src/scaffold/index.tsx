import type { PiletApi } from '<%- sourceName %>';
import createDoclet from '@pidoc/core/doclet';

export function setup(api: PiletApi) {
  createDoclet(api);
}

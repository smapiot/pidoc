import type { PiletApi } from '<%- sourceName %>';
import { setupDoclet, teardownDoclet } from '@pidoc/core/doclet';

export function setup(api: PiletApi) {
  setupDoclet(api);
}

export function teardown(api: PiletApi) {
  teardownDoclet(api);
}

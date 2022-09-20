import { setupDoclet, teardownDoclet } from './codegen/pilet.codegen';

export function setup(api) {
  setupDoclet(api);
}

export function teardown(api) {
  teardownDoclet(api);
}

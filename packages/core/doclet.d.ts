export function setupDoclet(api: {
  registerDocumentation(section: any, category: any): void;
  registerSearchProvider(cb: any): void;
}): void;

export function teardownDoclet(api: {
  unregisterDocumentation(section: any, category: any): void;
  unregisterSearchProvider(cb: any): void;
}): void;

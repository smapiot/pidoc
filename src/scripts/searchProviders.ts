const searchProviders = [() => import('../codegen/search.codegen')];

export function includeSearchProvider(cb: () => Promise<any>) {
  searchProviders.push(cb);
}

export function getSearchProviders() {
  return searchProviders;
}

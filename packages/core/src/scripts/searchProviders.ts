const searchProviders = [() => import('../codegen/search.codegen')];

export function includeSearchProvider(cb: () => Promise<any>) {
  searchProviders.push(cb);
}

export function excludeSearchProvider(cb: () => Promise<any>) {
  const index = searchProviders.indexOf(cb);

  if (index !== -1) {
    searchProviders.splice(index, 1);
  }
}

export function getSearchProviders() {
  return searchProviders;
}

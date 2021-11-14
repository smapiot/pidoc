import { PiralPlugin } from 'piral-core';
import { excludeSearchProvider, includeSearchProvider } from './searchProviders';
import { appendSection, removeSection } from './sitemap';
import { PiletDocletApi } from './types';

export function createDocletPlugin(): PiralPlugin<PiletDocletApi> {
  return (context) => ({
    registerDocumentation(section, category) {
      const routes = appendSection(section, category);
      context.dispatch((state) => ({
        ...state,
        routes: {
          ...state.routes,
          ...routes,
        },
      }));
    },
    unregisterDocumentation(section, category) {
      const routes = removeSection(section, category);
      context.dispatch((state) => ({
        ...state,
        routes: Object.keys(routes).reduce((oldRoutes, path) => {
          delete oldRoutes[path];
          return oldRoutes;
        }, state.routes),
      }));
    },
    registerSearchProvider(cb) {
      includeSearchProvider(cb);
    },
    unregisterSearchProvider(cb) {
      excludeSearchProvider(cb);
    },
  });
}

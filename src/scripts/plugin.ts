import { PiralPlugin } from 'piral-core';
import { includeSearchProvider } from './searchProviders';
import { appendSection } from './sitemap';
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
    registerSearchProvider(cb) {
      includeSearchProvider(cb);
    },
  });
}

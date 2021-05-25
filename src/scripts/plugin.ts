import { PiralPlugin } from 'piral-core';
import { appendSection, SectionInfo } from './sitemap';

export interface PiletDocletApi {
  registerDocumentation(section: SectionInfo, category: string): void;
}

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
  });
}

import { FC } from 'react';
import { PiletApi } from 'piral-core';

export { PiletApi };

declare module 'piral-core/lib/types/custom' {
  interface PiletCustomApi extends PiletDocletApi {}

  interface PiralCustomState extends PiralDocletState {}
}

export interface SectionLink {
  id: string;
  route: string;
  link?: string;
  title?: string;
  page: React.FC;
}

export interface SectionInfo {
  title: string;
  links: Array<SectionLink>;
}

export interface NavLink {
  title: string;
  link: string;
}

export interface SitemapLink {
  id: string;
  link: string;
  route: string;
  title: string;
  section: string;
  page: FC;
  meta?: any;
}

export interface SitemapSection {
  title: string;
  links: Array<SitemapLink>;
}

export interface Sitemap {
  [chapterName: string]: {
    title: string;
    sections: Array<SitemapSection>;
  };
}

export interface PiralDocletState {
  docs: {
    version: string;
    updated: string;
  };
}

export interface PiletDocletApi {
  registerDocumentation(section: SectionInfo, category: string): void;
  registerSearchProvider(cb: () => Promise<any>): void;
}

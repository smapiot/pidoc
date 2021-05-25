import { FC } from 'react';
import { PiletApi } from 'piral-core';

export { PiletApi };

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

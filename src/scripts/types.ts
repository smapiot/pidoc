import { FC } from 'react';

export interface LayoutProps {
  Footer: FC;
  Logo: FC;
  brandName: string;
}

export interface AppProps {
  layout: LayoutProps;
  Router: FC;
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

import { FC } from 'react';
import { PiletApi, PiralPlugin } from 'piral-core';

export { PiletApi, PiralPlugin };

declare module 'piral-core/lib/types/custom' {
  interface PiletCustomApi extends PiletDocletApi {}

  interface PiralCustomState extends PiralDocletState {}
}

export interface PiralDocsBreadcrumbsComponentProps {}

export interface PiralDocsFooterComponentProps {}

export interface PiralDocsHeaderComponentProps {
  title: React.ReactNode;
  search: React.ReactNode;
  logo: React.ReactNode;
  nav: React.ReactNode;
}

export interface PiralDocsInfoBarComponentProps {}

export interface PiralDocsLayoutComponentProps {}

export interface PiralDocsLogoComponentProps {}

export interface PiralDocsNotFoundPageComponentProps {}

export interface PiralDocsRouterComponentProps {}

export interface PiralDocsSectionNavComponentProps {
  prev: SectionLink;
  next: SectionLink;
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
    basePath: string;
  };
}

export interface PiletDocletApi {
  registerDocumentation(section: SectionInfo, category: string): void;
  unregisterDocumentation(section: SectionInfo, category: string): void;
  registerSearchProvider(cb: () => Promise<any>): void;
  unregisterSearchProvider(cb: () => Promise<any>): void;
}

export interface PiralDocsFragmentConfig {
  /**
   * @default '.'
   */
  rootDir: string;
  /**
   * @default 'dist'
   */
  outputDir: string;
  /**
   * @default undefined
   */
  staticDir: string;
  /**
   * @default process.cwd()
   */
  packageRoot: string;
  /**
   * @default 'smapiot'
   */
  author: string;
  /**
   * @default 'master'
   */
  branch: string;
  /**
   * @default 'docs'
   */
  docsDirName: string;
  /**
   * @default false
   */
  skipEditLabel: boolean;
  /**
   * @default {}
   */
  sitemap: Sitemap;
}

export interface PiralDocsFullConfig extends PiralDocsFragmentConfig {
  /**
   * @default 'Project'
   */
  name: string;
  /**
   * @default name
   */
  title: string;
  /**
   * @default ''
   */
  description: string;
  /**
   * @default {}
   */
  redirects: {
    [path: string]: string;
  };
  /**
   * @default {}
   */
  pages: {
    [path: string]: string;
  };
  /**
   * @default '/'
   */
  publicPath: string;
  /**
   * @default undefined
   */
  changelogFile: string;
  /**
   * @default []
   */
  styles: Array<string>;
  /**
   * @default {}
   */
  sass: {
    variables: string;
  };
  /**
   * @default {}
   */
  components: {
    footer: string;
    header: string;
    logo: string;
    infoBar: string;
    breadcrumbs: string;
    sectionNav: string;
    router: string;
    notFoundPage: string;
  };
  /**
   * @default {}
   */
  helpers: {
    setup: string;
    filter: string;
    plugins: string;
    requestPilets: string;
  };
  /**
   * @default {}
   */
  layouts: {
    default: string;
    [name: string]: string;
  };
}

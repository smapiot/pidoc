import { FC } from 'react';
import { PiletApi, PiralPlugin } from 'piral-core';

export { PiletApi, PiralPlugin };

declare module 'piral-core/lib/types/custom' {
  type PiletCustomApi = PiletDocletApi;

  type PiralCustomState = PiralDocletState;
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
    layouts: Record<string, FC<PiralDocsLayoutComponentProps>>;
  };
}

export interface PiletDocletApi {
  registerDocumentation: (section: SectionInfo, category: string) => void;
  unregisterDocumentation: (section: SectionInfo, category: string) => void;
  registerSearchProvider: (cb: () => Promise<any>) => void;
  unregisterSearchProvider: (cb: () => Promise<any>) => void;
}

export interface PiralDocsCoreConfig {
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

export interface PiralDocsFragmentConfig extends PiralDocsCoreConfig {
  /**
   * @default false
   */
  fragment: true;
}

export interface PiralDocsFullConfig extends PiralDocsCoreConfig {
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
    /**
     * The (URL) path to (URL) path redirect rule.
     */
    [path: string]: string;
  };
  /**
   * @default undefined
   */
  template: string;
  /**
   * @default {}
   */
  pages: {
    /**
     * The (URL) path to (relative) file system path (leading to a React component).
     * The React component should have a default export.
     */
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
    /**
     * The (relative) file system path to the SASS file used for overriding the variables.
     */
    variables: string;
  };
  /**
   * @default {}
   */
  components: {
    /**
     * The (relative) file system path leading to a React component for the Footer.
     * The React component should have a default export.
     * The type of the export should be ComponentType<PiralDocsFooterComponentProps>.
     */
    footer: string;
    /**
     * The (relative) file system path leading to a React component for the Header.
     * The React component should have a default export.
     * The type of the export should be ComponentType<PiralDocsHeaderComponentProps>.
     */
    header: string;
    /**
     * The (relative) file system path leading to a React component for the Logo.
     * The React component should have a default export.
     * The type of the export should be ComponentType<PiralDocsLogoComponentProps>.
     */
    logo: string;
    /**
     * The (relative) file system path leading to a React component for the InfoBar.
     * The React component should have a default export.
     * The type of the export should be ComponentType<PiralDocsInfoBarComponentProps>.
     */
    infoBar: string;
    /**
     * The (relative) file system path leading to a React component for the Breadcrumbs.
     * The React component should have a default export.
     * The type of the export should be ComponentType<PiralDocsBreadcrumbsComponentProps>.
     */
    breadcrumbs: string;
    /**
     * The (relative) file system path leading to a React component for the SectionNav.
     * The React component should have a default export.
     * The type of the export should be ComponentType<PiralDocsSectionNavComponentProps>.
     */
    sectionNav: string;
    /**
     * The (relative) file system path leading to a React component for the Router.
     * The React component should have a default export.
     * The type of the export should be ComponentType<PiralDocsRouterComponentProps>.
     */
    router: string;
    /**
     * The (relative) file system path leading to a React component for the NotFoundPage.
     * The React component should have a default export.
     * The type of the export should be ComponentType<PiralDocsNotFoundPageComponentProps>.
     */
    notFoundPage: string;
  };
  /**
   * @default {}
   */
  helpers: {
    /**
     * The (relative) file system path leading to a setup function.
     * The function should be the default export.
     * The signature is (api: PiletApi) => void.
     */
    setup: string;
    /**
     * The (relative) file system path leading to a filter function.
     * The function should be the default export.
     * The signature is (sitemap: Sitemap) => Sitemap.
     */
    filter: string;
    /**
     * The (relative) file system path leading to a plugins array.
     * The array should be the default export.
     * The type is Array<PiralPlugin>.
     */
    plugins: string;
    /**
     * The (relative) file system path leading to a requestPilets function.
     * The function should be the default export.
     * The signature is () => Promise<Array<PiletMetadata>>.
     */
    requestPilets: string;
  };
  /**
   * @default {}
   */
  layouts: {
    /**
     * The (relative) file system path leading to a React component for the default layout.
     * The React component should have a default export.
     */
    default: string;
    /**
     * The (relative) file system path leading to a React component for the named layout.
     * The React component should have a default export.
     */
    [name: string]: string;
  };
}

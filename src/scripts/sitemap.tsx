import * as React from 'react';
import { Redirect, matchPath, RouteComponentProps } from 'react-router-dom';

const sitemap = require('../codegen/sitemap.codegen');

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

function lastLink(sectionInfo: SectionInfo) {
  if (sectionInfo) {
    const last = sectionInfo.links.length - 1;
    return sectionInfo.links[last];
  }

  return undefined;
}

function nextLink(sectionInfo: SectionInfo) {
  if (sectionInfo) {
    return sectionInfo.links[0];
  }

  return undefined;
}

export const topNavItems: Array<NavLink> = [];
export const resolvers: Record<string, Array<SectionInfo>> = {};
export const navLinks: Record<string, [SectionLink | undefined, SectionLink | undefined]> = {};
export const routes: Record<string, React.ComponentType> = {};

function findRoutes() {
  const categories = Object.keys(sitemap);

  for (const category of categories) {
    const link = `/${category}`;
    const { sections, title } = sitemap[category];
    const defaultRoute = sections[0]?.links[0]?.route;

    topNavItems.push({
      title,
      link,
    });

    if (defaultRoute) {
      routes[link] = () => <Redirect key={category} to={defaultRoute} />;
      resolvers[link] = sections;
    }

    addSections(sections);
  }
}

export function resolveSections(pathname: string) {
  return (
    Object.keys(resolvers)
      .filter((path) =>
        matchPath(pathname, {
          exact: true,
          path,
        }),
      )
      .map((m) => resolvers[m])
      .shift() || []
  );
}

export function resolveNavigation(pathname: string) {
  return (
    Object.keys(navLinks)
      .filter((path) =>
        matchPath(pathname, {
          exact: true,
          path,
        }),
      )
      .map((m) => navLinks[m])
      .shift() || []
  );
}

export function addSections(sections: Array<SectionInfo>) {
  const localRoutes: Record<string, React.ComponentType<RouteComponentProps>> = {};

  for (let j = 0; j < sections.length; j++) {
    const section = sections[j];

    for (let i = 0; i < section.links.length; i++) {
      const prev = section.links[i - 1] || lastLink(sections[j - 1]);
      const curr = section.links[i];
      const next = section.links[i + 1] || nextLink(sections[j + 1]);
      localRoutes[curr.route] = curr.page;
      routes[curr.route] = curr.page;
      resolvers[curr.route] = sections;
      navLinks[curr.route] = [prev, next];
    }
  }

  return localRoutes;
}

export function appendSection(section: SectionInfo, category: string) {
  const parent = resolveSections(`/${category}`);
  const localRoutes: Record<string, React.ComponentType<RouteComponentProps>> = {};

  if (parent) {
    const j = parent.length;
  
    if (section.links.length > 0) {
      const prevRoute = lastLink(parent[j - 1]).route;
      navLinks[prevRoute] = [navLinks[prevRoute][0], section.links[0]];
    }
  
    for (let i = 0; i < section.links.length; i++) {
      const prev = section.links[i - 1] || lastLink(parent[j - 1]);
      const curr = section.links[i];
      const next = section.links[i + 1];
      localRoutes[curr.route] = curr.page;
      routes[curr.route] = curr.page;
      resolvers[curr.route] = parent;
      navLinks[curr.route] = [prev, next];
    }
  
    parent.push(section);
  }

  return localRoutes;
}

findRoutes();

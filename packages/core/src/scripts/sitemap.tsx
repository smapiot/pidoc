import * as React from 'react';
import { Redirect, matchPath, RouteComponentProps } from 'react-router-dom';
import { NavLink, SectionInfo, SectionLink } from './types';
import sitemap from '../codegen/sitemap.codegen';

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
  const isEmpty = Object.keys(resolvers).length === 0;

  if (parent) {
    const j = parent.length;
    const child = parent[j - 1];

    if (section.links.length > 0) {
      const link = lastLink(child);

      if (link) {
        const prevRoute = link.route;
        navLinks[prevRoute] = [navLinks[prevRoute][0], section.links[0]];
      }
    }

    for (let i = 0; i < section.links.length; i++) {
      const prev = section.links[i - 1] || lastLink(child);
      const curr = section.links[i];
      const next = section.links[i + 1];
      localRoutes[curr.route] = curr.page;
      routes[curr.route] = curr.page;
      resolvers[curr.route] = parent;
      navLinks[curr.route] = [prev, next];
    }

    parent.push(section);
  }

  if (isEmpty) {
    const [firstRoute] = Object.keys(localRoutes);

    if (firstRoute) {
      localRoutes['/'] = () => <Redirect to={firstRoute} />;
    }
  }

  return localRoutes;
}

export function removeSection(section: SectionInfo, category: string) {
  const parent = resolveSections(`/${category}`);
  const localRoutes: Array<string> = [];

  if (parent) {
    const j = parent.indexOf(section);
    const child = parent[j];

    if (child) {
      if (section.links.length > 0) {
        const sectionLink = section.links[0];

        Object.keys(navLinks).forEach((route) => {
          const [prev, next] = navLinks[route];

          if (next === sectionLink) {
            navLinks[route] = [prev, parent[j + 1]?.links?.[0]];
          }
        });
      }

      for (let i = 0; i < section.links.length; i++) {
        const { route } = section.links[i];
        localRoutes.push(route);
        delete routes[route];
        delete resolvers[route];
        delete navLinks[route];
      }

      parent.splice(j, 1);
    }
  }

  return localRoutes;
}

findRoutes();

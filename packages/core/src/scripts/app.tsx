import * as React from 'react';
import { render } from 'react-dom';
import { createInstance, Piral } from 'piral-core';
import { LoadingIndicator, SectionMenu, setPageLayouts } from '@pidoc/components';
import { createDocletPlugin } from './plugin';
import { routes, resolveSections } from './sitemap';
import { Layout, Breadcrumbs } from './Layout';
import {
  Router,
  NotFoundPage,
  requestPilets,
  layouts,
  setup,
  plugins,
  pages,
  version,
  updated,
  publicUrl,
} from '../codegen/app.codegen';

// for backwards compatibility
setPageLayouts(layouts);

const instance = createInstance({
  requestPilets,
  state: {
    docs: {
      version,
      updated,
      layouts,
      basePath: publicUrl,
    },
    components: {
      Router,
      Layout,
      LoadingIndicator,
    },
    errorComponents: {
      not_found: NotFoundPage,
    },
    routes: {
      ...routes,
      ...pages,
    },
  },
  plugins: [...plugins, createDocletPlugin()],
});

instance.root.registerExtension('section-menu', ({ params: { pathname } }) => {
  const sections = React.useMemo(() => resolveSections(pathname), [pathname]);
  return <SectionMenu sections={sections} />;
});

instance.root.registerExtension('breadcrumbs', () => {
  return <Breadcrumbs />;
});

setup(instance.root);

render(<Piral instance={instance} />, document.querySelector('#app'));

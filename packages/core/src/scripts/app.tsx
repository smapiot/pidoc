import * as React from 'react';
import { render } from 'react-dom';
import { createInstance, Piral } from 'piral-core';
import { createDocletPlugin } from './plugin';
import { LoadingIndicator } from './components';
import { routes } from './sitemap';
import { Layout } from './Layout';
import {
  Router,
  NotFoundPage,
  requestPilets,
  setup,
  plugins,
  pages,
  version,
  updated,
  publicUrl,
} from '../codegen/app.codegen';

const instance = createInstance({
  requestPilets,
  state: {
    docs: {
      version,
      updated,
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

setup(instance.root);

render(<Piral instance={instance} />, document.querySelector('#app'));

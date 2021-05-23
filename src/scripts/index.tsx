import * as React from 'react';
import { render } from 'react-dom';
import { createInstance, Piral } from 'piral-core';
import { LoadingIndicator } from './components';
import { routes } from './sitemap';
import { Layout } from './Layout';

const { Router, NotFoundPage, requestPilets, plugins, pages } = require('../codegen/app.codegen');

const instance = createInstance({
  requestPilets,
  state: {
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
  plugins,
});

render(<Piral instance={instance} />, document.querySelector('#app'));

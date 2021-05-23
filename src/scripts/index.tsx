import * as React from 'react';
import { createInstance, Piral } from 'piral-core';
import { render } from 'react-dom';
import { LoadingIndicator } from './components';
import { routes } from './sitemap';
import { Layout } from './Layout';

const { Router, NotFoundPage, requestPilets } = require('../codegen/app.codegen');
const extraRoutes = require('../codegen/routes.codegen');

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
  },
});

render(<Piral instance={instance}>{[...routes, ...extraRoutes]}</Piral>, document.querySelector('#app'));

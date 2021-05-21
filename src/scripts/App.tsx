import * as React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { routes } from './sitemap';
import { Layout } from './Layout';
import { AppProps } from './types';

const extraRoutes = require('../codegen/routes.codegen');

function getBasename() {
  const [, version] = location.pathname.split('/');

  if (version && /^\d+\.\d+\.\d+$/.test(version)) {
    return `/${version}`;
  }

  return undefined;
}

export const App: React.FC<AppProps> = ({ layout }) => (
  <BrowserRouter basename={getBasename()}>
    <Layout {...layout}>
      <Switch>
        {[...routes, ...extraRoutes]}
      </Switch>
    </Layout>
  </BrowserRouter>
);

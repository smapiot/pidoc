import * as React from 'react';
import { Switch } from 'react-router-dom';
import { routes } from './sitemap';
import { Layout } from './Layout';
import { AppProps } from './types';

const extraRoutes = require('../codegen/routes.codegen');

export const App: React.FC<AppProps> = ({ Router, layout }) => (
  <Router>
    <Layout {...layout}>
      <Switch>{[...routes, ...extraRoutes]}</Switch>
    </Layout>
  </Router>
);

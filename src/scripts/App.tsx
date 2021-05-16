import * as React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { routes } from './sitemap';
import { Layout } from './Layout';
import { AppProps } from './types';

function getBasename() {
  const [, version] = location.pathname.split('/');

  if (version && /^\d+\.\d+\.\d+$/.test(version)) {
    return `/${version}`;
  }

  return undefined;
}

export const App: React.FC<AppProps> = ({ layout, children }) => (
  <BrowserRouter basename={getBasename()}>
    <Layout {...layout}>
      <Switch>
        {routes}
        {children}
      </Switch>
    </Layout>
  </BrowserRouter>
);

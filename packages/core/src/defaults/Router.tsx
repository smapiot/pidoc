import * as React from 'react';
import { useGlobalState } from 'piral-core';
import { BrowserRouter } from 'react-router-dom';
import { PiralDocsRouterComponentProps } from '../scripts/types';

function getBasename(publicUrl: string) {
  const prefix = publicUrl.endsWith('/') ? publicUrl.substr(0, publicUrl.length - 1) : publicUrl;
  const [, version] = location.pathname.substr(prefix.length).split('/');

  if (version && /^\d+\.\d+\.\d+$/.test(version)) {
    return `${prefix}/${version}`;
  }

  return publicUrl;
}

const Router: React.FC<PiralDocsRouterComponentProps> = ({ children }) => {
  const publicUrl = useGlobalState((s) => s.docs.basePath);
  const path = getBasename(publicUrl);
  return <BrowserRouter basename={path}>{children}</BrowserRouter>;
};

export default Router;

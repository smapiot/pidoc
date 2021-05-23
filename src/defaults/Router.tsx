import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';

function getBasename() {
  const [, version] = location.pathname.split('/');

  if (version && /^\d+\.\d+\.\d+$/.test(version)) {
    return `/${version}`;
  }

  return undefined;
}

export default ({ children }) => <BrowserRouter basename={getBasename()}>{children}</BrowserRouter>;

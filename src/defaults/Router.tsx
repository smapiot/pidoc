import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { publicUrl } from '../codegen/meta.codegen';

function getBasename() {
  const prefix = publicUrl.endsWith('/') ? publicUrl.substr(0, publicUrl.length - 1) : publicUrl;
  const [, version] = location.pathname.substr(prefix.length).split('/');

  if (version && /^\d+\.\d+\.\d+$/.test(version)) {
    return `${prefix}/${version}`;
  }

  return publicUrl;
}

export default ({ children }) => <BrowserRouter basename={getBasename()}>{children}</BrowserRouter>;

import * as React from 'react';
import { render } from 'react-dom';
import { App } from './App';

const layout = require('../codegen/layout.codegen');
const routes = require('../codegen/routes.codegen');

render(<App layout={layout}>{routes}</App>, document.querySelector('#app'));

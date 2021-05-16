import * as React from 'react';
import { render } from 'react-dom';
import { App } from './App';

const layout = require('../codegen/layout.codegen');

render(<App layout={layout} />, document.querySelector('#app'));

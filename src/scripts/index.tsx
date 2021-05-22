import * as React from 'react';
import { render } from 'react-dom';
import { App } from './App';

const { Router, layout } = require('../codegen/components.codegen');

render(<App layout={layout} Router={Router} />, document.querySelector('#app'));

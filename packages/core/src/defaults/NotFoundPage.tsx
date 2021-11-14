import * as React from 'react';
import { PiralDocsNotFoundPageComponentProps } from '../scripts/types';

const NotFoundPage: React.FC<PiralDocsNotFoundPageComponentProps> = () => (
  <section className="layout-container">
    <h1>Page Not Found</h1>
    <p>The page you are looking for has not been found here. Maybe start a search?</p>
    <p>The search is located on the top right corner. You can just click on the magnifier symbol.</p>
  </section>
);

export default NotFoundPage;

import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { ExtensionSlot } from 'piral-core';
import { Page } from './PageContext';
import { TocMenu } from './TocMenu';
import { SectionMenu } from './SectionMenu';
import { resolveSections } from '../sitemap';

const { Breadcrumbs } = require('../codegen/layout.codegen');

export const ContentPage: React.FC = ({ children }) => {
  const { pathname } = useLocation();
  const sections = React.useMemo(() => resolveSections(pathname), [pathname]);

  return (
    <Page>
      <SectionMenu sections={sections} />
      <TocMenu />
      <div className="content-display">
        <Breadcrumbs />
        {children}
      </div>
      <ExtensionSlot name="content-page" params={{ pathname }} />
    </Page>
  );
};

import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { ExtensionSlot } from 'piral-core';
import { Page } from './PageContext';
import { TocMenu } from './TocMenu';

export const ContentPage: React.FC = ({ children }) => {
  const { pathname } = useLocation();

  return (
    <Page>
      <ExtensionSlot name="section-menu" params={{ pathname }} />
      <TocMenu />
      <div className="content-display">
        <ExtensionSlot name="breadcrumbs" params={{ pathname }} />
        {children}
      </div>
      <ExtensionSlot name="content-page" params={{ pathname }} />
    </Page>
  );
};

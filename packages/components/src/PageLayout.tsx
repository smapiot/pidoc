import * as React from 'react';
import { useGlobalState } from 'piral-core';

function usePageLayout(layoutName: string) {
  const layouts = useGlobalState((s: any) => s.docs.layouts);
  return layouts[layoutName] || layouts.default;
}

export interface PageLayoutProps {
  name: string;
  meta: any;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ name, meta, children }) => {
  const Layout = usePageLayout(name);
  return <Layout meta={meta}>{children}</Layout>;
};

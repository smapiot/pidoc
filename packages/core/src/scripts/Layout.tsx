import * as React from 'react';
import { Route, useLocation } from 'react-router-dom';
import { Search, TopNav, LoadingIndicator, ScrollToTop } from '@pidoc/components';
import { resolveNavigation, topNavItems } from './sitemap';
import { getSearchProviders } from './searchProviders';
import { brandName, Footer, Header, Logo, InfoBar, SectionNav, Breadcrumbs } from '../codegen/layout.codegen';

const QuickNav: React.FC = () => {
  const { pathname } = useLocation();
  const [prev, next] = React.useMemo(() => resolveNavigation(pathname), [pathname]);
  return <SectionNav prev={prev} next={next} />;
};

const Layout: React.FC = ({ children }) => (
  <>
    <Route component={ScrollToTop} />
    <Header
      title={brandName}
      nav={<TopNav items={topNavItems} />}
      search={<Search providers={getSearchProviders} />}
      logo={<Logo />}
    />
    <InfoBar />
    <div className="layout-container content">
      <React.Suspense fallback={<LoadingIndicator />}>{children}</React.Suspense>
    </div>
    <QuickNav />
    <Footer title={brandName} />
  </>
);

export { QuickNav, Breadcrumbs, Layout };

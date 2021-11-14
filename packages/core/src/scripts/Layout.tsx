import * as React from 'react';
import { Route, useLocation } from 'react-router-dom';
import { resolveNavigation } from './sitemap';
import { Search, TopNav, LoadingIndicator, ScrollToTop } from './components';
import { brandName, Footer, Header, Logo, InfoBar, SectionNav } from '../codegen/layout.codegen';

const QuickNav: React.FC = () => {
  const { pathname } = useLocation();
  const [prev, next] = React.useMemo(() => resolveNavigation(pathname), [pathname]);
  return <SectionNav prev={prev} next={next} />;
};

export const Layout: React.FC = ({ children }) => (
  <>
    <Route component={ScrollToTop} />
    <Header title={brandName} nav={<TopNav />} search={<Search />} logo={<Logo />} />
    <InfoBar />
    <div className="layout-container content">
      <React.Suspense fallback={<LoadingIndicator />}>{children}</React.Suspense>
    </div>
    <QuickNav />
    <Footer title={brandName} />
  </>
);

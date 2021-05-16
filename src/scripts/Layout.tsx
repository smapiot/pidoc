import * as React from 'react';
import { Link, Route } from 'react-router-dom';
import { Search, ContentPage, QuickNav, TopNav, Loader, ScrollToTop } from './components';
import { LayoutProps } from './types';

const updated = process.env.BUILD_TIME;
const version = require('../codegen/version.codegen');

export const Layout: React.FC<LayoutProps> = ({ brandName, Footer, Logo, children }) => {
  const [active, setActive] = React.useState(false);
  const toggleActive = React.useCallback(() => setActive((active) => !active), []);

  return (
    <>
      <Route component={ScrollToTop} />
      <header>
        <div className="layout-container header">
          <div className="logo">
            <Link to="/">
              <Logo />
            </Link>
            <span className="brand-name">{brandName}</span>
            <span className="brand-suffix">Docs</span>
          </div>
          <Search />
          <div className="hamburger">
            <a href="#" onClick={toggleActive}>
              <i className="fas fa-bars" />
            </a>
          </div>
          <div className="version-info">
            {version && (
              <>
                <i className="fas fa-code-branch" />v{version}
              </>
            )}
            {updated && (
              <>
                <i className="far fa-clock" />
                Updated {updated}
              </>
            )}
          </div>
        </div>
        <nav className="layout-container">
          <TopNav active={active} />
        </nav>
      </header>
      <div className="layout-container content">
        <ContentPage>
          <React.Suspense fallback={<Loader />}>{children}</React.Suspense>
        </ContentPage>
      </div>
      <QuickNav />
      <Footer />
    </>
  );
};

import * as React from 'react';
import { Link, Route } from 'react-router-dom';
import { Search, ContentPage, QuickNav, TopNav, LoadingIndicator, ScrollToTop } from './components';

const { brandName, Footer, Logo, version, updated } = require('../codegen/layout.codegen');

export const Layout: React.FC = ({ children }) => {
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
          <React.Suspense fallback={<LoadingIndicator />}>{children}</React.Suspense>
        </ContentPage>
      </div>
      <QuickNav />
      <Footer />
    </>
  );
};

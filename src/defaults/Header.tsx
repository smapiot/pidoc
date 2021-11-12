import * as React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalState } from 'piral-core';
import { PiralDocsHeaderComponentProps } from '../scripts/types';

const Header: React.FC<PiralDocsHeaderComponentProps> = ({ title, search, logo, nav }) => {
  const [active, setActive] = React.useState(false);
  const version = useGlobalState((s) => s.docs.version);
  const updated = useGlobalState((s) => s.docs.updated);
  const toggleActive = React.useCallback(() => setActive((active) => !active), []);

  return (
    <header>
      <div className="layout-container header">
        <div className="logo">
          <Link to="/">{logo}</Link>
          <span className="brand-name">{title}</span>
          <span className="brand-suffix">Docs</span>
        </div>
        {search}
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
      <nav className="layout-container" data-open={active}>
        {nav}
      </nav>
    </header>
  );
};

export default Header;

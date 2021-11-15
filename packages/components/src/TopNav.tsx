import * as React from 'react';
import { ExtensionSlot } from 'piral-core';
import { NavLink } from 'react-router-dom';

function renderNavItems(items: Array<React.ReactNode>) {
  return (
    <>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </>
  );
}

export interface TopNavProps {
  items: Array<{
    link: string;
    title: string;
  }>;
}

export const TopNav: React.FC<TopNavProps> = ({ items }) => {
  return (
    <ul className="menu">
      {items.map((item) => (
        <li key={item.link}>
          <NavLink to={item.link}>{item.title}</NavLink>
        </li>
      ))}
      <ExtensionSlot name="top-nav" render={renderNavItems} />
    </ul>
  );
};

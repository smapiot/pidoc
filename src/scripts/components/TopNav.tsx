import * as React from 'react';
import { ExtensionSlot } from 'piral-core';
import { NavLink } from 'react-router-dom';
import { topNavItems } from '../sitemap';

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
  active?: boolean;
}

export const TopNav: React.FC<TopNavProps> = ({ active }) => {
  return (
    <ul className={active ? 'menu active' : 'menu'}>
      {topNavItems.map((item) => (
        <li key={item.link}>
          <NavLink to={item.link}>{item.title}</NavLink>
        </li>
      ))}
      <ExtensionSlot name="top-nav" render={renderNavItems} />
    </ul>
  );
};

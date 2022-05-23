import * as React from 'react';
import { ExtensionSlot } from 'piral-core';
import { NavLink } from 'react-router-dom';
import { LanguageItem, LanguageSelector } from './LanguageSelector';

function renderNavItems(items: Array<React.ReactNode>) {
  return (
    <>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </>
  );
}

export interface NavItem {
  link: string;
  title: string;
}

export interface TopNavProps {
  items: Array<NavItem>;
  languages: Array<LanguageItem>;
}

export const TopNav: React.FC<TopNavProps> = ({ items, languages }) => {
  return (
    <div className="menu">
      <LanguageSelector languages={languages} />
      {items.map((item) => (
        <div key={item.link}>
          <NavLink to={item.link}>{item.title}</NavLink>
        </div>
      ))}
      <ExtensionSlot name="top-nav" render={renderNavItems} />
    </div>
  );
};

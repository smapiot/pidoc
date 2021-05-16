import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { topNavItems } from '../sitemap';

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
    </ul>
  );
};

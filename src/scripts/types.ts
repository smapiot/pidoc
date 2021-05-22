import { FC } from 'react';

export interface LayoutProps {
  Footer: FC;
  Logo: FC;
  brandName: string;
}

export interface AppProps {
  layout: LayoutProps;
  Router: FC;
}

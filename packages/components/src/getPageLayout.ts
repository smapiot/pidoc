import { FC } from 'react';

let globalLayouts: Record<string, FC<any>> = {};

export function setPageLayouts(layouts: any) {
  globalLayouts = layouts;
}

export function getPageLayout(layoutName: string) {
  return globalLayouts[layoutName] || globalLayouts.default;
}

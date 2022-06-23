import * as React from 'react';
import { TiType, TiNode } from './types';

function getSuffix() {
  return `${~~(Math.random() * 10000)}`;
}

function getPrefix() {
  return `${~~(Math.random() * 12345)}`;
}

export function ma<T>(value: undefined | T | Array<T>) {
  if (Array.isArray(value)) {
    return value;
  } else if (value) {
    return [value];
  } else {
    return [];
  }
}

export function gid(node: TiType | TiNode) {
  return node.id && `ti-node-${node.name || 'id'}-${node.id}`;
}

export function keyOf(node: TiType) {
  return `${node.id || node.name || getPrefix()}-${getSuffix()}`;
}

export function gref(node: TiType) {
  return node && node.id && `#${gid(node)}`;
}

export function withSep(items: Array<React.ReactChild>, sep: string) {
  const newItems: Array<React.ReactChild> = [];

  items.forEach((item, i) => {
    newItems.push(item, <span key={i}>{sep}</span>);
  });

  newItems.pop();
  return newItems;
}

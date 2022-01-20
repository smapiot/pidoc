import * as React from 'react';
import { TiNode } from './types';
import { ma } from './utils';

export interface ModuleRendererProps {
  node: TiNode;
  render(child: TiNode): JSX.Element;
}

export const ModuleRenderer: React.FC<ModuleRendererProps> = ({ node, render }) => (
  <>{ma(node.children).map((child) => <div key={child.id}>{render(child)}</div>)}</>
);

import * as React from 'react';
import { Details } from './Details';
import { TypeRenderer } from './TypeRenderer';
import { ma } from './utils';
import { TiNode, TiKind } from './types';

export interface ObjectLiteralRendererProps {
  node: TiNode;
  render: (child: TiNode) => JSX.Element;
}

export const ObjectLiteralRenderer: React.FC<ObjectLiteralRendererProps> = ({ node, render }) => (
  <Details color="red" kind={node.kindString} description={node.comment} title={node.name}>
    {node.children ? (
      <ul className="interface-map">
        {ma(node.children).map(
          (child) =>
            child.kind === TiKind.Variable && (
              <li key={child.id}>
                <code>
                  {child.name}: {child.defaultValue}
                </code>
              </li>
            ),
        )}
      </ul>
    ) : node.type ? (
      <span className="block">
        <code>
          <TypeRenderer node={node.type} render={render} />
        </code>
      </span>
    ) : null}
  </Details>
);

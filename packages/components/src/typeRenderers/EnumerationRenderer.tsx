import * as React from 'react';
import { Details } from './Details';
import { Comment } from './Comment';
import { TiNode, TiKind } from './types';
import { ma } from './utils';

export interface EnumerationRendererProps {
  node: TiNode;
  render: (child: TiNode) => JSX.Element;
}

export const EnumerationRenderer: React.FC<EnumerationRendererProps> = ({ node }) => (
  <Details color="orange" description={node.comment} kind={node.kindString} title={node.name}>
    <ul className="interface-map">
      {ma(node.children).map(
        (child) =>
          child.kind === TiKind.EnumerationMember && (
            <li key={child.id}>
              <Comment comment={child.comment} />
              <span className="block">
                {child.defaultValue ? (
                  <code>
                    {child.name} = {child.defaultValue}
                  </code>
                ) : child.type?.type === 'literal' ? (
                  <code>
                    {child.name} = "{child.type.value}"
                  </code>
                ) : (
                  <code>{child.name}</code>
                )}
              </span>
            </li>
          ),
      )}
    </ul>
  </Details>
);

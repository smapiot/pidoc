import * as React from 'react';
import { TypeRenderer } from './TypeRenderer';
import { SignatureRenderer } from './SignatureRenderer';
import { TiNode, TiKind } from './types';
import { ma } from './utils';

export interface TypeLiteralRendererProps {
  node: TiNode;
  render: (child: TiNode) => JSX.Element;
}

export const TypeLiteralRenderer: React.FC<TypeLiteralRendererProps> = ({ node, render }) => (
  <ul className="interface-map">
    {ma(node.children).map((child) =>
      (child.kind === TiKind.Property || child.kind === TiKind.Variable ? (
        <li key={child.id}>
          <span className="block">{child.comment && child.comment.shortText}</span>
          <span className="block">
            <code>
              {child.name}
              {child.flags && child.flags.isOptional && '?'}: <TypeRenderer node={child.type} render={render} />
            </code>
          </span>
        </li>
      ) : child.kind === TiKind.Method ? (
        <li key={child.id}>
          <span className="block">{child.signatures[0].comment && child.signatures[0].comment.shortText}</span>
          <span className="block">
            <code>
              {child.name}
              {child.flags && child.flags.isOptional && '?'}
              <SignatureRenderer node={child.signatures[0]} render={render} />
            </code>
          </span>
        </li>
      ) : child.kind === TiKind.EnumerationMember ? (
        <li key={child.id}>
          <span className="block">{child.comment && child.comment.shortText}</span>
          <code>
            {child.name}: <TypeRenderer node={child.type} render={render} />
          </code>{' '}
        </li>
      ) : undefined),
    )}
    {ma(node.signatures).map(
      (child) =>
        child.kind === TiKind.CallSignature && (
          <li key={child.id}>
            <span className="block">{child.comment && child.comment.shortText}</span>
            <span className="block">
              <code>
                <SignatureRenderer node={child} render={render} />
              </code>
            </span>
          </li>
        ),
    )}
    {ma(node.indexSignature).map(
      (child) =>
        child.kind === TiKind.IndexSignature && (
          <li key={child.id}>
            <span className="block">{child.comment && child.comment.shortText}</span>
            <span className="block">
              <code>
                <SignatureRenderer node={child} render={render} brackets="[]" />
              </code>
            </span>
          </li>
        ),
    )}
  </ul>
);

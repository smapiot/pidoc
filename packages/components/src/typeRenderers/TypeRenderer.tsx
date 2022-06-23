import * as React from 'react';
import { withSep, gref, keyOf, ma } from './utils';
import { TiType, TiNode, TiKind } from './types';

export interface TypeRendererProps {
  node: TiType;
  render(child: TiNode): JSX.Element;
}

export interface TypeArgumentRendererProps {
  args?: Array<TiType>;
  render(child: TiNode): JSX.Element;
}

export interface TypeParameterRendererProps {
  args?: Array<TiNode>;
  render(child: TiNode): JSX.Element;
}

// tslint:disable-next-line
const defaultResult = null;

function convertParamToArg(param: TiNode): TiType {
  switch (param.kind) {
    case TiKind.TypeParameter:
      return {
        type: 'typeParameter',
        name: param.name,
      };
    default:
      return {
        type: 'unknown',
        name: param.name,
      };
  }
}

export const TypeArgumentRenderer: React.FC<TypeArgumentRendererProps> = ({ args, render }) =>
  (args && (
    <span>
      &lt;
      {withSep(
        ma(args).map((ta) => <TypeRenderer key={keyOf(ta)} render={render} node={ta} />),
        ', ',
      )}
      &gt;
    </span>
  )) ||
  defaultResult;

export const TypeParameterRenderer: React.FC<TypeParameterRendererProps> = ({ args, render }) => (
  <TypeArgumentRenderer render={render} args={args && ma(args).map(convertParamToArg)} />
);

export const TypeRenderer: React.FC<TypeRendererProps> = ({ node, render }) => {
  switch (node && node.type) {
    case 'intersection':
      return (
        <>
          {withSep(
            ma(node.types).map((t) => <TypeRenderer render={render} node={t} key={keyOf(t)} />),
            ' & ',
          )}
        </>
      );
    case 'union':
      return (
        <>
          {withSep(
            ma(node.types).map((t) => <TypeRenderer render={render} node={t} key={keyOf(t)} />),
            ' | ',
          )}
        </>
      );
    case 'array':
      return (
        <span>
          Array&lt;
          <TypeRenderer render={render} node={node.elementType} />
          &gt;
        </span>
      );
    case 'literal':
    case 'stringLiteral':
      return <span>"{node.value}"</span>;
    case 'reference':
      return (
        <>
          <a href={gref(node)} className="ref">
            {node.name}
          </a>
          {<TypeArgumentRenderer render={render} args={node.typeArguments} />}
        </>
      );
    case 'reflection':
      return node.declaration ? render(node.declaration) : <span>any</span>;
    case 'mapped':
      return (
        <span>
          [{node.parameter} in <TypeRenderer render={render} node={node.parameterType} />
          ]: <TypeRenderer render={render} node={node.templateType} />
        </span>
      );
    case 'typeOperator':
      return (
        <span>
          {node.operator} <TypeRenderer render={render} node={node.target} />
        </span>
      );
    case 'indexedAccess':
      return (
        <span>
          (<TypeRenderer render={render} node={node.objectType} />
          )[
          <TypeRenderer render={render} node={node.indexType} />]
        </span>
      );
    case 'unknown':
    case 'typeParameter':
    case 'inferred':
    case 'intrinsic':
      return <span>{node.name}</span>;
    case 'conditional':
      return (
        <span>
          <TypeRenderer render={render} node={node.checkType} /> extends{' '}
          <TypeRenderer render={render} node={node.extendsType} /> ?{' '}
          <TypeRenderer render={render} node={node.trueType} /> : <TypeRenderer render={render} node={node.falseType} />
        </span>
      );
    case 'tuple':
      return (
        <span>
          [
          {withSep(
            ma(node.elements).map((t) => <TypeRenderer render={render} node={t} key={keyOf(t)} />),
            ', ',
          )}
          ]
        </span>
      );
    case 'named-tuple-member':
      return (
        <span>
          {node.name}
          {node.isOptional ? '?' : ''}: <TypeRenderer render={render} node={node.element} />
        </span>
      );
    default:
      return (
        <span>
          <i>unknown</i>
        </span>
      );
  }
};

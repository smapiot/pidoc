export const enum TiKind {
  Root = 0,
  ExternalModule = 1,
  Placeholder1 = 2,
  Namespace = 4,
  Enumeration = 8,
  EnumerationMember = 16,
  Variable = 32,
  Function = 64,
  Class = 128,
  Interface = 256,
  Placeholder2 = 512,
  Property = 1024,
  Method = 2048,
  CallSignature = 4096,
  IndexSignature = 8192,
  Placeholder3 = 16384,
  Parameter = 32768,
  TypeLiteral = 65536,
  TypeParameter = 131072,
  ObjectLiteral = 2097152,
  TypeAlias = 4194304,
  Reference = 16777216,
}

export type ColorKind = 'primary' | 'blue' | 'green' | 'pink' | 'orange' | 'purple' | 'red';

export type TiId = number;

export interface TiType {
  type: string;
  id?: TiId;
  name?: string;
  isOptional?: boolean;
  element?: TiType;
  value?: string;
  types?: Array<TiType>;
  elementType?: TiType;
  typeArguments?: Array<TiType>;
  declaration?: TiNode;
  parameter?: string;
  parameterType?: TiType;
  operator?: string;
  templateType?: TiType;
  target?: TiType;
  objectType?: TiType;
  indexType?: TiType;
  elements?: Array<TiType>;
  checkType?: TiType;
  extendsType?: TiType;
  trueType?: TiType;
  falseType?: TiType;
}

export interface TiComment {
  shortText: string;
  tags?: Array<{
    tag: string;
    text: string;
  }>;
}

export interface TiNode {
  id: TiId;
  name: string;
  kind: TiKind;
  defaultValue?: string;
  kindString?: string;
  sources?: Array<{
    fileName: string;
    line: number;
    character: number;
  }>;
  children: Array<TiNode>;
  flags: {
    isExported?: boolean;
    isOptional?: boolean;
    isConst?: boolean;
    isRest?: boolean;
  };
  signatures?: Array<TiNode>;
  indexSignature?: Array<TiNode>;
  typeParameter?: Array<TiNode>;
  type?: TiType;
  parameters?: Array<TiNode>;
  comment?: TiComment;
  groups?: Array<{
    title: string;
    kind: TiKind;
    children: Array<TiId>;
  }>;
}

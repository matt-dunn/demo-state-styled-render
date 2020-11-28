/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

import { State } from "./hooks";

export const NODE_TYPE_FRAGMENT = "#fragment";

export type AnyFunc = (...args: any[]) => any;

export type Key = string | number | null;

export type NodeType<P = any> =
  | {
      [K in keyof JSX.IntrinsicElements]: P extends JSX.IntrinsicElements[K]
        ? K
        : never;
    }[keyof JSX.IntrinsicElements]
  | typeof NODE_TYPE_FRAGMENT
  | FC<P>;

type Ref = (el: HTMLElement) => void;

type BaseProps = {
  style?: {
    [P in keyof CSSStyleDeclaration]: CSSStyleDeclaration[P];
  };
  ref?: Ref;
};

export type Node<P = any> = {
  type: NodeType<P>;
  props: P & BaseProps;
  children?: Children;
  key: Key;
  hooks?: State<any>;
};

export type Children<P = any> = AnyNode<P>[];

export type AnyNode<P = any> = Node<P> | string | number | null | false;

export type FC<P = any> = (props: P) => Node<P> | null;

export type Component<P = any> = (props: P) => AnyNode<P>;

export interface HTMLElementMap extends HTMLElement {
  [key: string]: any;
}

export type Props<P = any> = {
  [K in keyof P]: P[K];
};

export type AnyCallback = (() => void) | void;

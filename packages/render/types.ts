/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

import { State } from "./hooks";
import { LooseRef } from "./utils";

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

type Ref<T> = (value: T) => void;

export type BaseProps<T = any> = {
  style?: {
    [P in keyof CSSStyleDeclaration]: CSSStyleDeclaration[P];
  };
  ref?: Ref<T> | LooseRef<T>;
};

export type Node<P = any> = {
  type: NodeType<P>;
  props: P & BaseProps<P>;
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

export type DOMElement = HTMLElementMap | SVGElement;

export type AnyDOMElement = DOMElement | Text;

export type NamespaceURI = string | null;

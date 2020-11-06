/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

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

export type Node<P = Record<string, any>> = {
  type: NodeType<P>;
  props: P & BaseProps;
  children?: Children;
  key: Key;
};

export type Children<P = any> = AnyNode<P>[];

export type AnyNode<P = any> = Node<P> | string;

export type FC<P = any> = (props: P) => Node<P>;

export interface HTMLElementMap extends HTMLElement {
  [key: string]: any;
}

export type Props = {
  [key: string]: any;
};

export type AnyCallback = (() => void) | void;

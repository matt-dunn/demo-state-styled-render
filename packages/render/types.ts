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

export type Node<P = any> = {
  type: NodeType<P>;
  props: P;
  children?: Children;
  key: Key;
};

export type Children<P = any> = Node<P>[];

export type AnyNode = Node | string | number;

export type FC<P = any, N = Node<P>> = (props: P) => N;

export interface HTMLElementMap extends HTMLElement {
  [key: string]: any;
}

export type Props = {
  [key: string]: any;
};

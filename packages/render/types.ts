/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

export type AnyFunc = (...args: any[]) => any;

export type Key = string | number | null;

export type Children<T = string> = Node<T>[];

export type NodeBase<T = string, P = any> = {
  type: T;
  props: P;
};

export type Node<T = string, P = any> = {
  children?: Children<T>;
  key: Key;
} & NodeBase<T, P>;

export type FC<P = any, N = Node> = (props: P) => N;

export type NodeType<P = any> = string | FC<P>;

export interface HTMLElementMap extends HTMLElement {
  [key: string]: any;
}

export type Props = {
  [key: string]: any;
};
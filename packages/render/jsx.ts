/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

import {
  Children,
  Key,
  Node,
  NODE_TYPE_FRAGMENT,
  NodeType,
  Props,
} from "./types";

const flattenChildren = (children: Children | Children[]): Children =>
  (children.length === 1 && Array.isArray(children[0]) && children[0]
    ? children[0]
    : children) as Children;

export const jsxFrag = ({
  children,
  ...props
}: {
  children: Children;
}): (Node & { key: Key }) | null => ({
  type: NODE_TYPE_FRAGMENT,
  props,
  children: Array.isArray(children) ? children : [children],
  key: null,
});

export const jsx = (
  type: NodeType,
  props: Props = {},
  ...children: Children | Children[]
): Node | null => {
  const { key, ...rest } = props || {};

  return type === jsxFrag
    ? type({
        ...rest,
        children: flattenChildren(children),
        key,
      })
    : {
        type,
        props: rest,
        children: flattenChildren(children),
        key: key || null,
      };
};

(global as any).jsxFrag = jsxFrag;
(global as any).jsx = jsx;

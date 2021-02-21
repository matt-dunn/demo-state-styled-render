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

const flattenChildren = (children: Children): Children =>
  children.reduce(
    (children, child) =>
      Array.isArray(child) ? [...children, ...child] : [...children, child],
    [] as Children
  );

export const jsxFrag = ({
  children,
  ...props
}: {
  children: Children;
}): (Node & { key: Key }) | null => ({
  type: NODE_TYPE_FRAGMENT,
  props,
  children: flattenChildren(Array.isArray(children) ? children : [children]),
  key: null,
});

export const jsx = (
  type: NodeType,
  props: Props = {},
  ...children: Children
): Node | null => {
  const { key, ...rest } = props || {};

  return type === jsxFrag
    ? type({
        ...rest,
        children,
      })
    : {
        type,
        props: rest,
        children,
        key: key || null,
      };
};

(global as any).jsxFrag = jsxFrag;
(global as any).jsx = jsx;

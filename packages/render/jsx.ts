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

export const jsx = (
  type: NodeType,
  props: Props = {},
  ...children: Children
): Node => {
  const { key, ...rest } = props || {};

  return typeof type === "function"
    ? type({
        ...rest,
        children: children?.length === 1 ? children[0] : children,
        key,
      })
    : { type, props: rest, children, key };
};

export const jsxFrag = ({
  children,
  ...props
}: {
  children: Children;
}): Node & { key: Key } => ({
  type: NODE_TYPE_FRAGMENT,
  props: props,
  children: children,
  key: null,
});

(global as any).jsx = jsx;
(global as any).jsxFrag = jsxFrag;

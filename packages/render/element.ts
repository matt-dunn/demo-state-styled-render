/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

import {
  AnyNode,
  Children,
  Key,
  Node,
  NODE_TYPE_FRAGMENT,
  NodeType,
  Props,
} from "./types";
import { isNode } from "./utils";
import { setAttributes, updateAttributes } from "./attributes";

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

export const createElement = (
  type: NodeType,
  props: Props = {},
  children?: Children | Node
): Node => {
  if (Array.isArray(children)) {
    return jsx(type, props, ...children);
  } else if (children) {
    return jsx(type, props, children);
  } else {
    return jsx(type, props);
  }
};

const createDocumentElement = (node: AnyNode): HTMLElement | Text => {
  if (isNode(node) && typeof node.type === "string") {
    const element = document.createElement(node.type);

    setAttributes(element, node?.props);

    flattenChildren(node.children)
      .map(createDocumentElement)
      .forEach(element.appendChild.bind(element));

    return element;
  } else if (typeof node === "string" || typeof node === "number") {
    return document.createTextNode(node.toString());
  }

  throw new TypeError(
    `Unable to render invalid node ${JSON.stringify(node).substr(0, 20)}`
  );
};

const hasChanged = (node: AnyNode, prevNode: AnyNode) =>
  typeof node !== typeof prevNode ||
  (typeof node === "string" && node !== prevNode) ||
  (isNode(node) && node.type) !== (isNode(prevNode) && prevNode.type);

const updateChildren = (
  element: HTMLElement,
  children: Children,
  prevChildren: Children,
  index: number
) => {
  const nodeChildrenLength = children.length;
  const prevNodeChildrenLength = prevChildren.length;
  for (
    let childIndex = 0;
    childIndex < nodeChildrenLength || childIndex < prevNodeChildrenLength;
    childIndex++
  ) {
    updateTree(
      element.childNodes[index] as HTMLElement,
      children[childIndex],
      prevChildren[childIndex],
      childIndex
    );
  }
};

const flattenChildren = (children: Children = []): Children =>
  children.reduce((children, child) => {
    if (child.type === NODE_TYPE_FRAGMENT) {
      return [...children, ...flattenChildren(child.children)];
    }
    return [...children, child];
  }, [] as Children);

export const updateTree = (
  element: HTMLElement,
  node: Node,
  prevNode?: Node,
  index = 0
) => {
  if (prevNode === undefined) {
    element.appendChild(createDocumentElement(node));
  } else if (node === undefined) {
    element.removeChild(element.childNodes[index]);
  } else if (hasChanged(node, prevNode)) {
    element.replaceChild(
      createDocumentElement(node),
      element.childNodes[index]
    );
  } else if (isNode(node)) {
    updateAttributes(
      element.childNodes[index] as HTMLElement,
      node.props,
      prevNode.props
    );

    updateChildren(
      element,
      flattenChildren(node.children),
      flattenChildren(prevNode.children),
      index
    );
  } else if (element.childNodes[index].nodeValue !== node) {
    element.childNodes[index].nodeValue = node;
  }
};

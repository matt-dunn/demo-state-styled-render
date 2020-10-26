/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

import { Children, Key, Node, NodeType, Props } from "./types";
import { isNode } from "./utils";
import { setAttributes, updateAttributes } from "./attributes";

const NODE_TYPE_FRAGMENT = "#fragment";

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

const createDocumentElement = (node: Node): HTMLElement | Text => {
  if (isNode(node)) {
    const el = document.createElement(node.type);

    setAttributes(el, node?.props);

    flattenChildren(node.children || [])
      .map((node) => {
        if (Array.isArray(node)) {
          return node.map(createDocumentElement);
        }
        return createDocumentElement(node);
      })
      .forEach((element) => {
        if (Array.isArray(element)) {
          element.forEach(el.appendChild.bind(el));
        } else {
          el.appendChild(element);
        }
      });

    return el;
  }

  return document.createTextNode(node);
};

const hasChanged = (node: Node | string, prevNode: Node | string) =>
  typeof node !== typeof prevNode ||
  (typeof node === "string" && node !== prevNode) ||
  (isNode(node) && node.type) !== (isNode(prevNode) && prevNode.type);

const updateChildren = (
  el: HTMLElement,
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
    if (Array.isArray(children[childIndex])) {
      updateChildren(
        el,
        (children[childIndex] as unknown) as Children,
        (prevChildren[childIndex] as unknown) as Children,
        childIndex
      );
    } else {
      updateTree(
        el.childNodes[index] as HTMLElement,
        children[childIndex],
        prevChildren[childIndex],
        childIndex
      );
    }
  }
};

const flattenChildren = (children: Children): Children =>
  children.reduce((children, child) => {
    if (child.type === NODE_TYPE_FRAGMENT) {
      return [...children, ...flattenChildren(child.children || [])];
    }
    return [...children, child];
  }, [] as Children);

export const updateTree = (
  el: HTMLElement,
  node: Node,
  prevNode?: Node,
  index = 0
) => {
  if (prevNode === undefined) {
    el.appendChild(createDocumentElement(node));
  } else if (node === undefined) {
    el.removeChild(el.childNodes[index]);
  } else if (hasChanged(node, prevNode)) {
    el.replaceChild(createDocumentElement(node), el.childNodes[index]);
  } else if (isNode(node)) {
    updateAttributes(
      el.childNodes[index] as HTMLElement,
      node.props,
      prevNode.props
    );

    updateChildren(
      el,
      flattenChildren(node.children || []),
      flattenChildren(prevNode.children || []),
      index
    );
  } else if (el.childNodes[index].nodeValue !== node) {
    el.childNodes[index].nodeValue = node;
  }
};

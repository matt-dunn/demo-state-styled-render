/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

import {
  AnyNode,
  Children,
  Node,
  NODE_TYPE_FRAGMENT,
  NodeType,
  Props,
} from "./types";
import { isNode } from "./utils";
import { setAttributes, updateAttributes } from "./attributes";
import { jsx } from "./jsx";

export const createElement = (
  type: NodeType,
  props: Props = {},
  children?: Children | Node
): Node<any> => {
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

    node?.props?.ref?.(element);

    return element;
  }

  return document.createTextNode(node.toString());
};

const hasChanged = (node: AnyNode, prevNode: AnyNode) =>
  typeof node !== typeof prevNode ||
  (isNode(node) && node.type) !== (isNode(prevNode) && prevNode.type);

const updateChildren = (
  element: HTMLElement,
  children: Children = [],
  prevChildren: Children = [],
  index: number
) => {
  const nodeChildrenLength = children.length;
  const prevNodeChildrenLength = prevChildren.length;
  const nodes: Children = [];

  for (
    let childIndex = 0;
    childIndex < nodeChildrenLength || childIndex < prevNodeChildrenLength;
    childIndex++
  ) {
    const node = updateTree(
      element.childNodes[index] as HTMLElement,
      children[childIndex],
      prevChildren[childIndex],
      childIndex
    );

    if (node !== undefined) {
      nodes.push(node);
    }
  }

  return nodes;
};

const flattenChildren = (children: Children = []): Children =>
  children.reduce((children, child) => {
    if (isNode(child) && child.type === NODE_TYPE_FRAGMENT) {
      return [...children, ...flattenChildren(child.children)];
    }
    return [...children, child];
  }, [] as Children);

const updateNode = (
  element: HTMLElement,
  node: AnyNode,
  prevNode?: AnyNode,
  index = 0
): AnyNode | undefined =>
  (isNode(node) && {
    ...node,
    children: updateChildren(
      element,
      flattenChildren(node.children),
      (isNode(prevNode) && flattenChildren(prevNode?.children)) || undefined,
      index
    ),
  }) ||
  node;

export const updateTree = (
  element: HTMLElement,
  node: AnyNode,
  prevNode?: AnyNode,
  index = 0
): AnyNode | undefined => {
  if (isNode(node) && typeof node?.type === "function") {
    // @TODO: process hooks - would add support for unmounting effects etc.
    // activeHooks.beginCollect();

    const componentNode = node.type({
      ...node.props,
      children: node.children?.length === 1 ? node.children[0] : node.children,
    });

    // const componentStates = activeHooks.collect();
    // if (componentStates.length > 0) {
    //   componentStates.byType<UseEffect>(useEffect).forEach((s) => s.callback());
    //
    //   console.log("----COLLECTED", node.type.name, componentStates);
    // }

    const componentTree = updateTree(
      element,
      componentNode,
      isNode(prevNode) ? prevNode?.children?.[0] : prevNode,
      index
    );

    return {
      ...node,
      children: componentTree ? [componentTree] : [],
    };
  }

  if (prevNode === undefined) {
    element.appendChild(createDocumentElement(node));
  } else if (node === undefined) {
    // @TODO: unmount and mounted components...!
    element.removeChild(element.childNodes[index]);
    return undefined;
  } else if (hasChanged(node, prevNode)) {
    element.replaceChild(
      createDocumentElement(node),
      element.childNodes[index]
    );

    return updateNode(element, node, undefined, index);
  } else if (isNode(node)) {
    updateAttributes(
      element.childNodes[index] as HTMLElement,
      node.props,
      isNode(prevNode) ? prevNode.props : undefined
    );
  } else if (element.childNodes[index].nodeValue !== node) {
    element.childNodes[index].nodeValue = node.toString();
  }

  return updateNode(element, node, prevNode, index);
};

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
import activeHooks, { useError, UseError } from "./hooks";

type Context = {
  errorHook?: UseError;
};

export const createElement = (
  type: NodeType,
  props: Props = {},
  children?: Children | Node
): Node<any> | null => {
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

  return document.createTextNode(node?.toString() || "");
};

const hasChanged = (node: AnyNode, prevNode: AnyNode) =>
  typeof node !== typeof prevNode ||
  (isNode(node) && node.type) !== (isNode(prevNode) && prevNode.type);

const updateChildren = (
  element: HTMLElement,
  children: Children = [],
  prevChildren: Children = [],
  index: number,
  context?: Context
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
      childIndex,
      context
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
  index = 0,
  context?: Context
): AnyNode | undefined =>
  (isNode(node) && {
    ...node,
    children: updateChildren(
      element,
      flattenChildren(node.children),
      (isNode(prevNode) && flattenChildren(prevNode?.children)) || undefined,
      index,
      context
    ),
  }) ||
  node;

const renderComponentNode = (node: Node, context?: Context) => {
  try {
    if (isNode(node) && typeof node?.type === "function") {
      return (
        node.type({
          ...node.props,
          children:
            node.children?.length === 1 ? node.children[0] : node.children,
        }) || " " // Return a placeholder if null returned from component
      );
    } else {
      return node;
    }
  } catch (ex) {
    if (!context?.errorHook) {
      throw new TypeError(ex);
    }

    console.error(ex);

    context?.errorHook?.handleError(ex);

    return null;
  }
};

export const updateTree = (
  element: HTMLElement,
  node: AnyNode,
  prevNode?: AnyNode,
  index = 0,
  context?: Context
): AnyNode | undefined => {
  if (isNode(node) && typeof node?.type === "function") {
    // @TODO: process hooks - would add support for unmounting effects etc.
    activeHooks.beginCollect();

    const componentNode = renderComponentNode(node, context);

    const errorHooks = activeHooks.collect().byType<UseError>(useError);

    if (errorHooks.length > 1) {
      throw new TypeError("Invalid error hook tree");
    }

    const componentTree = updateTree(
      element,
      componentNode,
      isNode(prevNode) ? prevNode?.children?.[0] : prevNode,
      index,
      {
        ...context,
        errorHook: errorHooks.length > 0 ? errorHooks[0] : context?.errorHook,
      }
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

    return updateNode(element, node, undefined, index, context);
  } else if (isNode(node)) {
    updateAttributes(
      element.childNodes[index] as HTMLElement,
      node.props,
      isNode(prevNode) ? prevNode.props : undefined
    );
  } else if (element.childNodes[index].nodeValue !== node) {
    element.childNodes[index].nodeValue = node?.toString() || "";
  }

  return updateNode(element, node, prevNode, index, context);
};

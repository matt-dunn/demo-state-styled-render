/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

import {
  AnyDOMElement,
  AnyNode,
  BaseProps,
  Children,
  DOMElement,
  NamespaceURI,
  Node,
  NODE_TYPE_FRAGMENT,
  NodeType,
  Props,
} from "./types";
import { getElementNamespaceURI, isNode } from "./utils";
import { setAttributes, updateAttributes } from "./attributes";
import { jsx } from "./jsx";
import activeHooks, { State, useError, UseError } from "./hooks";
import { useContextState, UseContextState } from "./hooks/useContextState";

type Context = {
  parent?: Context;
  hooks: State<any>;
  contexts: UseContextState<any>[];
  namespaceURI: NamespaceURI;
};

export const createElement = (
  type: NodeType,
  props: Props = {},
  children?: Children | Node
): Node | null => {
  if (Array.isArray(children)) {
    return jsx(type, props, ...children);
  } else if (children) {
    return jsx(type, props, children);
  } else {
    return jsx(type, props);
  }
};

const getTextNodeValue = (node: AnyNode): string =>
  typeof node === "string" || typeof node === "number" ? node.toString() : "";

const createDocumentElement = (
  node: AnyNode<BaseProps<DOMElement>>,
  namespaceURI: NamespaceURI
): AnyDOMElement => {
  if (isNode(node) && typeof node.type === "string") {
    const element = namespaceURI
      ? (document.createElementNS(namespaceURI, node.type) as HTMLElement)
      : document.createElement(node.type);

    setAttributes(element, node?.props);

    if (typeof node?.props?.ref === "function") {
      node.props.ref(element);
    } else if (node?.props?.ref) {
      node.props.ref.current = element;
    }

    return element;
  }

  return document.createTextNode(getTextNodeValue(node));
};

const hasChanged = (node: AnyNode, prevNode: AnyNode) =>
  typeof node !== typeof prevNode ||
  (isNode(node) && node.type) !== (isNode(prevNode) && prevNode.type);

const updateChildren = (
  element: DOMElement,
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
      element.childNodes[index] as DOMElement,
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
  element: DOMElement,
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

const handleError = (
  ex: Error,
  context?: Context,
  handled = false
): Partial<Error> | null => {
  const errorHooks = context?.hooks?.byType<UseError>(useError);

  if (errorHooks && errorHooks.length > 1) {
    throw new TypeError("Invalid error hook tree");
  }

  if (errorHooks && errorHooks.length > 0) {
    const error = errorHooks[0].handleError(ex);

    if (error && context?.parent) {
      return handleError(error as Error, context.parent, true);
    }

    console.warn("", ex);

    return null;
  }

  if (context?.parent) {
    return handleError(ex, context.parent, handled);
  }

  if (!handled) {
    throw ex;
  } else {
    console.warn(ex);
  }

  return null;
};

const renderComponentNode = (node: Node, context?: Context): AnyNode => {
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
    handleError(ex, context);
    return null;
  }
};

const cleanupHooks = (hooks?: State<any>) => {
  if (hooks && hooks?.length > 0) {
    hooks.forEach((hook) => hook._value?.cleanup && hook._value.cleanup());

    activeHooks.removeHooks(hooks.length);
  }
};

const cleanupNode = (node: AnyNode) => {
  if (isNode(node)) {
    cleanupHooks(node.hooks);

    node.children?.forEach((child) => cleanupNode(child));
  }
};

export const updateTree = (
  element: DOMElement,
  node: AnyNode,
  prevNode?: AnyNode,
  index = 0,
  context?: Context
): AnyNode | undefined => {
  // @TODO: temp workaround for root fragment nodes. This needs to process the fragment children on the current element managing the index correctly...
  if (isNode(node) && node.type === NODE_TYPE_FRAGMENT) {
    node.type = "div";
    node.props["data-type"] = NODE_TYPE_FRAGMENT;
  }

  if (isNode(node) && node?.type === "script") {
    if (process.env.NODE_ENV !== "production") {
      console.warn("Script element found in tree and removed", node);
    }
    node = "";
  }

  const namespaceURI =
    getElementNamespaceURI(node) ?? context?.namespaceURI ?? null;

  if (isNode(node) && typeof node?.type === "function") {
    if (!prevNode || hasChanged(node, prevNode)) {
      activeHooks.setInsertMode(true);
    } else {
      activeHooks.setInsertMode(false);
    }

    activeHooks.beginCollect({
      contexts: context?.contexts,
    });

    const componentNode = renderComponentNode(node, context);

    const componentHooks = activeHooks.collect();

    const componentTree = updateTree(
      element,
      componentNode,
      isNode(prevNode) ? prevNode?.children?.[0] : prevNode,
      index,
      {
        parent: context,
        hooks: componentHooks,
        contexts: [
          ...componentHooks.byType<UseContextState<any>>(useContextState),
          ...(context?.contexts || []),
        ],
        namespaceURI:
          getElementNamespaceURI(componentNode) ??
          context?.namespaceURI ??
          null,
      }
    );

    return {
      ...node,
      children: componentTree ? [componentTree] : [],
      hooks: componentHooks,
    };
  }

  if (prevNode === undefined) {
    element.appendChild(createDocumentElement(node, namespaceURI));
  } else if (node === undefined) {
    cleanupNode(prevNode);

    element.removeChild(element.childNodes[index]);
    return undefined;
  } else if (hasChanged(node, prevNode)) {
    cleanupNode(prevNode);

    element.replaceChild(
      createDocumentElement(node, namespaceURI),
      element.childNodes[index]
    );

    return updateNode(element, node, undefined, index, context);
  } else if (isNode(node)) {
    updateAttributes(
      element.childNodes[index] as DOMElement,
      node.props,
      isNode(prevNode) ? prevNode.props : undefined
    );
  } else if (element.childNodes[index].nodeValue !== node) {
    element.childNodes[index].nodeValue = getTextNodeValue(node);
  }

  return updateNode(
    element,
    node,
    prevNode,
    index,
    context && {
      ...context,
      namespaceURI,
    }
  );
};

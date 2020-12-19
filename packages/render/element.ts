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
  hooks?: State<any>;
  contexts?: UseContextState<any>[];
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
  // node !== null && prevNode === null ||
  // node === null && prevNode !== null ||
  // node !== prevNode ||
  (typeof node === "string" && node !== prevNode) ||
  (isNode(node) && node.type) !== (isNode(prevNode) && prevNode.type);

const flattenChildren = (children: Children = []): Children =>
  children.reduce((children, child) => {
    if (isNode(child) && child.type === NODE_TYPE_FRAGMENT) {
      return [...children, ...flattenChildren(child.children)];
    }
    // if (isNode(child) && typeof child.type === "function" && child.children[0]?.type === NODE_TYPE_FRAGMENT) {
    //   return [...children,  ...flattenChildren(child.children[0]?.children)];
    // }
    return [...children, child];
  }, [] as Children);

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
        })
        // Return a placeholder if null returned from component
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

const exec = (node, prevNode, index, context) => {
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

  return {
    node: {
      ...node,
      // ...componentNode,
      children: componentNode === null ?  null : flattenChildren(Array.isArray(componentNode) ? componentNode : [componentNode])// : [],
      // children: Array.isArray(componentNode) ? componentNode : [componentNode]// : [],
    },
    context: {
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
  }
}

export const updateTreeChildren = (
  element: AnyDOMElement,
  node: AnyNode,
  prevNode?: AnyNode,
  index = 0,
  context?: Context,
  o= 0
): AnyNode => {
  if (isNode(node)) {
    let offset = 0

    const c = node.children?.filter(x => x).map((child, i) => {
      const prevChild = prevNode?.children?.[i] || undefined;
      // if (hasChanged(node, prevNode)) {
      //   prevChild = undefined;
      // }
      if (isNode(child) && child?.type === NODE_TYPE_FRAGMENT) {//} || isNode(prevChild) && prevChild?.type === NODE_TYPE_FRAGMENT) {
        // child.type = "div";
        // const xxx = flattenChildren(child?.children);
        // const xxx2 = flattenChildren(prevChild?.children);
        const xxx = flattenChildren(child?.children);
        const xxx2 = flattenChildren(prevChild?.children);

        console.error(child, prevChild, xxx?.length , xxx2?.length)

        const xx = updateTreeChildren(
          element,
          isNode(child) ? {
            ...child,
            children: xxx,
          } : node,
          // child,
          // prevChild,
          isNode(prevChild) ? {
            ...prevChild,
            children: xxx2
          } : prevChild,
          index + i + offset,
          context,
        )

        // if (xxx.length)
        offset += xxx.length - 1
        return xx;
      }

      // if (isNode(prevChild) && prevChild?.type === NODE_TYPE_FRAGMENT) {//} || isNode(prevChild) && prevChild?.type === NODE_TYPE_FRAGMENT) {
      //   // child.type = "div";
      //   // const xxx = flattenChildren(child?.children);
      //   // const xxx2 = flattenChildren(prevChild?.children);
      //   const xxx = flattenChildren(child?.children);
      //   const xxx2 = flattenChildren(prevChild?.children);
      //
      //   console.error(child, prevChild, xxx?.length , xxx2?.length)
      //
      //   const xx = updateTreeChildren(
      //     element,
      //     // isNode(child) ? {
      //     //   ...child,
      //     //   children: xxx,
      //     // } : node,
      //     child,
      //     // prevChild,
      //     isNode(prevChild) ? {
      //       ...prevChild,
      //       children: xxx2
      //     } : prevChild,
      //     index + i + offset,
      //     context,
      //   )
      //
      //   // if (xxx.length)
      //   offset += xxx.length - 1
      //   return xx;
      // }

      if (isNode(child) && typeof child?.type === "function") {
        const x = exec(child, prevChild, index, context);

        const xxx =  updateTreeChildren(
          element,
          x.node,
          prevChild,
          index + i + offset,
          x.context,
        );

         // console.error(x)
        // offset += (x.node.children?.[0]?.children?.length - 1) ?? 0
        return xxx;
      } else {
        const e = updateTree(
          element,
          child,
          prevChild,
          index + i + offset,
          context,
        )
        if (e && isNode(child)) {
          return updateTreeChildren(
            e,
            child,
            prevChild,
            0,
            context,
          )
        }
      }
      return child
    }) || [])

    return {
      ...node,
      children: c
    };
  }

  return node;
}

export const updateTree = (
  element: AnyDOMElement,
  node: AnyNode,
  prevNode?: AnyNode,
  index = 0,
  context?: Context
): AnyDOMElement | undefined => {
  if (isNode(node) && node?.type === "script") {
    if (process.env.NODE_ENV !== "production") {
      console.warn("Script element found in tree and removed", node);
    }
    node = "";
  }

  const namespaceURI =
    context?.namespaceURI ?? getElementNamespaceURI(node) ?? null;

  let xx = element.childNodes[index] as AnyDOMElement;

  if (prevNode === undefined) {
    xx = createDocumentElement(node, namespaceURI);
    element.appendChild(xx);
    // element.insertBefore(xx, element.childNodes[index + 1])
  } else if (node === undefined) {
    cleanupNode(prevNode);

    element.removeChild(element.childNodes[index]);
    xx = undefined
  } else if (hasChanged(node, prevNode)) {
    cleanupNode(prevNode);

    xx = createDocumentElement(node, namespaceURI)
    element.replaceChild(
      xx,
      element.childNodes[index]
    );
  } else if (isNode(node)) {
    if (element.childNodes[index])
    updateAttributes(
      element.childNodes[index] as DOMElement,
      node.props,
      isNode(prevNode) ? prevNode.props : undefined
    );
  } else if (element.childNodes[index]?.nodeValue !== node) {
    try {
      element.childNodes[index].nodeValue = getTextNodeValue(node);
    } catch (ex) {
      console.error(ex, element, node,index)
    }
  }

  return xx;
};

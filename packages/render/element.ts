/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

import {Children, Key, Node, NodeType, Props} from "./types";
import {isNode} from "./utils";
import {setAttributes, updateAttributes} from "./attributes";

export const createNode = (type: NodeType, props: Props, ...children: Node[]): Node => typeof type === "function" ? type({...props, children}) : {type, props, children};

export const createFragment = ({children, ...props}: {children: Node[]}): Node & {key: Key} => ({type: "#fragment", props: props, children:children, key: null});

(global as any).createElement = createNode;
(global as any).createFragment = createFragment;

export {createNode as createElement};
export {createFragment as Fragment};

const createElement = (node: Node): (HTMLElement | Text) => {
  if (isNode(node)) {
    const el = document.createElement(node.type);

    setAttributes(el, node?.props);

    flattenChildren(node.children || [])
      .map(node => {
        if (Array.isArray(node)) {
          return node.map(createElement);
        }
        return createElement(node);
      })
      .forEach(element => {
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
  typeof node !== typeof prevNode
  || typeof node === "string" && node !== prevNode
  || (isNode(node) && node.type) !== (isNode(prevNode) && prevNode.type);

const updateChildren = (el: HTMLElement, children: Children, prevChildren: Children, index: number) => {
  const nodeChildrenLength = children.length;
  const prevNodeChildrenLength = prevChildren.length;
  for (let childIndex = 0; childIndex < nodeChildrenLength || childIndex < prevNodeChildrenLength; childIndex++) {
    if (Array.isArray(children[childIndex])) {
      updateChildren(el, children[childIndex] as unknown as Children, prevChildren[childIndex] as unknown as Children, childIndex);
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

const flattenChildren = (children: Children): Children => children.reduce((children, child) => {
  if (child.type === "#fragment") {
    return [
      ...children,
      ...flattenChildren(child.children || [])
    ];
  }
  return [
    ...children,
    child
  ];
}, [] as Children);

export const updateTree = (el: HTMLElement, node: Node, prevNode?: Node, index = 0) => {
  if (prevNode === undefined) {
    el.appendChild(createElement(node));
  } else if (node === undefined) {
    el.removeChild(el.childNodes[index]);
  } else if (hasChanged(node, prevNode)) {
    el.replaceChild(createElement(node), el.childNodes[index]);
  } else if (isNode(node)) {
    updateAttributes(
      el.childNodes[index] as HTMLElement,
      node.props,
      prevNode.props
    );

    updateChildren(el, flattenChildren(node.children || []), flattenChildren(prevNode.children || []), index);
  } else if (el.childNodes[index].nodeValue !== node) {
    el.childNodes[index].nodeValue = node;
  }
};

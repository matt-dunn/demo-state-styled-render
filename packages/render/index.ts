/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

import {Actions, Store} from "../state";

type AnyFunc = (...args: any[]) => any;

type Children<T = string> = Node<T>[];

type NodeBase<T = string, P = any> = {
  type: T;
  props: P;
}

export type Node<T = string, P = any> = {
  children?: Children<T>;
} & NodeBase<T, P>

export type FC<P = any, N = Node> = (props: P) => N;

type NodeType<P = any> = string | FC<P>;

type Key = string | number | null;

interface HTMLElementMap extends HTMLElement{
  [key: string]: any
}

type Props = {
  [key: string]: any
};

export const createNode = (type: NodeType, props: Props, ...children: Node[]): Node => typeof type === "function" ? type({...props, children}) : {type, props, children};

export const createFragment = ({children, ...props}: {children: Node[]}): Node & {key: Key} => ({type: "#fragment", props: props, children:children, key: null});

(global as any).createElement = createNode;
(global as any).createFragment = createFragment;

export {createNode as createElement};
export {createFragment as Fragment};

type MappedProps = {
  [key: string]: string;
}

const mappedProps: MappedProps = {
  "className": "class",
  "htmlFor": "for",
};

const propertyMap = (name: string) => {
  if (mappedProps[name]) {
    return mappedProps[name];
  } else if (/^on/.test(name)) {
    return name.toLowerCase();
  }

  return name;
};

const isNode = (node: any): node is Node => typeof node?.type === "string" && Object.prototype.hasOwnProperty.call(node, "props");

const setAttribute = (el: HTMLElementMap, name: string, value: string | AnyFunc) => {
  const propertyName = propertyMap(name);

  if (typeof value === "function") {
    el[propertyName] = value;
  } else {
    if (value) {
      el.setAttribute(propertyName, value);
    } else {
      el.removeAttribute(propertyName);
    }
    el[propertyName] = value;
  }
};

const setAttributes = (el: HTMLElement, props: Props) =>
  Object.keys(props || {}).forEach(name => setAttribute(el, name, props[name]));

const removeAttribute = (el: HTMLElement, name: string) =>
  el.removeAttribute(propertyMap(name));

const updateAttribute = (el: HTMLElement, name: string, value: string, prevValue: string) => {
  if (value !== prevValue) {
    if (value === undefined) {
      removeAttribute(el, name);
    } else if (!prevValue || value !== prevValue) {
      setAttribute(el, name, value);
    }
  }
};

const updateAttributes = (el: HTMLElement, props: Props, prevProps: Props = {}) =>
  Object.keys({...props, ...prevProps}).forEach(name => updateAttribute(el, name, props[name], prevProps[name]));

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

const updateTree = (el: HTMLElement, node: Node, prevNode?: Node, index = 0) => {
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

type UseState = <S = any>(initialState: S) => [S, (newValue: S) => S];

type MxContainer = {
  index: number;
  state: any[];
  currentState: any;
  currentTree?: Node;
  renderTree: () => void;
  useState: UseState;
  render: <S>(store: Store<S>, actions: Actions) => (component: FC) => (mountPoint: HTMLElement) => void;
}

const Mx: MxContainer = {
  index: 0,
  state: [],
  currentState: undefined,
  currentTree: undefined,
  renderTree: undefined as unknown as () => void,
  useState: <S = any>(initialState: S) => {
    const activeIndex = Mx.index;

    if (Mx.state[activeIndex] === undefined) {
      Mx.state[activeIndex] = initialState;
    }

    const currentState = Mx.state[activeIndex];

    const setter = (newValue: S) => {
      if (Mx.state[activeIndex] !== newValue) {
        Mx.state[activeIndex] = newValue;
        Mx.renderTree();
      }
      return newValue;
    };

    Mx.index++;

    return [currentState, setter];
  },
  render: (store, actions) => component => mountPoint => {
    const dispatchActions = Object.entries(actions).reduce((actions, [key, action]) => ({
      ...actions,
      [key]: (...args: any[]) => store.dispatch(action(...args))
    }), {});

    const render = (c: Node) => {
      updateTree(mountPoint, c, Mx.currentTree);

      Mx.currentTree = c;
    };

    Mx.renderTree = () => {
      render(component({...Mx.currentState, ...dispatchActions}));
      Mx.index = 0;
    };

    Mx.currentState = store.getState();

    store.subscribe((state) => {
      Mx.currentState = state;
      Mx.renderTree();
    });

    return Mx.renderTree();
  }
};

export default Mx;

const useState = Mx.useState;

export {useState};

export const classnames = (...classNames: (string | undefined)[]): string => classNames.join(" ");

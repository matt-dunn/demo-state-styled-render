/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

import { Children, createElement, FC } from "packages/render";

import { cssWithProps, MyStyledTemplate } from "./css";

export interface MyStyledComponentProps {
  className?: string;
  children?: Children;
}

export type MyStyledComponent<
  P extends keyof JSX.IntrinsicElements | FC<P> | MyStyledComponentProps
> = FC<P> | keyof JSX.IntrinsicElements;

export interface MyStyled<P, T> {
  (string: TemplateStringsArray, ...args: T[]): MyStyledComponent<P>;
}

type ComponentProps<P> = Omit<P, "className">;

export const myStyled = <P, O = ComponentProps<P>>(
  Component: MyStyledComponent<P>
): MyStyled<O, MyStyledTemplate<O>> => (strings, ...args) => ({
  children,
  className,
  ...props
}: MyStyledComponentProps) => {
  // @TODO keep track of previous class name...
  // const prevClassName = useRef<string>("");
  // prevClassName.current = css<P>(props as P, prevClassName.current)(strings, ...args);

  const templateClassName = cssWithProps(props as O)(strings, ...args);

  return createElement(
    Component,
    { ...props, className: [className, templateClassName].join(" ") },
    children
  );
};

// @TODO: type this...!
// const domElements = [
//     'a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'big', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr',
//
//     // SVG
//     'circle', 'clipPath', 'defs', 'ellipse', 'foreignObject', 'g', 'image', 'line', 'linearGradient', 'marker', 'mask', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'svg', 'text', 'tspan'
// ];
//
// domElements.forEach(element => {
//     myStyled[element] = myStyled(element);
// });

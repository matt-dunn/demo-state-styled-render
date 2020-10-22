/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

import { createHash } from "./hash";
import { parseRule, generateClassName, updateSheetRule } from "./utils";
import {
  ClientServerStylesheet, createStylesheet, AnyRules,
} from "./stylesheet";

import {Node, FC, createElement} from "packages/render";

export interface MyStyledComponentProps {
    className?: string;
    children?: Node[];
}

// export type MyStyledComponent<P extends keyof JSX.IntrinsicElements | FC<P> | MyStyledComponentProps> = FC<P> | keyof JSX.IntrinsicElements;
export type MyStyledComponent<P extends keyof JSX.IntrinsicElements | FC<P> | MyStyledComponentProps> = any;

export interface MyStyled<P, T> {
    (string: TemplateStringsArray, ...args: T[]): MyStyledComponent<P>;
}

type MyStyledTemplate<P> = {
    (props: P): string | false | number | undefined;
} | string | false | number | undefined;

const globalStylesheet = createStylesheet();

const myStyled = <P>(Component: MyStyledComponent<P>): MyStyled<P, MyStyledTemplate<P>> => (strings, ...args) => {
  const updateRule = (prevClassName: string | undefined, props: any, stylesheet?: ClientServerStylesheet<CSSRuleList | AnyRules>) => {
    if (stylesheet) {
      const rule = (args.length === 0 && strings.join("")) || parseRule(strings, args, props);
      const hash = createHash(rule);
      const className = generateClassName(Component, hash);

      if (className === prevClassName || (stylesheet.hashes && stylesheet.hashes.indexOf(hash) !== -1)) {
        return className;
      }

      stylesheet.collectHash(hash);

      return updateSheetRule(stylesheet.sheet, className, rule);
    }

    return "";
  };

  return ({ children, className, ...props }: MyStyledComponentProps) => {
    // @TODO keep track of previous class name...
    // const prevClassName = useRef<string | undefined>(undefined);
    // prevClassName = updateRule(prevClassName, props, globalStylesheet);

    const prevClassName = updateRule(undefined, props, globalStylesheet);

    return createElement(Component, { ...props, className: [className, prevClassName].join(" ") }, ...children || []);
  };
};


// TODO: type this...!
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

export default myStyled;

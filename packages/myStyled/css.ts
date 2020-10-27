/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

import { generateClassName, parseRule, updateSheetRule } from "./utils";
import { createHash } from "./hash";
import { createStylesheet } from "./stylesheet";

export const globalStylesheet = createStylesheet();

export type MyStyledTemplate<P> =
  | {
      (props: P): string | boolean | number;
    }
  | string
  | boolean
  | number;

export const cssWithProps = <P>(
  props?: P,
  prevClassName?: string,
  stylesheet = globalStylesheet
) => (strings: TemplateStringsArray, ...args: MyStyledTemplate<P>[]) => {
  if (stylesheet) {
    const rule =
      (args.length === 0 && strings.join("")) ||
      parseRule(strings, args, props);
    const hash = createHash(rule);
    const className = generateClassName(hash);

    if (
      className === prevClassName ||
      (stylesheet.hashes && stylesheet.hashes.indexOf(hash) !== -1)
    ) {
      return className;
    }

    stylesheet.collectHash(hash);

    return updateSheetRule(stylesheet.sheet, className, rule);
  }

  return "";
};

export const css = <P>(
  strings: TemplateStringsArray,
  ...args: MyStyledTemplate<P>[]
) => cssWithProps<P>()(strings, ...args);

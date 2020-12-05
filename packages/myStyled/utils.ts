/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

import Stylis from "stylis";

import { AnyRules, StylesheetPartial } from "./stylesheet";

const CLASS_NAME_PREFIX = "ms__";

const DEBUG = process.env.DEBUG === "true";

function isFunction(value: any): value is (...args: any[]) => any {
  return typeof value === "function";
}

export const parseRule = <T>(
  strings: TemplateStringsArray,
  args?: T[],
  props?: any
): string =>
  strings
    .reduce((rule: string[], part: string, index: number) => {
      rule.push(part);

      const arg = args?.[index];
      const value = arg && isFunction(arg) ? arg(props) : arg;

      if (value) {
        rule.push(value);
      }

      return rule;
    }, [])
    .join("");

// Use a fixed class prefix to simplify client/server class names
export const generateClassName = (hash: string): string =>
  `${CLASS_NAME_PREFIX}${hash}`;

const stylis = new Stylis({
  global: false,
});

export const updateSheetRule = (
  sheet: StylesheetPartial<CSSRuleList | AnyRules>,
  className: string,
  rule: string
) => {
  const DEBUG_RULES: string[] = [];

  const selectorText = `.${className}`;

  // See https://github.com/thysultan/stylis.js#plugins for plugin details
  stylis.use((context, content, selectors, parent) => {
    const selector = selectors[0];
    if (selector) {
      // Remove any additional specificity...
      // TODO: a bit hacky... can likely be improved/made more robust. this is intended to ensure child blocks are not inserted without the parent wrapper (e.g. @media rules)
      const normalizedSelector = `${parent[0] || ""}${
        (parent[0] &&
          selector.toString().replace(new RegExp(parent[0], "g"), "")) ||
        ""
      }`;

      // Do not include any global styles... Should be handled... globally! 2 = selector block, 3 = @at-rule block
      if (
        ((context === 2 && selector.startsWith(selectorText)) ||
          context === 3) &&
        normalizedSelector !== parent[0] &&
        selector.toLowerCase().indexOf(":global") === -1
      ) {
        // Add class postfix to localise animation name if required
        const currentSelector = `${selector}${
          (selector.toLowerCase().startsWith("@keyframes ") &&
            `-${className}`) ||
          ""
        }`;
        // Set the correct content if font-face
        const currentContent =
          (selector.toLowerCase().startsWith("@font-face") &&
            content.substr(1, content.length - 2)) ||
          content;

        sheet.insertRule(`${currentSelector} {${currentContent}}`);

        if (DEBUG) {
          DEBUG_RULES.push(`${currentSelector} {\n    ${content}\n  }`);
        }
      }
    }
  });

  stylis(selectorText, rule);

  if (DEBUG) {
    console.log(
      `UPDATE(${sheet.rules.length} rules)\n `,
      DEBUG_RULES.join("\n  ")
    );
  }

  return className;
};

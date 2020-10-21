/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

import { JSDOM } from "jsdom";
import "@testing-library/jest-dom";

const jsdom = new JSDOM("<!doctype html><html><body></body></html>", {
  url: "https://example.org/",
  referrer: "https://example.com/",
});
const { window } = jsdom;

const copyProps = (src: any, target: any) => {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  });
};

(global as any).window = window;
(global as any).document = window.document;
(global as any).navigator = {
  userAgent: "node.js",
};
global.requestAnimationFrame = function requestAnimationFrame(callback) {
  return setTimeout(callback, 0);
};
global.cancelAnimationFrame = function cancelAnimationFrame(id) {
  clearTimeout(id);
};

const dispatchEvent = global.dispatchEvent;
const CustomEvent = global.CustomEvent;
const Event = global.Event;

copyProps(window, global);

global.dispatchEvent = dispatchEvent;
global.CustomEvent = CustomEvent;
global.Event = Event;

// console.error = () => {};
// console.warn = () => {};
// console.debug = () => {};
// console.log = () => {};

/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

import Mx from "packages/render";

import { App } from "./App";

// Example of lazy loading a component:
// import { lazy } from "packages/render/lazy";
// const App = lazy(
//   () => import("./App"),
//   (module) => module.App
// );

const el = document.createElement("div");

document.body.append(el);

Mx.render(App)(el);

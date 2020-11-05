/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

import Mx from "packages/render";

import { App } from "./examples/App";

const el = document.createElement("div");

document.body.append(el);

Mx.render(App)(el);

/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

/** @jsx jsx **/

import { jsx } from "packages/render";
import { StoreProvider } from "packages/state";
import { lazy } from "packages/render/lazy";

import { getStore } from "./store";

import { Header } from "./components/Header";

const store = getStore({
  todos: [
    { id: "1", text: "Do something", complete: true },
    { id: "2", text: "Do something else", complete: false },
  ],
});

const Todos = lazy(
  () => import("./containers/Todos"),
  (module) => module.Todos
);

export const App = () => (
  <StoreProvider store={store}>
    <div className="container-lg container-main">
      <Header />
      <article>
        <header>
          <p>Simple vanilla, dependency free implementation of:</p>
          <ul>
            <li>
              <a
                href="https://github.com/matt-dunn/demo-state-styled-render/tree/master/packages/render"
                target="_blank"
                rel="noopener noreferrer"
              >
                JSX functional component rendering with simple hooks
              </a>
            </li>
            <li>
              <a
                href="https://github.com/matt-dunn/demo-state-styled-render/tree/master/packages/state"
                target="_blank"
                rel="noopener noreferrer"
              >
                Redux style state management
              </a>
            </li>
            <li>
              <a
                href="https://github.com/matt-dunn/demo-state-styled-render/tree/master/packages/myStyled"
                target="_blank"
                rel="noopener noreferrer"
              >
                A Styled Component implementation
              </a>
            </li>
          </ul>
        </header>

        <p>
          Intended as an illustration of how the basics and internals of React /
          Redux / Styled Components work under the hood and{" "}
          <strong>not intended for production use</strong>.
        </p>
      </article>
      <Todos />
    </div>
  </StoreProvider>
);

/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

/** @jsx jsx **/

import { jsx } from "packages/render";

import { TodoItems, TodoList, Actions as TodoActions } from "./todo";
import { Header } from "./Header";

type AppProps = {
  todos: TodoItems;
  createTodo: TodoActions["createTodo"];
  deleteTodo: TodoActions["deleteTodo"];
  updateTodo: TodoActions["updateTodo"];
};

export const App = ({
  todos,
  createTodo,
  deleteTodo,
  updateTodo,
}: AppProps) => (
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
    <main className="d-flex flex-md-row flex-column">
      <TodoList
        todos={todos}
        createTodo={createTodo}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
        className="mr-md-2 mb-3 flex-grow-1 align-self-start col-md"
      />
      <pre className="ml-md-2 flex-grow-1 col-md">
        {JSON.stringify(todos, undefined, 1)}
      </pre>
    </main>
  </div>
);

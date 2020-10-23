/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

/** @jsx createElement **/

import {createElement} from "packages/render";

import {TodoItems, TodoList, Actions as TodoActions} from "./todo";
import {Header} from "./Header";

type AppProps = {
  todos: TodoItems;
  createTodo: TodoActions["createTodo"];
  deleteTodo: TodoActions["deleteTodo"];
  updateTodo: TodoActions["updateTodo"]
}

export const App = ({todos, createTodo, deleteTodo, updateTodo}: AppProps) => (
  <div>
    <Header/>
    <article className="container">
      <p>
        Simple vanilla, dependency free demo of:
      </p>
      <ul>
        <li><a href="https://github.com/matt-dunn/demo-state-styled-render/tree/master/packages/render" target="_blank" rel="noopener noreferrer">JSX functional component rendering with simple hooks</a></li>
        <li><a href="https://github.com/matt-dunn/demo-state-styled-render/tree/master/packages/state" target="_blank" rel="noopener noreferrer">Redux style state management</a></li>
        <li><a href="https://github.com/matt-dunn/demo-state-styled-render/tree/master/packages/myStyled" target="_blank" rel="noopener noreferrer">A Styled Component implementation</a></li>
      </ul>

      <p>
        Intended as an illustration of how the basics and internals of React / Redux / Styled Components work under the hood
        and <strong>not intended for production use</strong>.
      </p>
    </article>
    <main className="flex container">
      <TodoList todos={todos} createTodo={createTodo} deleteTodo={deleteTodo} updateTodo={updateTodo} className="flex-item flex-fit" />
      <pre className="flex-item flex-grow">
        {JSON.stringify(todos, undefined, 1)}
      </pre>
    </main>
  </div>
);

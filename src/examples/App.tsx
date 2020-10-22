/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

/** @jsx createElement **/

import {createElement} from "packages/render";

import {TodoItems, TodoList, Actions as TodoActions} from "./todo";

type AppProps = {
  todos: TodoItems;
  createTodo: TodoActions["createTodo"];
  deleteTodo: TodoActions["deleteTodo"];
  updateTodo: TodoActions["updateTodo"]
}

export const App = ({todos, createTodo, deleteTodo, updateTodo}: AppProps) => (
  <div className="flex">
    <TodoList todos={todos} createTodo={createTodo} deleteTodo={deleteTodo} updateTodo={updateTodo} className="flex-item flex-fit" />
    <pre className="flex-item flex-grow">
      {JSON.stringify(todos, undefined, 1)}
    </pre>
  </div>
);

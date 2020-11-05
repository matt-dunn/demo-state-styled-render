/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

/** @jsx jsx **/

import { jsx } from "packages/render";
import { connect } from "packages/state";

import { AppState } from "../App";
import {
  Actions as TodoActions,
  actions as todoActions,
  TodoItems,
  TodoList,
} from "../todo";

type TodosProps = {
  todos: TodoItems;
  createTodo: TodoActions["createTodo"];
  deleteTodo: TodoActions["deleteTodo"];
  updateTodo: TodoActions["updateTodo"];
};

const Todos = ({ todos, createTodo, deleteTodo, updateTodo }: TodosProps) => (
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
);

const ConnectedTodos = connect<AppState>(
  ({ todos }) => ({
    todos,
  }),
  {
    ...todoActions,
  }
)(Todos as any);

export { ConnectedTodos as Todos };

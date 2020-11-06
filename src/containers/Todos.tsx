/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

/** @jsx jsx **/

import { jsx } from "packages/render";
import { connect } from "packages/state";

import { AppState } from "../store";

import {
  Actions as TodoActions,
  actions as todoActions,
  TodoItems,
  TodoList,
} from "../components/Todos";

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
    <div className="ml-md-2 flex-grow-1 col-md">
      <pre style={{ fontSize: "0.85rem" }}>
        {JSON.stringify(todos, undefined, 1)}
      </pre>
    </div>
  </main>
);

const ConnectedTodos = connect(
  ({ todos }: AppState) => ({
    todos,
  }),
  {
    ...todoActions,
  }
)(Todos);

export { ConnectedTodos as Todos };

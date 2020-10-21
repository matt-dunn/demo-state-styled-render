/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

/** @jsx h **/

import {h, Mx} from "packages/render";
import {createStore} from "packages/state";

import {TodoList} from "./TodoList";
import {TodoItems} from "./types";

import todoReducers, {createTodo, CreateTodo, deleteTodo, DeleteTodo, updateTodo, UpdateTodo} from "./duck";

type AppState = {
  todos: TodoItems;
}

const initialState: AppState = {
  todos: [
    {id: "1", text: "Do something", complete: true},
    {id: "2", text: "Do something else", complete: false}
  ]
};

const rootReducer = {
  todos: todoReducers
};

const store = createStore(rootReducer)(initialState);

type AppProps = {
  todos: TodoItems;
  createTodo: CreateTodo;
  deleteTodo: DeleteTodo;
  updateTodo: UpdateTodo
}

const App = ({todos, createTodo, deleteTodo, updateTodo}: AppProps) => (
  <div className="sample__app flex">
    <TodoList todos={todos} createTodo={createTodo} deleteTodo={deleteTodo} updateTodo={updateTodo} className="flex-item flex-fit" />
    <pre className="flex-item flex-grow">
        {JSON.stringify(todos, undefined, 1)}
      </pre>
  </div>
);

// ----- Render App -----

const el = document.createElement("div");

document.body.append(el);

Mx.render(store, {
  createTodo,
  deleteTodo,
  updateTodo
})(App)(el);

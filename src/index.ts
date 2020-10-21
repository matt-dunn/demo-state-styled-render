/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

import {Mx} from "packages/render";
import {createStore} from "packages/state";

import {TodoItems} from "./examples/todo";

import todoReducers, {createTodo, deleteTodo, updateTodo} from "./examples/todo/duck";

import {App} from "./examples/App";

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

const el = document.createElement("div");

document.body.append(el);

Mx.render(store, {
  createTodo,
  deleteTodo,
  updateTodo
})(App)(el);

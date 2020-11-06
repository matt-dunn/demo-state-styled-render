/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

import { createStore } from "packages/state";

import { TodoItems } from "./components/Todos";
import todoReducer from "./components/Todos/duck";

export type AppState = {
  todos: TodoItems;
};

const rootReducer = {
  todos: todoReducer,
};

export const getStore = (initialState: AppState) =>
  createStore(rootReducer)(initialState);

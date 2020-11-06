/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

import { createAction, createReducer, getType } from "packages/state";

import { TodoItem, TodoItems } from "./types";

export const createTodo = createAction(
  "todo/CREATE",
  (text: string, complete?: boolean): TodoItem => ({
    id: Date.now().toString(),
    text,
    complete: complete ?? false,
  })
);

export const deleteTodo = createAction(
  "todo/DELETE",
  (id: string): string => id
);

export const updateTodo = createAction(
  "todo/UPDATE",
  (todo: TodoItem): TodoItem => todo
);

export const actions = {
  createTodo,
  deleteTodo,
  updateTodo,
};

export type Actions = typeof actions;

export default createReducer<TodoItems, any>({
  [getType(createTodo)]: (
    state,
    { payload }: ReturnType<Actions["createTodo"]>
  ) => [...state, payload],
  [getType(deleteTodo)]: (
    state,
    { payload }: ReturnType<Actions["deleteTodo"]>
  ) => state.filter(({ id }) => id !== payload),
  [getType(updateTodo)]: (
    state,
    { payload }: ReturnType<Actions["updateTodo"]>
  ) => state.map((todo) => (todo.id === payload.id ? payload : todo)),
});

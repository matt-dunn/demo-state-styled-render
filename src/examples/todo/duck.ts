/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

import {createAction, createReducer, getType} from "packages/state";

import {TodoItem} from "./types";

export const createTodo = createAction("TODO:CREATE", (text: string, complete?: boolean): TodoItem => ({
  id: Date.now().toString(),
  text,
  complete: complete ?? false
}));

export const deleteTodo = createAction("TODO:DELETE", (id: string): string => id);

export const updateTodo = createAction("TODO:UPDATE", (todo: TodoItem): TodoItem => todo);

export const actions = {
  createTodo,
  deleteTodo,
  updateTodo,
};

export type Actions = typeof actions;

export default createReducer<TodoItem[], any>({
  [getType(createTodo)]: (state, { payload }: ReturnType<Actions["createTodo"]>) => [...state, payload],
  [getType(deleteTodo)]: (state, { payload }: ReturnType<Actions["deleteTodo"]>) => state.filter(({id}) => id !== payload),
  [getType(updateTodo)]: (state, { payload }: ReturnType<Actions["updateTodo"]>) => state.map(todo => todo.id === payload.id ? payload : todo),
});

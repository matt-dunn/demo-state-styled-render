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

export type CreateTodo = typeof createTodo;

export const deleteTodo = createAction("TODO:DELETE", (id: string): string => id);

export type DeleteTodo = typeof deleteTodo;

export const updateTodo = createAction("TODO:UPDATE", (todo: TodoItem): TodoItem => todo);

export type UpdateTodo = typeof updateTodo;

export default createReducer<TodoItem[], any>({
  [getType(createTodo)]: (state, { payload }: ReturnType<CreateTodo>) => [...state, payload],
  [getType(deleteTodo)]: (state, { payload }: ReturnType<DeleteTodo>) => state.filter(({id}) => id !== payload),
  [getType(updateTodo)]: (state, { payload }: ReturnType<UpdateTodo>) => state.map(t => t.id === payload.id ? payload : t),
});

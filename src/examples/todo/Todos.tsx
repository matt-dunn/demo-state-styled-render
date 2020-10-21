/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

/** @jsx h **/

import {h} from "packages/render";

import {DeleteTodo, UpdateTodo} from "./duck";
import {TodoItems} from "./types";
import {Todo} from "./Todo";

type TodosProps = {
  todos: TodoItems;
  deleteTodo: DeleteTodo;
  updateTodo: UpdateTodo;
}

export const Todos = ({todos, updateTodo, deleteTodo}: TodosProps) =>
  <ul className="todos__list">
    {todos.map(todo =>
      <li className="todos__list__item">
        <Todo todo={todo} updateTodo={updateTodo} deleteTodo={deleteTodo}/>
      </li>
    )}
  </ul>;

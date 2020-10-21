/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

/** @jsx h **/

import {h} from "packages/render";

import {TodoItem} from "./types";
import {DeleteTodo, UpdateTodo} from "./duck";

type TodoProps = {
  todo: TodoItem;
  deleteTodo: DeleteTodo;
  updateTodo: UpdateTodo
}

export const Todo = ({todo: {id, text, complete}, deleteTodo, updateTodo}: TodoProps) =>
  <div className="todos__item">
    <label onClick={(e) => {
      e.preventDefault();
      updateTodo({id, text, complete: !complete});
    }}>
      {complete ?
        <del className="todos__item__title">
          <input type="checkbox" checked={complete}/>
          {text}
        </del>
        :
        <span className="todos__item__title">
          <input type="checkbox" checked={complete}/>
          {text}
        </span>
      }
    </label>
    <button className="btn btn-sm" onClick={(e) => {
      e.preventDefault();
      deleteTodo(id);
    }}>
      Delete
    </button>
  </div>;

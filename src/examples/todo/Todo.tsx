/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

/** @jsx createElement **/

import {createElement} from "packages/render";
import myStyled from "packages/myStyled";

import {TodoItem} from "./types";
import {DeleteTodo, UpdateTodo} from "./duck";

type TodoProps = {
  todo: TodoItem;
  deleteTodo: DeleteTodo;
  updateTodo: UpdateTodo
}

const Todo$ = myStyled("article")`
  display: flex;
  align-items: flex-start;

  del {
    color: #aaa;
  }

  label {
    flex-grow: 1;
    margin-right: 1rem;
  }

  input[type="checkbox"] {
    margin: 0 0.5rem 0 0;
  }
`;

const TodoTitle$ = myStyled("div")`
  > *:first-child {
  word-break: break-word;
  display: flex;
  align-items: baseline;
  }
`;

export const Todo = ({todo: {id, text, complete}, deleteTodo, updateTodo}: TodoProps) =>
  <Todo$ className="todos__item">
    <label onClick={(e) => {
      e.preventDefault();
      updateTodo({id, text, complete: !complete});
    }}>
      <TodoTitle$>
      {complete ?
        <del>
          <input type="checkbox" checked={complete}/>
          {text}
        </del>
        :
        <span>
          <input type="checkbox" checked={complete}/>
          {text}
        </span>
      }
      </TodoTitle$>
    </label>
    <button className="btn btn-sm" onClick={(e) => {
      e.preventDefault();
      deleteTodo(id);
    }}>
      Delete
    </button>
  </Todo$>;

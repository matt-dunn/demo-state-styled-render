/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

/** @jsx createElement **/
/** @jsxFrag createFragment **/

import {createElement, createFragment} from "packages/render";
import myStyled from "packages/myStyled";

import {TodoItem} from "./types";
import {Actions as TodoActions} from "./duck";

type TodoProps = {
  todo: TodoItem;
  deleteTodo: TodoActions["deleteTodo"];
  updateTodo: TodoActions["updateTodo"]
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
    word-break: break-word;
    display: flex;
    align-items: baseline;
  }
  
  del {
    word-break: break-word;
    display: flex;
    align-items: baseline;
  }

  input[type="checkbox"] {
    margin: 0 0.5rem 0 0;
  }
`;

export const Todo = ({todo: {id, text, complete}, deleteTodo, updateTodo}: TodoProps) => (
  <Todo$>
    <label onClick={(e) => {
      e.preventDefault();
      updateTodo({id, text, complete: !complete});
    }}>
      {complete ?
        <del>
          <input type="checkbox" checked={complete}/>
          {text}
        </del>
        :
        <>
          <input type="checkbox" checked={complete}/>
          {text}
        </>
      }
    </label>
    <button className="btn btn-sm btn-outline-secondary" onClick={(e) => {
      e.preventDefault();
      deleteTodo(id);
    }}>
      Delete
    </button>
  </Todo$>
);

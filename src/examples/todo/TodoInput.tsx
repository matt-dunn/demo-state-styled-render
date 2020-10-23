/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

/** @jsx createElement **/

import {createElement, useState} from "packages/render";
import myStyled from "packages/myStyled";

import {Actions as TodoActions} from "./duck";

type TodoInputProps = {
  createTodo: TodoActions["createTodo"];
}

const TodoListForm$ = myStyled("form")`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;

  > label {
    display: flex;
    flex-grow: 1;
    align-items: center;
    margin: 0;
  }

  input[type=text] {
    width: 100%;
    margin: 0 0.5rem 0 0.35rem;
  }
`;

export const TodoInput = ({createTodo}: TodoInputProps) => {
  const [value, setValue] = useState("");

  return (
    <TodoListForm$ onSubmit={(e: Event) => {
      e.preventDefault();
      createTodo(value);
      setValue("");
    }}>
      <label>
        Todo
        <input value={value} type="text" placeholder="Add new todo" className="form-control" onInput={(e: any) => {
          setValue(e.target.value);
        }}/>
      </label>
      <button type="submit" className="btn btn-primary" disabled={!value}>Add</button>
    </TodoListForm$>
  );
};


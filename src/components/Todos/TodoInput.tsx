/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

/** @jsx jsx **/

import { jsx, useEffect, useRef, useState } from "packages/render";
import myStyled from "packages/myStyled";

import { Actions as TodoActions } from "./duck";

type TodoInputProps = {
  createTodo: TodoActions["createTodo"];
  autoFocus?: boolean;
  placeholder?: string;
};

// Quick fix to allow stylelint to do it's thing:
const styled = myStyled;

const TodoListForm$ = styled("form")`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;

  > label {
    display: flex;
    flex-grow: 1;
    align-items: center;
    margin: 0;
  }

  input[type="text"] {
    width: 100%;
    margin: 0 0.5rem 0 0.35rem;
  }
`;

export const TodoInput = ({
  createTodo,
  autoFocus,
  placeholder = "Add new todo",
}: TodoInputProps) => {
  const [value, setValue] = useState("");
  const input = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (autoFocus) {
      setTimeout(() => {
        input.current?.focus();
      });
    }
  }, [autoFocus]);

  if (value === "error!") {
    throw new Error("Example boundary caught error");
  }

  return (
    <TodoListForm$
      onSubmit={(e: any) => {
        e.preventDefault();
        if (value.trim()) {
          createTodo(value.trim());
          setValue("");
        }
      }}
    >
      <label>
        Todo
        <input
          ref={input}
          value={value}
          type="text"
          placeholder={placeholder}
          className="form-control"
          onInput={(e: any) => {
            setValue(e.target.value);
          }}
        />
      </label>
      <button
        type="submit"
        className="btn btn-primary"
        disabled={!value.trim()}
      >
        Add
      </button>
    </TodoListForm$>
  );
};

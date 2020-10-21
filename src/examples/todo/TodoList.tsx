/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

/** @jsx h **/

import {classnames, h, useState} from "packages/render";
import myStyled from "packages/myStyled";

import {Todos} from "./Todos";
import {TodoItems} from "./types";
import {CreateTodo, DeleteTodo, UpdateTodo} from "./duck";

type TodoListProps = {
  todos: TodoItems;
  createTodo: CreateTodo;
  deleteTodo: DeleteTodo;
  updateTodo: UpdateTodo;
  className?: string;
}

const TodoList$ = myStyled("section")`
  padding: 1rem;
  max-width: 30rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;

  &__header {
    border-bottom: 1px solid #eee;
    margin-bottom: 1rem;

    &__value {
    }
  }
`;

const TodoListHeader$ = myStyled("header")`
  border-bottom: 1px solid #eee;
  margin-bottom: 1rem;
`;

const TodoListValue$ = myStyled("div")`
  display: flex;
  align-items: center;

  > label {
    display: flex;
    flex-grow: 1;
    align-items: center;
  }

  input[type=text] {
    width: 100%;
    margin: 0 0.5rem 0 0.35rem;
  }
`;

export const TodoList = ({todos, createTodo, deleteTodo, updateTodo, className}: TodoListProps) => {
  const [value, setValue] = useState("");

  return (
    <TodoList$ className={className}>
      <form onSubmit={e => {
        e.preventDefault();
        createTodo(value);
        setValue("");
      }}>
        <TodoListHeader$>
          <TodoListValue$>
            <label>
              Todo
              <input value={value} type="text" onInput={(e: any) => {
                setValue(e.target.value);
              }}/>
            </label>
            <button type="submit" className="btn btn-primary" disabled={!value || undefined}>Add</button>
          </TodoListValue$>
          <p>You have <strong>{todos.length}</strong> todo{todos.length !== 1 && "s" || ""}</p>
        </TodoListHeader$>
      </form>
      <main>
        <Todos todos={todos} deleteTodo={deleteTodo} updateTodo={updateTodo} />
      </main>
    </TodoList$>
  );
};

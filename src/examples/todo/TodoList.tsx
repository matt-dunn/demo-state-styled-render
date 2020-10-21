/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

/** @jsx h **/

import {classnames, h, useState} from "packages/render";

import {Todos} from "./Todos";
import {TodoItems} from "./types";
import {CreateTodo, DeleteTodo, UpdateTodo} from "./duck";

import "./main.scss";

type TodoListProps = {
  todos: TodoItems;
  createTodo: CreateTodo;
  deleteTodo: DeleteTodo;
  updateTodo: UpdateTodo;
  className?: string;
}

export const TodoList = ({todos, createTodo, deleteTodo, updateTodo, className}: TodoListProps) => {
  const [value, setValue] = useState("");

  return (
    <section className={classnames("todos", className)}>
      <form onSubmit={e => {
        e.preventDefault();
        createTodo(value);
        setValue("");
      }}>
        <header className="todos__header">
          <div className="todos__header__value">
            <label>
              Todo
              <input value={value} type="text" onInput={(e: any) => {
                setValue(e.target.value);
              }}/>
            </label>
            <button type="submit" className="btn btn-primary" disabled={!value || undefined}>Add</button>
          </div>
          <p>You have <strong>{todos.length}</strong> todo{todos.length !== 1 && "s" || ""}</p>
        </header>
      </form>
      <main>
        <Todos todos={todos} deleteTodo={deleteTodo} updateTodo={updateTodo} />
      </main>
    </section>
  );
};

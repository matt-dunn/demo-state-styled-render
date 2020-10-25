/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

/** @jsx jsx **/

import {jsx} from "packages/render";
import myStyled from "packages/myStyled";

import {Todos} from "./Todos";
import {TodoItems} from "./types";
import {Actions as TodoActions} from "./duck";
import {TodoInput} from "./TodoInput";
import {Todo} from "./Todo";

type TodoListProps = {
  todos: TodoItems;
  createTodo: TodoActions["createTodo"];
  deleteTodo: TodoActions["deleteTodo"];
  updateTodo: TodoActions["updateTodo"];
  className?: string;
}

const TodoList$ = myStyled("section")`
  padding: 1rem;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
`;

const TodoListHeader$ = myStyled("header")`
  border-bottom: 1px solid #eee;
  margin-bottom: 1rem;
`;

export const TodoList = ({todos, createTodo, deleteTodo, updateTodo, className}: TodoListProps) => (
  <TodoList$ className={className}>
    <TodoListHeader$>
      <TodoInput createTodo={createTodo}/>
      <p>You have <strong>{todos.length}</strong> todo{todos.length !== 1 && "s" || ""}</p>
    </TodoListHeader$>
    <main>
      <Todos todos={todos}>
        {todo => <Todo todo={todo} deleteTodo={deleteTodo} updateTodo={updateTodo}/>}
      </Todos>
    </main>
  </TodoList$>
);

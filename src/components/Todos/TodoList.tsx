/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

/** @jsx jsx **/

import { jsx } from "packages/render";
import myStyled from "packages/myStyled";
import { Delay } from "packages/render/Delay";

import { ErrorBoundary } from "./ErrorBoundary";

import { Todos } from "./Todos";
import { TodoItems } from "./types";
import { Actions as TodoActions } from "./duck";
import { Todo } from "./Todo";
import { TodoInput } from "./TodoInput";

type TodoListProps = {
  todos: TodoItems;
  createTodo: TodoActions["createTodo"];
  deleteTodo: TodoActions["deleteTodo"];
  updateTodo: TodoActions["updateTodo"];
  className?: string;
};

// Quick fix to allow stylelint to do it's thing:
const styled = myStyled;

const TodoList$ = styled("section")`
  padding: 1rem;
  width: 100%;
  border: 1px solid var(--secondary-color);
  border-radius: 0.25rem;
`;

const TodoListHeader$ = styled("header")`
  border-bottom: 1px solid var(--secondary-color);
  margin-bottom: 1rem;
`;

const Todos$ = styled(Todos)`
  ${({ todos }) =>
    (todos.length > 0 &&
      `
    border: 1px dotted var(--secondary-color);
    padding: 0.5rem;
  `) ||
    ""}
`;

export const TodoList = ({
  todos,
  createTodo,
  deleteTodo,
  updateTodo,
  className,
}: TodoListProps) => (
  <TodoList$ className={className}>
    {todos.length > 3 && <TodoInput createTodo={createTodo} />}
    <TodoListHeader$>
      <ErrorBoundary>
        <TodoInput createTodo={createTodo} autoFocus={true} />
      </ErrorBoundary>
      <Delay delay={4000}>
        <p>
          You have <strong>{todos.length}</strong> todo
          {(todos.length !== 1 && "s") || ""}
        </p>
      </Delay>
    </TodoListHeader$>
    {todos.length > 4 && <TodoInput createTodo={createTodo} />}
    <main>
      <Todos$ todos={todos}>
        {(todo) => (
          <Todo todo={todo} deleteTodo={deleteTodo} updateTodo={updateTodo} />
        )}
      </Todos$>
    </main>
  </TodoList$>
);

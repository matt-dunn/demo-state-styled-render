/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

/** @jsx jsx **/

import { jsx } from "packages/render";
import myStyled from "packages/myStyled";
import { lazy } from "packages/render/lazy";
import { Suspense } from "packages/render/Suspense";

import { ErrorBoundary } from "./ErrorBoundary";

import { Todos } from "./Todos";
import { TodoItems } from "./types";
import { Actions as TodoActions } from "./duck";
import { Todo } from "./Todo";
// import { TodoInput } from "./TodoInput";

const TodoInput = lazy(
  () => import("./TodoInput"),
  (module) => module.TodoInput
);

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

const Fallback = () => <div>LOADING...</div>;

export const TodoList = ({
  todos,
  createTodo,
  deleteTodo,
  updateTodo,
  className,
}: TodoListProps) => (
  <TodoList$ className={className}>
    {todos.length > 3 && (
      <Suspense Fallback={Fallback}>
        <TodoInput createTodo={createTodo} />
      </Suspense>
    )}
    <TodoListHeader$>
      <ErrorBoundary>
        <Suspense Fallback={Fallback}>
          <TodoInput createTodo={createTodo} />
        </Suspense>
      </ErrorBoundary>
      <p>
        You have <strong>{todos.length}</strong> todo
        {(todos.length !== 1 && "s") || ""}
      </p>
    </TodoListHeader$>
    {todos.length > 4 && <TodoInput createTodo={createTodo} />}
    <main>
      <Todos todos={todos}>
        {(todo) => (
          <Todo todo={todo} deleteTodo={deleteTodo} updateTodo={updateTodo} />
        )}
      </Todos>
    </main>
  </TodoList$>
);

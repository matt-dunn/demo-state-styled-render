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
import { Delay } from "packages/render/Delay";

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

const Loader = myStyled("div")`
  display: inline-flex;
  align-items: center;

  &:before {
    content: " ";
    margin-right: 0.5rem;
    display: block;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    border: 0.15em solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }
  
  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const SubtleLoader = myStyled(Loader)`
  opacity: 0.4;
  font-size: 0.85rem;
`;

const Fallback = () => (
  <Delay>
    <SubtleLoader>Loading…</SubtleLoader>
  </Delay>
);

const FallbackOuter = () => (
  <Delay>
    <SubtleLoader>Loading outer…</SubtleLoader>
  </Delay>
);

export const TodoList = ({
  todos,
  createTodo,
  deleteTodo,
  updateTodo,
  className,
}: TodoListProps) => (
  <TodoList$ className={className}>
    <Suspense Fallback={FallbackOuter}>
      <div>
        {todos.length > 3 && <TodoInput createTodo={createTodo} />}
        <TodoListHeader$>
          <ErrorBoundary>
            <Suspense Fallback={Fallback}>
              <TodoInput createTodo={createTodo} autoFocus={true} />
            </Suspense>
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
          <Todos todos={todos}>
            {(todo) => (
              <Todo
                todo={todo}
                deleteTodo={deleteTodo}
                updateTodo={updateTodo}
              />
            )}
          </Todos>
        </main>
      </div>
    </Suspense>
  </TodoList$>
);

/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

/** @jsx jsx **/

import { jsx, Node } from "packages/render";
import myStyled from "packages/myStyled";

import { TodoItem, TodoItems } from "./types";

type TodosProps = {
  todos: TodoItems;
  children: (todo: TodoItem) => Node;
};

// Quick fix to allow stylelint to do it's thing:
const styled = myStyled;

const Todos$ = styled("ul")`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const TodosItem$ = styled("li")`
  padding: 0.25rem 0;
`;

export const Todos = ({ todos, children }: TodosProps) => (
  <Todos$>
    {todos.map((todo) => (
      <TodosItem$ key={todo.id}>{children(todo)}</TodosItem$>
    ))}
  </Todos$>
);

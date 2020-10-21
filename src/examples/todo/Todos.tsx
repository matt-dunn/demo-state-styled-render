/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

/** @jsx h **/

import {h} from "packages/render";
import myStyled from "packages/myStyled";

import {DeleteTodo, UpdateTodo} from "./duck";
import {TodoItems} from "./types";
import {Todo} from "./Todo";

type TodosProps = {
  todos: TodoItems;
  deleteTodo: DeleteTodo;
  updateTodo: UpdateTodo;
}

const Todos$ = myStyled("ul")`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const TodosItem$ = myStyled("li")`
  padding: 0.25rem 0;
`;

export const Todos = ({todos, updateTodo, deleteTodo}: TodosProps) =>
  <Todos$>
    {todos.map(todo =>
      <TodosItem$>
        <Todo todo={todo} updateTodo={updateTodo} deleteTodo={deleteTodo}/>
      </TodosItem$>
    )}
  </Todos$>;

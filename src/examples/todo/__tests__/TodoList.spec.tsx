/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

/** @jsx jsx **/

import { jsx } from "packages/render";
import { mount } from "packages/render/test-utils";
import { createMockAction, MockAction } from "packages/state/test-utils/jest";

import { TodoList } from "../TodoList";
import { TodoItems } from "../types";
import { Actions as TodoActions } from "../duck";

describe("TodoList: Example of using mount", () => {
  let createTodo: MockAction<TodoActions["createTodo"]>;
  let deleteTodo: MockAction<TodoActions["deleteTodo"]>;
  let updateTodo: MockAction<TodoActions["updateTodo"]>;

  beforeEach(() => {
    createTodo = createMockAction();
    deleteTodo = createMockAction();
    updateTodo = createMockAction();
  });

  it("should render component with 1 items", async () => {
    const fixture = [{ id: "1", text: "My Todo Item 1", complete: true }];

    const wrapper = mount(() => (
      <TodoList
        todos={fixture}
        createTodo={createTodo}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
      />
    ));

    expect(wrapper).toMatchSnapshot();
  });

  it("should render component with > 1 items", async () => {
    const fixture = [
      { id: "1", text: "My Todo Item 1", complete: true },
      { id: "2", text: "My Todo Item 2", complete: false },
    ];

    const wrapper = mount(() => (
      <TodoList
        todos={fixture}
        createTodo={createTodo}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
      />
    ));

    expect(wrapper).toMatchSnapshot();
  });

  it("should render component with no items", async () => {
    const fixture: TodoItems = [];

    const wrapper = mount(() => (
      <TodoList
        todos={fixture}
        createTodo={createTodo}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
      />
    ));

    expect(wrapper).toMatchSnapshot();
  });
});

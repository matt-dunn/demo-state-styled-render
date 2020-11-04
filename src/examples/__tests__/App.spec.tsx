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

import { App } from "../App";
import { Actions as TodoActions } from "../todo";

describe("App: Example of using mount", () => {
  let createTodo: MockAction<TodoActions["createTodo"]>;
  let deleteTodo: MockAction<TodoActions["deleteTodo"]>;
  let updateTodo: MockAction<TodoActions["updateTodo"]>;

  beforeEach(() => {
    createTodo = createMockAction();
    deleteTodo = createMockAction();
    updateTodo = createMockAction();
  });

  it("should render component", async () => {
    const wrapper = mount(() => (
      <App
        todos={[]}
        createTodo={createTodo}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
      />
    ));

    expect(wrapper).toMatchSnapshot();
  });
});

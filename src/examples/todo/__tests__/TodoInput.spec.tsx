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

import { TodoInput } from "../TodoInput";
import { Actions as TodoActions } from "../duck";

describe("TodoInput: Example of using mount", () => {
  let createTodo: MockAction<TodoActions["createTodo"]>;

  beforeEach(() => {
    createTodo = createMockAction();
  });

  it("should render component", () => {
    const wrapper = mount(() => <TodoInput createTodo={createTodo} />);

    expect(createTodo).not.toHaveBeenCalled();

    expect(wrapper).toMatchSnapshot();
  });

  it("should create todo", () => {
    const wrapper = mount(() => <TodoInput createTodo={createTodo} />);

    expect(createTodo).not.toHaveBeenCalled();

    wrapper
      .find("input")
      .simulate("input", { target: { value: "update value" } });

    wrapper.update();

    wrapper.simulate("submit");

    expect(createTodo).toHaveBeenCalledWith("update value");
  });
});

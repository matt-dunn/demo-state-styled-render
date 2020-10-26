/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

/** @jsx jsx **/

import { jsx } from "packages/render";
import { mount } from "packages/render/test-utils";

import { Todo } from "../Todo";

const deleteTodo: any = jest.fn();
const updateTodo: any = jest.fn();

describe("Todo: Example of using mount", () => {
  it("should render incomplete todo", async () => {
    const fixture = { id: "1", text: "My Todo Item", complete: false };

    const wrapper = mount(
      <Todo todo={fixture} deleteTodo={deleteTodo} updateTodo={updateTodo} />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("should render complete todo", async () => {
    const fixture = { id: "1", text: "My Todo Item", complete: true };

    const wrapper = mount(
      <Todo todo={fixture} deleteTodo={deleteTodo} updateTodo={updateTodo} />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it("should update todo", async () => {
    const fixture = { id: "1", text: "My Todo Item", complete: false };

    const wrapper = mount(
      <Todo todo={fixture} deleteTodo={deleteTodo} updateTodo={updateTodo} />
    );

    expect(updateTodo).not.toHaveBeenCalled();

    wrapper.find("label").simulate("click");

    expect(updateTodo).toHaveBeenCalledWith({
      id: "1",
      text: "My Todo Item",
      complete: true,
    });
  });

  it("should delete todo", async () => {
    const fixture = { id: "1", text: "My Todo Item", complete: false };

    const wrapper = mount(
      <Todo todo={fixture} deleteTodo={deleteTodo} updateTodo={updateTodo} />
    );

    expect(deleteTodo).not.toHaveBeenCalled();

    wrapper.find("button").simulate("click");

    expect(deleteTodo).toHaveBeenCalledWith("1");
  });
});

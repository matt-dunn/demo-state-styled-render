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

import { Todo } from "../Todo";
import { Actions as TodoActions } from "../duck";

describe("Todo: Example of using mount", () => {
  let deleteTodo: MockAction<TodoActions["deleteTodo"]>;
  let updateTodo: MockAction<TodoActions["updateTodo"]>;

  beforeEach(() => {
    deleteTodo = createMockAction();
    updateTodo = createMockAction();
  });

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

    // Example of simulating an event on the first element only
    wrapper.find("button").at(0).simulate("click");

    expect(deleteTodo).toHaveBeenCalledWith("1");
  });

  it("should have correct class names", async () => {
    const fixture = { id: "1", text: "My Todo Item", complete: true };

    const wrapper = mount(
      <Todo todo={fixture} deleteTodo={deleteTodo} updateTodo={updateTodo} />
    );

    // Example of checking the class name on an element
    expect(wrapper.find("del").hasClass("text-muted")).toEqual(true);
  });

  it("should have correct child elements", async () => {
    const fixture = { id: "1", text: "My Todo Item", complete: true };

    const wrapper = mount(
      <Todo todo={fixture} deleteTodo={deleteTodo} updateTodo={updateTodo} />
    );

    // Convoluted example of checking the child element tag names with forEach
    const elementNames = ["LABEL", "DEL", "INPUT", "BUTTON"];

    wrapper.find("*").forEach((el, i) => {
      expect(el.tagName).toEqual(elementNames[i]);
    });

    // Convoluted example of checking the child element tag names with map
    const elementTagNames = wrapper
      .find("*")
      .map((el) => el.tagName.toLowerCase());

    expect(elementTagNames).toEqual(["label", "del", "input", "button"]);
  });

  it("should have correct html", async () => {
    const fixture = { id: "1", text: "My Todo Item", complete: true };

    const wrapper = mount(
      <Todo todo={fixture} deleteTodo={deleteTodo} updateTodo={updateTodo} />
    );

    // Convoluted example of checking the root html - NOT recommended ;)
    expect(wrapper.html()).toMatchSnapshot();

    // Convoluted example of checking the child elements html - NOT recommended ;)
    expect(wrapper.find("*").html()).toMatchSnapshot();
  });
});

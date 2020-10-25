/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

/** @jsx jsx **/

import {jsx} from "packages/render";
import {mount} from "test/utils";

import {Todo} from "../Todo";

describe("Todo: Example of using mount", () => {
  it("should render component", async () => {
    const fixture = {id: "1", text:"My Todo Item", complete: true};

    const deleteTodo: any = jest.fn();
    const updateTodo: any = jest.fn();

    const wrapper = mount(
      <Todo todo={fixture} deleteTodo={deleteTodo} updateTodo={updateTodo} />
    );

    expect(wrapper.getDOMNode()).toMatchSnapshot();
  });
});

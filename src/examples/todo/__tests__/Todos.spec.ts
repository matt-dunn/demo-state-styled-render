/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

import {mount} from "test/utils";

import {Todos} from "../Todos";

describe("Todos: Example of using mount", () => {
  it("should render component", async () => {
    const deleteTodo: any = jest.fn();
    const updateTodo: any = jest.fn();

    const wrapper = mount(Todos({todos: [{id: "1", text:"My Todo Item", complete: true}], deleteTodo, updateTodo}));

    expect(wrapper.getDOMNode()).toMatchSnapshot();
  });
});

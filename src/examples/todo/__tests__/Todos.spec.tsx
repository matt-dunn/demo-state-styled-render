/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

/** @jsx jsx **/

import { jsx } from "packages/render";
import { mount } from "packages/render/test-utils";

import { Todos } from "../Todos";
import { TodoItem } from "../types";

const MockTodo = ({ todo }: { todo: TodoItem }) => (
  <div>
    {todo.id}-{todo.text}={todo.complete ? "Y" : "N"}
  </div>
);

describe("Todos: Example of using mount", () => {
  it("should render component", async () => {
    const fixture = [
      { id: "1", text: "My Todo Item 1", complete: true },
      { id: "2", text: "My Todo Item 2", complete: false },
    ];

    const wrapper = mount(
      <Todos todos={fixture}>{(todo) => <MockTodo todo={todo} />}</Todos>
    );

    expect(wrapper).toMatchSnapshot();
  });
});

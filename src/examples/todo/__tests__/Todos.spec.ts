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
    const t: any = jest.fn();

    const wrapper = mount(Todos({todos: [{id: "1", text:"My Todo Item", complete: true}], children: t}));

    expect(wrapper.getDOMNode()).toMatchSnapshot();
  });
});

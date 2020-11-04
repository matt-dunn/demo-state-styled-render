/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

/** @jsx jsx **/

import { jsx } from "packages/render";
import { mount } from "packages/render/test-utils";

import { Header } from "../Header";

describe("Header: Example of using mount", () => {
  it("should render component", async () => {
    const wrapper = mount(<Header />);

    expect(wrapper).toMatchSnapshot();
  });
});

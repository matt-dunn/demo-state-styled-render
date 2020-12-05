/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

/** @jsx jsx **/

import { jsx } from "packages/render";

export const TestSVG = ({ empty }: { empty: boolean }) => (
  <svg viewBox="0 0 1024 1024">
    <path
      fill={empty ? "yellow" : "#fff"}
      style={{ cursor: "text" }}
      d="M448 0c-247.36 0-448 200.64-448 448 0 122.624 49.504 233.504 129.376 314.496l-1.376 261.504 214.496-141.888c34.016 8.384 68.992 13.888 105.504 13.888 247.36 0 448-200.64 448-448s-200.64-448-448-448z"
      stroke="inherit"
    />
  </svg>
);

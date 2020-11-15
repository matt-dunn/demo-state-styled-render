/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

/** @jsx jsx **/

import { Node, jsx, useError } from "packages/render";

type ErrorBoundaryProps = {
  children: Node;
};

export const ErrorBoundary = ({ children }: ErrorBoundaryProps) => {
  const error = useError((error) => {
    console.log("HANDLE", error.message);
    // return { message: "wrapped: " + error.message };
  });

  if (error) {
    return <code>TODO ERROR BOUNDARY: {JSON.stringify(error)}</code>;
  }

  return children;
};

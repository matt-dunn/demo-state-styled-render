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
  const error = useError();

  if (error) {
    return <code>APP ERROR BOUNDARY: {error.message}</code>;
  }

  return children;
};

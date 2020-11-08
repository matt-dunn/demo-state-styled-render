/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

/** @jsx jsx **/

import { Node, jsx } from "packages/render";
import { useError, useState } from "packages/render/hooks";

type ErrorBoundaryProps = {
  children: Node;
};

export const ErrorBoundary = ({ children }: ErrorBoundaryProps) => {
  const [error, setError] = useState<Error | undefined>(undefined);

  useError(setError);

  if (error) {
    return <code>{error.message}</code>;
  }

  return children;
};

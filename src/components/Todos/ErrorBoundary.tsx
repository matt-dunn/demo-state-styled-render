/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

/** @jsx jsx **/
/** @jsxFrag jsxFrag **/

import { Node, jsx, jsxFrag, useState, useEffect } from "packages/render";
import { LazyContext } from "packages/render/lazy";

type ErrorBoundaryProps = {
  children: Node;
};

export const ErrorBoundary = ({ children }: ErrorBoundaryProps) => {
  const [promise, setPromise] = useState<Promise<any> | undefined>(undefined);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    if (promise) {
      setPending(true);

      promise.catch(setError).finally(() => setPending(false));
    }
  }, [promise]);

  if (error) {
    throw error;
  }

  return (
    <LazyContext.Provider value={setPromise}>
      <>
        <p>[{pending ? "Y" : "N"}]</p>
        {children}
      </>
    </LazyContext.Provider>
  );
};

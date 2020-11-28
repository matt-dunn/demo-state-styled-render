/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

/** @jsx jsx **/
/** @jsxFrag jsxFrag **/

import { Node, jsx, jsxFrag, useState, useEffect, FC } from "./";
import { LazyContext } from "./lazy";

type SuspenseProps = {
  children: Node;
  Fallback: FC;
};

export const Suspense = ({ children, Fallback }: SuspenseProps) => {
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
        {pending && <Fallback />}
        {children}
      </>
    </LazyContext.Provider>
  );
};

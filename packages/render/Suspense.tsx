/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

/** @jsx jsx **/
/** @jsxFrag jsxFrag **/

import { AnyNode, jsx, jsxFrag, useState, FC, Children } from "./";
import { LazyContext } from "./lazy";

type SuspenseProps = {
  children: AnyNode | Children;
  Fallback: FC<{ pendingCount: number }>;
};

export const Suspense = ({ children, Fallback }: SuspenseProps) => {
  const [pendingCount, setPendingCount] = useState(0);
  const [error, setError] = useState<Error | undefined>(undefined);

  const handlePromise = (promise: Promise<any>) => {
    setPendingCount((pendingCount) => pendingCount + 1);

    promise
      .catch(setError)
      .finally(() => setPendingCount((pendingCount) => pendingCount - 1));
  };

  if (error) {
    throw error;
  }

  return (
    <LazyContext.Provider value={handlePromise}>
      <>
        {pendingCount !== 0 && <Fallback pendingCount={pendingCount} />}
        {children}
      </>
    </LazyContext.Provider>
  );
};

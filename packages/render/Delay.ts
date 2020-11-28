/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

import { Node } from "./";
import { useEffect, useState } from "./hooks";

type DelayProps = {
  delay?: number;
  children: Node;
};

export const Delay = ({ delay = 500, children }: DelayProps) => {
  const [waiting, setWaiting] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setWaiting(false);
    }, delay);

    return () => {
      clearTimeout(t);
    };
  }, []);

  return waiting ? null : children;
};

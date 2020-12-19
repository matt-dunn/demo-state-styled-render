/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

import {AnyNode, Node} from "./";
import { useEffect, useState } from "./hooks";

type DelayProps = {
  delay?: number;
  children: Node;
};

export const Delay = ({ delay = 500, children }: DelayProps): AnyNode => {
  const [waiting, setWaiting] = useState(delay !== 0);

  useEffect(() => {
    if (waiting) {
      const t = setTimeout(() => {
        setWaiting(false);
      }, delay);

      return () => {
        clearTimeout(t);
      };
    }
  }, [delay]);

  return waiting ? null : children;
};

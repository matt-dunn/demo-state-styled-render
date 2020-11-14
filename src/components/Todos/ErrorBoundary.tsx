/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

/** @jsx jsx **/

import {Node, jsx, useError, useState} from "packages/render";
import {looseRef} from "../../../packages/render/utils";

type ErrorBoundaryProps = {
  children: Node;
};

const isPromise = (o: any): o is Promise<any> => o.then
export const ErrorBoundary = ({ children }: ErrorBoundaryProps) => {
  const [busy, setBusy] = useState(false);

  const sb = looseRef(setBusy)
  sb.current = setBusy

  console.error("busy", busy)



  const error = useError((error) => {
    console.log("HANDLE", error);

    if (isPromise(error)) {
      // setBusy(true);
      sb.current(true);
      // (async function () {
      //   await error;
      //   setBusy(false);
      //     console.error("@@@", busy)
      // })()
      error.then((x) => {
        // console.error("@>>",setBusy("XXX"));
        // setBusy(false);
        sb.current(false);
        console.error("@@@", x, busy)
      })
    } else {
      return error
    }


    // return { message: "wrapped: " + error.message };
    // setTimeout(() => {
    //   setX(new Error("OOPS"))
    //   // throw new Error("OOPs")
    // }, 1000)
    // return { message: "wrapped: " + error.message };
  });

  // if (x) {
  //   throw x
  // }

  if (busy) {
    return <code>Loading...</code>;
  }

  return children;
};

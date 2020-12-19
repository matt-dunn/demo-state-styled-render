/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

/** @jsx jsx **/
/** @jsxFrag jsxFrag **/

import Mx, {jsx, jsxFrag, useEffect, useState} from "packages/render";

import { App } from "./App";

// Example of lazy loading a component:
// import { lazy } from "packages/render/lazy";
// const App = lazy(
//   () => import("./App"),
//   (module) => module.App
// );

const el = document.createElement("div");

document.body.append(el);

const X = () => {
  const [x, b] = useState(2112);

  useEffect(() => {
    setTimeout(() => {
      b(42)
    }, 4000)
  }, [])

  return (
    <>
      <div className="4">C1</div>
      <>F1</>
      <div className="5">C2 [{x}]<>xxx</></div>
    </>
  );
};
// Mx.render(
//   <>
//   <div className="xx">
//     x
//     <div className="1">y</div>
//     <>
//       1
//     </>
//     <X/>
//     <div className="2">
//       <div>2.1</div>
//       2.2
//       <div className="3" style={{height: "30px"}}>
//         <svg viewBox="0 0 1024 1024">
//           <path
//             style={{ cursor: "text" }}
//             d="M448 0c-247.36 0-448 200.64-448 448 0 122.624 49.504 233.504 129.376 314.496l-1.376 261.504 214.496-141.888c34.016 8.384 68.992 13.888 105.504 13.888 247.36 0 448-200.64 448-448s-200.64-448-448-448z"
//             stroke="inherit"
//           />
//         </svg>
//       </div>
//     </div>
//     END
//   </div></>)(el);

Mx.render(<div><App /></div>)(el);

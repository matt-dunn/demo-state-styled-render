/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

/** @jsx jsx **/

import { jsx } from "packages/render";
import myStyled from "packages/myStyled";

// Quick fix to allow stylelint to do it's thing:
const styled = myStyled;

export const Loader = styled("div")`
  display: inline-flex;
  align-items: center;

  &::before {
    content: " ";
    margin-right: 0.5rem;
    display: block;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    border: 0.15em solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: lds-dual-ring 1.2s linear infinite;
  }

  @keyframes lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;

export const SubtleLoader = myStyled(Loader)`
  opacity: 0.4;
  font-size: 0.85rem;
`;

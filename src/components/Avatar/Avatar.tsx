/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

/** @jsx jsx **/

import { jsx } from "packages/render";
import myStyled from "packages/myStyled";

import AvatarImage from "./assets/mjd.png";

// Quick fix to allow stylelint to do it's thing:
const styled = myStyled;

const Avatar$ = styled("aside")`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-weight: 200;

  a {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  a,
  a:hover {
    color: inherit;
    text-decoration: none;
  }

  h2 {
    display: flex;
    font-weight: lighter;
    font-size: 2rem;
    margin: 0;
    padding: 0;
    white-space: nowrap;
    line-height: 1;

    @media (min-width: 768px) {
      font-size: 2.75rem;
    }

    &::before {
      content: " ";
      background: url(${AvatarImage}) no-repeat 50% / cover #fff;
      border-radius: 500px;
      border: 1px solid #ccc;
      overflow: hidden;
      width: 1em;
      height: 1em;
      align-self: center;
      flex-shrink: 0;
      flex-grow: 0;
      margin-right: 0.5rem;
      opacity: 0.8;
      display: block;
    }
  }

  p {
    margin: 0;
    padding: 0;
    white-space: nowrap;
    font-size: 0.85rem;
  }
`;

export const Avatar = () => (
  <Avatar$>
    <a
      href="https://matt-dunn.github.io/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <h2>Matt Dunn</h2>

      <p>Senior User Interface / Full Stack Developer</p>
    </a>
  </Avatar$>
);

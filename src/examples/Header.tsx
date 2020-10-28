/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

/** @jsx jsx **/

import { jsx } from "packages/render";
import myStyled from "packages/myStyled";

import { Avatar } from "./Avatar";

// Quick fix to allow stylelint to do it's thing:
const styled = myStyled;

const Header$ = styled("header")`
  align-items: flex-end;
  padding: 0.5rem 0;
  margin-bottom: 1rem;
  border-bottom: 2px solid var(--secondary-color);
  background-color: var(--main-bg-color);
  z-index: 1;

  > h1 {
    flex-grow: 1;
    align-self: center;
    margin: 0 2rem 0.5rem 0;
    padding: 0;
    font-weight: 200;
    font-size: 1.25rem;

    @media (min-width: 576px) {
      margin-bottom: 0;
    }

    @media (min-width: 768px) {
      font-size: 1.75rem;
    }
  }

  @media (min-width: 576px) {
    display: flex;
  }

  @media (min-width: 768px) {
    position: sticky;
    top: 0;
  }
`;

export const Header = () => (
  <Header$>
    <h1>
      Pure TypeScript implementation of styled JSX functional components and
      state management
    </h1>
    <Avatar />
  </Header$>
);

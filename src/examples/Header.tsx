/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

/** @jsx createElement **/

import {createElement} from "packages/render";
import myStyled from "packages/myStyled";

import AvatarImage from "../../public/assets/mjd.png";

const Header$ = myStyled("header")`
  align-items: baseline;
  padding: 0.5rem 0;
  margin-bottom: 1rem;
  border-bottom: 1px solid #eee;
  background-color: #fff;
  z-index: 1;
  
  > h1 {
    flex-grow: 1;
    align-self: center;
    margin: 0 2rem 0.5rem 0;
    padding: 0;
    font-weight: 100;
    font-size: 3rem;
    line-height: 1.2;
    white-space: nowrap;

    @media (min-width: 576px) {
      margin-bottom: 0;
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

const Avatar$ = myStyled("aside")`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-weight: 200;

  a {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
    
  a, a:hover {
    color: inherit;
    text-decoration: none;
  }

  h2 {
    display: flex;
    font-weight: lighter;
    font-size: 2rem;
    margin: 0;
    padding: 0;

    &::before {
      content: " ";
      background: url(${AvatarImage}) no-repeat 50%/cover #fff;
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

export const Header = () => (
  <Header$>
    <h1>
      Todo <wbr/>App <small>🙀</small>
    </h1>
    <Avatar$>
      <a href="https://matt-dunn.github.io/" target="_blank" rel="noopener noreferrer">
        <h2>
          Matt Dunn
        </h2>

        <p className="text-muted">
          Senior User Interface / Full Stack Developer
        </p>
      </a>
    </Avatar$>
  </Header$>
);

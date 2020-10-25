# Pure TypeScript implementation of styled components

> Set of components inspired by styled-components

Styles components using [stylis](https://github.com/thysultan/stylis.js) under the hood with 
[tagged templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates). Includes rule collection for server-side rendering. 

Used for a series of tutorial workshops I have put together to demonstrate how Styled Components works under
the hood and **not intended for production use**.

---

## Example

```jsx
const StyledArticle = myStyled("article")`
  @media (min-width: 576px) {
    display: flex;
  }

  header {
    background-color: #aaa;
 
    h1 {
      color: #f00;
    }
  }

  input[type="checkbox"] {
    margin: 0 0.5rem;
  }

  p {
    flex-grow: 1;
  }
`;

export const MyComponent = () => (
  <StyledArticle>
    <header>
      <h1>Hello</h1>
    </header>
    <input type="checkbox" />
    <p>World</p>
  </StyledArticle>
);
```

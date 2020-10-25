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

  del {
    color: #aaa;
  }

  label {
    flex-grow: 1;
  }
  
  del {
    align-items: baseline;
  }

  input[type="checkbox"] {
    margin: 0 0.5rem 0 0;
  }
`;

export const MyComponent = () => (
  <StyledArticle>
    <header>
      <h1>Hello World</h1>
    </header>
  </StyledArticle>
);
```

# Pure TypeScript implementation of styled components

> Set of components inspired by styled-components

Styles components using [stylis](https://github.com/thysultan/stylis.js) under the hood with 
[tagged templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates). Includes rule collection for server-side rendering. 

Used for a series of tutorial workshops I have put together to demonstrate how Styled Components works under
the hood and **not intended for production use**.

---

## Examples

### Functional Component

```jsx
import myStyled from "packages/myStyled";

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

#### Dynamic styling

```tsx
import myStyled from "packages/myStyled";

type TodoItem = {
  id: string;
  text: string;
  complete: boolean;
};

type TodoProps = {
  todo: TodoItem;
  className?: string;
};

export const Todo = ({ todo: { text }, className }: TodoProps) => (
  <article className={className}>
    {text}
  </article>
);

const MyStyledTodo = myStyled(Todo)`
  background-color: ${({ todo }) => (todo.complete ? "#0f0" : "#f00")}
`;

export const MyComponent = () => (
  <>
    <MyStyledTodo todo={{id: "1", text: "My Todo", complete: true}} />
    <MyStyledTodo todo={{id: "2", text: "My Other Todo", complete: false}} />
  </>
);
```

### Vanilla DOM

```javascript
import { css } from "packages/myStyled";

const myComponentClassName = css`
  border: 1px solid red;
  
  &:hover {
    border: 1px solid blue;
  }
  
  label {
    border: 1px solid green;
  }
`;

const el = document.createElement("div");
el.classList.add(myComponentClassName);

const label = document.createElement("label");
label.innerText = "My Label";

el.append(label);
document.body.append(el);
```

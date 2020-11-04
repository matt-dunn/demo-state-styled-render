# Pure TypeScript implementation of rendering JSX functional components

> Set of components used to render JSX functional components

Used for a series of tutorial workshops I have put together to demonstrate how React works under
the hood and **not intended for production use**.

It does not have all performance optimisations including memo functionality for props / event
hooks or detection for cascading re-renders etc.

Features:

- JSX functional component rendering with virtual DOM
- DOM tree diff with updates applied only to changed elements / attributes
- Simple implementation of a React style hooks:
    - ```useState```
    - ```useEffect``` (does not have full support for unmounting components)
- JSX Fragments support

---

## Example

```tsx
/** @jsx jsx **/
/** @jsxFrag jsxFrag **/

import Mx, {jsx, jsxFrag} from "packages/render";

type MyComponentProps = {
  title: string;
}

const MyComponent = ({title}: MyComponentProps) => (
  <>
    <h1>{title}</h1>
    <p>World!</p>
  </>
);

const App = () => (
  <header>
    <MyComponent title="Hello"/>
  </header>
);

const el = document.createElement("div");

document.body.append(el);

Mx.render()(App)(el);
```

# Pure TypeScript implementation of rendering JSX functional components

> Set of components used to render JSX functional components

Used for a series of tutorial workshops I have put together to demonstrate how React works under
the hood and **not intended for production use**.

It does not have all performance optimisations including memo functionality for props / event
hooks or detection for cascading re-renders etc.

Features:

- JSX functional component rendering with virtual DOM
- DOM tree diff with updates applied only to changed elements / attributes
- ErrorBoundary component support - re-renders a component tree that contains exceptions
- Simple implementation of hooks:
    - [```useState```](./hooks/useState.ts)
    - [```useEffect```](./hooks/useEffect.ts) (does not have full support for unmounting components)
    - [```useContext```](./hooks/useContext.ts)
    - [```useError```](./hooks/useError.ts) (used in custom error boundary components)
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

### Error Boundary Component

```tsx
type ErrorBoundaryProps = {
  children: Node;
};

export const MyErrorBoundary = ({ children }: ErrorBoundaryProps) => {
  const [error, setError] = useState<Error | undefined>(undefined);

  useError(setError);

  if (error) {
    // Return something appropiate for an error...
    return <code>{error.message}</code>;
  }

  return children;
};
```

#### In use

```tsx
export const MyComponent = () => (
  <div>
    <MyErrorBoundary>
      <SomeOtherCompoennt />
    </MyErrorBoundary>
    <SomeDifferentCompoennt />
  </div>
);
```

Error boundary components can be nested to any level
and will execute the nearest error handling component
up the tree.

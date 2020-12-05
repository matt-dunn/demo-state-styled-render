# Pure TypeScript implementation of rendering JSX functional components

> Set of components used to render JSX functional components

Used for a series of tutorial workshops I have put together to demonstrate how React works under
the hood and **not intended for production use**.

It does not have all performance optimisations including memo functionality for props / event
hooks or detection for cascading re-renders etc.

Features:

- JSX functional component rendering with virtual DOM
- DOM tree diff with updates applied only to changed elements / attributes
- ErrorBoundary component support - re-renders a component tree that contains exceptions; supports nested boundaries
- Simple implementation of hooks:
    - [```useState```](./hooks/useState.ts)
    - [```useEffect```](./hooks/useEffect.ts)
    - [```useContext```](./hooks/useContext.ts)
    - [```useError```](./hooks/useError.ts) (used in custom error boundary components, see below)
- JSX Fragments support
- [Context](./context.ts) with providers
- [Lazy](./lazy.ts) component loading
- [Suspense](./Suspense.tsx)
- [Delay](./Delay.ts)
- [Mount](./test-utils/mount.ts) test utility and jest [snapshot serialization](./test-utils/jest/serialize-to-json.js)
- SVG support

---

## Example

```tsx
/** @jsx jsx **/
/** @jsxFrag jsxFrag **/

import Mx, { jsx, jsxFrag } from "packages/render";

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

Mx.render(App)(el);
```

### Error Boundary Component

See [useError](./hooks/useError.ts).

```tsx
/** @jsx jsx **/

import { jsx } from "packages/render";

type ErrorBoundaryProps = {
  children: Node;
};

export const MyErrorBoundary = ({ children }: ErrorBoundaryProps) => {
  const error = useError();

  if (error) {
    // Return something appropiate for an error...
    return <code>{error.message}</code>;
  }

  return children;
};
```

Error boundary components can be nested to any level
and will execute the nearest error handling component
up the tree.

#### In use

```tsx
/** @jsx jsx **/

import { jsx } from "packages/render";

export const MyComponent = () => (
  <div>
    <MyErrorBoundary>
      <SomeComponent />
    </MyErrorBoundary>
    <SomeComponent />
  </div>
);
```

##### Nested Error Boundaries

Error boundaries can be nested to any level. For example at the root for default capture and wrapped
around specific components for localised error handling,
 
```tsx
/** @jsx jsx **/

import { jsx } from "packages/render";

export const MyComponent = () => (
  <MyErrorBoundary>
    <article>
      <MyErrorBoundary>
        <SomeComponent />
      </MyErrorBoundary>
      <SomeComponent />
    </article>
  </MyErrorBoundary>
);
```

### Lazy Component Loading

See [lazy](./lazy.ts).

```tsx
import { lazy } from "packages/render/lazy";

const MyChildComponent = lazy(
  () => import("./containers/MyComponent"),
  (module) => module.MyComponent
);

const MyComponent = () => (
  <div>
    <MyChildComponent/>
  </div>
)
```


### Contexts

```tsx
/** @jsx jsx **/

import { jsx, useContext, createContext } from "packages/render";

const MyContext = createContext<number>();

const MyComponent = () => {
  const myNumber = useContext(MyContext);

  return (
    <div>{myNumber}</div>
  );
};

const App = () => (
  <MyContext.Provider value={42}>
    <MyComponent/>
  </MyContext.Provider>
);
```

### Testing

See [mount](./test-utils/mount.ts) utility.

```tsx
import { mount } from "packages/render/test-utils";

const deleteTodo: MockAction<TodoActions["deleteTodo"]> = createMockAction();
const updateTodo: MockAction<TodoActions["updateTodo"]> = createMockAction();

const fixture = { id: "1", text: "My Todo Item", complete: false };

const wrapper = mount(
  <Todo todo={fixture} deleteTodo={deleteTodo} updateTodo={updateTodo} />
);

expect(wrapper).toMatchSnapshot();

expect(updateTodo).not.toHaveBeenCalled();

wrapper.find("label").simulate("click");

expect(updateTodo).toHaveBeenCalledWith({
  id: "1",
  text: "My Todo Item",
  complete: true,
});

wrapper
  .find("input")
  .simulate("input", { target: { value: "update value" } });

wrapper.update();

wrapper.simulate("submit");

expect(createTodo).toHaveBeenCalledWith("update value");

expect(wrapper.find("del").hasClass("text-muted")).toEqual(true);

// Convoluted example of checking the child element tag names with forEach
const elementNames = ["LABEL", "DEL", "INPUT", "BUTTON"];

wrapper.find("*").forEach((el, i) => {
  expect(el.tagName).toEqual(elementNames[i]);
});

// Convoluted example of checking the child element tag names with map
const elementTagNames = wrapper
  .find("*")
  .map((el) => el.tagName.toLowerCase());

expect(elementTagNames).toEqual(["label", "del", "input", "button"]);
```

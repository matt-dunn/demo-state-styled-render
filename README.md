# Pure TypeScript implementation of styled JSX functional components and state management

[![Actions Status](https://github.com/matt-dunn/demo-state-styled-render/workflows/CI/badge.svg)](https://github.com/matt-dunn/demo-state-styled-render/actions)

> Simple vanilla, dependency free implementation of:
>
> - JSX functional component rendering with virtual DOM and simple hooks
> - Redux style state management
> - A Styled Component implementation

Intended as an illustration of how the basics and internals of React / Redux / Styled Components work under the hood
and **not intended for production use**.

View [demo](https://matt-dunn.github.io/demo-state-styled-render/).

---

Includes the following packages:

- [Functional component JSX rendering](./packages/render)
- [Redux style state management](./packages/state)
- [Styled Components implementation](./packages/myStyled)

Demonstrated with an example [Todo app](./src) 🙀.

Also includes:

- Simple implementation of a [test utility](./packages/render/test-utils/mount.ts) inspired by [Enzyme](https://enzymejs.github.io/enzyme/) to 
  [mount components and simulate events](./src/components/Todos/__tests__/Todo.spec.tsx).
- GitHub [workflow](./.github/workflows/ci.yml) for CI builds; runs the usual tasks and creates 
  sandboxed preview distributions hosted on gh-pages for each pull request and merges into master.
  
---

## Getting started

```shell script
yarn install
```

## Build

```shell script
yarn build
```

Build artifacts can be found in the ```dist``` directory.
 
## Development

```shell script
yarn start
```

The development version of the app will be started at ```https://localhost:1234``` using [Parcel](https://parceljs.org/)
with live reloading.

## Test

Run all tests using Jest with coverage.

```shell script
yarn test
```

---

## License

The MIT License (MIT) Copyright (c) 2020 [Matt Dunn](https://matt-dunn.github.io/)

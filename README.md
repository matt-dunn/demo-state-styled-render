# Pure TypeScript implementation of styled JSX functional components and state management

> Simple vanilla, dependency free implementation of:
>
> - JSX functional component rendering with simple hooks
> - Redux style state management
> - A Styled Component implementation

Intended as an illustration of how the basics and internals of React / Redux / Styled Components work under the hood
and **not intended for production use**.

View [demo](https://matt-dunn.github.io/demo-state-styled-render/).

---

Includes the following packages:

- [Redux style state management](./packages/state)
- [Functional component JSX rendering](./packages/render)
- [Styled Components implementation](./packages/myStyled)

Demonstrated with an example [Todo app](./src/examples/todo) 🙀.

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

## CI Workflow

Uses GitHub [workflow](./.github/workflows/ci.yml) for CI builds; runs tests and creates 
previews for pull requests and demo app for merges into master.

---

## License

The MIT License (MIT) Copyright (c) 2020 [Matt Dunn](https://matt-dunn.github.io/)

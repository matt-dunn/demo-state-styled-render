# Vanilla TypeScript State Management / JSX rendering / Styled Components implementation

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

## Development

```shell script
yarn start
```

## Test

Run all tests.

```shell script
yarn test
```

## CI Workflow

GitHub [workflow](./.github/workflows/ci.yml) to lint, run tests and create gh-pages preview for 
pull requests and merges into master.

---

## License

The MIT License (MIT) Copyright (c) 2020 [Matt Dunn](https://matt-dunn.github.io/)

# Vanilla State Management / JSX rendering / Styled Components example with sample Todo app

> Simple vanilla, dependency free demo of:
>
> - JSX functional component rendering with simple hooks
> - Redux style state management
> - Styled Component implementation (dependency on [stylis](https://github.com/thysultan/stylis.js) for parsing rules)

Intended as an illustration of how the basics of React / Redux / Styled Components work under the hood.
**Not intended for production use**.

View [demo](https://matt-dunn.github.io/demo-state-styled-render/).

---

Includes the following features:

- Redux style state management
- Functional component JSX rendering
- Simple implementation of a React style hooks:
    - very simple implementation of ```useState```
- DOM tree diff with updates applied only to changed elements / attributes (Does not have all performance optimisations including memo functionality for props / event hooks or detection for cascading re-renders etc.)
- Styled Components implementation

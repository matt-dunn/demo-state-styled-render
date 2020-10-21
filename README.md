# Vanilla redux / JSX renderer example with sample Todo app

Simple vanilla, dependency free demo of JSX functional components rendering with simple hooks and redux style state management. Intended as an illustration of the basics of React / Redux under the hood.

View [demo](https://matt-dunn.github.io/demo-state-styled-render/).

---

Includes the following features:

- Redux style state management
- Functional component JSX rendering
- Simple implementation of a React style hooks:
    - very simple implementation of ```useState```
- DOM tree diff with updates applied only to changed elements / attributes <small>(Does not have all performance optimisations including memo functionality for props / event hooks or detection for cascading re-renders etc.)</small>


# Pure TypeScript implementation Redux style state management

> A Redux style state implementation

Used for a series of tutorial workshops I have put together to demonstrate how Redux works under
the hood and **not intended for production use**.

---

## Example

```typescript
import {createAction, createReducer, createStore, getType} from "packages/state";

type TodoItem = {
  id: string;
  text: string;
  complete?: boolean;
}

type TodoItems = TodoItem[];

export const createTodo = createAction("todo/CREATE", (text: string, complete?: boolean): TodoItem =>
  ({ id: Date.now().toString(), text,  complete: complete ?? false})
);

export const deleteTodo = createAction("todo/DELETE", (id: string): string => id);

export const updateTodo = createAction("todo/UPDATE", (todo: TodoItem): TodoItem => todo);

export const actions = {
  createTodo,
  deleteTodo,
  updateTodo,
};

export type Actions = typeof actions;

const todoReducer = createReducer<TodoItems, any>({
  [getType(createTodo)]: (state, { payload }: ReturnType<Actions["createTodo"]>) => [...state, payload],
  [getType(deleteTodo)]: (state, { payload }: ReturnType<Actions["deleteTodo"]>) => state.filter(({id}) => id !== payload),
  [getType(updateTodo)]: (state, { payload }: ReturnType<Actions["updateTodo"]>) => state.map(todo => todo.id === payload.id ? payload : todo),
});

const initialState = {
  todos: [
    {id: "1", text: "Do something", complete: true}
  ]
};

const rootReducer = {
  todos: todoReducer
};

const store = createStore(rootReducer)(initialState);

store.subscribe(((state, prevState) => {
  console.log(state, prevState);
}));

store.dispatch(actions.createTodo("New Todo"));
```

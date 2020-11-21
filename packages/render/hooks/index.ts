/** !
 * Copyright (c) 2020, Matt Dunn
 *
 * @author Matt Dunn (https://matt-dunn.github.io/)
 * @licence MIT
 */

import { AnyCallback } from "../types";

export type HookID = number;

type HookOptions = {
  render: () => void;
};

export type HookImplementation = {
  type: string;
  cleanup?: AnyCallback;
};

export type HookImplementations = Array<HookImplementation | null>;

export class State<T> extends Array<HookContainer<T>> {
  constructor(...items: HookContainer<T>[]) {
    super(...items);

    Object.setPrototypeOf(this, State.prototype);
  }

  byType<T extends HookImplementation>(
    ...types: Omit<HookImplementation, "id">[]
  ): T[] {
    const filterType = types.map(({ type }) => type);
    return this.filter(
      (item) =>
        (item._value && filterType.indexOf(item._value.type) !== -1) || false
    ).map((item) => item._value) as T[];
  }
}

type Hook<T> = {
  index: number;
  state: State<T>;
  options: HookOptions;
};

export type Hooks<T> = Hook<T>[] & {
  [key: number]: Hook<T>;
};

export type HookContainer<T> = {
  _value: HookImplementation | null;
  options: HookOptions;
  getValue: () => T | undefined;
  setValue: (value: Omit<T, "id">) => T;
};

type HooksContainer = {
  setInsertMode: (insert: boolean) => void;
  register: (options: HookOptions) => HookID;
  setActive: (id: HookID) => void;
  getActive: <T>() => Hook<T>;
  getCurrent: <T = any>() => HookContainer<T>;
  inspectActive: <T = any>() => HookContainer<T> | undefined;
  beginCollect: () => void;
  collect: () => State<any>;
  removeHooks: (count: number) => void;
};

const hook = <T>(options: HookOptions): Hook<T> => ({
  index: 0,
  state: new State(),
  options,
});

const hookContainer = (hook: Hook<any>): HookContainer<any> => ({
  options: hook.options,
  _value: null,
  getValue() {
    return this._value;
  },
  setValue(value: Omit<HookImplementation, "id">) {
    this._value = value;

    return value;
  },
});

const ActiveHooks = (): HooksContainer => {
  let activeId: HookID | undefined;
  let hooks: Hooks<any> = [];
  let collectedHookStartIndex: number;
  let insertMode = false;

  const getActiveHook = (activeId?: HookID): Hook<any> => {
    if (activeId === undefined) {
      throw new TypeError("No active hooks");
    }

    return hooks[activeId];
  };

  const getActiveHookContainer = (
    activeId?: HookID,
    activeIndex?: number
  ): HookContainer<any> => {
    const hook = getActiveHook(activeId);
    const currentIndex = activeIndex ?? hook.index;

    if (insertMode) {
      hook.state.splice(currentIndex, 0, hookContainer(hook));
    }

    const hookState = hook.state[currentIndex];

    if (!hookState) {
      hook.state[currentIndex] = hookContainer(hook);
    }

    return hookState;
  };

  return {
    setInsertMode(insert) {
      insertMode = insert;
    },
    register(options) {
      hooks = [...hooks, hook(options)];
      return hooks.length - 1;
    },
    setActive: (id) => {
      activeId = id;
      hooks[activeId].index = 0;
    },
    getActive() {
      return getActiveHook(activeId);
    },
    getCurrent() {
      const current = getActiveHookContainer(activeId);
      this.getActive().index++;
      return current;
    },
    inspectActive() {
      return getActiveHookContainer(activeId, this.getActive().index - 1);
    },
    beginCollect() {
      collectedHookStartIndex = this.getActive().index;
    },
    collect() {
      const hook = this.getActive();
      const currentIndex = hook.index;

      if (currentIndex !== collectedHookStartIndex) {
        return new State(
          ...hook.state
            .slice(collectedHookStartIndex, currentIndex)
            .map((state) => state && { ...state })
        );
      }

      return new State();
    },
    removeHooks(count) {
      const hook = this.getActive();
      hook.state.splice(hook.index, count);
    },
  };
};

export default ActiveHooks();

export * from "./useState";
export * from "./useEffect";
export * from "./useContext";
export * from "./useError";

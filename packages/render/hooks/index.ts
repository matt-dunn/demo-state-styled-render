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
  id: HookID;
  type: string;
  cleanup?: AnyCallback;
};

export type HookImplementations = Array<HookImplementation | null>;

class State extends Array<HookImplementation | null> {
  constructor(...items: HookImplementations) {
    super(...items);

    Object.setPrototypeOf(this, State.prototype);
  }

  byType<T extends HookImplementation>(
    ...types: Omit<HookImplementation, "id">[]
  ): T[] {
    const filterType = types.map(({ type }) => type);
    return this.filter(
      (item) => (item && filterType.indexOf(item.type) !== -1) || false
    ) as T[];
  }
}

type Hook = {
  index: number;
  state: State;
  options: HookOptions;
};

export type Hooks = Hook[] & {
  [key: number]: Hook;
};

type HookContainer<T> = {
  options: HookOptions;
  getValue: () => T | undefined;
  setValue: (value: Omit<T, "id">) => T;
};

type HooksContainer = {
  setInsertMode: (insert: boolean) => void;
  register: (options: HookOptions) => HookID;
  setActive: (id: HookID) => void;
  getActive: () => Hook;
  getCurrent: <T = any>() => HookContainer<T>;
  inspectActive: <T = any>() => HookContainer<T> | undefined;
  beginCollect: () => void;
  collect: () => State;
  removeHooks: (count: number) => void;
};

const hook = (options: HookOptions): Hook => ({
  index: 0,
  state: new State(),
  options,
});

const ActiveHooks = (): HooksContainer => {
  let activeId: HookID | undefined;
  let hooks: Hooks = [];
  let collectedHookStartIndex: number;
  let insertMode = false;

  const getActiveHook = (activeId?: HookID): Hook => {
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
      hook.state.splice(currentIndex, 0, null);
    }

    const hookState = hook.state[currentIndex];

    return {
      options: hook.options,
      getValue: () => hookState,
      setValue: (value: Omit<HookImplementation, "id">) => {
        hook.state[currentIndex] = {
          id: currentIndex,
          ...value,
        };
        return value;
      },
    };
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

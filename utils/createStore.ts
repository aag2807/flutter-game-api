// deno-lint-ignore-file
import { action } from "./interfaces.d.ts";

export const createStore = (reducer: any, preloadedState: any) => {
  let currentReducer = reducer;
  let currentState = preloadedState;
  let currentListeners: any[] = [];
  let nextListeners = currentListeners;

  const getState = () => currentState;

  const dispatch = (action: action<any>) => {
    currentState = currentReducer(currentState, action);
    const listeners = (currentListeners = nextListeners);

    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
    }

    return action;
  };

  const subscribe = (listener: any) => {
    listener();
    nextListeners.push(listener);
  };

  return {
    getState,
    dispatch,
    subscribe,
  };
};

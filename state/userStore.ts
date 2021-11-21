import { createStore } from "../utils/createStore.ts";
import { action, IUser } from "../utils/interfaces.d.ts";

type actionNames = "SUBSCRIBE" | "LOGIN";

type userStoreType = {
  users: IUser[];
};

const initialUserStoreState: userStoreType = {
  users: [],
};

const reducer = (
  state: typeof initialUserStoreState,
  action: action<actionNames>,
): typeof state => {
  switch (action.type) {
    case "LOGIN":
      return state;

    case "SUBSCRIBE":
      return state;
    default:
      return state;
  }
};

const userStore = createStore(reducer, initialUserStoreState);

export { userStore };

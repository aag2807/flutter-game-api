// deno-lint-ignore-file
import createID from "../utils/uuid.ts";
import { createStore } from "../utils/createStore.ts";
import { IShopItem } from "../utils/interfaces.d.ts";
import { action } from "../utils/interfaces.d.ts";

type actionNames = "ADD" | "REMOVE" | "BUY"| "RESTOCK";

type shopStoreType = {
  storeItems: { [key: string]: IShopItem };
};

const initialShopState: shopStoreType = {
  storeItems: {},
};

const Reducer = (
  state: typeof initialShopState,
  action: action<actionNames>,
): typeof state => {
  
  switch (action.type) {
    case "ADD":
      let itemToAdd = {
        id: createID(),
        ...action.payload,
      };
      state.storeItems[itemToAdd.id] = itemToAdd;
      return state;

    case "REMOVE":
      if (!!state.storeItems[action.payload]) {
        delete state.storeItems[action.payload];
      }
      return state;
   
    case "BUY":
      state.storeItems[action.payload].quantity--
      return state;

    case "RESTOCK":
      for(let key in state.storeItems) {
        state.storeItems[key].quantity = 5;
      }
      return state;
    default:
      return state;
  }
};

let shopStore = createStore(Reducer, initialShopState);

export { shopStore };

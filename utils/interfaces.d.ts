// deno-lint-ignore-file

export interface IShop {
  completePurchase(ctxt: any): void;

  restock(ctxt: any): void;

  showAllItems(ctxt: any): void;
}

export interface IShopItem {
  id: string;
  quantity: number;
  name: string;
  price: number;
}

export type action<T> = {
  type: T;
  payload?: any;
};

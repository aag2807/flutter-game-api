// deno-lint-ignore-file

export interface IShop {
  storeGreeting(ctx: any): void;

  showAllItems(ctx: any): void;

  showAllItems(ctxt: any): void;

  purchaseItem(ctx: any): void;

  getItem(ctx: any): void;

  restock(ctx: any): void;
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

export interface IUser {
  id: string;
  name: string;
  email: string;
  isLoggedIn: boolean;
  lastTImeLoggedIn: Date;
}

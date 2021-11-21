import { IShopItem } from "./interfaces.d.ts";

export interface ItemSchema extends IShopItem {
  _id: { $oid: string };
}

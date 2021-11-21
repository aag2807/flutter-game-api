// deno-lint-ignore-file
import { IShop } from "../utils/interfaces.d.ts";
import { shopStore } from "../state/shopStore.ts";
import MongoAdapter from "../utils/mongoAdapter.ts";

class Shop implements IShop {
  private DBAdapter: MongoAdapter = new MongoAdapter();

  /**
   * calls bootstrap store and creates 3 items that are inserted
   * for testing purposes
   * @constructor
   */
  constructor() {
    console.log(this.DBAdapter)
    this.bootStrapStore();
  }

  bootstrapShop(ctx: any): void {
    ctx.response.body = {
      message: "Bootstrapped shop mongodatabase ",
    };
  }

  private bootStrapStore(): void {
    shopStore.dispatch({
      type: "ADD",
      payload: { quantity: 5, name: "iron sword", price: 100 },
    });

    shopStore.dispatch({
      type: "ADD",
      payload: { quantity: 5, name: "Leather Shield", price: 80 },
    });

    shopStore.dispatch({
      type: "ADD",
      payload: { quantity: 5, name: "Small Health Potion", price: 35 },
    });
  }

  public storeGreeting(ctx: any): void {
    ctx.response.status = 204;
    ctx.response.body = "Hello there stranger.";
  }

  public showAllItems(ctx: any): void {
    let { storeItems } = shopStore.getState();
    ctx.response.status = 200;
    ctx.response.body = storeItems;
  }

  public purchaseItem(ctx: any): void {
    ctx.response.status = 200;
    let id = ctx.params.id;
    let { storeItems } = shopStore.getState();

    if (storeItems[id].quantity > 0) {
      shopStore.dispatch({
        type: "BUY",
        payload: id,
      });
      ctx.response.body = {
        message: "Purchase successful.",
        remainingQuantity: storeItems[id].quantity,
      };
    } else {
      ctx.response.body = {
        message: "Unsuccessfull purchase.",
        motive: "Store has a quantity of 0 for this item.",
      };
    }
  }

  public getItem(ctx: any): void {
    ctx.response.status = 200;
    let { storeItems } = shopStore.getState();
    let id = ctx.params.id;
    ctx.response.body = storeItems[id];
  }

  public restock(ctx: any): void {
    let { storeItems } = shopStore.getState();

    for (let key in storeItems) {
      storeItems[key].quantity = 5;
    }

    shopStore.dispatch({
      type: "RESTOCK",
    });

    ctx.response.body = {
      message: "Store successfully restocked",
    };
  }
}

export default Shop;

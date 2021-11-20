// deno-lint-ignore-file
import { IShop, IShopItem } from "../utils/interfaces.d.ts";
import { shopStore } from "../state/shopStore.ts";

class Shop implements IShop {
  constructor() {
    this.bootStrapStore();
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

  public storeGreeting(ctxt: any): void {
    ctxt.response.body = "Hello there stranger.";
  }

  public showAllItems(ctxt: any): void {
    let { storeItems } = shopStore.getState();
    ctxt.response.body = storeItems;
  }

  public purchaseItem(ctx: any): void {
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
    }else {
      ctx.response.body = {
        message:'Unsuccessfull purchase.',
        motive: 'Store has a quantity of 0 for this item.'
      }
    }
  }

  public getItem(ctx: any): void {
    let { storeItems } = shopStore.getState();
    let id = ctx.params.id;
    ctx.response.body = storeItems[id];
  }

  completePurchase(): string {
    throw new Error("Method not implemented.");
  }

  restock(): void {
    throw new Error("Method not implemented.");
  }
}

export default Shop;

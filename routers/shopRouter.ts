import { Router } from "https://deno.land/x/oak/mod.ts";
import Shop from "../models/shop.ts";

const shopController = new Shop();

const ShopRouter = new Router();

ShopRouter
  .get("/shop", shopController.storeGreeting)
  .get("/shop/items", shopController.showAllItems)
  .get("/shop/items/:id", shopController.getItem)
  .post("/shop/items/restock", shopController.restock)
  .post("/shop/purchase/:id", shopController.purchaseItem);

export default ShopRouter;

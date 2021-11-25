import { Bson, MongoClient } from "https://deno.land/x/mongo@v0.28.0/mod.ts";
import { shopStore } from "../state/shopStore.ts";
import { IShopItem } from "./interfaces.d.ts";
import { mapToArray } from "./mapToArray.ts";

const client = new MongoClient();

class MongoAdapter {
  private db: any;
  private itemsCollection: any;

  constructor() {
    (async () => {
      await this.bootstrapConnection();
    })();
  }

  private async bootstrapConnection(): Promise<void> {
    try {
      await client.connect("mongodb://127.0.0.1:27017");
      await this.bootstrapDB();
    } catch (err) {
      console.log(err);
    } finally {
      console.log("COMPLETED BOOTSTRAP FOR DATABASE`");
    }
  }

  private async bootstrapDB(): Promise<void> {
    try {
      this.db = await client.database("rpg");
      this.itemsCollection = await this.db.collection("items");
    } catch (err) {
      console.log(err);
    }
  }

  public insertAllItems(): void {
    const { storeItems: state } = shopStore.getState();
    const itemsArray = mapToArray(state);
    console.log(itemsArray);
  }

  public async getAllItems(): Promise<Array<IShopItem>> {
    const items = await this.itemsCollection.find().toArray();
    return items;
  }
}

export default MongoAdapter;

import { Application } from "https://deno.land/x/oak/mod.ts";
import ShopRouter from "./routers/shopRouter.ts";

const app = new Application();

app.use(ShopRouter.routes());

console.log("running");

await app.listen({ port: 8080 });

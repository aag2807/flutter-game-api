import { Application } from "https://deno.land/x/oak/mod.ts";
import ShopRouter from "./routers/shopRouter.ts";

const app = new Application();

app.use(ShopRouter.routes());

await app.listen({ port: 8080 });

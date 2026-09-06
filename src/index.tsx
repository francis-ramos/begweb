import { serve } from "bun";
import index from "./index.html";
import { SearchRoutes } from "./utils";

let routes: any = {};
await SearchRoutes("./src/routes", async (data: any) => {
  for (let [k, v] of data) {
    routes[k] = v;
  }
});

const server = serve({
  routes: {
    "/*": index,
    ...routes
  },

  development: process.env.NODE_ENV !== "production",
});

console.log(`Server running at ${server.url}`);

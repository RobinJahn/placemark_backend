import Hapi from "@hapi/hapi";
import Inert from "@hapi/inert";
import Vision from "@hapi/vision";
import Cookie from "@hapi/cookie";

import dotenv from "dotenv";

import { apiRoutes } from "./api-routes.js";
import { db } from "./models/db.js";

const result = dotenv.config();
if (result.error) {
  console.log(result.error.message);
}

async function init() {
  const server = Hapi.server({
    port: process.env.PORT || 4000,
    routes: { cors: true },
  });

  await server.register(Inert);
  await server.register(Vision);
  await server.register(Cookie);

  db.init("mongo");

  server.route(apiRoutes);

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

await init();

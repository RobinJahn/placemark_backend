import Hapi from "@hapi/hapi";
import Inert from "@hapi/inert";
import Vision from "@hapi/vision";
import jwt from "hapi-auth-jwt2";
import HapiSwagger from "hapi-swagger";
import dotenv from "dotenv";

import Joi from "joi";
import Handlebars from "handlebars";
import { fileURLToPath } from "url";
import path from "path";

import { validate } from "./api/jwt-utils.js";
import { apiRoutes } from "./api-routes.js";
import { db } from "./models/db.js";
import { webRoutes } from "./web-routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const result = dotenv.config();
if (result.error) {
  console.log(result.error.message);
}

const swaggerOptions = {
  info: {
    title: "Placemark API",
    version: "0.1",
  },
  securityDefinitions: {
    jwt: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
    },
  },
  security: [{ jwt: [] }],
};

async function init() {
  const server = Hapi.server({
    port: process.env.PORT || 4000,
    routes: {
      cors: true,
    },
  });

  await server.register(Inert);
  await server.register(Vision);
  await server.register(jwt);

  server.views({
    engines: {
      html: Handlebars,
    },
    relativeTo: __dirname,
    path: "./views",
    layout: false,
    isCached: false,
  });

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ]);
  server.validator(Joi);

  server.auth.strategy("jwt", "jwt", {
    key: process.env.COOKIE_PASSWORD,
    validate: validate,
    verifyOptions: { algorithms: ["HS256"] },
  });

  db.init("mongo");

  server.route(apiRoutes);
  server.route(webRoutes);

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

await init();

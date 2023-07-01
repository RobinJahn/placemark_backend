import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { StatisticArray, StatisticTypeSpec } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const statisticApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      console.log("find statistics:", request.query.type);
      try {
        if (!(await db.userStore.isAdmin(request.auth.credentials._id))) {
          return Boom.unauthorized("Not an Admin");
        }

        const statistics = await db.statisticStore.getAllStatisticsOfType(request.query.type);
        return statistics;
      } catch (err) {
        console.log("Error in /find", err);
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get all statistics",
    notes: "Returns details of all statistics. Requires Admin privileges",
    validate: { query: StatisticTypeSpec, failAction: validationError },
    response: { schema: StatisticArray, failAction: validationError },
  },
};

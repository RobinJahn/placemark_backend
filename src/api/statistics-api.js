import Boom from "@hapi/boom";
import { db } from "../models/db.js";

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
  },
};

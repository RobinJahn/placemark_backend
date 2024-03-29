import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { adminUser } from "../../test/fixtures.js";

export const testApi = {
  apiTest: {
    auth: false,
    handler: async function (request, h) {
      return { message: "Api callback" };
    },
    tags: ["api"],
    description: "Test the API",
    notes: "Returns a message to confirm the API is working",
  },

  testCreateAdminUser: {
    auth: false,
    handler: async function (request, h) {
      console.log("testCreateAdminUser");
      try {
        const userToCreate = adminUser;
        userToCreate.isAdmin = true;

        // check if admin user already exists
        const userToCheck = await db.userStore.getUserByEmail(userToCreate.email);
        if (userToCheck) {
          if (!userToCheck.isAdmin) {
            return Boom.badRequest("Admin user already exists but is not an admin");
          }
          return Boom.conflict("Admin user already exists");
        }

        const user = await db.userStore.addUser(userToCreate);
        if (user) {
          db.statisticStore
            .addStatistic({
              objectCategory: "user",
              id: user._id,
            })
            .catch((error) => {
              console.log(error);
            });

          return h.response(user).code(201);
        }
        return Boom.badImplementation("error creating user");
      } catch (err) {
        console.log("Error in /create", err);
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  testDeleteAllUsers: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      console.log("testDeleteAllUsers");
      try {
        // authorise only testAdminUser
        const user = await db.userStore.getUserById(request.auth.credentials._id);
        if (user.email !== adminUser.email || user.password !== adminUser.password) {
          return Boom.unauthorized("Not Authorised");
        }

        await db.userStore.deleteAllUsers();
        return h.response().code(204);
      } catch (err) {
        console.log("Error in /deleteAll", err);
        return Boom.serverUnavailable("Database Error");
      }
    },
  },
};

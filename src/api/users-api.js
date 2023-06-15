import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { createToken } from "./jwt-utils.js";

export const userApi = {
  find: {
    auth: false,
    handler: async function (request, h) {
      console.log("find");
      try {
        const users = await db.userStore.getAllUsers();
        return users;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  findOne: {
    auth: false,
    handler: async function (request, h) {
      console.log("findOne");
      try {
        const user = await db.userStore.getUserById(request.params.id);
        if (!user) {
          return Boom.notFound("No User with this id");
        }
        return user;
      } catch (err) {
        return Boom.serverUnavailable("No User with this id");
      }
    },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      console.log("create");
      try {
        const user = await db.userStore.addUser(request.payload);
        if (user) {
          return h.response(user).code(201);
        }
        return Boom.badImplementation("error creating user");
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteAll: {
    auth: false,
    handler: async function (request, h) {
      console.log("deleteAll");
      try {
        await db.userStore.deleteAllUsers();
        return h.response().code(204);
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  authenticate: {
    auth: false,
    handler: async function (request, h) {
      console.log("authenticate");
      try {
        console.log("started function authenticate");
        const user = await db.userStore.getUserByEmail(request.payload.email);
        console.log("got user from db: ", user);
        if (!user) {
          console.log("user not found");
          return Boom.unauthorized("User not found");
        }
        if (user.password !== request.payload.password) {
          console.log("invalid password");
          return Boom.unauthorized("Invalid password");
        }
        const token = createToken(user);
        console.log("token created: ", token);
        return h.response({ success: true, token: token, _id: user._id }).code(201);
      } catch (err) {
        console.log("error in authenticate: ", err);
        return Boom.serverUnavailable("Database Error");
      }
    },
  },
};

import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { createToken } from "./jwt-utils.js";
import { IdSpec, JwtAuth, UserArray, UserCredentialsSpec, UserSpec, UserSpecPlus } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";

export const userApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      console.log("find users");
      try {
        if (!(await db.userStore.isAdmin(request.auth.credentials._id))) {
          return Boom.unauthorized("Not an Admin");
        }

        const users = await db.userStore.getAllUsers();
        return users;
      } catch (err) {
        console.log("Error in /find", err);
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get all users",
    notes: "Returns details of all users",
    response: { schema: UserArray, failAction: validationError },
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      console.log("findOne user");
      try {
        if (!(await db.userStore.isAdmin(request.auth.credentials._id)) && request.params.id.toString() !== request.auth.credentials._id.toString()) {
          return Boom.unauthorized("Not an Admin");
        }

        const user = await db.userStore.getUserById(request.params.id);

        if (!user) {
          return Boom.notFound("No User with this id");
        }
        return user;
      } catch (err) {
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get a specific user",
    notes: "Returns user details",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: UserSpecPlus, failAction: validationError },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      console.log("create user");
      try {
        const userToCreate = request.payload;
        userToCreate.isAdmin = false;

        // check if mail already exists
        const userWithSameMail = await db.userStore.getUserByEmail(userToCreate.email);
        if (userWithSameMail) {
          return Boom.conflict("User with this e-mail already exists");
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
    tags: ["api"],
    description: "Create a User",
    notes: "Returns the newly created user",
    validate: { payload: UserSpec, failAction: validationError },
    response: { schema: UserSpecPlus, failAction: validationError },
  },

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      console.log("deleteOne user");
      try {
        if (!(await db.userStore.isAdmin(request.auth.credentials._id)) && request.params.id.toString() !== request.auth.credentials._id.toString()) {
          return Boom.unauthorized("Not an Admin");
        }

        const user = await db.userStore.deleteUserById(request.params.id);
        return h.response(user).code(204);
      } catch (err) {
        console.log("Error in /deleteOne", err);
        return Boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      console.log("deleteAll users");

      if (!(await db.userStore.isAdmin(request.auth.credentials._id))) {
        return Boom.unauthorized("Not an Admin");
      }

      try {
        await db.userStore.deleteAllNonAdminUsers();
        return h.response().code(204);
      } catch (err) {
        console.log("Error in /deleteAll", err);
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all users excluding admin-users",
    notes: "Removes all users excluding admin-users",
  },

  authenticate: {
    auth: false,
    handler: async function (request, h) {
      console.log("authenticate user");
      try {
        const user = await db.userStore.getUserByEmail(request.payload.email);
        if (!user) {
          return Boom.unauthorized("User not found");
        }
        if (user.password !== request.payload.password) {
          return Boom.unauthorized("Invalid password");
        }

        db.statisticStore
          .addStatistic({
            objectCategory: "login",
            id: user._id,
          })
          .catch((error) => {
            console.log(error);
          });

        const token = createToken(user);
        return h.response({ success: true, token: token, _id: user._id }).code(201);
      } catch (err) {
        console.log("Error in /authenticate", err);
        return Boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Authenticate  a User",
    notes: "If user has valid email/password, create and return a JWT token",
    validate: { payload: UserCredentialsSpec, failAction: validationError },
    response: { schema: JwtAuth, failAction: validationError },
  },
};

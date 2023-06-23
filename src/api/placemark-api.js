import boom from "@hapi/boom";
import { db } from "../models/db.js";

export const placemarkApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const placemarks = await db.placemarkStore.getAllPlacemarks();
        return placemarks;
      } catch (err) {
        return boom.serverUnavailable("Database Error");
      }
    },
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
        if (!placemark) {
          return boom.notFound("No Placemark with this id");
        }
        return placemark;
      } catch (err) {
        return boom.serverUnavailable("No Placemark with this id");
      }
    },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const placemark = await db.placemarkStore.addPlacemark(request.payload);
        if (placemark) {
          return h.response(placemark).code(201);
        }
        return boom.badImplementation("error creating placemark");
      } catch (err) {
        return boom.serverUnavailable("Database Error");
      }
    },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        await db.placemarkStore.deleteAllPlacemarks();
        return h.response().code(204);
      } catch (err) {
        return boom.serverUnavailable("Database Error");
      }
    },
  },

  update: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      try {
        const response = await db.placemarkStore.updatePlacemark(request.params.id, request.payload);
        if (!response) {
          return boom.notFound("No Placemark with this id");
        }
        return h.response(response).code(204);
      } catch (err) {
        return boom.serverUnavailable("Database Error");
      }
    },
  },
};

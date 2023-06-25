import boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, PlacemarkArray, PlacemarkSpec, PlacemarkSpecForUpdate, PlacemarkSpecPlus } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";
import { imageStore } from "../models/image-store.js";

export const placemarkApi = {
  find: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      console.log("find placemarks");
      try {
        const placemarks = await db.placemarkStore.getAllPlacemarks();
        return placemarks;
      } catch (err) {
        return boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Get all placemarks",
    notes: "Returns details of all placemarks",
    response: { schema: PlacemarkArray, failAction: validationError },
  },

  findOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      console.log("findOne placemark");
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
    tags: ["api"],
    description: "Get a specific placemark",
    notes: "Returns placemark details",
    validate: { params: { id: IdSpec }, failAction: validationError },
    response: { schema: PlacemarkSpecPlus, failAction: validationError },
  },

  create: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      console.log("create placemark");
      try {
        const sentPlacemark = request.payload;

        const user = request.auth.credentials;
        sentPlacemark.user = user;

        const placemark = await db.placemarkStore.addPlacemark(sentPlacemark);
        if (placemark) {
          return h.response(placemark).code(201);
        }
        return boom.badImplementation("error creating placemark");
      } catch (err) {
        console.log(err);
        return boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Create a new placemark",
    notes: "Returns the created placemark",
    validate: { payload: PlacemarkSpec, failAction: validationError },
    response: { schema: PlacemarkSpecPlus, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      console.log("deleteAll placemarks");
      try {
        await db.placemarkStore.deleteAllPlacemarks();
        return h.response().code(204);
      } catch (err) {
        return boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete all placemarks",
    notes: "Deletes all placemarks from the database",
  },

  update: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      console.log("update placemark");
      try {
        const response = await db.placemarkStore.updatePlacemark(request.params.id, request.payload);
        if (!response) {
          return boom.notFound("No Placemark with this id");
        }
        return h.response(response).code(200);
      } catch (err) {
        return boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Update a placemark",
    notes: "Updates a placemark in the database",
    validate: { params: { id: IdSpec }, payload: PlacemarkSpecForUpdate, failAction: validationError },
    response: { schema: PlacemarkSpecPlus, failAction: validationError },
  },

  addImage: {
    auth: false,
    handler: async function (request, h) {
      try {
        console.log("upload image");
        // console.log(request.payload);

        const file = request.payload.image;
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(request.payload.image);
          console.log("Image upload successful");
          console.log(url);
          await db.placemarkStore.addImage(request.params.id, url);
        }

        const placemark = await db.placemarkStore.getPlacemarkById(request.params.id);
        return placemark;
      } catch (err) {
        console.log(err);
        return boom.badImplementation(err);
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
  },
};

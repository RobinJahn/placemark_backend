import boom from "@hapi/boom";
import { db } from "../models/db.js";
import { IdSpec, ImageSpec, ImageUrlSpec, PlacemarkArray, PlacemarkSpec, PlacemarkSpecForUpdate, PlacemarkSpecPlus } from "../models/joi-schemas.js";
import { validationError } from "./logger.js";
import { imageStore } from "../models/image-store.js";

export const placemarkApi = {
  findAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      console.log("find placemarks");
      try {
        const user = request.auth.credentials;
        const placemarks = await db.placemarkStore.getAllPlacemarks(user);
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
        const user = request.auth.credentials;
        const placemark = await db.placemarkStore.getPlacemarkById(request.params.id, user);
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
          db.statisticStore
            .addStatistic({
              objectCategory: "placemark",
              id: placemark._id,
            })
            .catch((error) => {
              console.log(error);
            });

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

  deleteOne: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      console.log("deleteOne placemark");
      try {
        const user = request.auth.credentials;
        const response = await db.placemarkStore.deletePlacemarkById(request.params.id);
        if (!response) {
          return boom.notFound("No Placemark with this id");
        }
        return h.response().code(204);
      } catch (err) {
        return boom.serverUnavailable("Database Error");
      }
    },
    tags: ["api"],
    description: "Delete a placemark",
    notes: "Deletes a placemark from the database",
    validate: { params: { id: IdSpec }, failAction: validationError },
  },

  deleteAll: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      console.log("deleteAll placemarks");
      try {
        const user = request.auth.credentials;
        await db.placemarkStore.deleteAllPlacemarks(user);
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
        const user = request.auth.credentials;
        const response = await db.placemarkStore.updatePlacemark(request.params.id, request.payload, user);
        if (!response) {
          return boom.notFound("No Placemark with this id");
        }
        return h.response(response).code(200);
      } catch (err) {
        console.log(err);
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
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      console.log("upload image");
      try {
        // console.log(request.payload);
        const user = request.auth.credentials;
        const placemark = await db.placemarkStore.getPlacemarkById(request.params.id, user);
        if (!placemark) {
          return boom.notFound("There is no placemark with this id or you are not the owner");
        }

        const file = request.payload.image;
        if (Object.keys(file).length > 0) {
          const url = await imageStore.uploadImage(request.payload.image);
          console.log("Image upload successful");
          console.log(url);
          await db.placemarkStore.addImage(request.params.id, url, user);

          db.statisticStore
            .addStatistic({
              objectCategory: "image",
              id: url,
            })
            .catch((error) => {
              console.log(error);
            });
        }

        const placemarkAfterUpdate = await db.placemarkStore.getPlacemarkById(request.params.id, user);
        return placemarkAfterUpdate;
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
    tags: ["api"],
    description: "Upload an image",
    notes: "Upload an image to a placemark",
    validate: { params: { id: IdSpec }, payload: ImageSpec, failAction: validationError },
    response: { schema: PlacemarkSpecPlus, failAction: validationError },
  },

  deleteImage: {
    auth: {
      strategy: "jwt",
    },
    handler: async function (request, h) {
      console.log("delete image");
      try {
        const user = request.auth.credentials;
        const placemark = await db.placemarkStore.getPlacemarkById(request.params.id, user);
        if (!placemark) {
          return boom.notFound("There is no placemark with this id or you are not the owner");
        }

        const { imageUrl } = request.payload;

        await imageStore.deleteImage(imageUrl);
        await db.placemarkStore.deleteImage(request.params.id, imageUrl);

        const placemarkAfterDelete = await db.placemarkStore.getPlacemarkById(request.params.id, user);
        return placemarkAfterDelete;
      } catch (err) {
        console.log(err);
        return boom.badImplementation(err);
      }
    },
    tags: ["api"],
    description: "Delete an image",
    notes: "Delete an image from a placemark",
    validate: { params: { id: IdSpec }, payload: ImageUrlSpec, failAction: validationError },
    response: { schema: PlacemarkSpecPlus, failAction: validationError },
  },
};

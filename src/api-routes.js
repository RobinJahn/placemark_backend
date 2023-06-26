import { userApi } from "./api/users-api.js";
import { placemarkApi } from "./api/placemark-api.js";
import { testApi } from "./api/test-api.js";

export const apiRoutes = [
  { method: "GET", path: "/api/users", config: userApi.find },
  { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
  { method: "POST", path: "/api/users", config: userApi.create },
  { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
  { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },

  { method: "GET", path: "/api/placemarks", config: placemarkApi.findAll },
  { method: "GET", path: "/api/placemarks/{id}", config: placemarkApi.findOne },
  { method: "POST", path: "/api/placemarks", config: placemarkApi.create },
  { method: "DELETE", path: "/api/placemarks", config: placemarkApi.deleteAll },
  { method: "PUT", path: "/api/placemarks/{id}", config: placemarkApi.update },
  { method: "POST", path: "/api/placemarks/{id}/addImage", config: placemarkApi.addImage },
  { method: "DELETE", path: "/api/placemarks/{id}/deleteImage", config: placemarkApi.deleteImage },

  { method: "GET", path: "/api/apitest", config: testApi.apitest },
];

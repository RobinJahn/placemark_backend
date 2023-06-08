import { connectMongo } from "./mongo/connect.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { placemarkMongoStore } from "./mongo/placemark-mongo-store.js";

export const db = {
  userStore: null,
  placemarkStore: null,

  init(storeType) {
    switch (storeType) {
      case "mongo":
        this.userStore = userMongoStore;
        this.placemarkStore = placemarkMongoStore;
        connectMongo();
        break;
      default:
    }
  },
};

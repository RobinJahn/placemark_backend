import { connectMongo } from "./mongo/connect.js";
import { userMongoStore } from "./mongo/user-mongo-store.js";
import { placemarkMongoStore } from "./mongo/placemark-mongo-store.js";
import { statisticMongoStore } from "./mongo/statistics-mongo-store.js";

export const db = {
  userStore: null,
  placemarkStore: null,
  statisticStore: null,

  init(storeType) {
    switch (storeType) {
      case "mongo":
        this.userStore = userMongoStore;
        this.placemarkStore = placemarkMongoStore;
        this.statisticStore = statisticMongoStore;
        connectMongo();
        break;
      default:
    }
  },
};

import { Placemark } from "./placemark.js";

export const placemarkMongoStore = {
  async getAllPlacemarks() {
    const placemarks = await Placemark.find().lean();
    return placemarks;
  },

  async getPlacemarkById(id) {
    if (id) {
      const placemark = await Placemark.findOne({ _id: id }).lean();
      return placemark;
    }
    return null;
  },

  async addPlacemark(placemark) {
    const newPlacemark = new Placemark(placemark);
    let placemarkObj = null;
    for (let i = 0; i < 5; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      placemarkObj = await newPlacemark.save();
      if (placemarkObj) {
        break;
      }
    }
    const p = await this.getPlacemarkById(placemarkObj._id);
    return p;
  },

  async deletePlacemarkById(id) {
    try {
      await Placemark.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllPlacemarks() {
    await Placemark.deleteMany({});
  },

  async updatePlacemark(newPlacemark) {
    const placemark = await Placemark.findOne({ _id: newPlacemark._id });
    placemark.name = newPlacemark.name;
    placemark.lat = newPlacemark.lat;
    placemark.lng = newPlacemark.lng;
    placemark.image_list = newPlacemark.image_list; // TODO: check if list is updated correctly
    await placemark.save();
  },
};

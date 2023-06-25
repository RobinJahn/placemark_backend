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
    // tries 5 times to save the placemark
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

  async updatePlacemark(id, newPlacemark) {
    const placemark = await Placemark.findOne({ _id: id });
    if (!placemark) {
      return null;
    }

    // update palcemak with new Placemak data in one call without replacing additional attriebutes of palcemark
    Object.assign(placemark, newPlacemark);

    await placemark.save();

    const p = await this.getPlacemarkById(id);
    return p;
  },

  async addImage(id, url) {
    const placemark = await Placemark.findOne({ _id: id });
    if (!placemark) {
      return null;
    }

    placemark.image_list.push(url);
    await placemark.save();

    const p = await this.getPlacemarkById(id);
    return p;
  },

  async deleteImage(id, url) {
    const placemark = await Placemark.findOne({ _id: id });
    if (!placemark) {
      return null;
    }

    const index = placemark.image_list.indexOf(url);
    if (index > -1) {
      placemark.image_list.splice(index, 1);
      await placemark.save();
    }

    const p = await this.getPlacemarkById(id);
    return p;
  },
};

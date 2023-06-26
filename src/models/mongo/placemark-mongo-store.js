import { Placemark } from "./placemark.js";

export const placemarkMongoStore = {
  async getAllPlacemarks(user) {
    const placemarks = await Placemark.find({ user: user }).lean();
    return placemarks;
  },

  async getPlacemarkById(id, user) {
    if (id) {
      const placemark = await Placemark.findOne({ _id: id, user: user }).lean();
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
    const p = await this.getPlacemarkById(placemarkObj._id, placemarkObj.user);
    return p;
  },

  async deletePlacemarkById(id) {
    try {
      await Placemark.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async deleteAllPlacemarks(user) {
    await Placemark.deleteMany({ user: user });
  },

  async updatePlacemark(id, newPlacemark, user) {
    const placemark = await Placemark.findOne({ _id: id, user: user }).lean();
    if (!placemark) {
      return null;
    }

    Object.assign(placemark, newPlacemark);

    await placemark.save();

    const p = await this.getPlacemarkById(id, user);
    return p;
  },

  async addImage(id, url, user) {
    const placemark = await Placemark.findOne({ _id: id });
    if (!placemark) {
      return null;
    }

    placemark.image_list.push(url);
    await placemark.save();

    const p = await this.getPlacemarkById(id, user);
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

    const p = await this.getPlacemarkById(id, placemark.user);
    return p;
  },
};

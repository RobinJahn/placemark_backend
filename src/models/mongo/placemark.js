import Mongoose from "mongoose";

const { Schema } = Mongoose;

const placemarkSchema = new Schema({
  name: String,
  lat: Number,
  lng: Number,
  user: String,

  image_list: [String],
});

export const Placemark = Mongoose.model("Placemark", placemarkSchema);

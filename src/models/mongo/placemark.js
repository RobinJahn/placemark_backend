import Mongoose from "mongoose";
import { User } from "./user.js";

const { Schema } = Mongoose;

const placemarkSchema = new Schema({
  name: String,
  description: String,
  category: String,
  image_list: [String],

  lat: Number,
  lng: Number,

  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Placemark = Mongoose.model("Placemark", placemarkSchema);

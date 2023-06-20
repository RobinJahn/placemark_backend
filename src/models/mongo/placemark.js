import Mongoose from "mongoose";
import { User } from "./user.js";

const { Schema } = Mongoose;

const placemarkSchema = new Schema({
  name: String,
  lat: Number,
  lng: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  description: String,
  image_list: [String],
});

export const Placemark = Mongoose.model("Placemark", placemarkSchema);

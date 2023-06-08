import Mongoose from "mongoose";

const { Schema } = Mongoose;

const placemarkShema = new Schema({
  name: String,
  lat: Number,
  lng: Number,
  user: String,
});

export const Placemark = Mongoose.model("Placemark", placemarkShema);

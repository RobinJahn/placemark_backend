import Mongoose from "mongoose";

const { Schema } = Mongoose;

const placemarkShema = new Schema({
  name: String,
});

export const Placemark = Mongoose.model("Placemark", placemarkShema);

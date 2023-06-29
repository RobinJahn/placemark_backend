import Mongoose from "mongoose";

const { Schema } = Mongoose;

const statisticSchema = new Schema({
  creationDate: Date,
  objectCategory: String,
  id: String,
});

export const Statistic = Mongoose.model("Statistic", statisticSchema);

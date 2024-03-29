import * as cloudinary from "cloudinary";
import { writeFileSync } from "fs";
import dotenv from "dotenv";

dotenv.config();

const credentials = {
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
};
cloudinary.config(credentials);

export const imageStore = {
  getAllImages: async function () {
    const result = await cloudinary.v2.api.resources();
    return result.resources;
  },

  uploadImage: async function (imagefile) {
    await writeFileSync("./temp.img", imagefile);
    const response = await cloudinary.v2.uploader.upload("./temp.img");
    return response.url;
  },

  deleteImage: async function (imgUrl) {
    let img = imgUrl.split("/").pop();
    img = img.split(".").shift();

    await cloudinary.v2.uploader.destroy(img, {});
  },
};

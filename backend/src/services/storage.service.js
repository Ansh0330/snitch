import ImageKit from "@imagekit/nodejs";
import { config } from "../config/config.js";

const client = new ImageKit({
  privateKey: config.IMAGEKIT_PRIVATE_KEY, // This is the default and can be omitted
});

export const uploadImage = async ({ buffer, filename, folder = "luxe" }) => {
  try {
    const result = await client.files.upload({
      file: await ImageKit.toFile(buffer),
      fileName: filename,
      folder: folder,
    });
    return result;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Error uploading image");
  }
};

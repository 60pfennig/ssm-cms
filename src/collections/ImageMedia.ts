import { CollectionConfig } from "payload/dist/collections/config/types";
import { normalizeAudio } from "../lib/normalizeAudio";

export const ImageMedia: CollectionConfig = {
  slug: "imageMedia",
  upload: {
    staticURL: "/media/images",
    staticDir: process.env.IMAGE_FILE_STORAGE_PATH,
    mimeTypes: ["image/*"],
  },
  fields: [],
  access: {
    read: () => true,
  },
};

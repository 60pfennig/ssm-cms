import { CollectionConfig } from "payload/dist/collections/config/types";

export const SoundMedia: CollectionConfig = {
  slug: "soundMedia",
  upload: {
    staticURL: "/media/audio",
    staticDir: process.env.SOUND_FILE_STORAGE_PATH,
    mimeTypes: ["audio/*"],
  },
  fields: [],
  access: {
    read: () => true,
  },
};

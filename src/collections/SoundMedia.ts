import { CollectionConfig } from "payload/dist/collections/config/types";
import { normalizeAudio } from "../lib/normalizeAudio";

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
  hooks: {
    beforeChange: [
      (args) => {
        const fileName = args.data.filename;
        if (process.env.SOUND_FILE_STORAGE_PATH)
          normalizeAudio(process.env.SOUND_FILE_STORAGE_PATH, fileName);
      },
    ],
  },
};

import {
  Collection,
  CollectionConfig,
} from "payload/dist/collections/config/types";
import { SoundMedia } from "./SoundMedia";
import { Workshops } from "./Workshops";
import { ImageMedia } from "./ImageMedia";

export const Sounds: CollectionConfig = {
  slug: "sounds",
  fields: [
    { type: "text", name: "name", required: true },
    { type: "relationship", name: "workshop", relationTo: Workshops.slug },
    {
      type: "row",
      fields: [
        {
          type: "number",
          name: "lat",
          required: true,
        },
        {
          type: "number",
          name: "lng",
          required: true,
        },
      ],
    },
    {
      type: "upload",
      relationTo: SoundMedia.slug,
      name: "audioFile",
      required: true,
    },
    {
      type: "text",
      name: "description",
    },
    {
      type: "upload",
      relationTo: ImageMedia.slug,
      name: "image",
      required: false,
    },
  ],
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "name",
  },
};

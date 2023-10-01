import { CollectionConfig } from "payload/dist/collections/config/types";

export const Workshops: CollectionConfig = {
  slug: "workshops",
  fields: [
    {
      type: "text",
      name: "name",
    },
  ],
};

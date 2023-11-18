import { buildConfig } from "payload/config";
import path from "path";
import Users from "./collections/Users";
import { payloadCloud } from "@payloadcms/plugin-cloud";
import { Sounds } from "./collections/Sounds";
import { SoundMedia } from "./collections/SoundMedia";
import { Workshops } from "./collections/Workshops";

export default buildConfig({
  admin: {
    user: Users.slug,
    webpack: (config) => {
      return {
        ...config,
        resolve: {
          ...config.resolve,
          fallback: {
            ...config.resolve.fallback,
            fs: false,
            path: false,
            os: false,
            child_process: false,
          },
        },
      };
    },
  },

  collections: [Users, Sounds, SoundMedia, Workshops],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  plugins: [],
  cors: ["http://localhost:3001", "http://localhost:3000"],
});

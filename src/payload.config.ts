import { buildConfig } from "payload/config";
import path from "path";
import Users from "./collections/Users";
import { payloadCloud } from "@payloadcms/plugin-cloud";
import { Sounds } from "./collections/Sounds";
import { SoundMedia } from "./collections/SoundMedia";
import { Workshops } from "./collections/Workshops";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { ImageMedia } from "./collections/ImageMedia";

const mockNormalizeFunction = path.resolve(__dirname, "mock/emptyObject.js");
const realNormalizeFunction = path.resolve(__dirname, "lib/normalizeAudio");

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    webpack: (config) => {
      return {
        ...config,
        resolve: {
          ...config.resolve,
          alias: {
            ...config.resolve.alias,
            [realNormalizeFunction]: mockNormalizeFunction,
          },
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
  db: mongooseAdapter({ url: process.env.MONGODB_URI }),
  editor: lexicalEditor(),
  collections: [Users, SoundMedia, ImageMedia, Sounds, Workshops],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  plugins: [],
  cors: ["http://localhost:3001", "http://localhost:3000"],
});

import { webpackBundler } from "@payloadcms/bundler-webpack";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload/config";
import { ImageMedia } from "./collections/ImageMedia";
import { SoundMedia } from "./collections/SoundMedia";
import { Sounds } from "./collections/Sounds";
import Users from "./collections/Users";
import { Workshops } from "./collections/Workshops";

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
            readline: false,
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
  cors: process.env.FRONTEND_BASE_URI !== undefined ? [process.env.FRONTEND_BASE_URI, "http://localhost:8081"] : [],
});

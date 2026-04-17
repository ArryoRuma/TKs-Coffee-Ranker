import { defineCollection, defineContentConfig } from "@nuxt/content";
import { resolve } from "node:path";

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: "data",
      source: {
        cwd: resolve("app/content"),
        include: "**/*.yml",
      },
    }),
  },
});

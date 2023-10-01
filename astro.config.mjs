import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  site: "https://yrogovich.github.io",
  base: "polish-modernism/",
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./src/styles/utils.scss";`
        }
      }
    }
  },
  integrations: [react(), compress()]
});
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://yrogovich.github.io',
  base: '/polish-modernism',
  output: 'static',
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./src/styles/utils.scss";`
        }
      }
    }
  }
});

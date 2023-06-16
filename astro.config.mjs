import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import vue from "@astrojs/vue";
import sitemap from "@astrojs/sitemap";
import image from "@astrojs/image";
import svgLoader from "vite-svg-loader";

// https://astro.build/config
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: 'https://boboszoomeranime.vercel.app',
  vite: {
    plugins: [vue({
      appEntrypoint: '/src/pages/_app.ts'
    }), svgLoader()]
  },
  integrations: [tailwind(), vue({
    appEntrypoint: '/src/pages/_app.ts'
  }), sitemap(), image(), mdx()]
});
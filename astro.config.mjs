import { defineConfig } from "astro/config";

// https://astro.build/config
import tailwind from "@astrojs/tailwind";
import vue from "@astrojs/vue";
// import sitemap from "@astrojs/sitemap";
import image from "@astrojs/image";
import svgLoader from "vite-svg-loader";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [vue(), svgLoader()],
  },
  integrations: [
    tailwind(),
    // vue({ appEntrypoint: "/src/pages/_app.ts" }),
    // sitemap(),
    image(),
  ],
});

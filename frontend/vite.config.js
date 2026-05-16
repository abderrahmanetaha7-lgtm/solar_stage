import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import sitemap from "vite-plugin-sitemap";

import viteImagemin from "vite-plugin-imagemin";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),

    sitemap({
      hostname: "https://mayasol.com",
    }),

    viteImagemin({
      mozjpeg: {
        quality: 75,
      },

      pngquant: {
        quality: [0.7, 0.8],
      },

      svgo: {
        plugins: [
          {
            removeViewBox: false,
          },
        ],
      },
    }),
  ],
});

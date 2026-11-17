import tailwindcss from "@tailwindcss/vite";
import type { StorybookConfig } from "@storybook/nextjs-vite";

/**
 * Storybook runs on the Vite builder rather than webpack, so Tailwind v4 is
 * handled by its official `@tailwindcss/vite` plugin. That keeps the token
 * pipeline identical to the Next build: one `globals.css` entry which imports
 * `src/styles/tokens.css`.
 */
const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y"],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {},
  },
  typescript: {
    // `react-docgen-typescript` spins up a full TS program per file, which
    // costs more memory than a static build has to spare here. The lighter
    // AST-based docgen still gives props tables for these components.
    reactDocgen: "react-docgen",
  },
  staticDirs: ["../public"],
  viteFinal: async (viteConfig) => {
    // Tailwind v4 is a Vite plugin; the Next build uses the Turbopack loader
    // instead. Both read the same `globals.css`, so the token layer is
    // identical in Storybook and in the app.
    viteConfig.plugins = [...(viteConfig.plugins ?? []), tailwindcss()];
    // Keep the static build within this machine's memory budget: the Rust
    // minifier is what runs out of headroom, and a review build does not
    // need minified output or sourcemaps.
    viteConfig.build = {
      ...viteConfig.build,
      minify: false,
      sourcemap: false,
    };
    return viteConfig;
  },
};

export default config;

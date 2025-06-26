import { defineConfig, presetMini } from "unocss";

export default defineConfig({
  presets: [presetMini()],
  preflights: [
    {
      getCSS: () => `
        body {
          margin: 0;
          padding: 0;
        }
      `,
    },
  ],
  theme: {
    colors: {
      primary: "#C890A7",
    },
  },
});

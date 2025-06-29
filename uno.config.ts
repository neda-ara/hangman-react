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
    breakpoints: {
      "1800": "1800px",
      "1440": "1440px",
      "1280": "1280px",
      "1024": "1024px",
      "900": "900px",
      "768": "769px",
      "600": "600px",
      "480": "480px",
      "375": "375px",
    },
  },
});

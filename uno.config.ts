import { defineConfig } from "unocss";

export default defineConfig({
  preflights: [
    {
      getCSS: () => `
        body {
          margin: 0;
          padding: 0;
          min-height: 100vh;
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

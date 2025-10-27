import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  server: {
    host: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@public": path.resolve(__dirname, "./public"),
      "@books": path.resolve(__dirname, "./src/components/Books"),
      "@chapters": path.resolve(__dirname, "./src/components/Chapters"),
      "@general": path.resolve(__dirname, "./src/components/general"),
      "@singleChapter": path.resolve(__dirname, "./src/components/SingleChapter"),
      "@ui": path.resolve(__dirname, "./src/components/ui"),
      "@auth": path.resolve(__dirname, "./src/pages/auth"),
      "@dashboard": path.resolve(__dirname, "./src/pages/dashboard"),
      "@placeholder": path.resolve(__dirname, "./src/placeholder"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@services": path.resolve(__dirname, "./src/api/services"),
      "@api": path.resolve(__dirname, "./src/api"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@context": path.resolve(__dirname, "./src/context"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@containers": path.resolve(__dirname, "./src/components/SingleChapter/Containers"),
    }
  }
});

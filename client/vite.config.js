import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/TiffinDelight/",
  define: {
    "import.meta.env.VITE_BACKEND_URL": JSON.stringify(
      process.env.VITE_BACKEND_URL ||
        "https://tiffindelight-backend.onrender.com"
    ),
  },
  server: {
    port: 3001,
    open: true,
  },
});

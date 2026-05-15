import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  cloudflare: false,
  envPrefix: ["VITE_", "SUPABASE_"],
  plugins: [tsconfigPaths()],
  tanstackStart: {
    server: { entry: "server" },
  },
});

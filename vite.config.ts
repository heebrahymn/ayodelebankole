import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import tsconfigPaths from "vite-tsconfig-paths";
import EnvironmentPlugin from "vite-plugin-environment";

export default defineConfig({
  cloudflare: false,
  envPrefix: ["VITE_", "SUPABASE_"],
  plugins: [
    tsconfigPaths(),
    EnvironmentPlugin(["SUPABASE_URL", "SUPABASE_ANON_KEY"]),
  ],
  tanstackStart: {
    server: { entry: "server" },
  },
});

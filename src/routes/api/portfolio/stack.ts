import { createFileRoute } from "@tanstack/react-router";
import { apiData } from "@/lib/api-data";

export const Route = createFileRoute("/api/portfolio/stack")({
  server: {
    handlers: {
      GET: async () =>
        new Response(JSON.stringify(apiData.stack, null, 2), {
          headers: { "Content-Type": "application/json" },
        }),
    },
  },
});

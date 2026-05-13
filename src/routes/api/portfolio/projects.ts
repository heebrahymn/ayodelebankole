import { createFileRoute } from "@tanstack/react-router";
import { apiData } from "@/lib/api-data";

export const Route = createFileRoute("/api/portfolio/projects")({
  server: {
    handlers: {
      GET: async () =>
        new Response(JSON.stringify(apiData.projects, null, 2), {
          headers: { "Content-Type": "application/json" },
        }),
    },
  },
});

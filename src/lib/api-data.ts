import projects from "./content/projects.json";
import stack from "./content/stack.json";
import experience from "./content/experience.json";

export const apiData = {
  projects: {
    status: 200,
    count: projects.length,
    results: projects.map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      stack: p.stack,
      metric: p.metric,
    })),
  },
  stack: {
    status: 200,
    count: Object.values(stack).flat().length,
    results: stack,
  },
  experience: {
    status: 200,
    count: experience.length,
    results: experience,
  },
};

export type Endpoint = keyof typeof apiData;

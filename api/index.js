export default async function handler(request) {
  const server = await import('../dist/server/server.js');
  return server.default(request);
}

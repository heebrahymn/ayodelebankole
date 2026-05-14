async function processRequest(req, res) {
  const server = await import('../dist/server/server.js');
  
  let request;
  
  // Vercel passes Node.js IncomingMessage in some environments/configurations.
  // We must ensure we pass a standard Web Request to the TanStack Start handler.
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  
  // req.url in Node.js is just the path/query
  const fullUrl = req.url.startsWith('http') ? req.url : `${protocol}://${host}${req.url}`;
  
  request = new Request(fullUrl, {
    method: req.method,
    headers: req.headers,
    body: ['GET', 'HEAD'].includes(req.method) ? undefined : req,
    duplex: 'half',
  });

  const response = await server.default(request);
  return response;
}

export const GET = processRequest;
export const POST = processRequest;
export const PUT = processRequest;
export const PATCH = processRequest;
export const DELETE = processRequest;
export const OPTIONS = processRequest;
export default processRequest;

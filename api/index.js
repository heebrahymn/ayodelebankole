async function processRequest(req, res) {
  const server = await import('../dist/server/server.js');
  
  let request = req;
  
  // If req is a Node.js IncomingMessage (missing .url as a full URL or missing .text())
  // we manually construct a Web Request.
  if (!req.url.startsWith('http')) {
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const fullUrl = `${protocol}://${host}${req.url}`;
    
    // Construct Web Request
    request = new Request(fullUrl, {
      method: req.method,
      headers: req.headers,
      body: ['GET', 'HEAD'].includes(req.method) ? undefined : req,
      duplex: 'half',
    });
  }

  const response = await server.default(request);
  
  // If we were passed a Node.js res object (and we didn't return a Response directly to Vercel),
  // we should pipe it. But exporting GET/POST should make Vercel handle the returned Response.
  return response;
}

export const GET = processRequest;
export const POST = processRequest;
export const PUT = processRequest;
export const PATCH = processRequest;
export const DELETE = processRequest;
export const OPTIONS = processRequest;
export default processRequest;

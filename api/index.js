import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function processRequest(req, res) {
  try {
    const serverPath = path.join(__dirname, '../dist/server/server.js');
    const server = await import(pathToFileURL(serverPath).href);
    
    // Vercel passes Node.js IncomingMessage. 
    // We must ensure we pass a standard Web Request to the TanStack Start handler.
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const fullUrl = req.url.startsWith('http') ? req.url : `${protocol}://${host}${req.url}`;
    
    const request = new Request(fullUrl, {
      method: req.method,
      headers: req.headers,
      body: ['GET', 'HEAD'].includes(req.method) ? undefined : req,
      duplex: 'half',
    });

    const response = await server.default(request);
    
    // Convert Web Response back to Node.js response
    res.statusCode = response.status;
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    const body = await response.text();
    res.end(body);
  } catch (error) {
    console.error('Vercel Handler Error:', error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`Internal Server Error: ${error.message}\n${error.stack}`);
  }
}

export const GET = processRequest;
export const POST = processRequest;
export const PUT = processRequest;
export const PATCH = processRequest;
export const DELETE = processRequest;
export const OPTIONS = processRequest;
export default processRequest;

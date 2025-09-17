import { createServer } from 'http';
import { createReadStream, stat } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');
const DIST = join(__dirname, '..', 'dist');

const port = process.env.PORT || process.env.port || 5173;

const mime = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'application/javascript; charset=utf-8'],
  ['.mjs', 'application/javascript; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.svg', 'image/svg+xml'],
  ['.png', 'image/png'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.gif', 'image/gif'],
  ['.woff', 'font/woff'],
  ['.woff2', 'font/woff2'],
]);

function sendFile(res, path, contentType) {
  stat(path, (err, stats) => {
    if (err || !stats.isFile()) {
      res.statusCode = 404;
      res.setHeader('content-type', 'text/plain; charset=utf-8');
      res.end('Not found');
      return;
    }
    res.statusCode = 200;
    if (contentType) res.setHeader('content-type', contentType);
    const stream = createReadStream(path);
    stream.pipe(res);
    stream.on('error', () => {
      res.statusCode = 500;
      res.end('Server error');
    });
  });
}

const server = createServer((req, res) => {
  try {
    const url = decodeURI(req.url || '/');
    // Avoid directory traversal
    const safePath = url.split('?')[0].replace(/\/+$/, '') || '/';
    const filePath = join(DIST, safePath === '/' ? 'index.html' : safePath);
    const ext = extname(filePath).toLowerCase();

    if (ext) {
      const type = mime.get(ext) || 'application/octet-stream';
      sendFile(res, filePath, type);
      return;
    }

    // If no extension, try the file; otherwise fallback to index.html for SPA
    stat(filePath, (err, stats) => {
      if (!err && stats.isFile()) {
        sendFile(res, filePath, 'text/html; charset=utf-8');
      } else {
        // SPA fallback
        sendFile(res, join(DIST, 'index.html'), 'text/html; charset=utf-8');
      }
    });
  } catch (e) {
    res.statusCode = 500;
    res.end('Server error');
  }
});

server.listen(port, () => {
  console.log(`Serving ./dist on http://localhost:${port}`);
});

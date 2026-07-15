const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 4173;
const root = __dirname;
// O site é publicado em /MmaWorld/ no GitHub Pages; localmente simulamos o mesmo prefixo.
const basePath = '/MmaWorld';

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
};

http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split('?')[0]);

  if (urlPath === '/' || urlPath === basePath) {
    res.writeHead(302, { Location: basePath + '/' });
    res.end();
    return;
  }

  if (urlPath.startsWith(basePath + '/')) {
    urlPath = urlPath.slice(basePath.length);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end(`Not found — acesse http://localhost:${port}${basePath}/`);
    return;
  }

  if (urlPath.endsWith('/')) urlPath += 'index.html';
  const filePath = path.normalize(path.join(root, urlPath));

  // Impede path traversal (../../etc) — o arquivo final precisa ficar dentro de root
  if (!filePath.startsWith(root + path.sep) && filePath !== root) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      fs.readFile(path.join(root, 'pages', '404.html'), (err2, notFoundPage) => {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(notFoundPage || 'Not found');
      });
      return;
    }
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': mime[ext] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(port, () => console.log(`Serving on http://localhost:${port}`));

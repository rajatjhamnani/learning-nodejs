// const http = require("http");

// const server = http.createServer((req, res) => {
//   console.log(req);
// });
// server.listen(3000, () => {
//   console.log("rajat");
// });

const { createServer } = require('node:http');

const hostname = '127.0.0.1';
const port = 4000;

const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<h1>Rajat</h1>');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

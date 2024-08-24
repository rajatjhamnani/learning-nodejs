// const http = require("http");

// const server = http.createServer((req, res) => {
//   console.log(req);
// });
// server.listen(3000, () => {
//   console.log("rajat");
// });

const http = require("node:http");

const routes=require('./routes')
const hostname = "127.0.0.1";
const port = 4000;
console.log(routes.someText)
const server = http.createServer(routes.handler)
  
  

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// const http = require("http");

// const server = http.createServer((req, res) => {
//   console.log(req);
// });
// server.listen(3000, () => {
//   console.log("rajat");
// });

const http = require('node:http');

const hostname = '127.0.0.1';
const port = 4000;

const server = http.createServer((req, res) => {
  console.log(req.url , req.method , req.headers)
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  // res.write('<html>')
  // res.write('<head><title> My first page</title></head> ')
  // res.write('<body><h1> hello from my node js server</h1></body> ')
  // res.write('</html>')
  // res.end('<h1>Rajat</h1>');
  if(req.url==='/'){
    res.end('<h1>started server</h1>')
  }
  else if(req.url=='/home'){
    res.end('<h1>welcome home</h1>')
    
  }else if(req.url=='/about'){
    res.end('<h1>welcome to my About us page</h1>')
  }else if(req.url=='/node'){
    res.end('<h1>welcome to my Node js project</h1>')
  }else{
    res.statusCode=404;
    res.end('<h1>404 Not Found</h1>')
  }
  //process.exit()
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


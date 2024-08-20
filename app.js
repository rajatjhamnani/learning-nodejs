// const http = require("http");

// const server = http.createServer((req, res) => {
//   console.log(req);
// });
// server.listen(3000, () => {
//   console.log("rajat");
// });

const http = require("node:http");
const fs = require("fs");
const hostname = "127.0.0.1";
const port = 4000;
let lastMessage=""
const server = http.createServer((req, res) => {
  let method = req.method;
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");

  if (req.url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write('<body><form action="/message" method="POST">');
    res.write(`<h1>${lastMessage}</h1>`);
    res.write('<input type="text" name="message">');
    res.write('<button type="submit">Send</button>');
    res.write("</form></body>");
    res.write("</html>");
    return res.end();
  }

  if (req.url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });

    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
lastMessage=message
      // Writing to file with error handling
      fs.writeFile("message.txt", message, (err) => {
        if (err) {
          console.error("Error writing to file:", err);
          res.statusCode = 500;
          res.end("<h1>Server Error</h1>");
          return;
        }

        // Redirect after successful file write
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  } else if (req.url === "/home") {
    res.end("<h1>Welcome home</h1>");
  } else if (req.url === "/about") {
    res.end("<h1>Welcome to my About Us page</h1>");
  } else if (req.url === "/node") {
    res.end("<h1>Welcome to my Node.js project</h1>");
  } else {
    res.statusCode = 404;
    res.end("<h1>404 Not Found</h1>");
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

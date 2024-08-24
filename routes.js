const fs=require('fs')
 let lastMessage=""
const requestHandler=(req , res)=>{
  let method=req.method
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
}

//module.exports=requestHandler
module.exports={
  handler:requestHandler,
  someText:'second Handler'
}
//can export like this also
// module.exports.handler=requestHandler
// module.exports.someText='second handler'

//another shortcut
// exports.handler=requestHandler
// exports.someText='second handler'
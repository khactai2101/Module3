require("dotenv").config();
const http = require("http");
const port = process.env.PORT || 3000;
const fs = require("fs");
const url = require("url");
const { log } = require("console");

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  const readGetForm = fs.readFileSync("./templates/get-form.html", "utf8");
  const readPostForm = fs.readFileSync("./templates/post-form.html", "utf8");
  res.writeHead(200, { "Content-Type": "text/html; charset=utf8" });
  if (pathname === "/" || pathname === "/search") {
    res.write(readGetForm);
    console.log(query, "query");
  } else if (pathname === "/login") {
    if (req.method == "POST") {
      let data = "";
      req
        .on("error", (err) => {
          console.log(err);
        })
        .on("data", (chunk) => {
          console.log(chunk, "chunk");
          data += chunk;
        })
        .on("end", () => {
          console.log(data, "data");
        });
    }
    res.write(readPostForm);
  } else {
    res.write("<h1>404</h1>");
  }
  res.end();
});
server.listen(port, () => {
  console.log(`server listening on http://localhost:${port}/`);
});

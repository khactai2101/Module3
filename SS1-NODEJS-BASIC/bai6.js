require("dotenv").config();
const port = 2023;
const http = require("http");
const fs = require("fs");
const url = require("url");

let replaceTemplate = (temp, product) => {
  let output = temp.replace(/{{productName}}/g, product.productName);
  output = output.replace(/{{id}}/g, product.id);
  output = output.replace(/{{image}}/g, product.image);
  output = output.replace(/{{from}}/g, product.from);
  output = output.replace(/{{from}}/g, product.from);
  output = output.replace(/{{nutrients}}/g, product.nutrients);
  output = output.replace(/{{quantity}}/g, product.quantity);
  output = output.replace(/{{price}}/g, product.price);
  output = output.replace(/{{description}}/g, product.description);

  if (!product.organic) {
    output = output.replace(/{{not_organic}}/g, "not-organic");
  }
  return output;
};

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  const data = JSON.parse(fs.readFileSync("./dev-data/data.json", "utf8"));

  const tempSearch = fs.readFileSync("./templates/template-search.html");

  const tempProduct = fs.readFileSync(
    "./templates/template-product.html",
    "utf8"
  );
  const tempCard = fs.readFileSync("./templates/template-card.html", "utf8");
  const tempOverview = fs.readFileSync(
    "./templates/template-overview.html",
    "utf8"
  );

  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });

  if (pathname === "/" || pathname === "/home") {
    res.write("This is homepage");
  } else if (pathname === "/overview") {
    const cardHtml = data.map((el) => replaceTemplate(tempCard, el)).join("");
    const output = tempOverview.replace("{{productCards}}", cardHtml);
    res.write(output);
  } else if (pathname === "/product") {
    const productQuery = data[query.id];
    if (productQuery) {
      const output = replaceTemplate(tempProduct, productQuery);
      res.write(output);
    } else {
      res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      res.write("Product not found");
    }
  } else if (pathname === "/search") {
    res.write(tempSearch);

    if (query.search && typeof query.search === "string") {
      const newData = data.filter((item) =>
        item.productName.toLowerCase().includes(query.search.toLowerCase())
      );
      const mapData = newData
        .map((el) => replaceTemplate(tempCard, el))
        .join("");
      res.write(mapData);
    }
  } else if (pathname === "/card") {
    res.write(tempCard);
  } else if (pathname === "/api") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(data));
  } else {
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    res.write("This is not found page");
  }
  res.end();
});

server.listen(port, () => {
  console.log(`Server dang chay port http://localhost:${port}/`);
});

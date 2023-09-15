const { log } = require("console");
require("dotenv").config();
const http = require("http");
const url = require("url");
const fs = require("fs");
console.log(process.env.PORT, "PORT");
// khởi tạo server bằng câu lệnh http.createServer(callback (req, res))
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  //   console.log(query, "query");
  //viết header cho network server
  //writeHead(200, {'Content-Type': 'text/html'});
  //STT connected, content type:(html || Text || json)
  // res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });

  // //readFile là 1 hàm có sẵn của FileSystem dùng đọc file và có cơ chế bất đồng bộ
  // // cấu trúc: fs.readFile(file, charset, callback);
  // //file: đường dẫn đến file cần đọc
  // // charset: trình mã biên dịch (utf8 thông dụng)
  // // callback: là 1 hàm callback có sẵn của file system dùng để đọc file và có cơ chế bất đồng bộ
  // const readFile = fs.readFile("./mergedFile.txt", "utf8", (err, data) => {
  //   if (err) {
  //     res.end("loi");
  //   } else {
  //     res.end(data);
  //   }
  // });

  // //writeFile là 1 hàm có sẵn của FileSystem dùng để ghi file và có cơ chế bất đồng bộ
  // // cấu trúc: fs.writeFile(file, data, charset, callback);
  // //file: đường dẫn đến file cần đọc
  // //data: data cần ghi vào file
  // // charset: trình mã biên dịch (utf8 thông dụng)
  // // callback: là 1 hàm callback có sẵn của file system dùng để đọc file và có cơ chế bất đồng bộ
  // const writeFile = fs.writeFile(
  //   "./test.txt",
  //   "hehehehe",
  //   "utf8",
  //   (err, data) => {
  //     if (err) {
  //       res.end("loi");
  //     } else {
  //       res.end(data);
  //     }
  //   }
  // );

  // if (pathname === "/product") {
  //   res.write("<h1 style='color:blue'>Hello Product</h1>");
  // } else if (pathname === "/user") {
  //   res.write("<h1 style='color:red'>Hello User</h1>");
  // } else {
  //   // Đường dẫn không phù hợp với bất kỳ điều kiện nào, gửi phản hồi mặc định
  //   res.write("<h1>Hello Home</h1>");
  // }
  // res.end();
});
// Nội dung bạn muốn thêm vào tệp Hello.txt
// const newData = "This is the new content to be added.";
// // Sử dụng writeFile để thêm nội dung vào tệp Hello.txt
// fs.writeFile("../Hello.txt", newData, { flag: "a" }, (err) => {
//   if (err) {
//     console.error("Lỗi khi ghi vào tệp Hello.txt:", err);
//   } else {
//     console.log("Đã ghi nội dung vào tệp Hello.txt thành công.");
//   }
// });
// const newData2 = "This is the new content to be added.";
// // Sử dụng writeFile để thêm nội dung vào tệp Hello.txt
// fs.writeFile("./Hello2.txt", newData, { flag: "a" }, (err) => {
//   if (err) {
//     console.error("Lỗi khi ghi vào tệp Hello.txt:", err);
//   } else {
//     console.log("Đã ghi nội dung vào tệp Hello.txt thành công.");
//   }
// });

// //sử dung readFileSync để đọc file txt
// const data = fs.readFileSync("./Hello.txt", "utf8");
// console.log(data);

// // Đọc nội dung từ tệp thứ nhất
// const file1Content = fs.readFileSync("./Hello.txt", "utf-8");

// Đọc nội dung từ tệp thứ hai
const file2Content = fs.readFileSync("./Hello2.txt", "utf-8");

// // Gộp nội dung của hai tệp
// const mergedContent = file1Content + "\n" + file2Content;

// // Ghi nội dung gộp vào tệp thứ ba hoặc tệp gốc (file1.txt hoặc file2.txt)
// fs.writeFileSync("mergedFile.txt", mergedContent, "utf-8");

// console.log("Đã gộp nội dung hai tệp và lưu vào mergedFile.txt.");

server.listen(process.env.PORT, () => {
  console.log(`Server dang chay port http://localhost:${process.env.PORT}/`);
});

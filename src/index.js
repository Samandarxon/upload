const express = require("express");
const fs = require('fs')

const app = express();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({storage:storage})
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./Images");
//   },
//   filename: (req, file, cb) => {
//       // console.log(req.files);
//     cb(null, Date.now() + file.originalname);
//   },
// });


app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index")
});

app.post("/upload", upload.single("image1"), (req, res) => {
    res.send("Image Uploaded")
});
app.post("/uploads", upload.array("image1",4), async(req, res) => {
  await req.files.forEach(val => {
    console.log(val.size/1024);
    let file_kengaytmasi = val.mimetype.split('/')[1]
    fs.writeFile(`img/${Date.now()}.${file_kengaytmasi}`, val.buffer, function (err) {
      if (err)
        throw err;
      console.log('File is created successfully.');
    });

  })
    res.render("index")
});
const port = process.env.PORT || 5000;
app.listen(port , ()=>{
  console.log(`server http:/localhost:${port}`);
})
// console.log('3001 is the port');

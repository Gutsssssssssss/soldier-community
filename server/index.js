const express = require('express')
const mongoose = require('mongoose');
const path = require('path')

const app = express()
const port = 5000

const config = require("./config/key");

// static으로 활용할 폴더
app.use(express.static(path.join(__dirname, '../client/build')));
app.use("/image", express.static("./image"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/post", require("./Router/post")); 
app.use("/api/user", require("./Router/user"));
app.use("/api/reple", require("./Router/reple"));


app.listen(port, () => {
    mongoose.connect(
      config.mongoURI
      ).then(()=> {
        console.log(`Example app listening on port ${port}`);
        console.log(`Connecting MongoDB...`);
      }).catch((err)=> {
        console.log(`${err}`);
      })
    
  });


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});



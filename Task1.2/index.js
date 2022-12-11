const fs = require("fs");
const path = require("path");
const csv = require("csvtojson");

const writableStream = fs.createWriteStream(
  path.resolve(__dirname, "result.txt")
);

csv({
    ignoreColumns: /Amount/
  })
  .fromFile("./Task1.2/csv/nodejs-hw1-ex1.csv")
  .then((jsonObj) => {
    writableStream.write(JSON.stringify(jsonObj));
    writableStream.end();
  })
  .catch((error) => {
    console.log(error);
    return;
  });

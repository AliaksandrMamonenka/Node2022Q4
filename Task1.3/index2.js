import fs from "fs";
import path from "path";
import csv from "csvtojson";

const readStream = fs.createReadStream("./Task1.2/csv/nodejs-hw1-ex1.csv");
const writeStream = fs.createWriteStream(path.resolve(__dirname, "result.txt"));

readStream
  .pipe(
    csv({
      ignoreColumns: /Amount/,
    })
  )
  .pipe(writeStream);

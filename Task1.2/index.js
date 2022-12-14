const fs = require('fs');
const path = require('path');
const csv = require('csvtojson');

const writableStream = fs.createWriteStream(path.resolve(__dirname, 'result.txt'), { encoding: 'utf8' });

const csvStream = csv({
  ignoreColumns: /Amount/,
}).fromFile('./Task1.2/csv/nodejs-hw1-ex1.csv');

csvStream.on('data', (chunk) => {
  writableStream.write(chunk.toString('utf8'));
});

csvStream.on('error', (err) => {
  console.log(err);
});

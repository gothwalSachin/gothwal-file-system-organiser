const fs = require('fs');
const path = require('path');
const types = require('../utility');

function organiseFn(dirPath) {
  if (!dirPath) {
    dirPath = process.cwd();
  }

  // if dirPath exists or not
  let doesExist = fs.existsSync(dirPath);
  if (!doesExist) {
    console.log('Kindly enter the correct path!');
    return;
  }

  // if destPath already exists or not
  let destPath = path.join(dirPath, 'organised_files');
  if (!fs.existsSync(destPath)) fs.mkdirSync(destPath);

  organiseHelper(dirPath, destPath);
}

function organiseHelper(src, dest) {
  let childNames = fs.readdirSync(src);

  for (let i = 0; i < childNames.length; ++i) {
    let childAddress = path.join(src, childNames[i]);
    let isFile = fs.lstatSync(childAddress).isFile();

    if (isFile) {
      let category = getCategory(childNames[i]);
      console.log(childNames[i], ' belongs to --> ', category);
      sendFiles(childAddress, dest, category);
    }
  }
}

function getCategory(name) {
  let returnExt = 'others';
  let ext = path.extname(name);
  ext = ext.slice(1);

  for (let type in types) {
    let cTypeArray = types[type];
    for (let i = 0; i < cTypeArray.length; ++i) {
      if (ext == cTypeArray[i]) {
        returnExt = type;
        break;
      }
    }
    if (returnExt != 'others') break;
  }

  return returnExt;
}

function sendFiles(srcFilePath, dest, category) {
  let categoryPath = path.join(dest, category);

  if (!fs.existsSync(categoryPath)) fs.mkdirSync(categoryPath);

  let fileName = path.basename(srcFilePath);
  let destFilePath = path.join(categoryPath, fileName);
  fs.copyFileSync(srcFilePath, destFilePath);
  fs.unlinkSync(srcFilePath);

  console.log(fileName, ' is copied to ', category);
}

module.exports = {
  organiseKey: organiseFn,
};

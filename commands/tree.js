const fs = require('fs');
const path = require('path');

function treeFn(dirPath) {
  if (!dirPath) {
    treeHelper(process.cwd(), '');
    return;
  }

  let doesExist = fs.existsSync(dirPath);
  if (!doesExist) {
    console.log('Kindly enter the correct path!');
    return;
  }

  treeHelper(dirPath, '');
}

function treeHelper(dirPath, indent) {
  // is file or folder. if folder recur.
  let isFile = fs.lstatSync(dirPath).isFile();

  if (!isFile) {
    let dirName = path.basename(dirPath);
    let childrens = fs.readdirSync(dirPath);

    console.log(indent + '⤷' + dirName);

    for (let i = 0; i < childrens.length; ++i) {
      let childPath = path.join(dirPath, childrens[i]);

      treeHelper(childPath, indent + '\t');
    }
  }

  let fileName = path.basename(dirPath);
  console.log(indent + '⇾' + fileName);
}

module.exports = {
  treeKey: treeFn,
};

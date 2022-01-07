#!/usr/bin/env node

const treeObj = require('./commands/tree');
const organiseObj = require('./commands/organise');
const helpObj = require('./commands/help');

let inputArr = process.argv.slice(2);
let command = inputArr[0];

switch (command) {
  case 'tree':
    treeObj.treeKey(inputArr[1]);
    break;
  case 'organise':
    organiseObj.organiseKey(inputArr[1]);
    break;
  case 'help':
    helpObj.helpKey();
    break;
  default:
    console.log('Please input right command!');
    break;
}

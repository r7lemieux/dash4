'use strict';

var
  fs = require('fs'),
  path = require('path'),
  jadeFilename = path.join(__dirname, '../views/scripts.jade')
  ;

var buildFilepaths = function (filepaths, dirname, filename) {
  if (filename.length > 4 && filename.substring(filename.length - 3) === '.js') {
    filepaths.push(path.join(dirname, filename));
  }
};
var dataText = fs.readFileSync('data/meetupMembers.json');

global.data = JSON.parse(dataText).results;


var buildDirScriptList = function (filepaths, rootDirLen, parentDirPath) {
  var
    dirPath;
  fs.readdirSync(parentDirPath).forEach(function (dirname) {
    dirPath = path.join(parentDirPath, dirname);
    if (fs.statSync(dirPath).isDirectory()) {
      buildDirScriptList(filepaths, rootDirLen, dirPath);
    } else {
      buildFilepaths(filepaths, parentDirPath.substring(rootDirLen), dirname);
    }
  });
};


exports.buildClientScriptList = function () {
  var
    dirPath,
    jadeSrc,
    jadeStr = '',
    filepaths = [],
    rootDirLen = __dirname.length - 'server/config'.length + 'public/'.length,
    absDirname = path.join(__dirname, '../../public');
  fs.readdirSync(absDirname).forEach(function (dirname) {
    dirPath = path.join(absDirname, dirname);
    if (fs.statSync(dirPath).isDirectory()) {
      if (dirname !== 'tests') {
        buildDirScriptList(filepaths, rootDirLen, dirPath);
      }
    } else {
      buildFilepaths(filepaths, absDirname.substring(rootDirLen), dirname);
    }
  });
  filepaths.forEach(function (filePath) {
    jadeSrc = 'script(src="/' + filePath + '")';
    jadeStr += jadeSrc + '\n';
  });

  fs.writeFileSync(jadeFilename, jadeStr);
};



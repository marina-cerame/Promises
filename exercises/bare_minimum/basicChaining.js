/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var prom = require('./promisification');
var promFs = Promise.promisifyAll(require('fs'));



var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return new Promise((resolve, reject) => {
    let firstLine;
    fs.readFile(readFilePath, {encoding: 'utf8'}, (error, data) => {
      if (error) {
        reject(error);
      } else {
        firstLine = data.split('\n')[0];
        resolve(firstLine);
      }
    });
  }).then(username => {
    return prom.getGitHubProfileAsync(username);
  }).then(data => {
    let stringData = JSON.stringify(data);
    return promFs.writeFileAsync(writeFilePath, stringData, {encoding: 'utf8'}, (error) => {
      if (error) { console.log(error, 'ERROR'); }
    });

  });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};

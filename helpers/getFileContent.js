const fs = require('fs').promises;

function getFileContent(filePath) {
  return fs.readFile(filePath, { encoding: 'utf-8' })
    .then(JSON.parse);
}

module.exports = getFileContent;

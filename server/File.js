const fs = require('fs');

const loadUser = ()=>JSON.parse(fs.readFileSync('./File.json'));

module.exports = {loadUser};
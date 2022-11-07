const fs = require('fs');
const path = require('path');
const linkFile = path.join(__dirname, 'text.txt')
const stream = fs.createReadStream(linkFile, 'utf-8');

let result = '';
stream.on('data', chunk => result += chunk);
stream.on('end', () => console.log(result));
stream.on('error', error => console.log('Error', error.message));


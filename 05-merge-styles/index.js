const fs = require('fs');
const path = require('path');
const linkStyles = path.join(__dirname, 'styles');
const writeStr = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));

fs.readdir(linkStyles, {withFileTypes: true}, (err, array) => {
    array.forEach(element => {
        if (path.extname(element.name) === '.css') {
            const readStr = fs.createReadStream(path.join(__dirname, 'styles', element.name), 'utf-8');
            readStr.on('data', chunk => writeStr.write(chunk));
        }
    })
})
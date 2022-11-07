const {copyFile, mkdir, readdir, unlink} = require('fs/promises');
const path = require('path');

const linkCopy = path.join(__dirname, 'files-copy');

mkdir(linkCopy, {recursive: true});

readdir(linkCopy, {withFileTypes: true}).then(array => {
    array.forEach(element => {
        unlink(path.join(__dirname, 'files-copy', element.name))
    });
})

const link = path.join(__dirname, 'files');

readdir(link, {withFileTypes: true}).then(array => {
    array.forEach(element => {
        copyFile(path.join(__dirname, 'files', element.name), path.join(__dirname, 'files-copy', element.name));
    })
})

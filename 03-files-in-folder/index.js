const fs = require('fs');
const {readdir, stat} = require('fs/promises');
const path = require('path');
let arr = [];
let resultArr = [];
const folderLink = path.resolve(__dirname, 'secret-folder');

fs.readdir(folderLink, {withFileTypes: true}, (err, el) => {
    if (err)  {
        throw err;
    } else {
        el.forEach((res) => {
            if(res.isFile()) {
                arr.push(res.name);
                resultArr.push((res.name).replace('.', '-') + '-');
            }
        })
    }

for (let i = 0; i < resultArr.length; i++) {
    let link = path.resolve(__dirname, 'secret-folder', `${arr[i]}`);
    fs.stat(link, (err, elem) => {
        if (err) throw err;
        console.log((resultArr[i] + elem.size/1024 + ' KB').toString());
    })
}

})

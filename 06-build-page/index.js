const fs = require('fs');
const fsProm = require('fs/promises');
const path = require('path');
const newFolder = path.join(__dirname, 'project-dist');


async function newDirectory(origin, link) {

  await fsProm.rm(link, 
    {recursive: true,
         force: true});
  await fsProm.mkdir(link);

  const elements = await fsProm.readdir(origin, {withFileTypes: true});

  elements.forEach((file) => {
    if (file.isFile()) {
        fsProm.copyFile(
            path.join(origin, file.name),
            path.join(link, file.name));
       
    } else {
        newDirectory(
            path.join(origin, file.name),
            path.join(link, file.name));
    }
  });
}

async function createSite() {

  await fsProm.rm(newFolder, {
      recursive: true,
       force: true 
    });

  await fsProm.mkdir(newFolder);

  let template = await fsProm.readFile(path.join(__dirname, 'template.html'), 'utf-8');

  const tags = template.match(/{{\s*([\w-]+)\s*}}/g);

  await fsProm.copyFile(path.join(__dirname, 'template.html'), path.join(newFolder, 'index.html'));

        for (let tag of tags) {

            let head = tag.replace(/[{}]/g, "") + ".html";
            let content = await fsProm.readFile(path.join(__dirname, 'components', head), 'utf-8');

            let index = await fsProm.readFile(path.join(newFolder, 'index.html'), 'utf-8');
            let newIndex = index.replace(tag, content);

            await fsProm.writeFile(path.join(newFolder, 'index.html'), newIndex);
        }
   
        const stream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));

        fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, (error, elements) => {
       
            elements.forEach((file) => {

            if (path.extname(file.name) === '.css') {

              const readableStream = fs.createReadStream(path.join(path.join(__dirname, 'styles'), file.name));

              readableStream.on('data', chunk => stream.write(chunk));
            }


          });




        });

     await newDirectory(path.join(__dirname, 'assets'), path.join(newFolder, 'assets'));
}

createSite();
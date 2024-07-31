import inquirer from 'inquirer';
import QRCode from 'qrcode';
import fs from 'fs';

var questions = [
    {
    type: "input",
    name: "link",
    message: "What is the link you want to qr-codify?"
    }
];


inquirer.prompt(questions).then((answers) => {
var saniUrl = answers.link.replace(/^(https?:\/\/)?(www\.)?|\.(com|net|org)$/g, '');
var url = answers.link;
var pathName = `./images/${saniUrl}.png`;
    QRCode.toFile(pathName, url, {
      }, function (err) {
        if (err) throw err;
      })
      fs.appendFile('codes.txt', `\n${url}`, (err) => {
        if (err) throw err;
        console.log('Your image is saved, and the new line was appended to the file!');
      });
    });

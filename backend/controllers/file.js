const path = require('path');
const fs = require('fs');

const imgPath = `${path.resolve(__dirname)}/../images`

//Création d'une image
exports.saveFile = (req, res) => {
    const fileName = req.body.filename
    const path = `${imgPath}/${fileName}`;
    const data = req.body.file.replace(/^data:image\/\w+;base64,/, "");
    const buf = Buffer.from(data, 'base64');
    fs.writeFile(path, buf, function (err) {
        if (err) {
            res.status(500).json(err)
            return console.log(err);
        }
        res.status(201)
    });
}

exports.getFile = (req, res) => {
    const path = `${imgPath}/Benjamin.png`;
    fs.readFile(path, function (err, file) {
        if (err) {
            res.status(500).json(err)
            return console.log(err);
        }
        console.log('ça marche !!')
        const buf = Buffer.from(file, 'base64');
        res.status(200).json(buf)
    })
}
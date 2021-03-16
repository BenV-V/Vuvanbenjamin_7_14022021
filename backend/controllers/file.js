const path = require('path');
const fs = require('fs');
const { getUser } = require('./user')

const imgPath = `${path.resolve(__dirname)}/../images`

//Création d'une image
exports.saveFile = (req, res) => {
    const date = new Date().getTime()
    const fileName = `${req.body.userId}_${date}_${req.body.filename}`
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
exports.deleteFile = (req, res, next) => {
    const fileName = `${req.body.userId}_${Date().getTime()}_${req.body.filename}`
    fs.unlink(imgPath, fileName, () => {
        res.status(200).json({ message: 'Photo supprimée !'})       
    });
};

exports.getAllFiles = (req, res) => {
    let fileResults = []
    fs.readdir(imgPath, (err, files) => {
        if (err) {
            return res.status(500).json(err)
        }
        let nFilesToProcess = files.length
        for (const imgName of files ) {
            const tokens = imgName.split('_')
            const userId = tokens[0]
            const date = tokens[1]
            const fileName = tokens[2]
            getUser(userId, (user) => {
                if (user) {
                    fileResults.push({
                        fileURL: `http://${req.headers.host}/images/${imgName}`,
                        firstName: user.firstname,
                        lastName: user.lastname,
                        date,
                        fileName,
                        userId
                    })
                    nFilesToProcess--
                    if (nFilesToProcess <= 0) {
                        res.status(200).json(fileResults)
                    }
                }
            })
        } 
    });
}
const path = require('path');
const fs = require('fs');
const { getUser } = require('./user')
const imgPath = `${path.resolve(__dirname)}/../images`
const db = require("../config/db");

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
    const filename = `images/${req.body.userId}_${req.body.date}_${req.body.fileName}`
    fs.unlink(filename, (err) => {
        if (err) {
            res.status(500).json(err)
            return console.log(err);
        }
        res.status(201).json({ message: 'Photo supprimée !'})   
    });
}

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
            let fileName = ''
            for(let i = 2; i < tokens.length; i++) {
                if (i > 2) {
                    fileName += '_'
                }
                fileName += tokens[i]
            }
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
//   db.query(`SELECT users.id, users.lastname, users.firstname, comments.id,comments.content, comments.userId, comments.created_at FROM users INNER JOIN comments ON users.id = comments.userId WHERE comments.postId = ${req.params.id} ORDER BY comments.created_at DESC`,
 
// select * from comments where fileURL = ?

exports.getCommentsFile = (req, res, next) => {
    const fileURL64 = req.params.fileurl
    const fileURL = Buffer.from(fileURL64, 'base64').toString('ascii')
    db.query(`SELECT users.id, users.lastname, users.firstname, comments.id,comments.content, comments.userId, comments.created_at FROM users INNER JOIN comments ON users.id = comments.userId WHERE comments.fileURL = '${fileURL}' ORDER BY comments.created_at DESC`,
        (error, result, field) => {
            if (error) {
                return res.status(400).json({error});
            }
            return res.status(200).json(result);
        });
    };

// Tous les commentaires
exports.getAllCommentsFile = (req, res, next) => {
    db.query(`SELECT users.id, users.lastname, users.firstname, comments.id,comments.content, comments.userId, comments.created_at FROM users INNER JOIN comments ON users.id = comments.userId WHERE comments.postId= ${req.params.id} ORDER BY comments.created_at DESC`,
        (error, result, field) => {
            if (error) {
                return res.status(400).json({error});
            }
            return res.status(200).json(result);
        });
    };

// Nouveau commentaire
exports.createCommentFile = (req, res, next) => {
    const fileURL64 = req.body.fileURL
    const fileURL = Buffer.from(fileURL64, 'base64').toString('ascii')
    db.query(`INSERT INTO comments VALUES (NULL, NULL, ?, ?, ?, NOW())`, [fileURL, req.body.userId, req.body.content], (error, result, field) => {
        if (error) {
            return res.status(400).json({error});
        }
        return res.status(200).json(result);
    });
};
// Supprimer le commentaire
exports.deleteCommentFile = (req, res, next) => {
    db.query(`DELETE FROM comments WHERE id = ${req.params.id}`, (error, result, field) => {
        if (error) {
            return res.status(400).json({error});
        }
        return res.status(200).json(result);
    });
};

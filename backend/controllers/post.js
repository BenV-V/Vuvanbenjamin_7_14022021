const db = require("../config/db");

// Toutes les publications
exports.getAllPosts = (req, res, next) => {
    db.query('SELECT users.lastname, users.firstname, posts.id, posts.userId, posts.title, posts.content, posts.created_at AS date FROM users INNER JOIN posts ON users.id = posts.userId ORDER BY date DESC', (error, result, field) => {
        if (error) {
            return res.status(400).json({error});
        }
        return res.status(200).json(result);
    });
};

// La nouvelle publication
exports.createPost = (req, res, next) => {
    const date = new Date().getTime()
    db.query(`INSERT INTO posts VALUES (NULL, ?,  ?, ?, NOW(), NOW())`,[req.body.userId, req.body.title, req.body.content],  (error, result, field) => {
        if (error) {
            console.log('error : ', error)
            return res.status(400).json({error});
        }
        return res.status(200).json(result);
        
    });
};
// Juste une publication
exports.getOnePost = (req, res, next) => {
    db.query(`SELECT * FROM posts WHERE posts.id = ${req.params.id}`, (error, result, field) => {
        if (error) {
            return res.status(400).json({error});
        }
        return res.status(200).json(result);
    });
};
// Supprimer la publication
exports.deletePost = (req, res, next) => {
    db.query(`DELETE FROM posts WHERE posts.id = ${req.params.id}`, (error, result, field) => {
        if (error) {
            return res.status(400).json({error});
        }
        return res.status(200).json(result);
    });
};
// Modifier la publication
exports.modifyPost = (req, res, next) => {
    db.query(`UPDATE posts SET title = "${req.body.title}", content = "${req.body.content}" WHERE id = ${req.params.id}`, (error, result, field) => {
        if (error) {
            return res.status(400).json({error});
        }
        return res.status(200).json(result);
    });
};
// Tous les commentaires
exports.getAllComments = (req, res, next) => {
    db.query(`SELECT users.id, users.lastname, users.firstname, comments.id,comments.content, comments.userId, comments.created_at FROM users INNER JOIN comments ON users.id = comments.userId WHERE comments.postId = ${req.params.id} ORDER BY comments.created_at DESC`,
        (error, result, field) => {
            if (error) {
                return res.status(400).json({error});
            }
            return res.status(200).json(result);
        });
    };
// Nouveau commentaire
exports.createComment = (req, res, next) => {
    db.query(`INSERT INTO comments VALUES (NULL, ${req.params.id}, ${req.body.userId}, "${req.body.content}", NOW() )`, (error, result, field) => {
        if (error) {
            return res.status(400).json({error});
        }
        return res.status(200).json(result);
    });
};
// Supprimer le commentaire
exports.deleteComment = (req, res, next) => {
    db.query(`DELETE FROM comments WHERE comments.id = ${req.params.id}`, (error, result, field) => {
        if (error) {
            return res.status(400).json({error});
        }
        return res.status(200).json(result);
    });
};

const db = require("../config/db");

// Toutes les publications
exports.getAllPosts = (req, res, next) => {
    db.query(`SELECT * FROM posts`, (error, result, field) => {
        if (error) throw error;
    });
    return res.status(200).json(result);
};
// La nouvelle publication
exports.createPost = (req, res, next) => {
    db.query(`INSERT INTO posts VALUES (NULL, '${req.body.user_id}', '${req.body.title}', '${req.body.content}', NOW(), NULL )`, (error, result, field) => {
        if (error) throw error;
        });
        return res.status(200).json(result);
};
// Juste une publication
exports.getOnePost = (req, res, next) => {
    db.query(`SELECT * FROM posts WHERE posts.id = ${req.params.id}`, (error, result, field) => {
        if (error) throw error;
        });
        return res.status(200).json(result);
};
// Supprimer la publication
exports.deletePost = (req, res, next) => {
    db.query(`DELETE FROM posts WHERE posts.id = ${req.params.id}`, (error, result, field) => {
        if (error) throw error;
        });
        return res.status(200).json(result);
};
// Modifier la publication
exports.modifyPost = (req, res, next) => {
    db.query(`UPDATE posts SET title = '${req.body.title}', content = '${req.body.content}' WHERE posts.id = ${req.params.id}`, (error, result, field) => {
        if (error) throw error;
        });
        return res.status(200).json(result);
};
// Choisir les publications d'un utilisateur
exports.getUserPosts = (req, res, next) => {
    db.query(`SELECT * FROM posts WHERE posts.user_id = ${req.params.id}`, (error, result, field) => {
        if (error) throw error;
        });
        return res.status(200).json(result);
};
// Tous les commentaires
exports.getAllComments = (req, res, next) => {
    db.query(`SELECT * FROM comments VALUES ()`, (error, result, field) => {
        if (error) throw error;
        });
        return res.status(200).json(result);
};
// Nouveau commentaire
exports.createComment = (req, res, next) => {
    db.query(`INSERT INTO comments VALUES (NULL, ${req.body.user_id}, ${req.params.id}, '${req.body.content}, NOW())`, (error, result, field) => {
        if (error) throw error;
        });
        return res.status(200).json(result);
};
// Supprimer le commentaire
exports.deleteComment = (req, res, next) => {
    db.query(`DELETE FROM comments WHERE comments.id = ${req.params.id}`, (error, result, field) => {
        if (error) throw error;
        });
        return res.status(200).json(result);
};

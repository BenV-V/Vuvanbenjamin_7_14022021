const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userCtrl = require('../controllers/post');
const multer = require("../middleware/multer-config"); 

//Publications
router.get('/', userCtrl.getAllPosts);
router.post('/', userCtrl.createPost);
router.get('/:id', userCtrl.getOnePost);
router.delete('/:id', auth,  userCtrl.deletePost);
router.put('/:id', auth, userCtrl.modifyPost);

//Commentaires
router.get('/:id/comments', userCtrl.getAllComments);
router.post('/:id/comment/', userCtrl.createComment);
router.delete('/comment/:id', userCtrl.deleteComment);

module.exports = router;
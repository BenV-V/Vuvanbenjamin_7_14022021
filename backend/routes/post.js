const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const userCtrl = require('../controllers/post');

//Publications
router.get('/', auth, userCtrl.getAllPosts);
router.post('/', auth, userCtrl.createPost);
router.get('/:id', auth, userCtrl.getOnePost);
router.delete('/:id', auth, userCtrl.deletePost);
router.put('/:id', auth, userCtrl.modifyPost);
router.get('', auth, userCtrl.getUserPosts);

//Commentaires
router.get('', auth, userCtrl.getAllComments);
router.post('', auth, userCtrl.createComment);
router.delete('', auth, userCtrl.deleteComment);

module.exports = router;
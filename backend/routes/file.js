const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/file');
const auth = require('../middleware/auth'); 
const multer = require("../middleware/multer-config"); 

router.get('/', multer, userCtrl.getAllFiles);
router.post('/', multer, userCtrl.saveFile);
router.delete('/', userCtrl.deleteFile);

//Commentaires
router.get('/comments/all', userCtrl.getAllCommentsFile);
router.get('/comments/:fileurl', userCtrl.getCommentsFile);
router.post('/comment/', userCtrl.createCommentFile);
router.delete('/comment/:id', userCtrl.deleteCommentFile);

module.exports = router;
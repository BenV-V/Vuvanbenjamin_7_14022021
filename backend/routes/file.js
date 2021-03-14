const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/file');
const multer = require("../middleware/multer-config"); 

router.get('/', multer, userCtrl.getFile);
router.post('/', multer, userCtrl.saveFile);
//router.get('/:id', userCtrl.getOnePost);
//router.delete('/:id', auth,  userCtrl.deletePost);

module.exports = router;
const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/file');
const auth = require('../middleware/auth'); 
const multer = require("../middleware/multer-config"); 

router.get('/', multer, userCtrl.getAllFiles);
router.post('/', multer, userCtrl.saveFile);
router.delete('/', userCtrl.deleteFile);

module.exports = router;
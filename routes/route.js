const express = require('express');
const multer = require('multer');

const router = express.Router();
const upload = multer();

const { signup, getbill } = require('../Controllers/appcontroler');

router.post('/user/signup', signup);
router.post('/product/getbill', upload.any(), getbill);

module.exports = router;
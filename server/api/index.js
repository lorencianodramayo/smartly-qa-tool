const express = require("express");
const uploadAPI = require('./upload');
const templateAPI = require('./template');

const router = express.Router();

router.use(uploadAPI);
router.use(templateAPI);

module.exports = router;

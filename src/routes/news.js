const express = require('express');
const router = express.Router();

const newController = require('../app/controllers/NewControllers');

router.get('/:slud', newController.show);
router.get('/', newController.index);

module.exports = router;

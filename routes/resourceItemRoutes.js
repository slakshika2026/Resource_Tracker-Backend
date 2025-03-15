const express = require('express');
const resourceItemController = require('../controllers/resourceItemController');
const router = express.Router();

router.get('/', resourceItemController.getAllResourceItems);
router.post('/', resourceItemController.addResourceItem);

module.exports = router;

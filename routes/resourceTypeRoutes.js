const express = require('express');
const resourceTypeController = require('../controllers/resourceTypeController');
const router = express.Router();

router.get('/', resourceTypeController.getAllResourceTypes);
router.post('/', resourceTypeController.addResourceType);

module.exports = router;

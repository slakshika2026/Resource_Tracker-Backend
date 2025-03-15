const express = require('express');
const allocationController = require('../controllers/allocationController');
const router = express.Router();

router.post('/', allocationController.createAllocation);

module.exports = router;

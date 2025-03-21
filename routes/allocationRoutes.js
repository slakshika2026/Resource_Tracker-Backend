const express = require('express');
const { allocateResourceToProject, getAllocations, getAllocationHistory } = require('../controllers/allocationController');
const router = express.Router();

router.post('/', allocateResourceToProject);
router.get('/:project_id', getAllocations);
router.post('/allocation-history', getAllocationHistory);

module.exports = router;

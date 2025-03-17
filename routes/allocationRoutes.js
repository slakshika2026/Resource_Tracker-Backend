const express = require('express');
const { allocateResourceToProject, getAllocations } = require('../controllers/allocationController');
const router = express.Router();

router.post('/', allocateResourceToProject);
router.get('/:project_id', getAllocations);

module.exports = router;

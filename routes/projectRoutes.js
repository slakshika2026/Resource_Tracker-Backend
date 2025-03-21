const express = require('express');
const { getProjects, addNewProject, getSpecificProject, checkNameUnique } = require('../controllers/projectController');
const router = express.Router();

router.get('/', getProjects);
router.post('/', addNewProject);
router.get('/:project_id', getSpecificProject);
router.post('/check-name', checkNameUnique);


module.exports = router;

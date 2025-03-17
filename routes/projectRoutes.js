const express = require('express');
const { getProjects, addNewProject, getSpecificProject, } = require('../controllers/projectController');
const router = express.Router();

router.get('/', getProjects);
router.post('/', addNewProject);
router.get('/:project_id', getSpecificProject);


module.exports = router;

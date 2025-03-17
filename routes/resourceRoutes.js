const express = require('express');
const { getResourceItems,
   addResource,
   updateResourceStatus,
   getAvailable,
   getInUse,
   getUnderMaintenance,
   allocateResource,
   getResourcesForProject,
   getResourcesByUser } = require('../controllers/resourceController');
const router = express.Router();

router.get('/', getResourceItems);
router.post('/', addResource);
router.put('/', updateResourceStatus);
router.get('/available', getAvailable);
router.get('/in_use', getInUse);
router.get('/under_maintenance', getUnderMaintenance);
router.post('/allocate_resource', allocateResource);
router.get('/by_project/:project_id', getResourcesForProject);
router.get('/by_user/:user_id', getResourcesByUser);

module.exports = router;

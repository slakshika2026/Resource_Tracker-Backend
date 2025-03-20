const express = require('express');
const { getResourceItems,
   addResource,
   updateResourceStatus,
   getAvailable,
   getInUse,
   getUnderMaintenance,
   allocateResource,
   getResourcesForProject,
   getResourcesByUser,
   deleteResourceItemByID,
   getAllCategories,
   getResourceTypesUnderACategory,
   getResourceItemsUnderAType
} = require('../controllers/resourceController');
const router = express.Router();

router.get('/', getResourceItems);
router.post('/', addResource);
router.put('/update_status/:resource_item_id', updateResourceStatus);
router.get('/available', getAvailable);
router.get('/in_use', getInUse);
router.get('/under_maintenance', getUnderMaintenance);
router.post('/:resource_item_id/allocate_resource', allocateResource);
router.get('/by_project/:project_id', getResourcesForProject);
router.get('/by_user/:user_id', getResourcesByUser);
router.delete('/res_item/del/:resource_item_id', deleteResourceItemByID);
router.get("/categories", getAllCategories);
router.get("/categories/:category/resource-types", getResourceTypesUnderACategory);
router.get("/resource-types/:resource_type_id/resource_items", getResourceItemsUnderAType);




module.exports = router;

const {
   addResourceItem,
   getAllResourceItems,
   updateResourceItemStatus,
   allocateResourceToProject
   , getAvailableResources,
   getInUseResources,
   getUnderMaintenanceResources,
   getResourcesAllocatedToProject,
   getResourcesAllocatedByUser
} = require('../models/resourceItemModel');
const { getAllResourceTypes } = require('../models/resourceTypeModel');


// Get all resource items
const getResourceItems = async (req, res) => {
   try {
      const resources = await getAllResourceItems();
      res.status(200).json(resources);
   } catch (err) {
      res.status(500).json({ message: 'Server error' });
   }
};

// Add a new resource item
const addResource = async (req, res) => {
   const { resource_type_id, serial_number, status } = req.body;

   try {
      const resourceItemId = await addResourceItem(resource_type_id, serial_number, status);
      res.status(201).json({ resourceItemId });
   } catch (err) {
      res.status(500).json({ message: 'Server error' });
   }
};

// Update resource item status
const updateResourceStatus = async (req, res) => {
   const { resource_item_id, status } = req.body;

   try {
      await updateResourceItemStatus(resource_item_id, status);
      res.status(200).json({ message: 'Resource status updated successfully' });
   } catch (err) {
      res.status(500).json({ message: 'Server error' });
      console.log(err);
   }
};

// Get all available resources
const getAvailable = async (req, res) => {
   try {
      const resources = await getAvailableResources();
      res.status(200).json(resources);
   } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Server error' });
   }
};

// Get all resources in use
const getInUse = async (req, res) => {
   try {
      const resources = await getInUseResources();
      res.status(200).json(resources);
   } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Server error' });
   }
};

// Get all resources under maintenance
const getUnderMaintenance = async (req, res) => {
   try {
      const resources = await getUnderMaintenanceResources();
      res.status(200).json(resources);
   } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Server error' });
   }
};

const allocateResource = async (req, res) => {
   const { resource_item_id, project_id, user_id } = req.body;

   console.log('Request Body:', req.body);

   // Check if all required fields are present
   if (!resource_item_id || !project_id || !user_id) {
      return res.status(400).json({ message: 'Missing required fields: resource_item_id, project_id, or user_id.' });
   }

   try {
      const allocationSuccess = await allocateResourceToProject(resource_item_id, project_id, user_id);

      if (allocationSuccess) {
         return res.status(200).json({ message: 'Resource allocated successfully.' });
      } else {
         return res.status(400).json({ message: 'Failed to allocate resource. The resource may already be allocated or invalid.' });
      }
   } catch (err) {
      console.error('Error during resource allocation:', err);
      return res.status(500).json({ message: 'Server error occurred while allocating resource.' });
   }
};

// Controller function to get all resources allocated to a specific project
const getResourcesForProject = async (req, res) => {
   const { project_id } = req.params; // Get project_id from the URL parameters

   try {
      const resources = await getResourcesAllocatedToProject(project_id);
      if (resources.length > 0) {
         res.status(200).json(resources);
      } else {
         res.status(404).json({ message: 'No allocated resources found for this project.' });
      }
   } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Server error occurred while fetching resources.' });
   }
};


// Controller function to get all resources allocated by a specific user
const getResourcesByUser = async (req, res) => {
   const { user_id } = req.params; // Extract user_id from URL parameters

   try {
      const resources = await getResourcesAllocatedByUser(user_id);

      if (resources.length > 0) {
         return res.status(200).json(resources); // Send resources in response
      } else {
         return res.status(404).json({ message: 'No resources allocated by this user.' });
      }
   } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error occurred while fetching resources.' });
   }
};




module.exports = {
   getResourceItems,
   addResource,
   updateResourceStatus,
   getInUse,
   getUnderMaintenance,
   getAvailable,
   allocateResource,
   getResourcesByUser,
   getResourcesForProject
};

const allocationModel = require('../models/allocationModel');
const {
   getAllocationsForProject

} = require('../models/allocationModel');

// Allocate resource to a project
const allocateResourceToProject = async (req, res) => {
   const { resource_item_id, project_id, start_date, end_date } = req.body;

   try {
      const allocationId = await allocateResource(resource_item_id, project_id, start_date, end_date);
      res.status(201).json({ allocationId });
   } catch (err) {
      res.status(500).json({ message: 'Server error' });
   }
};
// Get allocations for a project
const getAllocations = async (req, res) => {
   const { project_id } = req.params;

   try {
      const allocations = await getAllocationsForProject(project_id);
      res.status(200).json(allocations);
   } catch (err) {
      res.status(500).json({ message: 'Server error' });
   }
};

module.exports = {
   allocateResourceToProject,
   getAllocations
};

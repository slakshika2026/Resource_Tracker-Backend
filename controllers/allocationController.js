
const {
   getAllocationsForProject,
   getTheAllocationHistory

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



// Controller function to get allocation history
const getAllocationHistory = async (req, res) => {
   try {
      const results = await getTheAllocationHistory(); // Fetch data from the database
      // console.log("Results from DB:", results); // Add this log to check raw results

      if (results.length > 0) {
         const chartData = results.map(item => ({
            serial_number: item.serial_number,
            allocated_date: new Date(item.allocated_date).toISOString(),
            end_date: item.end_date ? new Date(item.end_date).toISOString() : null,
            project_name: item.project_name
         }));

         // console.log("Mapped Chart Data:", chartData); // Check mapped data
         return res.status(200).json(chartData); // Send the formatted data as JSON
      } else {
         return res.status(404).json({ message: 'No allocation history found' });
      }
   } catch (err) {
      console.error('Error fetching allocation history:', err);
      return res.status(500).json({ message: 'Server error' });
   }
};


module.exports = {
   allocateResourceToProject,
   getAllocations,
   getAllocationHistory
};

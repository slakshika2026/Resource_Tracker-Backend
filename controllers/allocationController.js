const allocationModel = require('../models/allocationModel');

// Create a new allocation
const createAllocation = async (req, res) => {
   const { user_id, resource_item_id, start_time, status } = req.body;
   try {
      const allocationId = await allocationModel.createAllocation(user_id, resource_item_id, start_time, status);
      res.status(201).json({ message: 'Allocation created successfully', allocationId });
   } catch (err) {
      res.status(500).json({ message: 'Error creating allocation', error: err });
   }
};

module.exports = { createAllocation };

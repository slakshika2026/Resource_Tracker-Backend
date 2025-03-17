// const resourceTypeModel = require('../models/resourceTypeModel');

// // Get all resource types
// const getAllResourceTypes = async (req, res) => {
//    try {
//       const resourceTypes = await resourceTypeModel.getAllResourceTypes();
//       res.json(resourceTypes);
//    } catch (err) {
//       res.status(500).json({ message: 'Error retrieving resource types', error: err });
//    }
// };

// // Add a new resource type
// const addResourceType = async (req, res) => {
//    const { name, description, category } = req.body;
//    try {
//       const resourceTypeId = await resourceTypeModel.addResourceType(name, description, category);
//       res.status(201).json({ message: 'Resource Type added successfully', resourceTypeId });
//    } catch (err) {
//       res.status(500).json({ message: 'Error adding resource type', error: err });
//    }
// };

// module.exports = { getAllResourceTypes, addResourceType };

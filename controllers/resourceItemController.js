// const resourceItemModel = require('../models/resourceItemModel');

// // Get all resource items
// const getAllResourceItems = async (req, res) => {
//    try {
//       const resourceItems = await resourceItemModel.getAllResourceItems();
//       res.json(resourceItems);
//    } catch (err) {
//       res.status(500).json({ message: 'Error retrieving resource items', error: err });
//    }
// };

// // Add a new resource item
// const addResourceItem = async (req, res) => {
//    const { resource_type_id, serial_number, status } = req.body;
//    try {
//       const resourceItemId = await resourceItemModel.addResourceItem(resource_type_id, serial_number, status);
//       res.status(201).json({ message: 'Resource Item added successfully', resourceItemId });
//    } catch (err) {
//       res.status(500).json({ message: 'Error adding resource item', error: err });
//    }
// };

// module.exports = { getAllResourceItems, addResourceItem };

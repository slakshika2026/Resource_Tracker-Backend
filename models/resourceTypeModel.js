const db = require('../config/db');

//Get all resource typea
const getAllResourceTypes = async () => {
   try {
      const [results] = await db.query('SELECT * FROM resource_types');
      return results;
   }
   catch (err) {
      throw err;
   }
};

//Add a new resource type
const addResourceType = async (name, description, category) => {
   const sql = 'INSERT INTO resource_types (name, description, category) VALUES (?, ?, ?)';
   try {
      const [result] = await db.query(sql, [name, description, category]);
      return result.insertId;
   }
   catch (err) {
      throw err;
   }

};

// Get distinct categories from resource_types
const getCategories = async () => {
   const [categories] = await db.query("SELECT DISTINCT category FROM resource_types");
   return categories;
};

// Get resource types under a selected category
const getResourceTypesByCategory = async (category) => {
   const [resourceTypes] = await db.query("SELECT * FROM resource_types WHERE category = ?", [category]);
   return resourceTypes;
};

module.exports = {
   getAllResourceTypes,
   addResourceType,
   getCategories,
   getResourceTypesByCategory
};

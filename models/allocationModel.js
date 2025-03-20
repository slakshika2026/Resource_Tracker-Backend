const db = require('../config/db');
const connection = require('../config/db'); // adjust path to your db.js file

//Create a new allocation
const createAllocation = async (resource_item_id, project_id, start_date, end_date) => {
   const sql = 'INSERT INTO allocations (resource_item_id, project_id, start_date, end_date) VALUES (?, ?, ?, ?)';
   try {
      const [result] = await db.query(sql, [resource_item_id, project_id, start_date, end_date]);
      return result.insertId;
   }
   catch (err) {
      throw err;
   }
};

// Get allocations for a project
const getAllocationsForProject = async (project_id) => {
   const sql = `
      SELECT ah.*, ri.status
FROM allocation_history ah
JOIN resource_items ri ON ah.resource_item_id = ri.resource_item_id
WHERE ah.project_id = ?
AND ri.status = 'in use'
AND ah.end_date IS NULL;

   `;

   const [result] = await db.query(sql, [project_id]);
   return result;
};

module.exports = { getAllocationsForProject };


module.exports = {
   createAllocation,
   getAllocationsForProject
};
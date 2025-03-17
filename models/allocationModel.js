const db = require('../config/db');

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
   const sql = 'SELECT * FROM allocations WHERE project_id = ?';
   const [result] = await db.query(sql, [project_id]);
   return result;
};

module.exports = {
   createAllocation,
   getAllocationsForProject
};
const db = require('../config/db');

//Create a new allocation
const createAllocation = async (resource_item_id, project_id, start_date, end_date) => {
   const sql = 'INSERT INTO allocations (resource_item_id, project_id, start_date, end_date) VALUES (?, ?, ?, ?)';
   try {
      const [result] = await db.query(sql, [resource_item_id, project_id, start_date, end_date]);
      return result.insertId;
   } catch (err) {
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
   try {
      const [result] = await db.query(sql, [project_id]);
      return result;
   } catch (err) {
      throw err;
   }
};

// Function to get allocation history data
const getTheAllocationHistory = async () => {
   const query = `
 SELECT 
	id,
    resource_item_id,
    serial_number,
    project_name,
    allocated_date,
    IFNULL(end_date, NOW()) AS end_date,
    CASE
        WHEN end_date IS NULL THEN 'In Use'
        WHEN end_date < NOW() THEN 'Available'
        ELSE 'Under Maintenance'
    END AS status
FROM 
    allocation_history
ORDER BY 
    allocated_date;
   `;
   try {
      const [result] = await db.query(query);  // Assuming db.query() is your database query function
      return result;
   } catch (err) {
      throw err;
   }
};

module.exports = {
   createAllocation,
   getAllocationsForProject,
   getTheAllocationHistory
};

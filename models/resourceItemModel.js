const db = require('../config/db');
const connection = require('../config/db'); // adjust path to your db.js file

const getAllResourceItems = async () => {
   try {
      const [results] = await db.query(
         'SELECT r.resource_type_id, r.name AS resource_type, ri.serial_number, ri.status FROM resource_types r LEFT JOIN resource_items ri ON r.resource_type_id = ri.resource_type_id'
      );
      return results;
   } catch (err) {
      throw err;
   }
};

//categorized data getting
const getAvailableResources = async () => {
   const sql = 'SELECT * FROM resource_items WHERE status = "available"';
   const [rows] = await db.query(sql);
   return rows;
};

const getInUseResources = async () => {
   const sql = 'SELECT * FROM resource_items WHERE status = "in use"';
   const [rows] = await db.query(sql);
   return rows;
};

const getUnderMaintenanceResources = async () => {
   const sql = 'SELECT * FROM resource_items WHERE status = "under maintenance"';
   const [rows] = await db.query(sql);
   return rows;
};




// Add a new resource item
const addResourceItem = async (resource_type_id, serial_number, status) => {
   const sql = 'INSERT INTO resource_items (resource_type_id, serial_number, status) VALUES (?, ?, ?)';
   try {
      const [result] = await db.query(sql, [resource_type_id, serial_number, status]);
      return result.insertId; // Return the inserted resource ID
   } catch (err) {
      console.log(err);
      throw err;
   }
};

// Update resource item status
const updateResourceItemStatus = async (resource_item_id, status) => {
   const allowedStatuses = ['available', 'in use', 'under maintenance'];
   const normalizedStatus = status.trim().toLowerCase();

   // Check if the status is valid
   if (!allowedStatuses.includes(normalizedStatus)) {
      throw new Error('Invalid status value');
   }

   const query = "UPDATE resource_items SET status = ? WHERE resource_item_id = ?";
   await connection.query(query, [normalizedStatus, resource_item_id]);
};

const allocateResourceToProject = async (resource_item_id, project_id, user_id) => {
   console.log('Allocating Resource:', { resource_item_id, project_id, user_id });

   // Assuming you are running an UPDATE query to allocate the resource
   const query = `
      UPDATE resource_items
      SET status = 'in use', project_id = ?, user_id = ?, allocated_at = NOW()
      WHERE resource_item_id = ? AND status = 'available';
   `;
   const values = [project_id, user_id, resource_item_id];

   try {
      const [rows] = await db.query(query, values);
      console.log('Rows affected:', rows.affectedRows); // Log the affected rows to check if the update worked

      // Check if any rows were updated
      return rows.affectedRows > 0;
   } catch (err) {
      console.error('Error allocating resource:', err);
      return false; // Return false if there was an error
   }
};

const getResourcesAllocatedToProject = async (project_id) => {
   const sql = 'SELECT * FROM resource_items WHERE project_id = ? AND status = "in use"';
   try {
      const [rows] = await db.query(sql, [project_id]);
      return rows;
   } catch (err) {
      console.log(err);
      throw new Error('Error fetching allocated resources for the project.');
   }
};

const getResourcesAllocatedByUser = async (user_id) => {
   const sql = 'SELECT * FROM resource_items WHERE user_id = ? AND status = "in use"';
   try {
      const [rows] = await db.query(sql, [user_id]);
      return rows;
   } catch (err) {
      console.log(err);
      throw new Error('Error fetching allocated resources by the user.');
   }
};



module.exports = {
   getAllResourceItems,
   addResourceItem,
   updateResourceItemStatus,
   getAvailableResources,
   getInUseResources,
   getUnderMaintenanceResources,
   allocateResourceToProject,
   getResourcesAllocatedByUser,
   getResourcesAllocatedToProject

};

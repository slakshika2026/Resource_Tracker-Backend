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
   const allowedStatuses = ["available", "under maintenance"];
   const normalizedStatus = status.trim().toLowerCase();

   if (!allowedStatuses.includes(normalizedStatus)) {
      console.warn("Invalid status change attempt:", status);
      return false;
   }

   // Check if the resource exists and is currently in use
   const [resource] = await connection.query(
      "SELECT status FROM resource_items WHERE resource_item_id = ?",
      [resource_item_id]
   );

   if (!resource || resource.length === 0) {
      console.error(`Resource item ${resource_item_id} not found`);
      return false;
   }

   const currentStatus = resource[0].status;

   // Only allow changing from 'in use' to 'available'
   if (currentStatus !== "in use") {
      console.warn(`Resource ${resource_item_id} is not currently in use.`);
      return false;
   }

   // Update allocation history to set end_date
   const updateHistoryQuery = `
      UPDATE allocation_history 
      SET end_date = NOW() 
      WHERE resource_item_id = ? AND end_date IS NULL;
   `;

   await connection.query(updateHistoryQuery, [resource_item_id]);

   // Update resource status
   const updateResourceQuery = "UPDATE resource_items SET status = ? WHERE resource_item_id = ?";
   const [resourceUpdate] = await connection.query(updateResourceQuery, [normalizedStatus, resource_item_id]);

   return resourceUpdate.affectedRows > 0;
};



//allocate resource to a project and saving allocation history
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

// New function to save allocation history
const saveAllocationHistory = async (resource_item_id, project_id) => {
   console.log('Saving Allocation History:', { resource_item_id, project_id });

   // Fetch the necessary details for allocation history from the resource_items and projects tables
   const resourceQuery = `
      SELECT r.serial_number, rt.name AS resource_type, p.name AS project_name
      FROM resource_items r
      JOIN resource_types rt ON r.resource_type_id = rt.resource_type_id
      JOIN projects p ON r.project_id = p.project_id
      WHERE r.resource_item_id = ?
   `;
   const [resourceDetails] = await db.query(resourceQuery, [resource_item_id]);

   if (!resourceDetails || resourceDetails.length === 0) {
      return false; // If no details are found, return false
   }

   const { serial_number, resource_type, project_name } = resourceDetails[0];

   const historyQuery = `
      INSERT INTO allocation_history (project_id, resource_item_id, resource_type, serial_number, allocated_date, project_name)
      VALUES (?, ?, ?, ?, NOW(), ?)
   `;
   const historyValues = [project_id, resource_item_id, resource_type, serial_number, project_name];

   try {
      await db.query(historyQuery, historyValues);
      return true; // Allocation history saved successfully
   } catch (err) {
      console.error('Error saving allocation history:', err);
      return false; // Return false if there was an error saving the history
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

//delete resource items
const deleteResourceItem = async (resource_item_id) => {
   const sql = 'DELETE FROM resource_items WHERE resource_item_id = ?';
   try {
      const [result] = await db.query(sql, [resource_item_id]);
      return result.affectedRows > 0; // Returns true if a row was deleted
   } catch (err) {
      console.error('Error deleting resource item:', err);
      throw new Error('Error deleting resource item.');
   }
};

// Get available resource items for a resource type
const getResourceItemsByType = async (resource_type_id) => {
   const [items] = await db.query(
      "SELECT * FROM resource_items WHERE resource_type_id = ? AND status = 'available'",
      [resource_type_id]
   );
   return items;
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
   getResourcesAllocatedToProject,
   deleteResourceItem,
   getResourceItemsByType,
   saveAllocationHistory

};

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

const allocateResourceToProject = async (resource_item_id, project_id
   // , user_id
) => {
   console.log('Allocating Resource:', {
      resource_item_id, project_id
      // , user_id
   });

   // Check if the resource is available
   const checkQuery = `
      SELECT * FROM resource_items
      WHERE resource_item_id = ? AND status = 'available';
   `;
   try {
      const [rows] = await db.query(checkQuery, [resource_item_id]);

      if (rows.length === 0) {
         console.log('Resource is not available for allocation.');
         return false; // Return false if the resource is not available
      }

      // Proceed with allocation if the resource is available
      const allocateQuery = `
         UPDATE resource_items
         SET status = 'in use', project_id = ?, allocated_at = NOW()
         WHERE resource_item_id = ? AND status = 'available';
      `;
      const [updateResult] = await db.query(allocateQuery, [project_id,
         // user_id,
         resource_item_id]);

      console.log('Rows affected:', updateResult.affectedRows); // Log the affected rows to check if the update worked

      // Check if any rows were updated
      if (updateResult.affectedRows > 0) {
         console.log('Resource successfully allocated.');
         return true; // Allocation success
      } else {
         console.log('Failed to allocate resource. Resource might already be in use or invalid.');
         return false; // Allocation failed
      }
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
   getResourceItemsByType

};

const db = require('../config/db');

//Create a new allocation
const createAllocation = async (user_id, resource_item_id, start_time, status) => {
   const sql = 'INSERT INTO allocations (user_id, resource_item_id, start_time, status) VALUES (?, ?, ?, ?)';
   try {
      const [result] = await db.query(sql, [user_id, resource_item_id, start_time, status]);
      return result.insertId;
   }
   catch (err) {
      throw err;
   }
};

module.exports = {
   createAllocation
};
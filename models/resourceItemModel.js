const db = require('../config/db');

//GET ALL RESOURCE ITEMS

const getAllResourceItems = async () => {
   try {
      const [results] = await db.query('SELECT * FROM resource_items');
      return results;
   }
   catch (err) {
      throw err;
   }
   
   
};

//Add a new resource itwm
const addResourceItem = async (resource_type_id, serial_number, status) => {
   const sql = 'INSERT INTO resource_items (resource_type_id, serial_number, status) VALUES (?, ?, ?)';
   try {
      const [result] = await db.query(sql, [resource_type_id, serial_number, status]);
      return result.insertId;
   }
   catch (err) {
      throw err;
   }
};

module.exports = {
   getAllResourceItems,
   addResourceItem
}
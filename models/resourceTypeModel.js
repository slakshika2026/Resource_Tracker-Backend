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

module.exports = {
   getAllResourceTypes,
   addResourceType
};

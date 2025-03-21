const db = require('../config/db');

// Create a new project
const createProject = async (name, description, start_date) => {
   const sql = 'INSERT INTO projects (name, description, start_date) VALUES (?, ?, ?)';
   try {
      const [result] = await db.query(sql, [name, description, start_date]);
      return result.insertId;
   } catch (err) {
      console.log(err);
      throw err;
   }
};



// Get all needs/projects
const getAllProjects = async () => {
   const sql = 'SELECT * FROM projects';
   const [rows] = await db.query(sql);
   return rows;
};

const getProjectById = async (project_id) => {
   const sql = 'SELECT * FROM projects WHERE project_id = ?';
   const [rows] = await db.query(sql, [project_id]);
   return rows[0]; // Return the first result or null if no results
};



// Function to check if the project name is unique
const checkProjectNameUnique = async (name) => {
   const sql = 'SELECT COUNT(*) AS count FROM projects WHERE name = ?';
   try {
      const [result] = await db.query(sql, [name]);
      return result[0].count === 0; // If count is 0, name is unique
   } catch (err) {
      console.log(err);
      throw err;
   }
};

module.exports = {
   createProject,
   getAllProjects,
   getProjectById,
   checkProjectNameUnique
};

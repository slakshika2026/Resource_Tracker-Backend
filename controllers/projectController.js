const { createProject, getAllProjects, getProjectById, checkProjectNameUnique } = require('../models/projectModel');

// Get all projects
const getProjects = async (req, res) => {
   try {
      const projects = await getAllProjects();
      res.status(200).json(projects);
   } catch (err) {
      res.status(500).json({ message: 'Server error' });
   }
};

// Add a new project
const addNewProject = async (req, res) => {
   const { name, description } = req.body;

   // Get the current system date
   const start_date = new Date();
   const formattedStartDate = start_date.toISOString().slice(0, 19).replace('T', ' '); // Format as YYYY-MM-DD HH:mm:ss

   try {
      const projectId = await createProject(name, description, formattedStartDate);
      res.status(201).json({ projectId });
   } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Server error' });
   }
};

// Check if the project name is unique
const checkNameUnique = async (req, res) => {
   const { name } = req.body;  // Get the project name from the request body

   try {
      const isUnique = await checkProjectNameUnique(name);  // Check uniqueness using the model function

      if (isUnique) {
         res.json({ isUnique: true });
      } else {
         res.status(400).json({ isUnique: false, message: 'Project name already exists.' });
      }
   } catch (err) {
      console.error('Error checking project name:', err);
      res.status(500).json({ message: 'Server error' });
   }
};



const getSpecificProject = async (req, res) => {
   const { project_id } = req.params;  // Get the project_id from the route parameters

   try {
      const project = await getProjectById(project_id);
      if (project) {
         res.status(200).json(project);
      } else {
         res.status(404).json({ message: 'Project not found' });
      }
   } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Server error' });
   }

}

module.exports = {
   getProjects,
   addNewProject,
   getSpecificProject,
   checkNameUnique
};

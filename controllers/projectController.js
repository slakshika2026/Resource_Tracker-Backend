const { createProject, getAllProjects, getProjectById } = require('../models/projectModel');

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
   const { name, description, start_date } = req.body;

   try {
      const projectId = await createProject(name, description, start_date);
      res.status(201).json({ projectId });
   } catch (err) {
      console.log(err);
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
   getSpecificProject
};

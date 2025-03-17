const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
// const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const db = require('./config/db');
const { authenticate } = require('./middleware/authMiddleware');
// const resourceTypeRoutes = require('./routes/resourceTypeRoutes');
// const resourceItemRoutes = require('./routes/resourceItemRoutes');
const allocationRoutes = require('./routes/allocationRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const projectRoutes = require('./routes/projectRoutes');

dotenv.config();

const app = express();
app.use(cors());

//middleware to parse JSON bodies
app.use(express.json());


//set up routes
app.use('/api/auth', authRoutes);
// app.use('/api/resource-types', authenticate, resourceTypeRoutes);
// app.use('/api/resource-items', authenticate, resourceItemRoutes);
app.use('/api/allocations', authenticate, allocationRoutes);
app.use('/api/resources', authenticate, resourceRoutes);
app.use('/api/projects', authenticate, projectRoutes);

//port definning
const PORT = process.env.PORT || 5000;

//start server
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});
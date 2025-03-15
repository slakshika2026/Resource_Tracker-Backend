const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const db = require('./config/db');
const { authenticate } = require('./middleware/authMiddleware');
const resourceTypeRoutes = require('./routes/resourceTypeRoutes');
const resourceItemRoutes = require('./routes/resourceItemRoutes');
const allocationRoutes = require('./routes/allocationRoutes');

dotenv.config();

const app = express();

//middleware to parse JSON bodies
app.use(express.json());


//set up routes
app.use('/api/auth', authRoutes);
app.use('/api/resource-types', authenticate, resourceTypeRoutes);
app.use('/api/resource-items', authenticate, resourceItemRoutes);
app.use('/api/allocations', authenticate, allocationRoutes);

//port definning
const PORT = process.env.PORT || 5000;

//start server
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});
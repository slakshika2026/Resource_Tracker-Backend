const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const db = require('./config/db');
const { authenticate } = require('./middleware/authMiddleware');
const allocationRoutes = require('./routes/allocationRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const projectRoutes = require('./routes/projectRoutes');

dotenv.config();

const app = express();
app.use(cors({
   origin: 'http://localhost:5173', // Your frontend URL
   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
   allowedHeaders: ['Content-Type', 'Authorization'],
}));

//middleware to parse JSON bodies
app.use(express.json());


//set up routes
app.use('/api/auth', authRoutes);
app.use('/api/allocations', authenticate, allocationRoutes);
app.use('/api/resources', authenticate, resourceRoutes);
app.use('/api/projects', authenticate, projectRoutes);

//port definning
const PORT = process.env.PORT || 5000;

//start server
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});
const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
// const resourceRoutes = require('./routes/resourceRoutes');
// const userRoutes = require('./routes/userRoutes');
// const allocationsRoutes = require('../routes/allocationsRoutes');
const db = require('./config/db');


dotenv.config();

const app = express();

//middleware to parse JSON bodies
app.use(bodyParser.json());

// //set up routes
// app.use('/api/resources', resourceRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/allocations', allocationsRoutes);

//port definning
const PORT = process.env.PORT || 5000;

//start server
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});
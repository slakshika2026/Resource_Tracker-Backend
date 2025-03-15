const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

//connection creation
const db = mysql.createConnection({
   host: process.env.DB_HOST,
   user: process.env.DB_USER,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_NAME
});

db.connect((err) => {
   if (err) {
      console.error('Database Connection Failes', err);
      process.exit(1);
   } else {
      console.log('Connected to the Databse Successfully');
   }
});

module.exports = db.promise();
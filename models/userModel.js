const db = require('../config/db');
const bcrypt = require('bcryptjs');

//Register a new user
const registerUser = async (name, email, password, role) => {
   const number = 10;

   // Ensure password is a string
   if (typeof password !== 'string') {
      throw new Error('Password must be a string');
   }

   // Hash the password before saving it
   const hashedPassword = await bcrypt.hash(password, number); //number is teh salt round. password is 10 times hashed before store it

   const sql = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
   try {
      const [result] = await db.query(sql, [name, email, hashedPassword, role]);
      return result.insertId; // Return the inserted user ID
   } catch (err) {
      console.error('Error inserting user into database:', err);
      throw err;  // Throw error to be handled in the controller
   }
};


//Find user by email
const getUserByEmail = async (email) => {
   const sql = 'SELECT * FROM users WHERE email = ?';
   try {
      const [result] = await db.query(sql, [email]);
      return result[0];
   }
   catch (err) {
      throw err;
   }
};

module.exports = {
   registerUser,
   getUserByEmail
};
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');



//Register a new user
const register = async (req, res) => {
   console.log(req.body);
   const { name, email, password, role } = req.body;

   if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "Please provide all required fields (name, email, password, role)" });
   }

   try {
      // Check if email already exists
      const existingUser = await userModel.getUserByEmail(email); // Assuming this function exists
      if (existingUser) {
         return res.status(409).json({ message: "This email is already registered. Try logging in instead." });
      }

      const userId = await userModel.registerUser(name, email, password, role);
      res.status(201).json({ message: "User registered successfully", userId });
   } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error registering user", error: err });
   }
};



//Login a user
const login = async (req, res) => {
   const { email, password } = req.body;
   try {

      const user = await userModel.getUserByEmail(email);
      if (!user) {
         return res.status(40).json({ message: 'User not found' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
         return res.status(400).json({ message: 'Invalid credentials' });
      }
      const token = jwt.sign({ userId: user.user_id, role: user.role },
         process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ message: 'Login successful', token });

   }
   catch (err) {
      console.error('Error logging in:', err);
      res.status(500).json({ message: 'Error logging in', error: err });
   }
};


// Get user data by ID (protected route)
const getUserData = async (req, res) => {
   try {
      const userId = req.user.userId;  // Get user ID from the decoded JWT token
      const user = await user.findUserById(userId);
      if (!user) {
         return res.status(404).json({ message: 'User not found' });
      }

      res.json({
         user: {
            id: user.user_id,
            name: user.name,
            email: user.email,
            role: user.role,
         },
      });
   } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });

   }
};

module.exports = {
   login,
   register,
   getUserData
}
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
   const authHeader = req.headers.authorization;
   if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
   }

   const token = authHeader.split(' ')[1]; // Extract the actual token
   try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Attach user info to request
      next(); // Proceed to next middleware
   } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
   }
};

module.exports = { authenticate };

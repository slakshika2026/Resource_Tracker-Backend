const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
   const authHeader = req.headers.authorization;

   if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
   }

   const token = authHeader.split(' ')[1]; // Extract token

   try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
      req.user = decoded;  // Attach decoded user info to request
      next();
   } catch (err) {
      return res.status(401).json({ message: 'Invalid token', error: err.message });
   }
};

module.exports = { authenticate };

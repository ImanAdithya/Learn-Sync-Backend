const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', ''); 

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
        req.user = decoded;  // Store the decoded user info in the request object
        next(); // Pass control to the next middleware/route handler
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = authMiddleware;

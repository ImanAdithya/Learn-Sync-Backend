const User = require('../model/User');
const jwt = require('jsonwebtoken');

class UserController {
  // Register a new user
  static async registerUser(req, res) {
    try {
      const { email, password, role } = req.body;
      // Check if the user already exists
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'Email already in use' });
      }

      // Create new user; the password will be hashed automatically via the pre-save hook
      const newUser = new User({ email, password, role });
      await newUser.save();

      return res.status(201).json({ message: 'User registered successfully', newUser });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  }

  // Login user and return a JWT token
  static async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Compare the provided password with the hashed password in the database using model method
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Create a JWT token with an expiration of 1 hour
      const token = jwt.sign(
        { userId: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      return res.status(200).json({ message: 'Login successful', token,userId: user._id,role: user.role });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  }

  // Get all users from the database
  static async getAllUsers(req, res) {
    try {
      const users = await User.find();

      const filteredUsers = users.filter(user => user.role !== 'admin');
  
      return res.status(200).json({ message: 'Users retrieved successfully', users: filteredUsers });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  }

}
  

module.exports = UserController;

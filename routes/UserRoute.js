import { Router } from 'express';
const router = Router();

// Import controller functions
import {
  login,
  signup,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/userController';

// Define routes
router.post('/login', login); // User login
router.post('/register', signup); // User registration
router.get('/users', getUser); // Get all users
router.post('/users', createUser); // Create a new user
router.put('/users/:id', updateUser); // Update a user by ID
router.delete('/users/:id', deleteUser); // Delete a user by ID

// Export the router
export default router;
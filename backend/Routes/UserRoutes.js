import express from 'express';
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserByID,
  UpdateUser,
} from '../Controller/userController.js';
import { isAuthenticated, admin } from '../Middlewares/authMiddleware.js';
const router = express.Router();

router.route('/').post(registerUser).get(isAuthenticated, admin, getUsers);
router.post('/logout', logoutUser);
router.post('/login', authUser);
router
  .route('/profile')
  .get(isAuthenticated, getUserProfile)
  .put(isAuthenticated, updateUserProfile);
router
  .route('/:id')
  .delete(isAuthenticated, admin, deleteUser)
  .get(isAuthenticated, admin, getUserByID)
  .put(isAuthenticated, admin, UpdateUser);

export default router;

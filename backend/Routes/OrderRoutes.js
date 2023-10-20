import express from 'express';
import {
  addOrderItems,
  getMyOrders,
  getOrderByID,
  getOrders,
  updateOrdertoPaid,
  updateOrdertoDeliver,
} from '../Controller/orderController.js';
import { isAuthenticated, admin } from '../Middlewares/authMiddleware.js';
const router = express.Router();

router
  .route('/')
  .post(isAuthenticated, addOrderItems)
  .get(isAuthenticated, admin, getOrders);
router.route('/my').get(isAuthenticated, getMyOrders);
router.route('/:id').get(isAuthenticated, getOrderByID);
router.route('/:id/pay').put(isAuthenticated, updateOrdertoPaid);
router.route('/:id/deliver').put(isAuthenticated, admin, updateOrdertoDeliver);

export default router;

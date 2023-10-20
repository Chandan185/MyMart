import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { notFound, errorHandler } from './Middlewares/errorMiddleware.js';
import ConnectDB from './Config/db.js';
import ProductRoutes from './Routes/ProductRoutes.js';
import UserRoutes from './Routes/UserRoutes.js';
import OrderRoutes from './Routes/OrderRoutes.js';
import cookieParser from 'cookie-parser';
const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
ConnectDB();
app.use('/api/products', ProductRoutes);
app.use('/api/users', UserRoutes);
app.use('/api/orders', OrderRoutes);
app.get('/api/config/paypal', (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);
app.use(notFound);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

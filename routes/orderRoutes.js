import express from "express";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";
import {
  getAdminOrders,
  getMyOrders,
  getOrderDetails,
  paymentVerification,
  placeOrder,
  placeOrderOnline,
  processOrder,
} from "../controllers/orderControllers.js";

const router = express.Router();

router.post("/placeorder", isAuthenticated, placeOrder);

router.post("/placeorderonline", isAuthenticated, placeOrderOnline);

router.post("/paymentverification", isAuthenticated, paymentVerification);

router.get("/myorders", isAuthenticated, getMyOrders);

router.get("/orders/:id", isAuthenticated, getOrderDetails);

// Add Admin Middleware
router.get("/admin/orders", isAuthenticated, authorizeAdmin, getAdminOrders);

router.get("/admin/orders/:id", isAuthenticated, authorizeAdmin, processOrder);

export default router;

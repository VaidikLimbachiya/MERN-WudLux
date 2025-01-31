const express = require("express");
const { getOrders, createOrder,getOrderByOrderId,getOrdersByUserId  } = require("../controllers/orderController");
const authenticateToken = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/list",getOrders);
router.post("/", authenticateToken,createOrder);
router.get("/:orderId", authenticateToken, getOrderByOrderId);
router.get("/user/:userId", authenticateToken, getOrdersByUserId);

module.exports = router;

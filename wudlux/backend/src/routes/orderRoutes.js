const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authenticateToken = require("../middlewares/authMiddleware");

router.get("/list", orderController.getOrders);
router.post("/", orderController.createOrder);
router.get("/:orderId", authenticateToken, orderController.getOrderByOrderId);
router.get("/user/:userId", authenticateToken, orderController.getOrdersByUserId);
router.post("/status", (req, res) => {
  const io = req.app.get("io");
  orderController.updateOrderStatus(req, res, io);
});

module.exports = router;
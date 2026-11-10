const crypto = require("crypto");
const express = require("express");
const Razorpay = require("razorpay");
const Order = require("../models/Order");
const User = require("../models/User");
const requireAuth = require("../middleware/requireAuth");
const products = require("../data/products");

const router = express.Router();

function getRazorpay() {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) return null;
  return new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });
}

function normalizeCart(cart) {
  if (!Array.isArray(cart) || cart.length === 0 || cart.length > 40) {
    throw new Error("Your cart is empty or contains too many different products.");
  }
  const quantities = new Map();
  for (const item of cart) {
    const id = String(item.id || "");
    const quantity = Number(item.qty);
    if (!products[id]) throw new Error("A product in your cart is no longer available.");
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
      throw new Error("Each product quantity must be between 1 and 20.");
    }
    quantities.set(id, (quantities.get(id) || 0) + quantity);
  }
  return [...quantities.entries()].map(([productId, quantity]) => ({
    productId,
    name: products[productId].name,
    unitPrice: products[productId].price,
    quantity
  }));
}

function validateDelivery(delivery) {
  const value = {
    name: String(delivery?.name || "").trim(),
    email: String(delivery?.email || "").trim().toLowerCase(),
    address: String(delivery?.address || "").trim(),
    city: String(delivery?.city || "").trim(),
    pin: String(delivery?.pin || "").trim(),
    phone: String(delivery?.phone || "").trim()
  };
  if (value.name.length < 2 || value.name.length > 80) throw new Error("Enter your full name.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.email)) throw new Error("Enter a valid email address.");
  if (value.address.length < 5 || value.address.length > 250) throw new Error("Enter your complete delivery address.");
  if (!value.city || value.city.length > 80) throw new Error("Enter your city.");
  if (!/^\d{6}$/.test(value.pin)) throw new Error("Enter a valid 6-digit PIN code.");
  if (!/^[0-9+()\-\s]{10,16}$/.test(value.phone)) throw new Error("Enter a valid phone number.");
  return value;
}

router.post("/create-order", requireAuth, async (req, res, next) => {
  try {
    const razorpay = getRazorpay();
    if (!razorpay) {
      return res.status(503).json({ message: "Payment is not configured yet. Add your Razorpay TEST keys to the .env file first." });
    }

    const items = normalizeCart(req.body.items);
    const delivery = validateDelivery(req.body.delivery);
    const subtotalPaise = items.reduce((sum, item) => sum + item.unitPrice * item.quantity * 100, 0);
    const shippingPaise = 19900;
    const totalPaise = subtotalPaise + shippingPaise;
    if (totalPaise < 100) return res.status(400).json({ message: "Order total is below the payment provider minimum." });

    const user = await User.findById(req.session.userId);
    if (!user) return res.status(401).json({ message: "Please sign in again." });

    const gatewayOrder = await razorpay.orders.create({
      amount: totalPaise,
      currency: "INR",
      receipt: `rigora_${Date.now()}_${crypto.randomBytes(3).toString("hex")}`,
      notes: { customerId: user._id.toString() }
    });

    const orderNumber = `RG-${Date.now().toString().slice(-8)}-${crypto.randomBytes(2).toString("hex").toUpperCase()}`;
    await Order.create({
      orderNumber,
      user: user._id,
      items,
      subtotalPaise,
      shippingPaise,
      totalPaise,
      status: "pending_payment",
      razorpayOrderId: gatewayOrder.id,
      delivery
    });

    res.status(201).json({
      keyId: process.env.RAZORPAY_KEY_ID,
      razorpayOrderId: gatewayOrder.id,
      amount: gatewayOrder.amount,
      currency: gatewayOrder.currency,
      orderNumber,
      customer: { name: delivery.name, email: delivery.email, contact: delivery.phone }
    });
  } catch (error) {
    if (error.message && !error.name?.includes("Mongo")) return res.status(400).json({ message: error.message });
    next(error);
  }
});

router.post("/verify", requireAuth, async (req, res, next) => {
  try {
    const { razorpay_order_id: razorpayOrderId, razorpay_payment_id: paymentId, razorpay_signature: signature } = req.body;
    if (!razorpayOrderId || !paymentId || !signature) {
      return res.status(400).json({ message: "Payment verification details are incomplete." });
    }
    if (!process.env.RAZORPAY_KEY_SECRET) {
      return res.status(503).json({ message: "Payment verification is not configured." });
    }

    const order = await Order.findOne({ razorpayOrderId, user: req.session.userId });
    if (!order) return res.status(404).json({ message: "Order not found for this account." });
    if (order.status === "paid") return res.json({ message: "Payment was already verified.", orderNumber: order.orderNumber });

    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpayOrderId}|${paymentId}`)
      .digest("hex");
    const expectedBuffer = Buffer.from(expected, "hex");
    const receivedBuffer = Buffer.from(String(signature), "hex");
    if (expectedBuffer.length !== receivedBuffer.length || !crypto.timingSafeEqual(expectedBuffer, receivedBuffer)) {
      return res.status(400).json({ message: "Payment signature could not be verified. Do not retry with altered payment details." });
    }

    // Confirm the gateway's payment record matches the expected order amount.
    const razorpay = getRazorpay();
    const payment = await razorpay.payments.fetch(paymentId);
    if (payment.order_id !== razorpayOrderId || payment.amount !== order.totalPaise || payment.currency !== "INR") {
      return res.status(400).json({ message: "The payment details do not match this order." });
    }
    if (payment.status !== "captured") {
      return res.status(409).json({ message: "The payment has not been captured yet. Check the Razorpay dashboard before retrying." });
    }

    order.status = "paid";
    order.razorpayPaymentId = paymentId;
    await order.save();
    res.json({ message: "Payment verified successfully.", orderNumber: order.orderNumber });
  } catch (error) {
    next(error);
  }
});

router.get("/my-orders", requireAuth, async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.session.userId }).sort({ createdAt: -1 }).select("-delivery");
    res.json({ orders });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

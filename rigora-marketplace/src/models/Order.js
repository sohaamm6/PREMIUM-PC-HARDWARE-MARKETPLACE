const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    items: [{
      productId: { type: String, required: true },
      name: { type: String, required: true },
      unitPrice: { type: Number, required: true },
      quantity: { type: Number, required: true, min: 1 }
    }],
    subtotalPaise: { type: Number, required: true },
    shippingPaise: { type: Number, required: true, default: 19900 },
    totalPaise: { type: Number, required: true },
    currency: { type: String, default: "INR" },
    status: { type: String, enum: ["pending_payment", "paid", "payment_failed"], default: "pending_payment" },
    razorpayOrderId: { type: String, required: true, unique: true },
    razorpayPaymentId: { type: String, default: null },
    delivery: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      pin: { type: String, required: true },
      phone: { type: String, required: true }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);

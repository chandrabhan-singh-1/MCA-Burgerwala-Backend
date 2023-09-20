import mongoose from "mongoose";

const schema = new mongoose.Schema({
  razorpay_order_id: {
    type: String,
    required: true,
  },
  razorpay_payment_id: {
    type: String,
    required: true,
  },
  razorpay_signature: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(Date.now()),
  },
});

export const Payment =
  mongoose.models.Payment || mongoose.model("Payment", schema);

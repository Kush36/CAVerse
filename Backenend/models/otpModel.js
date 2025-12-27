import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true, lowercase: true, index: true },
  code: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 }, // TTL: 300 seconds = 5 minutes
});

// `expires` on createdAt above will make documents expire ~5 minutes after creation
export default mongoose.model("Otp", otpSchema);

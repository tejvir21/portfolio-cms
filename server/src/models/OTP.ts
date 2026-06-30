import mongoose from "mongoose";

const OTPSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    ip: {
      type: String,
      required: true,
    },
  },

  {
    timestamps: true,
  },
);

export default mongoose.model("OTP", OTPSchema);

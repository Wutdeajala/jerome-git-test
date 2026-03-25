const mongoose = require("mongoose");

const subscriberSchema = new mongoose.Schema(
  {
    email: {
      type:      String,
      required:  true,
      trim:      true,
      lowercase: true,
      unique:    true,          // prevent duplicate subscriptions
      maxlength: 254,
      match: [
        /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/,
        "Invalid email address",
      ],
    },
    ipAddress: {
      type:   String,
      select: false,
    },
    emailsSent: {
      confirmationSent: { type: Boolean, default: false },
    },
    active: {
      type:    Boolean,
      default: true,            // set to false if they unsubscribe later
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subscriber", subscriberSchema);

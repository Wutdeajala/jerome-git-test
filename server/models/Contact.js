const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type:      String,
      required:  true,
      trim:      true,
      maxlength: 80,
    },
    email: {
      type:      String,
      required:  true,
      trim:      true,
      lowercase: true,
      maxlength: 254,
      match: [
        /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/,
        "Invalid email address",
      ],
    },
    phone: {
      type:      String,
      trim:      true,
      maxlength: 20,
      default:   "",
    },
    subject: {
      type:      String,
      required:  true,
      trim:      true,
      maxlength: 120,
    },
    message: {
      type:      String,
      required:  true,
      trim:      true,
      maxlength: 1500,
    },
    ipAddress: {
      type:   String,
      select: false,
    },
    emailsSent: {
      adminNotified: { type: Boolean, default: false },
      userReplied:   { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);

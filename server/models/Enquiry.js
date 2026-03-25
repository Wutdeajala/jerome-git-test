const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema(
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
    property: {
      type:     String,
      required: true,
      enum: [
        "Park Villa — Maitama, Abuja",
        "Park Villas II — Maitama, Abuja",
        "541 Residence — Wuye, Abuja",
        "Enclave Estate — Asokoro, Abuja",
        "Saada Court — Apo Resettlement, Abuja",
        "Ummahani Court — Galadima, Abuja",
      ],
    },
    message: {
      type:      String,
      trim:      true,
      maxlength: 1000,
      default:   "",
    },
    // IP stored for rate-limit auditing — never exposed in API responses
    ipAddress: {
      type:   String,
      select: false,   // excluded from query results by default
    },
    // Track email delivery status
    emailsSent: {
      adminNotified: { type: Boolean, default: false },
      userReplied:   { type: Boolean, default: false },
    },
  },
  {
    timestamps: true,   // adds createdAt + updatedAt automatically
  }
);

module.exports = mongoose.model("Enquiry", enquirySchema);

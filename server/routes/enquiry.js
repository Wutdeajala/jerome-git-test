const express  = require("express");
const router   = express.Router();
const Enquiry  = require("../models/Enquiry");
const { sendEnquiryEmails }              = require("../utils/mailer");
const { validateEnquiry, enquiryLimiter } = require("../middleware/validate");

// POST /api/register-interest
router.post(
  "/register-interest",
  enquiryLimiter,     // 1. rate limit
  validateEnquiry,    // 2. validate + sanitise
  async (req, res) => {
    const { name, email, property, message, ipAddress } = req.body;

    try {
      // 3. Save to MongoDB
      const enquiry = await Enquiry.create({
        name,
        email,
        property,
        message,
        ipAddress,
      });

      // 4. Send emails (admin notification + user auto-reply)
      const emailResults = await sendEnquiryEmails({ name, email, property, message });

      // 5. Update email delivery status on the saved record
      await Enquiry.findByIdAndUpdate(enquiry._id, {
        emailsSent: emailResults,
      });

      // 6. Respond to frontend
      return res.status(200).json({
        success: true,
        message: "Enquiry received. Thank you!",
      });

    } catch (err) {
      console.error("Enquiry submission FULL error:", err);
      return res.status(500).json({
        error: "Something went wrong. Please try again.",
      });
    }
  }
);

module.exports = router;

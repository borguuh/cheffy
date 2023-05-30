const mongoose = require("mongoose");

const newsletterEmailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
});

const NewsletterEmail = mongoose.model(
  "NewsletterEmail",
  newsletterEmailSchema
);

module.exports = NewsletterEmail;

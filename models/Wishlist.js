const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      required: true,
    },
    // user_id: {
    //   type: Number,
    //   required: true,
    // },
    wishlist: {
      type: Array,
      required: true,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("wishlist", wishlistSchema);
//Name Price Delievey
//multiple items cart

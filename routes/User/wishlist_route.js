const express = require("express");
// const { IsAuth } = require("../../../middlewares/auth");
const router = express.Router();
const {
  getWishlists,
  getUserWishlist,
  wishlistCount,
  addWishlist,
  deleteWishlist,
} = require("../../controllers/User/wishlist_controller");

router.get("/get_wishlists", getWishlists);
router.get(
  "/get_user_wishlist",
  // IsAuth,
  getUserWishlist
);
router.get(
  "/wishlist_count",
  // IsAuth,
  wishlistCount
);
router.post(
  "/add-wishlist",
  // IsAuth,
  addWishlist
);
// router.post(
//   "/update_wishlist",
//   // IsAuth,
//   catchAsyncFunc(async (req, res, next) => {
//     // const user_id = 1;
//     const { room_id, user_id } = req.body;
//     const room = await Room.findById(room_id);
//     if (!room)
//       return helper.sendError(404, res, { errors: "Room not found." }, req);
//     const updatedCart = await Cart.findOneAndUpdate(
//       { user_id: user_id, "cart_data.product": product },
//       { $inc: { "cart_data.$.quantity": quantity } },
//       {
//         new: true,
//         runValidators: true,
//         userFindANdModify: false,
//       }
//     );
//     if (updatedCart)
//       return helper.sendSuccess(res, updatedCart, req, "Success");
//   })
// );
router.post(
  "/delete-wishlist",
  // IsAuth,
  deleteWishlist
);
module.exports = router;

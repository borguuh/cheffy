const express = require("express");
const router = express.Router();
const {
  subscribeToNewsletter,
  unsubscribeNewsletter,
} = require("../../controllers/User/newsletter_controller");

router.post("/newsletter/subscribe", subscribeToNewsletter);
router.post("/newsletter/unsubscribe", unsubscribeNewsletter);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  subscribeToNewsletter,
} = require("../../controllers/User/newsletter_controller");

router.post("/newsletter/subscribe", subscribeToNewsletter);

module.exports = router;

const express = require("express");
const router = express.Router();
const controller = require("../controllers/hobby_interest_controller");

router.get("/getAllHobbyInterest", controller.getAllHobbyInterest);

module.exports = router;

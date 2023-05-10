const express = require("express");
const router = express.Router();
const {
  search,
  filter,
} = require("../../controllers/User/searchAndFilter_controller");

// Route for searching by location
router.get("/search", search);

// Route for filtering by criteria
router.get("/filter", filter);

module.exports = router;

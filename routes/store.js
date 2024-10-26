// Setting up the routes
const express = require("express");
const router = express.Router();

const { getStore, addStore } = require("../controllers/store");
router.route("/").get(getStore).post(addStore);
module.exports = router;

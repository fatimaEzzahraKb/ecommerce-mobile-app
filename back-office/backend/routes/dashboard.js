var express = require("express");
const { getData } = require("../controllers/DashboardController");
var router = express.Router();

router.get("/",getData);

module.exports = router
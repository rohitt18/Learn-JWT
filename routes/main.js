const express = require("express");
const router = express.Router();

const { login, dashboard } = require("../controllers/main");

const authenticationMiddleware = require("../middleware/auth");

router.route("/login").post(login);
router.route("/dashboard").get(authenticationMiddleware, dashboard);
// So now ofc everytime someone's going to be hitting this route first they'll go through the middleware
// And ofc in the middleware since I have next then ill pass to the dashboard 

module.exports = router;
const router = require("express").Router();
const userRoute = require("./users");
const thoughtRoute = require("./thoughts");

router.use("/users", userRoute);

module.exports = router;

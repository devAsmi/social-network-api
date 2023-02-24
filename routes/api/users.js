const router = require("express").Router();

//object destructuring const{}= require()
const {
  getAllUser,
  getSingleUser,
  CreateNewUser,
  updateUser,
  deleteUser,
} = require("../../controllers/userController");

//api/users
router.route("/").get(getAllUser).post(CreateNewUser);

//api/user/userid
router.route("/:userId").get(getSingleUser);

router.route("/:userId").put(updateUser);

router.route("/:userId").delete(deleteUser);

module.exports = router;

const router = require("express").Router();

//object destructuring const{}= require()
const {
  getAllUser,
  getSingleUser,
  CreateNewUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/userController");

//api/users
router.route("/").get(getAllUser).post(CreateNewUser);

//api/user/userid
router.route("/:userId").get(getSingleUser);

router.route("/:userId").put(updateUser);

router.route("/:userId").delete(deleteUser);

// route to add and delete friends
router.route("/:userId/friends/:friendId").post(addFriend);
router.route("/:userId/friends/:friendId").delete(removeFriend);

module.exports = router;

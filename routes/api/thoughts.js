const {
  getAllThoughts,
  createThought,
  updateThought,
  deleteThought,
} = require("../../controllers/thoughtController");

const router = require("express").Router();

router.route("/").get(getAllThoughts).post(createThought);

router.route("/:thoughtId").put(updateThought).delete(deleteThought);

module.exports = router;

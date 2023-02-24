const {
  getAllThoughts,
  createThought,
  updateThought,
  deleteThought,
  getSingleThought,
  createReactionForThought,
  deleteReactionForThought,
} = require("../../controllers/thoughtController");

const router = require("express").Router();

router.route("/").get(getAllThoughts).post(createThought);

router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

router.route("/:thoughtId/reactions").post(createReactionForThought);

router
  .route("/:thoughtId/reactions/:reactionsId")
  .delete(deleteReactionForThought);

module.exports = router;

const express = require("express");
const router = express.Router();
const tweetController = require("../controllers/tweet");

router.post("/", tweetController.requireAuth, tweetController.create);
router.get("/new", tweetController.requireAuth, tweetController.new);
router.get("/:id", tweetController.show);
router.put("/:id", tweetController.requireAuth, tweetController.update);

module.exports = router;

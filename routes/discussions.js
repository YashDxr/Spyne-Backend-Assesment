const express = require("express");
const router = express.Router();
const discussionController = require("../controllers/discussionController.js");

router.post("/", discussionController.createDiscussion);
router.put("/:id", discussionController.updateDiscussion);
router.delete("/:id", discussionController.deleteDiscussion);
router.get("/tags/:tag", discussionController.getDiscussionsByTag);
router.get("/search", discussionController.searchDiscussionsByText);

module.exports = router;

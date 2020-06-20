var express = require("express");
const ChapterController = require("../controllers/ChapterController");

var router = express.Router();

router.post("/", ChapterController.addChapter);
router.get("/", ChapterController.getChapterList);
router.get("/:id", ChapterController.getChapter);
router.put("/:id", ChapterController.updateChapter);
router.delete("/:id", ChapterController.deleteChapter);


module.exports = router;
var express = require("express");
const ChapterPageController = require("../controllers/ChapterPageController");

var router = express.Router();

router.get("/:id", ChapterPageController.getChapterList);
//router.post("/", ChapterPageController.addChapter);
//router.get("/:id", ChapterPageController.getChapter);
//router.put("/:id", ChapterPageController.updateChapter);
//router.delete("/:id", ChapterPageController.deleteChapter);


module.exports = router;
var express = require("express");
const CourseChapterController = require("../controllers/CourseChapterController");

var router = express.Router();

router.get("/:id", CourseChapterController.getCourseChapterList);
//router.post("/", ChapterPageController.addChapter);
//router.get("/:id", ChapterPageController.getChapter);
//router.put("/:id", ChapterPageController.updateChapter);
//router.delete("/:id", ChapterPageController.deleteChapter);


module.exports = router;
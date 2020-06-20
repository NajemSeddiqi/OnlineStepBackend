var express = require("express");
const CourseController = require("../controllers/CourseController");

var router = express.Router();

router.post("/", CourseController.addCourse);
router.get("/", CourseController.getCourseList);
router.get("/:id", CourseController.getCourse);
router.put("/:id", CourseController.updateCourse);
router.delete("/:id", CourseController.deleteCourse);

module.exports = router;
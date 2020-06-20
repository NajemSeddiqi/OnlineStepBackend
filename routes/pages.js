var express = require("express");
const PageController = require("../controllers/PageController");

var router = express.Router();

router.post("/", PageController.addPage);
router.get("/", PageController.getPageList);
router.get("/:id", PageController.getPage);
router.put("/:id", PageController.updatePage);
router.delete("/:id", PageController.deletePage);

module.exports = router;
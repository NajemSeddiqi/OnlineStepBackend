var express = require("express");
var pageRouter = require("./pages");
var chapterRouter = require("./chapters");
var chapterPagesRouter = require("./chaptersPages");
var courseRouter = require("./courses");
var courseChapterRouter = require("./courses/chapters");


var app = express();

app.use("/pages/", pageRouter);
app.use("/chapters/", chapterRouter);
app.use("/chapters/pages/", chapterPagesRouter);
app.use("/courses/", courseRouter);
app.use("/courses/chapters/", courseChapterRouter);

module.exports = app;
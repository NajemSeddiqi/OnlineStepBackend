'use strict';
var debug = require('debug');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var pages = require('./routes/pages');
var chapters = require('./routes/chapters');
var courses = require('./routes/courses');
var chaptersPages = require('./routes/chapterPages');
var coursesChapters = require('./routes/courseChapters');
var indexRouter = require("./routes/index");




var mongoose = require('mongoose');

var app = express();

//mongoose DB connection
const uri = "mongodb+srv://Erik:Hans2019@cluster-hp0eg.azure.mongodb.net/OnlineStep?retryWrites=true&w=majority";
mongoose.Promise = global.Promise;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000
}).catch(err => console.log(err.reason));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/pages', pages);
app.use('/chapters', chapters);
app.use('/chapters/pages', chaptersPages);
app.use('/courses', courses);
app.use('/courses/chapters', coursesChapters);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    debug(`Express server listening on port ${server.address().port}`);
});

module.exports = app;
